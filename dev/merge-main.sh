#!/usr/bin/env bash
#
# dev/merge-main.sh — вливает devel в ветку PR, автоматически разрешая
# конфликты в zdn/*/*/main.js и zdn/*/*/fipi.js (списки номеров).
#
# Использование:
#   dev/merge-main.sh 12345678              # автоопределение форка через gh
#   dev/merge-main.sh 12345678 sugarhedgehog  # явно указать remote форка
#
set -euo pipefail

# ─── Режим «all»: прогнать по всем подходящим PR ─────────────────────
if [ "${1:-}" = "all" ]; then
    echo ">>> Режим «all»: ищу открытые PR с изменениями в zdn/*/*/{main,fipi}.js..."
    PR_NUMS=$(gh pr list --state open --limit 500 --json number,files \
        --jq '.[] | select(any(.files[].path; test("^zdn/[^/]+/[^/]+/(main|fipi)\\.js$"))) | .number')
    if [ -z "$PR_NUMS" ]; then
        echo "Подходящих PR не найдено."
        exit 0
    fi
    echo "Найдено PR: $(echo "$PR_NUMS" | wc -l)"

    # Копируем себя во временный файл, чтобы переключение веток не сломало рекурсию
    SELF_COPY=$(mktemp /tmp/merge-main.XXXXXX.sh)
    cp "$0" "$SELF_COPY"
    chmod +x "$SELF_COPY"
    trap 'rm -f "$SELF_COPY"' EXIT

    for num in $PR_NUMS; do
        echo ""
        echo "════════════════════════════════════════"
        echo " PR #$num"
        echo "════════════════════════════════════════"
        bash "$SELF_COPY" "$num" "${2:-}" || echo "⚠ PR #$num: ошибка, пропускаю."
    done
    rm -f "$SELF_COPY"
    exit 0
fi

# ─── Аргументы ──────────────────────────────────────────────────────
PR="${1:?Использование: dev/merge-main.sh <NUM_PR> [REMOTE]}"
BRANCH="pr-$PR"
REMOTE="${2:-}"
HEAD_BRANCH=""
ADDED_REMOTE=""

cleanup() {
    # Удаляем временный remote, если добавляли
    [ -n "$ADDED_REMOTE" ] && git remote remove "$ADDED_REMOTE" 2>/dev/null || true
    rm -f /tmp/merge_ours_* /tmp/merge_theirs_*
}
trap cleanup EXIT

# ─── Определяем, куда пушить ───────────────────────────────────────
if [ -z "$REMOTE" ]; then
    if ! command -v gh &>/dev/null; then
        echo "ОШИБКА: gh CLI не найден. Укажи remote вторым аргументом:"
        echo "  dev/merge-main.sh $PR <remote>"
        exit 1
    fi
    HEAD_OWNER=$(gh pr view "$PR" --json headRepositoryOwner --jq '.headRepositoryOwner.login')
    HEAD_BRANCH=$(gh pr view "$PR" --json headRefName --jq '.headRefName')

    # Ищем существующий remote (регистронезависимо)
    REMOTE=$(git remote | grep -i "^${HEAD_OWNER}$" | head -1) || true

    if [ -z "$REMOTE" ]; then
        # Проверяем по URL
        REMOTE=$(git remote -v | grep -i "github.com[:/]${HEAD_OWNER}/chas-ege" | head -1 | awk '{print $1}') || true
    fi

    if [ -z "$REMOTE" ]; then
        echo "Remote для $HEAD_OWNER не найден — добавляю временный."
        REMOTE="_tmp_${HEAD_OWNER,,}"
        git remote add "$REMOTE" "git@github.com:${HEAD_OWNER}/chas-ege.git"
        ADDED_REMOTE="$REMOTE"
    fi
else
    # Remote дан явно; ветку попробуем узнать через gh (не критично, если нет)
    HEAD_BRANCH=$(gh pr view "$PR" --json headRefName --jq '.headRefName' 2>/dev/null) || true
fi

echo "╔══════════════════════════════════════╗"
echo "║  PR:     #$PR"
echo "║  Remote: $REMOTE"
echo "║  Ветка:  ${HEAD_BRANCH:-$BRANCH}"
echo "╚══════════════════════════════════════╝"
echo ""

# ─── Fetch ──────────────────────────────────────────────────────────
echo ">>> fetch"
git fetch upstream devel
git fetch upstream "pull/$PR/head:$BRANCH" --force

# ─── Кэш ───────────────────────────────────────────────────────────
CACHE_FILE="dev/.merge-main-not-needed.cache"
PR_HEAD=$(git rev-parse "$BRANCH")
DEVEL_HEAD=$(git rev-parse upstream/devel)

if grep -q "^${PR_HEAD} ${DEVEL_HEAD}$" "$CACHE_FILE" 2>/dev/null; then
    echo "Кэш: пара коммитов уже проверена, мёрдж не требуется."
    git branch -D "$BRANCH" 2>/dev/null || true
    exit 0
fi

# ─── Проверка идентичности ─────────────────────────────────────────
echo ">>> проверка: идентичны ли main.js и fipi.js"
if git diff --quiet "$BRANCH" upstream/devel -- 'zdn/*/*/main.js' 'zdn/*/*/fipi.js'; then
    echo "Файлы main.js и fipi.js (при наличии) в обеих ветках идентичны. Нечего мёржить!"
    echo "${PR_HEAD} ${DEVEL_HEAD}" >> "$CACHE_FILE"
    git branch -D "$BRANCH" 2>/dev/null || true
    exit 0
fi

# ─── Проверка: уже up-to-date? ─────────────────────────────────────
if git merge-base --is-ancestor upstream/devel "$BRANCH"; then
    echo "Ветка PR уже содержит все изменения из upstream/devel. Нечего мёржить!"
    echo "${PR_HEAD} ${DEVEL_HEAD}" >> "$CACHE_FILE"
    git branch -D "$BRANCH"
    exit 0
fi

# ─── Checkout ───────────────────────────────────────────────────────
echo ">>> checkout $BRANCH"
git checkout "$BRANCH"

# ─── Merge ──────────────────────────────────────────────────────────
echo ">>> merge upstream/devel"
if git merge --no-commit --no-ff upstream/devel; then
    git merge --abort
    echo ""
    echo "Конфликтов нет — скрипт не нужен. Жмите кнопку на GitHub."
    echo "${PR_HEAD} ${DEVEL_HEAD}" >> "$CACHE_FILE"
    exit 0
fi

# ─── Анализ конфликтов ──────────────────────────────────────────────
echo ""
echo ">>> Есть конфликты, разбираюсь..."

CONFLICTED=$(git diff --name-only --diff-filter=U)

if [ -z "$CONFLICTED" ]; then
    echo "Странно: merge вернул ошибку, но unmerged-файлов нет. Aborting."
    git merge --abort
    git checkout devel
    git branch -D "$BRANCH"
    exit 1
fi

BAD_FILES=""
GOOD_FILES=""
while IFS= read -r f; do
    if echo "$f" | grep -qE '^zdn/[^/]+/[^/]+/(main|fipi)\.js$'; then
        GOOD_FILES="$GOOD_FILES$f"$'\n'
    else
        BAD_FILES="$BAD_FILES  $f"$'\n'
    fi
done <<< "$CONFLICTED"

if [ -n "$BAD_FILES" ]; then
    echo "ОШИБКА: конфликты в файлах, которые я не умею мёржить автоматически:"
    echo "$BAD_FILES"
    echo "Aborting. Разруливай вручную."
    git merge --abort
    git checkout devel
    git branch -D "$BRANCH"
    exit 1
fi

echo "Конфликтные файлы (все — списки номеров, решаю):"
echo "$GOOD_FILES"

# ─── Разрешение конфликтов ──────────────────────────────────────────
echo ">>> Разрешаю..."

while IFS= read -r file; do
    [ -z "$file" ] && continue
    echo "  → $file"

    # Сохраняем версии для возможных логов (заменяем / на _ в пути файла)
    safe_name="${file//\//_}"
    git show ":2:$file" > "/tmp/merge_ours_${safe_name}"
    git show ":3:$file" > "/tmp/merge_theirs_${safe_name}"

    # Обрабатываем зоны конфликта в файле через Python
    python3 -c '
import sys, re

file_path = sys.argv[1]
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

pattern = re.compile(
    r"<<<<<<<[^\n]*\n(.*?)\n=======\n(.*?)\n>>>>>>>[^\n]*\n",
    re.DOTALL
)

def resolve_conflict(match):
    ours = match.group(1)
    theirs = match.group(2)
    
    num_regex = re.compile(r"^\s*([0-9]+)\s*,?\s*$")
    
    nums = set()
    for line in ours.splitlines() + theirs.splitlines():
        m = num_regex.search(line)
        if m:
            nums.add(int(m.group(1)))
    sorted_nums = sorted(list(nums))
    
    resolved = []
    for n in sorted_nums:
        resolved.append(f"\t{n},")
    return "\n".join(resolved) + "\n"

new_content = pattern.sub(resolve_conflict, content)
with open(file_path, "w", encoding="utf-8") as f:
    f.write(new_content)
' "$file"

    git add "$file"
done <<< "$GOOD_FILES"

# ─── Коммит ─────────────────────────────────────────────────────────
echo ""
echo ">>> commit"
git commit -m '[auto] Merge task list to avoid conflicts with the devel branch'

# ─── Safeguard: результат мёржа vs devel ────────────────────────────
echo ">>> Проверяю результат мёржа..."

SAFEGUARD_OK=1
while IFS= read -r file; do
    [ -z "$file" ] && continue

    STAT=$(git diff --numstat upstream/devel HEAD -- "$file")
    if [ -z "$STAT" ]; then
        # Файл идентичен devel — тоже ок (номер мог уже быть в devel)
        continue
    fi

    ADDED=$(echo "$STAT" | awk '{print $1}')
    REMOVED=$(echo "$STAT" | awk '{print $2}')

    if [ "$REMOVED" -gt 0 ]; then
        echo "  ✗ $file: удалено $REMOVED стр. (ожидалось 0)"
        SAFEGUARD_OK=0
    fi
    if [ "$ADDED" -gt 1 ]; then
        echo "  ✗ $file: добавлено $ADDED стр. (ожидалось ≤1)"
        SAFEGUARD_OK=0
    fi
done <<< "$GOOD_FILES"

if [ "$SAFEGUARD_OK" -ne 1 ]; then
    if [ "${MERGE_RETRY:-0}" -eq 1 ]; then
        echo ""
        echo "ОШИБКА: повторный сбой safeguard после фикса отступов."
        echo "Откатываю коммит '[codestyle] Fix indent' и попытку мёржа, чтобы не засорять PR."
        git reset --hard "${PR_HEAD_BEFORE_FIX:-$PR_HEAD}"
        
        echo ""
        echo ">>> Вывожу логи конфликтов..."
        for f in $GOOD_FILES; do
            echo "========================================"
            echo "===== LOG: $f ====="
            echo "========================================"
            safe_name="${f//\//_}"
            if [ -f "/tmp/merge_ours_${safe_name}" ]; then
                echo "--- In PR branch (ours) ---"
                cat "/tmp/merge_ours_${safe_name}"
            fi
            if [ -f "/tmp/merge_theirs_${safe_name}" ]; then
                echo "--- In devel (theirs) ---"
                cat "/tmp/merge_theirs_${safe_name}"
            fi
            echo "--- After merge (HEAD) ---"
            cat "$f"
        done
        
        echo ""
        echo "Ветка «$BRANCH» оставлена — посмотри руками:"
        echo "  git diff upstream/devel HEAD -- zdn/"
        echo "Откат:"
        echo "  git reset --hard HEAD~1 && git checkout devel && git branch -D $BRANCH"
        exit 1
    fi

    echo ""
    echo "ОШИБКА: мёрж привёл к подозрительному результату. Пробую починить отступы (локально)..."
    
    ORIGINAL_PR_HEAD=$(git rev-parse HEAD)
    git reset --hard "$PR_HEAD"
    
    for f in $GOOD_FILES; do
        sed -i 's/    /\t/g' "$f"
    done
    
    git add $GOOD_FILES
    git commit -m '[codestyle] Fix indent'
    
    echo ">>> Запускаю мёрж заново (dry run)..."
    export MERGE_RETRY=1
    export PR_HEAD_BEFORE_FIX="$ORIGINAL_PR_HEAD"
    exec "$0" "$@"
fi

echo "  ✓ ОК: только добавления, ≤1 строки на файл."

# ─── Пуш ────────────────────────────────────────────────────────────
echo ">>> push → $REMOTE (${HEAD_BRANCH:-$BRANCH})"
git push "$REMOTE" "HEAD:${HEAD_BRANCH:-$BRANCH}"

# ─── Кэш: успешный мёрж ────────────────────────────────────────────
echo "${PR_HEAD} ${DEVEL_HEAD}" >> "$CACHE_FILE"

# ─── Уборка ─────────────────────────────────────────────────────────
echo ">>> уборка"
git checkout devel
git branch -D "$BRANCH"

echo ""
echo "════════════════════════════════════════"
echo "  Готово! PR #$PR теперь мёржабелен."
echo "════════════════════════════════════════"

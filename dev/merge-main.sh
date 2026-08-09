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

# ─── Проверка: мёрж без конфликтов? ─────────────────────────────────
echo ">>> проверка: мёрж без конфликтов?"
MERGE_TREE_OUTPUT=$(git merge-tree "$(git merge-base "$BRANCH" upstream/devel)" "$BRANCH" upstream/devel 2>/dev/null) || true
if ! echo "$MERGE_TREE_OUTPUT" | grep -qE '<<<<<<<|>>>>>>>|changed in both'; then
    echo "Мёрж проходит чисто — кнопка Merge на GitHub справится сама. Нечего делать!"
    echo "${PR_HEAD} ${DEVEL_HEAD}" >> "$CACHE_FILE"
    git branch -D "$BRANCH" 2>/dev/null || true
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

OURS_TMP=$(mktemp /tmp/merge_ours.XXXXXX)
NUMS_TMP=$(mktemp /tmp/merge_nums.XXXXXX)
trap 'rm -f "$OURS_TMP" "$NUMS_TMP"; cleanup' EXIT

while IFS= read -r file; do
    [ -z "$file" ] && continue
    echo "  → $file"

    # Достаём обе версии
    git show ":2:$file" > "$OURS_TMP"

    # Все числа из обеих версий → sort -n -u
    { git show ":2:$file"; git show ":3:$file"; } \
        | sed -n 's/^[[:space:]]*\([0-9][0-9]*\),\{0,1\}[[:space:]]*$/\1/p' \
        | sort -n -u > "$NUMS_TMP"

    # Пересобираем файл: скелет из ours, числа — объединённые
    awk -v nf="$NUMS_TMP" '
        /\[[[:space:]]*$/ && !inn {
            print
            inn = 1
            while ((getline num < nf) > 0)
                printf "\t%s,\n", num
            close(nf)
            next
        }
        /^[[:space:]]*\]/ && inn {
            inn = 0
            print
            next
        }
        inn { next }
        { print }
    ' "$OURS_TMP" > "$file"

    git add "$file"
done <<< "$GOOD_FILES"

# ─── Коммит ─────────────────────────────────────────────────────────
echo ""
echo ">>> commit"
git commit --no-edit

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
    echo ""
    echo "ОШИБКА: мёрж привёл к подозрительному результату. Пуш отменён."
    echo "Ветка «$BRANCH» оставлена — посмотри руками:"
    echo "  git diff upstream/devel HEAD -- zdn/"
    echo "Откат:"
    echo "  git reset --hard HEAD~1 && git checkout devel && git branch -D $BRANCH"
    exit 1
fi

echo "  ✓ ОК: только добавления, ≤1 строки на файл."

# ─── Пуш ────────────────────────────────────────────────────────────
echo ">>> push → $REMOTE (${HEAD_BRANCH:-$BRANCH})"
git push "$REMOTE" "HEAD:${HEAD_BRANCH:-$BRANCH}"

# ─── Уборка ─────────────────────────────────────────────────────────
echo ">>> уборка"
git checkout devel
git branch -D "$BRANCH"

echo ""
echo "════════════════════════════════════════"
echo "  Готово! PR #$PR теперь мёржабелен."
echo "════════════════════════════════════════"

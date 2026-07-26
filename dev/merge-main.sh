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
git fetch origin devel
git fetch origin "pull/$PR/head:$BRANCH"

# ─── Checkout ───────────────────────────────────────────────────────
echo ">>> checkout $BRANCH"
git checkout "$BRANCH"

# ─── Merge ──────────────────────────────────────────────────────────
echo ">>> merge origin/devel"
if git merge origin/devel; then
    echo ""
    echo "Конфликтов нет — чистый мёрдж. Пушу."
    git push "$REMOTE" "HEAD:${HEAD_BRANCH:-$BRANCH}"
    git checkout devel
    git branch -D "$BRANCH"
    echo "Готово!"
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

    STAT=$(git diff --numstat origin/devel HEAD -- "$file")
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
    echo "  git diff origin/devel HEAD -- zdn/"
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

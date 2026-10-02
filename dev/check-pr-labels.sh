#!/bin/bash
# check-pr-labels.sh — проверяет и чинит лейблы на открытых PR
# Зависимость: gh (GitHub CLI), авторизованный на репозиторий

set -euo pipefail

REPO="nickkolok/chas-ege"
GH="gh --repo $REPO"

echo "=== Получаю список открытых PR... ==="
PR_NUMS=$($GH pr list --state open --limit 400 --json number --jq '.[].number')

if [ -z "$PR_NUMS" ]; then
    echo "Открытых PR нет. Все свободны!"
    exit 0
fi

TOTAL=$(echo "$PR_NUMS" | wc -l)
echo "Открытых PR: $TOTAL. Погнали проверять..."
echo ""

for PR_NUM in $PR_NUMS; do
    LABELS=$($GH pr view "$PR_NUM" --json labels --jq '.labels[].name' 2>/dev/null || true)
    FILES=$($GH pr view "$PR_NUM" --json files --jq '.files[].path' 2>/dev/null || true)
    PR_URL="https://github.com/$REPO/pull/$PR_NUM"

    # --- Правило 1: zdn/*/*/N.js → "шаблон" ---
    if echo "$FILES" | grep -qE '^zdn/[^/]+/[^/]+/[0-9]+\.js$'; then
        if ! echo "$LABELS" | grep -qF "шаблон"; then
            echo "⚠️  PR #$PR_NUM: файлы zdn/*/*/N.js меняются, а лейбла «шаблон» нет! Ну что за дела... Ставлю."
            $GH pr edit "$PR_NUM" --add-label "шаблон"
        fi
    else
        if echo "$LABELS" | grep -qF "шаблон"; then
            echo "🤨 PR #$PR_NUM: лейбл «шаблон» стоит, но файлов zdn/*/*/N.js я не вижу! Разберитесь: $PR_URL"
        fi
    fi

    # --- Правило 2: zdn/matoge20*/*/*.js → "ОГЭ" ---
    if echo "$FILES" | grep -qE '^zdn/matoge20[^/]*/[^/]+/[^/]+\.js$'; then
        if ! echo "$LABELS" | grep -qF "ОГЭ"; then
            echo "⚠️  PR #$PR_NUM: файлы zdn/matoge20*/*/*.js меняются, а лейбла «ОГЭ» нет! Ай-яй-яй. Ставлю."
            $GH pr edit "$PR_NUM" --add-label "ОГЭ"
        fi
    else
        if echo "$LABELS" | grep -qF "ОГЭ"; then
            echo "🤨 PR #$PR_NUM: лейбл «ОГЭ» стоит, но файлов zdn/matoge20*/*/*.js нет! $PR_URL"
        fi
    fi

    # --- Правило 3: zdn/matege20Np/*/*.js → "ЕГЭ-профиль" ---
    if echo "$FILES" | grep -qE '^zdn/matege20[0-9]+p/[^/]+/[^/]+\.js$'; then
        if ! echo "$LABELS" | grep -qF "ЕГЭ-профиль"; then
            echo "⚠️  PR #$PR_NUM: файлы zdn/matege20Np/*/*.js меняются, а лейбла «ЕГЭ-профиль» нет! Ставлю, но осуждаю."
            $GH pr edit "$PR_NUM" --add-label "ЕГЭ-профиль"
        fi
    else
        if echo "$LABELS" | grep -qF "ЕГЭ-профиль"; then
            echo "🤨 PR #$PR_NUM: лейбл «ЕГЭ-профиль» стоит, но файлов zdn/matege20Np/*/*.js нет! $PR_URL"
        fi
    fi

    # --- Правило 4: zdn/matoge20Nb/*/*.js → "ЕГЭ-база" ---
    if echo "$FILES" | grep -qE '^zdn/matege20[0-9]+b/[^/]+/[^/]+\.js$'; then
        if ! echo "$LABELS" | grep -qF "ЕГЭ-база"; then
            echo "⚠️  PR #$PR_NUM: файлы zdn/matege20Nb/*/*.js меняются, а лейбла «ЕГЭ-база» нет! Ладно, ставлю сама."
            $GH pr edit "$PR_NUM" --add-label "ЕГЭ-база"
        fi
    else
        if echo "$LABELS" | grep -qF "ЕГЭ-база"; then
            echo "🤨 PR #$PR_NUM: лейбл «ЕГЭ-база» стоит, но файлов zdn/matege20Nb/*/*.js нет! $PR_URL"
        fi
    fi

done

echo ""
echo "=== Готово. Зоопарк причёсан (ну, насколько это возможно). ==="

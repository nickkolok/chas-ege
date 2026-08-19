#!/bin/bash
# fix-indent-main-fipi.sh — ведущие пробелы → табы в zdn/*/*/{main,fipi}.js
# Каждый изменённый файл — отдельный коммит.

set -e

TAB_WIDTH=4   # сколько пробелов считаем одним уровнем

for f in zdn/*/*/main.js zdn/*/*/fipi.js; do
    [ -f "$f" ] || continue
    [ -L "$f" ] && continue

    # Конвертируем ведущие пробелы в табы (остаток < TAB_WIDTH оставляем пробелами)
    perl -i -pe 's/^( +)/"\t" x (length($1)\/'"$TAB_WIDTH"') . " " x (length($1)%'"$TAB_WIDTH"')/e' "$f"

    # Убираем trailing whitespace заодно (бонус, но легко убрать)
    sed -i 's/[[:space:]]*$//' "$f"

    if ! git diff --quiet -- "$f"; then
        git add "$f"
        git commit -m "style(indent): tabs in $f"
        echo "✔ $f"
    else
        echo "— $f (без изменений)"
    fi
done

echo "Готово!"

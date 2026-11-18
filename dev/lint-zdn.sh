#!/usr/bin/env bash
#
# lint-zdn.sh — грубый линтер для файлов в zdn/
#
# Использование:
#   ./dev/lint-zdn.sh [DIFF_BASE]
#   ./dev/lint-zdn.sh --all
#
#   DIFF_BASE — коммит/SHA для сравнения (двухточечный diff).
#   По умолчанию: origin/devel.
#
# Примеры:
#   ./dev/lint-zdn.sh                    # diff против origin/devel
#   ./dev/lint-zdn.sh abc1234            # diff против конкретного SHA
#   ./dev/lint-zdn.sh --all              # проверить ВСЕ файлы в zdn/
#
# Выход: 0 — всё ок, 1 — найдены проблемы.

set -euo pipefail

DIFF_BASE="${1:-origin/devel}"
CHECK_ALL=false

if [ "$DIFF_BASE" = "--all" ]; then
  CHECK_ALL=true
fi

# ─── Собираем список файлов ───────────────────────────────────────────────────

if [ "$CHECK_ALL" = true ]; then
  FILES=$(find zdn/ -type f | sort)
else
  # Двухточечный diff: просто сравнение двух деревьев, история не нужна
  FILES=$(git diff --name-only --diff-filter=ACMR "$DIFF_BASE" HEAD -- 'zdn/' 2>/dev/null || true)
fi

if [ -z "$FILES" ]; then
  echo "lint-zdn: no files to check."
  exit 0
fi

echo "lint-zdn: checking files:"
echo "$FILES" | sed 's/^/  /'
echo "---"

# ─── Проверки ─────────────────────────────────────────────────────────────────

ERRORS=0

report() {
  local file="$1" msg="$2"
  echo "::error file=${file}::${msg}"
  echo "  ✗ ${file}: ${msg}"
}

while IFS= read -r file; do
  [ -f "$file" ] || continue

  # 1. Концевые пробелы / табы
  if grep -Pn '[ \t]+$' "$file" > /dev/null 2>&1; then
    report "$file" "Trailing whitespace"
    grep -Pn '[ \t]+$' "$file" | head -5 | sed 's/^/      /'
    ERRORS=$((ERRORS + 1))
  fi

  # 2. CRLF
  if grep -Pn '\r$' "$file" > /dev/null 2>&1; then
    report "$file" "CRLF line endings (expected LF)"
    ERRORS=$((ERRORS + 1))
  fi

  # 3a. Нет перевода строки в конце файла
  if [ -s "$file" ] && [ "$(tail -c 1 "$file" | wc -l)" -eq 0 ]; then
    report "$file" "No newline at end of file"
    ERRORS=$((ERRORS + 1))
  fi

  # 3b. Лишние пустые строки в конце
  if [ -s "$file" ] && [ "$(tail -c 2 "$file" | wc -l)" -eq 2 ]; then
    report "$file" "Multiple blank lines at end of file"
    ERRORS=$((ERRORS + 1))
  fi

  # 4. BOM
  if head -c 3 "$file" | grep -qP '\xEF\xBB\xBF'; then
    report "$file" "UTF-8 BOM at start of file"
    ERRORS=$((ERRORS + 1))
  fi

  # 5. Невидимый / bidi Unicode
  HIDDEN_RE='[\x{200B}\x{200C}\x{200D}\x{2060}\x{FEFF}\x{00AD}\x{200E}\x{200F}\x{202A}-\x{202E}]'
  if grep -Pn "$HIDDEN_RE" "$file" > /dev/null 2>&1; then
    report "$file" "Hidden or bidirectional Unicode characters"
    grep -Pn "$HIDDEN_RE" "$file" | head -5 | sed 's/^/      /'
    ERRORS=$((ERRORS + 1))
  fi

done <<< "$FILES"

# ─── Итог ─────────────────────────────────────────────────────────────────────

echo "---"
if [ "$ERRORS" -gt 0 ]; then
  echo "lint-zdn: FAILED — issues in $ERRORS file(s)."
  exit 1
fi

echo "lint-zdn: all checks passed ✓"
exit 0

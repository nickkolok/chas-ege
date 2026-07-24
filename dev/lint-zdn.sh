#!/usr/bin/env bash
#
# lint-zdn.sh — грубый линтер для файлов в zdn/
#
# Использование:
#   ./dev/lint-zdn.sh [DIFF_BASE]
#
#   DIFF_BASE — база для git diff (по умолчанию: origin/devel).
#   Примеры:
#     ./dev/lint-zdn.sh              # diff против origin/devel
#     ./dev/lint-zdn.sh HEAD~3       # diff против 3 коммитов назад
#     ./dev/lint-zdn.sh --all        # проверить ВСЕ файлы в zdn/
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
  CHANGED_FILES=$(find zdn/ -type f -name '*.js' | sort)
else
  CHANGED_FILES=$(git diff --name-only --diff-filter=ACMR "$DIFF_BASE"...HEAD -- 'zdn/' 2>/dev/null || true)
fi

if [ -z "$CHANGED_FILES" ]; then
  echo "lint-zdn: no files to check."
  exit 0
fi

echo "lint-zdn: checking files:"
echo "$CHANGED_FILES" | sed 's/^/  /'
echo "---"

# ─── Проверки ─────────────────────────────────────────────────────────────────

ERRORS=0

report() {
  # report <file> <message>
  local file="$1"
  local msg="$2"
  # Формат GitHub Actions annotation + просто читаемый вывод
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
  #    U+200B ZWSP, U+200C ZWNJ, U+200D ZWJ, U+2060 Word Joiner,
  #    U+FEFF BOM/ZWNBSP, U+00AD Soft Hyphen,
  #    U+200E LRM, U+200F RLM, U+202A–202E bidi overrides
  HIDDEN_RE='[\x{200B}\x{200C}\x{200D}\x{2060}\x{FEFF}\x{00AD}\x{200E}\x{200F}\x{202A}-\x{202E}]'
  if grep -Pn "$HIDDEN_RE" "$file" > /dev/null 2>&1; then
    report "$file" "Hidden or bidirectional Unicode characters"
    grep -Pn "$HIDDEN_RE" "$file" | head -5 | sed 's/^/      /'
    ERRORS=$((ERRORS + 1))
  fi

done <<< "$CHANGED_FILES"

# ─── Итог ─────────────────────────────────────────────────────────────────────

echo "---"
if [ "$ERRORS" -gt 0 ]; then
  echo "lint-zdn: FAILED — issues in $ERRORS file(s)."
  exit 1
fi

echo "lint-zdn: all checks passed ✓"
exit 0

#!/bin/bash
set -eo pipefail

# Массовая генерация override-файлов
# Использование: ./batch-generate.sh <начальный_номер> <количество>
# Пример: ./batch-generate.sh 1 30
#   → создаст файлы nabor-override-1.js ... nabor-override-30.js

if [ $# -lt 2 ]; then
    echo "Использование: $0 <начальный_номер> <количество>" >&2
    echo "Пример: $0 1 30" >&2
    exit 1
fi

START="$1"
COUNT="$2"

# Проверка, что оба аргумента — числа
if ! [[ "$START" =~ ^[0-9]+$ ]]; then
    echo "Ошибка: начальный номер должен быть числом" >&2
    exit 1
fi

if ! [[ "$COUNT" =~ ^[0-9]+$ ]] || [ "$COUNT" -eq 0 ]; then
    echo "Ошибка: количество должно быть положительным числом" >&2
    exit 1
fi

END=$((START + COUNT - 1))

echo "Массовая генерация: варианты с $START по $END (всего $COUNT)"
echo ""

# Счётчики
success=0
failed=0

for i in $(seq "$START" "$END"); do
    # Вызываем generate.sh с номером как аргументом
    if ./generate.sh "$i" > /dev/null 2>&1; then
        success=$((success + 1))
        printf "\rПрогресс: %d / %d" "$success" "$COUNT"
    else
        failed=$((failed + 1))
        echo ""
        echo "Ошибка при генерации варианта $i" >&2
    fi
done

echo ""
echo ""
echo "Готово!"
echo "  Успешно: $success"
echo "  Ошибок:  $failed"
echo "  Файлы:   nabor/nabor-override-${START}.js ... nabor/nabor-override-${END}.js"

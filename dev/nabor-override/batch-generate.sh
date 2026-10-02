#!/bin/bash
set -eo pipefail

# Массовая генерация override-файлов
# Использование: ./batch-generate.sh <начальный_номер> <количество> <подварианты>
# Пример: ./batch-generate.sh 1 30 5
#   → создаст файлы nabor-override-1.js ... nabor-override-30.js с 5 подвариантами

if [ $# -lt 2 ]; then
    echo "Использование: $0 <начальный_номер> <количество> <подварианты>" >&2
    echo "Пример: $0 1 30 5" >&2
    exit 1
fi

START="$1"
COUNT="$2"
CV="${3:-5}" # По умолчанию 5, если третий аргумент не указан

# Проверка, что аргументы — числа
if ! [[ "$START" =~ ^[0-9]+$ ]]; then
    echo "Ошибка: начальный номер должен быть числом" >&2
    exit 1
fi

if ! [[ "$COUNT" =~ ^[0-9]+$ ]] || [ "$COUNT" -eq 0 ]; then
    echo "Ошибка: количество должно быть положительным числом" >&2
    exit 1
fi

if ! [[ "$CV" =~ ^[0-9]+$ ]] || [ "$CV" -eq 0 ]; then
    echo "Ошибка: количество подвариантов должно быть положительным числом" >&2
    exit 1
fi

END=$((START + COUNT - 1))

echo "Массовая генерация: варианты с $START по $END (всего $COUNT, подвариантов: $CV)"
echo ""

# Счётчики
success=0
failed=0

for i in $(seq "$START" "$END"); do
    # Вызываем generate.sh, передавая номер варианта и количество подвариантов
    if ./generate.sh "$i" "$CV" > /dev/null 2>&1; then
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

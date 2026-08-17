#!/bin/bash
set -eo pipefail

SETS_DIR="sets"
OUTPUT="${SETS_DIR}/all.txt"

if [ ! -d "$SETS_DIR" ]; then
    echo "Ошибка: папка '$SETS_DIR' не найдена" >&2
    exit 1
fi

> "$OUTPUT"

count=0
for i in {1..12}; do
    file="${SETS_DIR}/${i}.txt"
    if [ ! -f "$file" ]; then
        echo "Предупреждение: $file не найден, пропускаем" >&2
        continue
    fi
    echo "===SET:${i}===" >> "$OUTPUT"
    
    # Читаем файл построчно
    while IFS= read -r line || [ -n "$line" ]; do
        # Пропускаем пустые строки
        [ -z "$line" ] && continue
        
        # Убираем ВСЕ кавычки (и одинарные, и двойные)
        clean_line=$(echo "$line" | tr -d "'\"")
        
        # Оборачиваем в двойные кавычки
        echo "\"${clean_line}\"" >> "$OUTPUT"
    done < "$file"
    
    echo "" >> "$OUTPUT"
    count=$((count + 1))
done

echo "Собран файл: $OUTPUT (наборов: $count)"

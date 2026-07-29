#!/bin/bash
set -eo pipefail

SETS_DIR="sets"
OUTPUT_DIR="nabor"
CACHE_DIR="cache"
LAST_FILE="${CACHE_DIR}/last.txt"
ALL_FILE="${SETS_DIR}/all.txt"

if [ "$1" = "--clear-cache" ]; then
    rm -rf "$CACHE_DIR"
    echo "Кэш очищен"
    exit 0
fi

mkdir -p "$OUTPUT_DIR"
mkdir -p "$CACHE_DIR"

# Номер варианта: из аргумента или из интерактивного ввода
if [ -n "$1" ]; then
    NOMER="$1"
else
    read -p "Введите номер варианта (например, 15): " NOMER
fi

if ! [[ "$NOMER" =~ ^[0-9]+$ ]]; then
    echo "Ошибка: номер варианта должен быть числом" >&2
    exit 1
fi

OUTPUT_FILE="${OUTPUT_DIR}/nabor-override-${NOMER}.js"

# Временный файл для новых записей кэша (запишем в конце)
NEW_LAST_FILE=$(mktemp)

cat << EOF > "$OUTPUT_FILE"
console.log('Overriding...');
// Здесь можно писать комментарии. Собственно, вот так!
// Это у нас так номер варианта пишется!
\$('#variantPrefix').val('${NOMER}.');
// Количество вариантов
\$('#cV').val('5');
EOF

# Извлечь номер задачи из строки
get_nomer_from_line() {
    local line="$1"
    line=$(echo "$line" | sed 's/^"//; s/"$//')
    line=$(echo "$line" | sed "s/^'//; s/'$//")
    line=$(echo "$line" | tr -d "'\"")
    line=$(echo "$line" | sed 's/^[[:space:]]*//')
    read -ra tokens <<< "$line"
    echo "${tokens[0]}"
}

# Получить номер, который был на позиции в предыдущем варианте
get_last_number_for_index() {
    local index="$1"
    if [ ! -f "$LAST_FILE" ]; then
        echo ""
        return
    fi
    grep "^${index}:" "$LAST_FILE" | head -n 1 | sed "s/^${index}://"
}

# Выбрать случайную строку с учётом предыдущего варианта
pick_with_cache() {
    local block="$1"
    local index="$2"
    
    # Номер, который был на этой позиции в предыдущем варианте
    local last_num
    last_num=$(get_last_number_for_index "$index")
    
    # Фильтруем: оставляем строки, номер которых НЕ равен last_num
    local available=()
    while IFS= read -r line; do
        [ -z "$line" ] && continue
        local num
        num=$(get_nomer_from_line "$line")
        if [ -z "$last_num" ] || [ "$num" != "$last_num" ]; then
            available+=("$line")
        fi
    done <<< "$block"
    
    # Если все строки имеют тот же номер (крайний случай) — берём любую
    if [ ${#available[@]} -eq 0 ]; then
        echo "  Позиция $index: все строки имеют тот же номер, выбираем любую" >&2
        while IFS= read -r line; do
            [ -n "$line" ] && available+=("$line")
        done <<< "$block"
    fi
    
    # Выбираем случайную строку
    local chosen
    chosen=$(printf '%s\n' "${available[@]}" | shuf -n 1)
    
    echo "$chosen"
}

process_line() {
    local line="$1"
    local index="$2"
    
    line=$(echo "$line" | sed 's/^"//; s/"$//')
    line=$(echo "$line" | sed "s/^'//; s/'$//")
    line=$(echo "$line" | tr -d "'\"")
    line=$(echo "$line" | sed 's/^[[:space:]]*//')
    
    read -ra tokens <<< "$line"
    num_tokens=${#tokens[@]}
    
    if [ $num_tokens -eq 0 ]; then
        return
    fi
    
    nomer=${tokens[0]}
    
    echo "window.nabor.upak[$index].main = function(){" >> "$OUTPUT_FILE"
    echo "window.nomer = $nomer;" >> "$OUTPUT_FILE"
    
    start_index=1
    if [ $num_tokens -ge 2 ]; then
        comment_raw="${tokens[1]}"
        if [[ "$comment_raw" == *_* ]]; then
            comment_text="${comment_raw//_/ }"
            echo "window.comment='$nomer $comment_text';" >> "$OUTPUT_FILE"
            start_index=2
        fi
    fi
    
    if [ $num_tokens -gt $start_index ]; then
        params=("${tokens[@]:$start_index}")
        params_str=""
        for param in "${params[@]}"; do
            if [ -n "$params_str" ]; then
                params_str+=", "
            fi
            params_str+="'$param'"
        done
        echo "window.nabor.preferences['$nomer'] = [$params_str];" >> "$OUTPUT_FILE"
    fi
    
    echo "}" >> "$OUTPUT_FILE"
    
    # Записываем номер в новый кэш
    echo "${index}:${nomer}" >> "$NEW_LAST_FILE"
}

# Режим работы: объединённый файл или отдельные
if [ -f "$ALL_FILE" ]; then
    [ -z "$1" ] && echo "Режим: объединённый файл ($ALL_FILE)"
    NUM_SETS=$(grep -c '^===SET:' "$ALL_FILE")
    [ -z "$1" ] && echo "Найдено наборов: $NUM_SETS"
    
    for i in $(seq 1 "$NUM_SETS"); do
        block=$(awk -v set="$i" '
            /^===SET:/ {
                current = $0
                gsub(/[^0-9]/, "", current)
            }
            current == set && !/^===SET:/ && !/^[[:space:]]*$/ { print }
        ' "$ALL_FILE")
        
        if [ -z "$block" ]; then
            echo "Предупреждение: набор $i пуст" >&2
            continue
        fi
        
        line=$(pick_with_cache "$block" "$i")
        process_line "$line" "$i"
    done
else
    [ -z "$1" ] && echo "Режим: отдельные файлы (папка $SETS_DIR)"
    
    for i in {1..12}; do
        file="${SETS_DIR}/${i}.txt"
        
        if [ ! -f "$file" ]; then
            echo "Предупреждение: файл $file не найден" >&2
            continue
        fi
        
        block=$(grep -v '^[[:space:]]*$' "$file")
        
        if [ -z "$block" ]; then
            echo "Предупреждение: файл $file пуст" >&2
            continue
        fi
        
        line=$(pick_with_cache "$block" "$i")
        process_line "$line" "$i"
    done
fi

# Сохраняем новый кэш (заменяем старый)
mv "$NEW_LAST_FILE" "$LAST_FILE"

[ -z "$1" ] && echo "Сгенерирован файл: $OUTPUT_FILE"

exit 0

#!/bin/bash
# manage-credentials.sh - управление credentials для ассистентов
#
# Использование:
#   ./manage-credentials.sh create <profile-name> <login> <password>
#   ./manage-credentials.sh update <profile-name> <login> <password>
#   ./manage-credentials.sh delete <profile-name>
#   ./manage-credentials.sh show <profile-name>
#   ./manage-credentials.sh list

PROFILES_DIR="../chas-ege-chromium-profiles"

case "$1" in
    create)
        if [ $# -ne 4 ]; then
            echo "Использование: $0 create <profile-name> <login> <password>"
            exit 1
        fi
        PROFILE="$2"
        LOGIN="$3"
        PASSWORD="$4"
        CREDENTIALS_FILE="$PROFILES_DIR/$PROFILE/credentials.json"
        
        if [ -f "$CREDENTIALS_FILE" ]; then
            echo "Ошибка: файл credentials уже существует: $CREDENTIALS_FILE"
            echo "Используйте 'update' для обновления"
            exit 1
        fi
        
        mkdir -p "$PROFILES_DIR/$PROFILE"
        cat > "$CREDENTIALS_FILE" <<EOF
{
  "login": "$LOGIN",
  "password": "$PASSWORD",
  "created": "$(date -Iseconds)",
  "updated": "$(date -Iseconds)"
}
EOF
        chmod 600 "$CREDENTIALS_FILE"
        echo "Создан файл credentials: $CREDENTIALS_FILE"
        ;;
    
    update)
        if [ $# -ne 4 ]; then
            echo "Использование: $0 update <profile-name> <login> <password>"
            exit 1
        fi
        PROFILE="$2"
        LOGIN="$3"
        PASSWORD="$4"
        CREDENTIALS_FILE="$PROFILES_DIR/$PROFILE/credentials.json"
        
        if [ ! -f "$CREDENTIALS_FILE" ]; then
            echo "Ошибка: файл credentials не найден: $CREDENTIALS_FILE"
            echo "Используйте 'create' для создания"
            exit 1
        fi
        
        TEMP_FILE=$(mktemp)
        cat > "$TEMP_FILE" <<EOF
{
  "login": "$LOGIN",
  "password": "$PASSWORD",
  "created": "$(jq -r '.created // now | todateiso8601' "$CREDENTIALS_FILE" 2>/dev/null || date -Iseconds)",
  "updated": "$(date -Iseconds)"
}
EOF
        mv "$TEMP_FILE" "$CREDENTIALS_FILE"
        chmod 600 "$CREDENTIALS_FILE"
        echo "Обновлен файл credentials: $CREDENTIALS_FILE"
        ;;
    
    delete)
        if [ $# -ne 2 ]; then
            echo "Использование: $0 delete <profile-name>"
            exit 1
        fi
        PROFILE="$2"
        CREDENTIALS_FILE="$PROFILES_DIR/$PROFILE/credentials.json"
        
        if [ ! -f "$CREDENTIALS_FILE" ]; then
            echo "Файл credentials не найден: $CREDENTIALS_FILE"
            exit 1
        fi
        
        rm "$CREDENTIALS_FILE"
        echo "Удален файл credentials: $CREDENTIALS_FILE"
        ;;
    
    show)
        if [ $# -ne 2 ]; then
            echo "Использование: $0 show <profile-name>"
            exit 1
        fi
        PROFILE="$2"
        CREDENTIALS_FILE="$PROFILES_DIR/$PROFILE/credentials.json"
        
        if [ ! -f "$CREDENTIALS_FILE" ]; then
            echo "Файл credentials не найден: $CREDENTIALS_FILE"
            exit 1
        fi
        
        echo "=== Credentials для профиля $PROFILE ==="
        jq -r '.login // "не указан"' "$CREDENTIALS_FILE"
        echo "Пароль: скрыт"
        echo "Создан: $(jq -r '.created // "неизвестно"' "$CREDENTIALS_FILE")"
        echo "Обновлен: $(jq -r '.updated // "неизвестно"' "$CREDENTIALS_FILE")"
        ;;
    
    list)
        echo "=== Все профили с credentials ==="
        for profile_dir in "$PROFILES_DIR"/*/; do
            if [ -d "$profile_dir" ]; then
                profile=$(basename "$profile_dir")
                credentials_file="$profile_dir/credentials.json"
                if [ -f "$credentials_file" ]; then
                    login=$(jq -r '.login // "не указан"' "$credentials_file" 2>/dev/null)
                    updated=$(jq -r '.updated // "неизвестно"' "$credentials_file" 2>/dev/null)
                    echo "  $profile: login=$login, обновлен=$updated"
                else
                    echo "  $profile: credentials не настроены"
                fi
            fi
        done
        ;;
    
    *)
        echo "Использование: $0 {create|update|delete|show|list} [аргументы]"
        echo ""
        echo "Команды:"
        echo "  create <profile-name> <login> <password>  - создать credentials"
        echo "  update <profile-name> <login> <password>  - обновить credentials"
        echo "  delete <profile-name>                     - удалить credentials"
        echo "  show <profile-name>                       - показать credentials"
        echo "  list                                      - список всех профилей"
        exit 1
        ;;
esac

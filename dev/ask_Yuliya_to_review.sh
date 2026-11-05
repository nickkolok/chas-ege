#!/bin/bash

echo "Asking Yuliya to review PR#$1 ..."

PROFILE_DIR="../chas-ege-chromium-profiles"

# Выбираем случайный профиль из существующих папок yuliya-auto-*
profile=$(ls "$PROFILE_DIR" 2>/dev/null | grep '^yuliya-auto-' | shuf -n 1)

if [ -z "$profile" ]; then
    echo "ERROR: No yuliya-auto-* profiles found in $PROFILE_DIR"
    exit 1
fi

echo "Using profile: $profile"

# Путь к профилю
PROFILE_PATH="$PROFILE_DIR/$profile"

# Читаем credentials из файла в папке профиля (если существует)
CREDENTIALS_FILE="$PROFILE_PATH/credentials.json"
if [ -f "$CREDENTIALS_FILE" ]; then
    QWEN_LOGIN=$(jq -r '.login // empty' "$CREDENTIALS_FILE")
    JQ_PASSWORD=$(jq -r '.password // empty' "$CREDENTIALS_FILE")
else
    echo "WARNING: Credentials file not found at $CREDENTIALS_FILE"
    echo "Using environment variables or expecting manual login"
fi

# Формируем текст сообщения
MESSAGE="https://github.com/nickkolok/chas-ege/pull/$1"

# Запускаем новый обработчик
# --no-sandbox добавляется автоматически при запуске от root
if [ -n "$JQ_PASSWORD" ]; then
    echo "$JQ_PASSWORD" | /usr/local/bin/node dev/qwen-chat-auto.js \
      --user-data-dir="$PROFILE_PATH" \
      --login="$QWEN_LOGIN" \
      --password-stdin \
      --text="$MESSAGE" \
      --post-wait=30 \
      --headless \
      --executable-path=/snap/bin/chromium
else
    # Без credentials - полагаемся на существующую сессию в профиле
    /usr/local/bin/node dev/qwen-chat-auto.js \
      --user-data-dir="$PROFILE_PATH" \
      --text="$MESSAGE" \
      --post-wait=30 \
      --headless \
      --executable-path=/snap/bin/chromium
fi

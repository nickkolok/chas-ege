#!/bin/bash

echo "Asking Polina to fix PR#$1 ..."

PROFILE_PATH="../chas-ege-chromium-profiles/polina-fix-auto"

# Читаем credentials
CREDENTIALS_FILE="$PROFILE_PATH/credentials.json"
if [ -f "$CREDENTIALS_FILE" ]; then
    QWEN_LOGIN=$(jq -r '.login // empty' "$CREDENTIALS_FILE")
    JQ_PASSWORD=$(jq -r '.password // empty' "$CREDENTIALS_FILE")
else
    echo "WARNING: Credentials file not found at $CREDENTIALS_FILE"
fi

MESSAGE="https://github.com/nickkolok/chas-ege/pull/$1"

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
    /usr/local/bin/node dev/qwen-chat-auto.js \
      --user-data-dir="$PROFILE_PATH" \
      --text="$MESSAGE" \
      --post-wait=30 \
      --headless \
      --executable-path=/snap/bin/chromium
fi

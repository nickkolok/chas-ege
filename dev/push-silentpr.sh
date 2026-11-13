#!/usr/bin/env bash

# dev/push-silentpr.sh
# Тихий пуш веток с учётом опережения целевой ветки.
# Аргументы:
#   $1 - целевая ветка (target)
#   $2 - исходная ветка (source, по умолчанию HEAD)

set -e

TARGET_BRANCH="$1"
SOURCE_BRANCH="${2:-HEAD}"

if [ -z "$TARGET_BRANCH" ]; then
    echo "Ошибка: не указана целевая ветка." >&2
    echo "Использование: $0 <target-branch> [source-branch]" >&2
    exit 1
fi

SOURCE_HASH=$(git rev-parse "$SOURCE_BRANCH")
TARGET_HASH=$(git rev-parse "$TARGET_BRANCH")

# 1. Если ветки совпадают (указывают на один и тот же коммит), выходим молча
if [ "$SOURCE_HASH" = "$TARGET_HASH" ]; then
    exit 0
fi

# 2. Если целевая ветка опережает исходную (исходная является предком целевой)
if git merge-base --is-ancestor "$SOURCE_HASH" "$TARGET_HASH"; then
    CURRENT_BRANCH=$(git branch --show-current)
    if [ "$SOURCE_BRANCH" = "HEAD" ] || [ "$SOURCE_BRANCH" = "$CURRENT_BRANCH" ]; then
        git merge --ff-only --quiet "$TARGET_BRANCH"
    else
        git update-ref "refs/heads/$SOURCE_BRANCH" "$TARGET_HASH"
    fi
    # После синхронизации пушить ничего не нужно, так как они теперь совпадают
    exit 0
fi

# 3. Если исходная опережает целевую, пушим её
git push origin "$SOURCE_BRANCH":"$TARGET_BRANCH"

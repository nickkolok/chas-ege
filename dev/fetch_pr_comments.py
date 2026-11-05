#!/usr/bin/env python3
"""
Скрипт для получения комментариев из одного пуллреквеста через GitHub API
и сохранения их в JSON-файл.

Использование:
    python fetch_pr_comments.py <pr_number>
    
Пример:
    python fetch_pr_comments.py 2426
"""

import requests
import json
import sys
import os

def fetch_pr_comments(pr_number, token=None):
    """Получает комментарии пуллреквеста через GitHub API."""
    
    if token is None:
        token = os.environ.get('GITHUB_TOKEN', '')
    
    if not token:
        print("Ошибка: Не указан GitHub токен. Установите переменную окружения GITHUB_TOKEN")
        sys.exit(1)
    
    headers = {
        "Authorization": f"token {token}",
        "Accept": "application/vnd.github.v3+json"
    }
    
    repo = "nickkolok/chas-ege"
    
    # Get PR details
    pr_url = f"https://api.github.com/repos/{repo}/pulls/{pr_number}"
    pr_response = requests.get(pr_url, headers=headers)
    
    if pr_response.status_code != 200:
        print(f"Ошибка при получении PR #{pr_number}: {pr_response.status_code}")
        return None
    
    pr_data = pr_response.json()
    
    # Get comments
    comments_url = f"https://api.github.com/repos/{repo}/issues/{pr_number}/comments"
    comments_response = requests.get(comments_url, headers=headers)
    
    if comments_response.status_code != 200:
        print(f"Ошибка при получении комментариев PR #{pr_number}: {comments_response.status_code}")
        return None
    
    comments = comments_response.json()
    
    # Form JSON structure
    result = {
        "pr_number": pr_number,
        "pr_title": pr_data.get('title', ''),
        "pr_url": f"https://github.com/{repo}/pull/{pr_number}",
        "pr_state": pr_data.get('state', ''),
        "pr_created_at": pr_data.get('created_at', ''),
        "pr_updated_at": pr_data.get('updated_at', ''),
        "total_comments": len(comments),
        "comments": []
    }
    
    for comment in comments:
        comment_obj = {
            "id": comment.get('id'),
            "user": comment.get('user', {}).get('login', ''),
            "created_at": comment.get('created_at', ''),
            "updated_at": comment.get('updated_at', ''),
            "body": comment.get('body', ''),
            "url": comment.get('html_url', '')
        }
        result["comments"].append(comment_obj)
    
    return result

def main():
    if len(sys.argv) != 2:
        print("Использование: python fetch_pr_comments.py <pr_number>")
        sys.exit(1)
    
    try:
        pr_number = int(sys.argv[1])
    except ValueError:
        print("Ошибка: Номер PR должен быть числом")
        sys.exit(1)
    
    print(f"Получаю комментарии для PR #{pr_number}...")
    result = fetch_pr_comments(pr_number)
    
    if result is None:
        sys.exit(1)
    
    # Save to file
    filename = f"pr_{pr_number}_comments.json"
    with open(filename, 'w', encoding='utf-8') as f:
        json.dump(result, f, ensure_ascii=False, indent=2)
    
    print(f"✓ Создан файл: {filename}")
    print(f"  Количество комментариев: {result['total_comments']}")
    print(f"  Размер: {len(json.dumps(result, ensure_ascii=False))} символов")

if __name__ == "__main__":
    main()

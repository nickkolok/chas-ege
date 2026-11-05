#!/usr/bin/env python3
"""
Скрипт для массового получения ВСЕХ комментариев из нескольких пуллреквестов:
- Issue comments (общие комментарии к PR)
- Review comments (inline комментарии к строкам кода)

Использование:
    python fetch_all_pr_comments.py <pr_number1> <pr_number2> ... <pr_numberN>
    
Или из файла:
    python fetch_all_pr_comments.py --file pr_numbers.txt
    
Пример:
    python fetch_all_pr_comments.py 2426 2424 2428
    python fetch_all_pr_comments.py --file list.txt
"""

import requests
import json
import sys
import os
import time

def fetch_pr_comments(pr_number, token, repo="nickkolok/chas-ege"):
    """Получает все комментарии одного пуллреквеста через GitHub API."""
    
    headers = {
        "Authorization": f"token {token}",
        "Accept": "application/vnd.github.v3+json"
    }
    
    # Get PR details
    pr_url = f"https://api.github.com/repos/{repo}/pulls/{pr_number}"
    pr_response = requests.get(pr_url, headers=headers)
    
    if pr_response.status_code != 200:
        print(f"  ✗ Ошибка при получении PR #{pr_number}: {pr_response.status_code}")
        return None
    
    pr_data = pr_response.json()
    
    # Get issue comments (общие комментарии)
    comments_url = f"https://api.github.com/repos/{repo}/issues/{pr_number}/comments"
    comments_response = requests.get(comments_url, headers=headers)
    issue_comments = comments_response.json() if comments_response.status_code == 200 else []
    
    # Get review comments (inline комментарии к коду)
    review_comments_url = f"https://api.github.com/repos/{repo}/pulls/{pr_number}/comments"
    review_response = requests.get(review_comments_url, headers=headers)
    review_comments = review_response.json() if review_response.status_code == 200 else []
    
    # Form JSON structure
    result = {
        "pr_number": pr_number,
        "pr_title": pr_data.get('title', ''),
        "pr_url": f"https://github.com/{repo}/pull/{pr_number}",
        "pr_state": pr_data.get('state', ''),
        "pr_created_at": pr_data.get('created_at', ''),
        "pr_updated_at": pr_data.get('updated_at', ''),
        "total_issue_comments": len(issue_comments),
        "total_review_comments": len(review_comments),
        "total_comments": len(issue_comments) + len(review_comments),
        "issue_comments": [],
        "review_comments": []
    }
    
    # Add issue comments
    for comment in issue_comments:
        comment_obj = {
            "id": comment.get('id'),
            "user": comment.get('user', {}).get('login', ''),
            "created_at": comment.get('created_at', ''),
            "updated_at": comment.get('updated_at', ''),
            "body": comment.get('body', ''),
            "url": comment.get('html_url', '')
        }
        result["issue_comments"].append(comment_obj)
    
    # Add review comments
    for comment in review_comments:
        comment_obj = {
            "id": comment.get('id'),
            "user": comment.get('user', {}).get('login', ''),
            "created_at": comment.get('created_at', ''),
            "updated_at": comment.get('updated_at', ''),
            "body": comment.get('body', ''),
            "url": comment.get('html_url', ''),
            "path": comment.get('path', ''),
            "line": comment.get('line', None),
            "original_line": comment.get('original_line', None),
            "diff_hunk": comment.get('diff_hunk', '')
        }
        result["review_comments"].append(comment_obj)
    
    return result

def main():
    token = os.environ.get('GITHUB_TOKEN', '')
    
    if not token:
        print("Ошибка: Не указан GitHub токен.")
        print("Установите переменную окружения: export GITHUB_TOKEN=your_token_here")
        sys.exit(1)
    
    # Parse arguments
    if len(sys.argv) < 2:
        print("Использование:")
        print("  python fetch_all_pr_comments.py <pr_number1> <pr_number2> ...")
        print("  python fetch_all_pr_comments.py --file <filename>")
        sys.exit(1)
    
    pr_numbers = []
    
    if sys.argv[1] == '--file':
        if len(sys.argv) != 3:
            print("Ошибка: Укажите имя файла после --file")
            sys.exit(1)
        
        filename = sys.argv[2]
        try:
            with open(filename, 'r') as f:
                for line in f:
                    line = line.strip()
                    if line and not line.startswith('#'):
                        try:
                            pr_numbers.append(int(line))
                        except ValueError:
                            print(f"Предупреждение: пропущена некорректная строка: {line}")
        except FileNotFoundError:
            print(f"Ошибка: Файл {filename} не найден")
            sys.exit(1)
    else:
        for arg in sys.argv[1:]:
            try:
                pr_numbers.append(int(arg))
            except ValueError:
                print(f"Ошибка: '{arg}' не является числом")
                sys.exit(1)
    
    print(f"Всего PRов для обработки: {len(pr_numbers)}")
    print("=" * 60)
    
    all_prs_data = []
    
    for i, pr_number in enumerate(pr_numbers, 1):
        print(f"[{i}/{len(pr_numbers)}] PR #{pr_number}...", end=' ')
        
        result = fetch_pr_comments(pr_number, token)
        
        if result:
            all_prs_data.append(result)
            print(f"✓ Issue: {result['total_issue_comments']}, Review: {result['total_review_comments']}")
        else:
            print(f"✗ пропущен")
        
        # Rate limiting
        if i < len(pr_numbers):
            time.sleep(0.5)
    
    if not all_prs_data:
        print("\nОшибка: Не удалось получить данные ни для одного PR")
        sys.exit(1)
    
    # Save to file
    output_filename = "all_pr_comments.json"
    with open(output_filename, 'w', encoding='utf-8') as f:
        json.dump(all_prs_data, f, ensure_ascii=False, indent=2)
    
    print("\n" + "=" * 60)
    print(f"✓ Создан файл: {output_filename}")
    print(f"  Успешно обработано PRов: {len(all_prs_data)}/{len(pr_numbers)}")
    print(f"  Всего issue comments: {sum(pr['total_issue_comments'] for pr in all_prs_data)}")
    print(f"  Всего review comments: {sum(pr['total_review_comments'] for pr in all_prs_data)}")
    print(f"  Всего комментариев: {sum(pr['total_comments'] for pr in all_prs_data)}")
    
    # Summary
    print("\n=== СВОДКА ===")
    for pr in all_prs_data:
        title = pr['pr_title'][:50] + "..." if len(pr['pr_title']) > 50 else pr['pr_title']
        print(f"PR #{pr['pr_number']}: {title}")
        print(f"  Issue: {pr['total_issue_comments']}, Review: {pr['total_review_comments']}")

if __name__ == "__main__":
    main()

#!/usr/bin/env python3
"""
Скрипт для массового получения комментариев из пулов реквестов через GitHub API:
- Issue comments (общие комментарии к PR)
- Review comments (inline комментарии к строкам кода)

Поддерживает:
- Отдельные номера:        fetch_all_pr_comments.py 2426 2424 2428
- Диапазоны:                fetch_all_pr_comments.py 1234..1268
- Список из файла:          fetch_all_pr_comments.py --file pr_numbers.txt
- Комбинации:               fetch_all_pr_comments.py 2426 2428 1234..1240

В файле — по одному номеру или диапазону на строку, строки с # игнорируются.
"""

import requests
import json
import sys
import os
import time

def parse_numbers(args):
    """Разбирает аргументы командной строки в список номеров."""
    numbers = []
    for arg in args:
        if '..' in arg:
            parts = arg.split('..')
            if len(parts) != 2:
                print(f"Ошибка: некорректный диапазон: {arg}")
                sys.exit(1)
            try:
                start = int(parts[0])
                end = int(parts[1])
            except ValueError:
                print(f"Ошибка: некорректный диапазон: {arg}")
                sys.exit(1)
            if start > end:
                print(f"Ошибка: начало диапазона больше конца: {arg}")
                sys.exit(1)
            numbers.extend(range(start, end + 1))
        else:
            try:
                numbers.append(int(arg))
            except ValueError:
                print(f"Ошибка: '{arg}' не является числом или диапазоном")
                sys.exit(1)
    # Убираем дубликаты, сохраняя порядок
    seen = set()
    result = []
    for n in numbers:
        if n not in seen:
            seen.add(n)
            result.append(n)
    return result

def parse_file(filename):
    """Разбирает файл со списком номеров и диапазонов."""
    numbers = []
    with open(filename, 'r') as f:
        for line in f:
            line = line.strip()
            if not line or line.startswith('#'):
                continue
            if '..' in line:
                parts = line.split('..')
                if len(parts) != 2:
                    print(f"Предупреждение: пропущена некорректная строка: {line}")
                    continue
                try:
                    start = int(parts[0])
                    end = int(parts[1])
                except ValueError:
                    print(f"Предупреждение: пропущена некорректная строка: {line}")
                    continue
                numbers.extend(range(start, end + 1))
            else:
                try:
                    numbers.append(int(line))
                except ValueError:
                    print(f"Предупреждение: пропущена некорректная строка: {line}")
    # Убираем дубликаты, сохраняя порядок
    seen = set()
    result = []
    for n in numbers:
        if n not in seen:
            seen.add(n)
            result.append(n)
    return result

def fetch_pr_comments(pr_number, token, repo="nickkolok/chas-ege"):
    """
    Получает все комментарии одного пулов реквеста через GitHub API.
    Возвращает None, если данный номер не является пулов реквестом
    (например, это issue или номер не существует).
    """
    headers = {
        "Authorization": f"token {token}",
        "Accept": "application/vnd.github.v3+json"
    }

    # Проверяем, что данный номер — именно пулов реквест
    pr_url = f"https://api.github.com/repos/{repo}/pulls/{pr_number}"
    pr_response = requests.get(pr_url, headers=headers)

    if pr_response.status_code == 404:
        return None  # Не существует или это issue

    if pr_response.status_code != 200:
        print(f"  ✗ Ошибка при получении PR #{pr_number}: {pr_response.status_code}")
        return None

    pr_data = pr_response.json()

    # Issue comments (общие комментарии)
    comments_url = f"https://api.github.com/repos/{repo}/issues/{pr_number}/comments"
    comments_response = requests.get(comments_url, headers=headers)
    issue_comments = comments_response.json() if comments_response.status_code == 200 else []

    # Review comments (inline комментарии к коду)
    review_url = f"https://api.github.com/repos/{repo}/pulls/{pr_number}/comments"
    review_response = requests.get(review_url, headers=headers)
    review_comments = review_response.json() if review_response.status_code == 200 else []

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

    for comment in issue_comments:
        result["issue_comments"].append({
            "id": comment.get('id'),
            "user": comment.get('user', {}).get('login', ''),
            "created_at": comment.get('created_at', ''),
            "updated_at": comment.get('updated_at', ''),
            "body": comment.get('body', ''),
            "url": comment.get('html_url', '')
        })

    for comment in review_comments:
        result["review_comments"].append({
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
        })

    return result

def main():
    token = os.environ.get('GITHUB_TOKEN', '')

    if not token:
        print("Ошибка: Не указан GitHub токен.")
        print("Установите переменную окружения: export GITHUB_TOKEN=your_token_here")
        sys.exit(1)

    if len(sys.argv) < 2:
        print("Использование:")
        print("  python fetch_all_pr_comments.py <номер> [ <номер> ...]")
        print("  python fetch_all_pr_comments.py <начало>..<конец>")
        print("  python fetch_all_pr_comments.py --file <имя_файла>")
        print("")
        print("Примеры:")
        print("  python fetch_all_pr_comments.py 2426 2424 2428")
        print("  python fetch_all_pr_comments.py 1234..1268")
        print("  python fetch_all_pr_comments.py 2426 2428 1234..1240")
        print("  python fetch_all_pr_comments.py --file list.txt")
        sys.exit(1)

    if sys.argv[1] == '--file':
        if len(sys.argv) != 3:
            print("Ошибка: Укажите имя файла после --file")
            sys.exit(1)
        filename = sys.argv[2]
        if not os.path.exists(filename):
            print(f"Ошибка: Файл {filename} не найден")
            sys.exit(1)
        pr_numbers = parse_file(filename)
    else:
        pr_numbers = parse_numbers(sys.argv[1:])

    print(f"Всего номеров для обработки: {len(pr_numbers)}")
    print("=" * 60)

    all_prs_data = []
    skipped = []

    for i, pr_number in enumerate(pr_numbers, 1):
        print(f"[{i}/{len(pr_numbers)}] PR #{pr_number}...", end=' ')

        result = fetch_pr_comments(pr_number, token)

        if result:
            all_prs_data.append(result)
            print(f"✓ Issue: {result['total_issue_comments']}, Review: {result['total_review_comments']}")
        else:
            print(f"✗ не является PR (пропущен)")
            skipped.append(pr_number)

        # Небольшая пауза между запросами
        if i < len(pr_numbers):
            time.sleep(0.5)

    if not all_prs_data:
        print("\nОшибка: Не удалось получить данные ни для одного PR")
        sys.exit(1)

    output_filename = "all_pr_comments.json"
    with open(output_filename, 'w', encoding='utf-8') as f:
        json.dump(all_prs_data, f, ensure_ascii=False, indent=2)

    print("\n" + "=" * 60)
    print(f"✓ Создан файл: {output_filename}")
    print(f"  Успешно обработано: {len(all_prs_data)}/{len(pr_numbers)}")
    print(f"  Пропущено (не PR): {len(skipped)}")
    print(f"  Всего issue comments: {sum(pr['total_issue_comments'] for pr in all_prs_data)}")
    print(f"  Всего review comments: {sum(pr['total_review_comments'] for pr in all_prs_data)}")
    print(f"  Всего комментариев: {sum(pr['total_comments'] for pr in all_prs_data)}")

    print("\n=== СВОДКА ===")
    for pr in all_prs_data:
        title = pr['pr_title'][:50] + "..." if len(pr['pr_title']) > 50 else pr['pr_title']
        print(f"PR #{pr['pr_number']}: {title}")
        print(f"  Issue: {pr['total_issue_comments']}, Review: {pr['total_review_comments']}")

if __name__ == "__main__":
    main()

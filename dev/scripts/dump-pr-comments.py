#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
dump-pr-comments.py — дамп комментариев к PR через GitHub REST API.

Предназначен для CI (GitHub Actions): на раннерах GitHub API доступен,
поэтому здесь собирается ПОЛНЫЙ и точный дамп (в отличие от HTML-скрейпера
pr-comments-html.py, который работает там, где API заблокирован).

Токен берётся из переменной окружения GITHUB_TOKEN (в Actions это встроенный
токен). В файлах дампов токена нет. Результат кладётся в comments/{n}.json
и публикуется как ассет rolling-релиза pr-comments-latest.

Формат {n}.json совпадает с pr-comments-html.py:
  { pull_request: {...метаданные..., body}, comments: [...], reviews: [...],
    review_comments: [...] }

Запуск:
  GITHUB_TOKEN=... python3 dump-pr-comments.py 3596 3798     # точечно
  GITHUB_TOKEN=... python3 dump-pr-comments.py --all-open    # все открытые
"""
import json
import os
import sys
import time
import urllib.request
import urllib.error

TOKEN = os.environ.get("GITHUB_TOKEN") or os.environ.get("GH_TOKEN")
REPO = os.environ.get("REPO", "nickkolok/chas-ege")
API = "https://api.github.com"
OUT = os.environ.get("OUT", "comments")


def api(path, tries=4):
    url = path if path.startswith("http") else API + path
    items = []
    while url:
        last = None
        for a in range(tries):
            try:
                req = urllib.request.Request(url, headers={
                    "User-Agent": "chas-ege-pr-comments-dump",
                    "Accept": "application/vnd.github+json",
                    **({"Authorization": "token " + TOKEN} if TOKEN else {}),
                })
                with urllib.request.urlopen(req, timeout=30) as r:
                    body = r.read().decode("utf-8")
                    link = r.headers.get("Link", "")
                break
            except urllib.error.HTTPError as e:
                if e.code in (403, 429) and a < tries - 1:
                    time.sleep(2 * (a + 1)); last = e; continue
                raise
            except Exception as e:  # noqa: BLE001
                last = e
                if a < tries - 1:
                    time.sleep(1.5 * (a + 1))
        else:
            raise RuntimeError("GET %s: %s" % (url, last))
        data = json.loads(body)
        if isinstance(data, list):
            items.extend(data)
        else:
            return data
        nxt = None
        for part in link.split(","):
            if 'rel="next"' in part:
                nxt = part[part.find("<") + 1:part.find(">")]
        url = nxt
    return items


def dump_pr(n):
    pr = api("/repos/%s/pulls/%d" % (REPO, n))
    comments = api("/repos/%s/issues/%d/comments?per_page=100" % (REPO, n))
    reviews = api("/repos/%s/pulls/%d/reviews?per_page=100" % (REPO, n))
    review_comments = api("/repos/%s/pulls/%d/comments?per_page=100" % (REPO, n))
    data = {
        "pull_request": {
            "number": pr["number"], "title": pr["title"], "state": pr["state"],
            "author": pr["user"]["login"], "base_branch": pr["base"]["ref"],
            "head_branch": pr["head"]["ref"],
            "head_repo_owner": pr["head"]["repo"]["owner"]["login"] if pr["head"]["repo"] else None,
            "created_at": pr["created_at"], "merged_at": pr["merged_at"],
            "closed_at": pr["closed_at"], "commits": pr["commits"],
            "head_sha": pr["head"]["sha"], "url": pr["html_url"], "body": pr["body"],
        },
        "comments": comments,
        "reviews": reviews,
        "review_comments": review_comments,
        "warnings": [],
        "source": "api",
    }
    os.makedirs(OUT, exist_ok=True)
    p = os.path.join(OUT, "%d.json" % n)
    with open(p, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
        f.write("\n")
    sys.stderr.write("  #%d: %d комм., %d ревью, %d к коду\n" % (
        n, len(comments), len(reviews), len(review_comments)))
    return p


def all_open():
    prs = api("/repos/%s/pulls?state=open&per_page=100" % REPO)
    return [p["number"] for p in prs]


def main():
    args = sys.argv[1:]
    if not args:
        sys.stderr.write("usage: dump-pr-comments.py N [N...] | --all-open\n")
        sys.exit(2)
    if "--all-open" in args:
        nums = all_open()
    else:
        nums = [int(x) for x in args if x.isdigit()]
    for n in sorted(set(nums)):
        dump_pr(n)


if __name__ == "__main__":
    main()

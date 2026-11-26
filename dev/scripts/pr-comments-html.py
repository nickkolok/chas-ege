#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
pr-comments-html.py — дамп комментариев к пуллреквестам через HTML-страницы
github.com, БЕЗ GitHub API и БЕЗ токена.

Зачем: в некоторых изолированных средах API комментариев заблокирован
(а токены не проходят), но веб github.com открывается — браузер работает.
Этот скрипт читает ровно те же страницы, что и браузер, и достаёт оттуда
комментарии в том же виде, в каком их отдаёт API.

Как это устроено (проверено байт-в-байт против API):
  * Исходный markdown каждого комментария лежит в атрибуте value элемента
    <clipboard-copy ... data-dd-action-name="comment.copy_markdown"> —
    это пункт меню «Copy markdown». Он совпадает с полем body из API.
  * Описание PR — в pr.description.copy_markdown.
  * Метаданные PR (номер, заголовок, state, ветки, автор, даты) — во
    встроенном JSON <script ... data-target="react-app.embeddedData">.
  * Скрытые (outdated) треды ревью догружаются по data-deferred-content-url
    (это HTML-фрагменты github.com, не API).
  * Автор — ссылка class="author", время — <relative-time datetime="...">,
    состояние ревью — цвет/иконка бейджа (check/file-diff/eye).

Ограничение: у очень длинных обсуждений (~50+ комментариев) GitHub прячет
середину за progressive-loader; анонимно он отдаёт 404. Такие случаи скрипт
помечает в warnings. Гарантированно полный дамп — CI-дамп (rolling-релиз
pr-comments-latest, workflow pr-comments-dump.yml).

Только стандартная библиотека Python 3.8+. Токен не нужен, не запрашивается
и никуда не записывается.

Использование:
  python3 pr-comments-html.py 3596 3798
  python3 pr-comments-html.py --repo nickkolok/chas-ege --out dumps 3596
  python3 pr-comments-html.py --list-file prs.txt --delay 1.5 --quiet
"""
import argparse
import bisect
import html
import json
import os
import re
import sys
import time
import urllib.request
import urllib.error

UA = ("Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/126.0 Safari/537.36")
BASE = "https://github.com"

RE_COMMENT_ID = re.compile(
    r'id="(issuecomment-\d+|discussion_r\d+|pullrequestreview-\d+)"')
RE_COPY_MD = re.compile(
    r'<clipboard-copy[^>]*data-dd-action-name="comment\.copy_markdown"'
    r'[^>]*value="([^"]*)"', re.S)
RE_DESC_MD = re.compile(
    r'<clipboard-copy[^>]*data-dd-action-name="pr\.description\.copy_markdown"'
    r'[^>]*value="([^"]*)"', re.S)
RE_EMBEDDED = re.compile(
    r'<script type="application/json" data-target="react-app\.embeddedData">'
    r'(.*?)</script>', re.S)
RE_AUTHOR = re.compile(r'class="author[^"]*"[^>]*href="/([^"]+)"')
RE_REVIEW_AUTHOR = re.compile(r'href="/([^"]+)"[^>]*TimelineItem-avatar')
RE_TIME = re.compile(r'datetime="([^"]+)"')
RE_BADGE = re.compile(r'TimelineItem-badge([^"]*)"')
RE_OCTICON = re.compile(r'octicon octicon-([a-z-]+)')
RE_PATH = re.compile(
    r'class="text-mono text-small Link--primary wb-break-all mr-2">([^<]+)</a>')
RE_DEFERRED = re.compile(r'data-deferred-content-url="([^"]*threads[^"]*)"')
RE_LOADER = re.compile(r'<div id="js-timeline-progressive-loader"[^>]*'
                       r'data-timeline-item-src="([^"]+)"')
RE_TABLE = re.compile(r'<table class="diff-table[^"]*"[^>]*>.*?</table>', re.S)
RE_ROW = re.compile(r'<tr>.*?</tr>', re.S)


def log(msg, quiet=False):
    if not quiet:
        sys.stderr.write(msg + "\n")
        sys.stderr.flush()


def http_get(url, tries=4, timeout=20, quiet=False):
    """GET с повторами и экспоненциальной задержкой. Без авторизации.
    На 404/410 не повторяем (это осмысленный ответ, а не сбой сети)."""
    last = None
    for a in range(tries):
        try:
            req = urllib.request.Request(url, headers={
                "User-Agent": UA,
                "Accept": "text/html,application/xhtml+xml",
                "Accept-Language": "en-US,en;q=0.9",
            })
            with urllib.request.urlopen(req, timeout=timeout) as r:
                return r.read().decode("utf-8", "replace")
        except urllib.error.HTTPError as e:
            if e.code in (404, 410):
                raise
            last = e
            if a < tries - 1:
                time.sleep(0.7 * (2 ** a))
        except Exception as e:  # noqa: BLE001 - сеть бывает разной
            last = e
            if a < tries - 1:
                time.sleep(0.7 * (2 ** a))
    raise RuntimeError("GET %s failed: %s" % (url, last))


def _state(badge_cls, octicon):
    if "color-bg-success-emphasis" in badge_cls:
        return "APPROVED"
    if "color-bg-danger-emphasis" in badge_cls:
        return "CHANGES_REQUESTED"
    return {"check": "APPROVED", "file-diff": "CHANGES_REQUESTED",
            "eye": "COMMENTED", "comment-discussion": "COMMENTED",
            "x": "DISMISSED", "clock": "PENDING"}.get(octicon, "COMMENTED")


def _diff_rows(table_html):
    rows = []
    for tr in RE_ROW.findall(table_html):
        ln = re.search(r'data-line-number="(\d+)"', tr)
        mk = re.search(r'blob-code-marker-(addition|deletion|context)', tr)
        code = re.search(r'blob-code-inner[^>]*>(.*?)</span>', tr, re.S)
        if ln and mk and code:
            txt = html.unescape(re.sub(r"<[^>]+>", "", code.group(1)))
            if txt[:1] == " ":
                txt = txt[1:]
            rows.append((int(ln.group(1)),
                         {"addition": "+", "deletion": "-", "context": " "}[mk.group(1)],
                         txt))
    return rows


def _parse_comments(h):
    """Достаёт все видимые комментарии со страницы/фрагмента."""
    ids = [(m.start(), m.group(1)) for m in RE_COMMENT_ID.finditer(h)]
    starts = [s for s, _ in ids]
    bodies = {}
    for m in RE_COPY_MD.finditer(h):
        k = bisect.bisect_right(starts, m.start()) - 1
        if k >= 0:
            bodies[ids[k][1]] = html.unescape(m.group(1))
    paths = [(m.start(), html.unescape(m.group(1))) for m in RE_PATH.finditer(h)]
    pstarts = [p for p, _ in paths]
    tables = [(m.start(), m.group(0)) for m in RE_TABLE.finditer(h)]
    tstarts = [t for t, _ in tables]

    out = []
    for i, (pos, cid) in enumerate(ids):
        end = ids[i + 1][0] if i + 1 < len(ids) else pos + 9000
        seg = h[pos:min(end, pos + 9000)]
        if cid.startswith("pullrequestreview-"):
            am = RE_REVIEW_AUTHOR.search(seg) or RE_AUTHOR.search(seg)
        else:
            am = RE_AUTHOR.search(seg) or RE_REVIEW_AUTHOR.search(seg)
        tm = RE_TIME.search(seg)
        item = {
            "kind": cid.split("-")[0].split("_")[0],
            "id": int(re.sub(r"\D", "", cid)),
            "anchor": cid,
            "author": am.group(1) if am else None,
            "created_at": tm.group(1) if tm else None,
            "body": bodies.get(cid),
        }
        if cid.startswith("pullrequestreview-"):
            bm = RE_BADGE.search(seg)
            om = RE_OCTICON.search(seg)
            item["state"] = _state(bm.group(1) if bm else "",
                                   om.group(1) if om else "")
        if cid.startswith("discussion_r"):
            k = bisect.bisect_right(pstarts, pos) - 1
            item["path"] = paths[k][1] if k >= 0 else None
            kt = bisect.bisect_right(tstarts, pos) - 1
            rows = _diff_rows(tables[kt][1]) if kt >= 0 else []
            if rows:
                item["original_line"] = max(r[0] for r in rows)
                item["diff_hunk"] = "".join(
                    "%s%s\n" % (mk, txt) for _, mk, txt in rows)
        out.append(item)
    return out


def fetch_pr(repo, n, quiet=False, delay=0.0):
    url = "%s/%s/pull/%d" % (BASE, repo, n)
    h = http_get(url, quiet=quiet)
    warnings = []

    meta = {}
    m = RE_EMBEDDED.search(h)
    if m:
        try:
            pr = json.loads(m.group(1))["payload"]["pullRequestsLayoutRoute"]["pullRequest"]
            meta = {
                "number": pr.get("number"),
                "title": pr.get("title"),
                "state": pr.get("state"),
                "author": (pr.get("author") or {}).get("login"),
                "base_branch": pr.get("baseBranch"),
                "head_branch": pr.get("headBranch"),
                "head_repo_owner": pr.get("headRepositoryOwnerLogin"),
                "created_at": pr.get("createdTime"),
                "merged_at": pr.get("mergedTime"),
                "closed_at": pr.get("closedTime"),
                "commits": pr.get("commitsCount"),
                "head_sha": pr.get("headSha"),
            }
        except Exception as e:  # noqa: BLE001
            warnings.append("embeddedData parse: %s" % e)
    else:
        warnings.append("react-app.embeddedData not found (страница изменилась?)")

    dm = RE_DESC_MD.search(h)
    description = html.unescape(dm.group(1)) if dm else None

    items = _parse_comments(h)

    # Скрытые (outdated) треды ревью — HTML-фрагменты github.com.
    seen = {it["anchor"] for it in items}
    for u in RE_DEFERRED.findall(h):
        frag_url = BASE + html.unescape(u)
        try:
            if delay:
                time.sleep(delay)
            frag = http_get(frag_url, quiet=quiet)
            for it in _parse_comments(frag):
                if it["anchor"] not in seen:
                    seen.add(it["anchor"])
                    items.append(it)
        except Exception as e:  # noqa: BLE001
            warnings.append("deferred thread %s: %s" % (frag_url, e))

    # Дырка progressive-loader у очень длинных обсуждений.
    lm = RE_LOADER.search(h)
    if lm:
        src = html.unescape(lm.group(1))
        loader_url = BASE + "/" + src
        n_comments = sum(1 for it in items
                         if it["kind"] in ("issuecomment", "discussion"))
        try:
            frag = http_get(loader_url, tries=1, timeout=10, quiet=quiet)
            for it in _parse_comments(frag):
                if it["anchor"] not in seen:
                    seen.add(it["anchor"])
                    items.append(it)
        except Exception as e:  # noqa: BLE001
            # Анонимно загрузчик обычно отдаёт 404. Середина прячется только
            # у длинных обсуждений; у коротких всё уже отрендерено целиком.
            if "before_cursor=" in src and n_comments >= 45:
                warnings.append(
                    "Возможно, часть комментариев скрыта (progressive-loader, "
                    "анонимно не догружается: %s). Для полного дампа возьмите "
                    "rolling-релиз pr-comments-latest или откройте %s в браузере."
                    % (e, url))

    comments, reviews, review_comments = [], [], []
    for it in items:
        if it["kind"] == "issuecomment":
            comments.append(it)
        elif it["kind"] == "pullrequestreview":
            reviews.append(it)
        elif it["kind"] == "discussion":
            review_comments.append(it)
    comments.sort(key=lambda x: x["id"])
    reviews.sort(key=lambda x: x["id"])
    review_comments.sort(key=lambda x: x["id"])

    return {
        "pull_request": dict(meta, url=url, body=description),
        "comments": comments,
        "reviews": reviews,
        "review_comments": review_comments,
        "warnings": warnings,
        "source": "html",
    }


def api_shape_comment(it, repo, n):
    return {
        "id": it["id"],
        "user": {"login": it["author"]},
        "created_at": it["created_at"],
        "updated_at": it["created_at"],
        "body": it["body"] if it["body"] is not None else "",
        "html_url": "%s/%s/pull/%d#issuecomment-%d" % (BASE, repo, n, it["id"]),
    }


def write_outputs(data, repo, n, outdir, quiet=False):
    os.makedirs(outdir, exist_ok=True)
    pr = data["pull_request"]
    comments = [api_shape_comment(c, repo, n) for c in data["comments"]]
    reviews = [{
        "id": r["id"], "user": {"login": r["author"]}, "state": r.get("state"),
        "submitted_at": r["created_at"],
        "body": r["body"] if r["body"] is not None else "",
        "html_url": "%s/%s/pull/%d#pullrequestreview-%d" % (BASE, repo, n, r["id"]),
    } for r in data["reviews"]]
    review_comments = [{
        "id": c["id"], "user": {"login": c["author"]},
        "created_at": c["created_at"], "updated_at": c["created_at"],
        "body": c["body"] if c["body"] is not None else "",
        "path": c.get("path"), "original_line": c.get("original_line"),
        "diff_hunk": c.get("diff_hunk"),
        "html_url": "%s/%s/pull/%d#discussion_r%d" % (BASE, repo, n, c["id"]),
    } for c in data["review_comments"]]

    def dump(name, obj):
        p = os.path.join(outdir, name)
        with open(p, "w", encoding="utf-8") as f:
            json.dump(obj, f, ensure_ascii=False, indent=2)
            f.write("\n")
        return p

    dump("%d.comments.json" % n, comments)
    dump("%d.reviews.json" % n, reviews)
    dump("%d.review-comments.json" % n, review_comments)
    dump("%d.json" % n, dict(data, comments=comments, reviews=reviews,
                             review_comments=review_comments))

    md = ["# PR #%s — %s" % (n, pr.get("title") or ""),
          "",
          "state: %s | author: %s | %s ← %s:%s" % (
              pr.get("state"), pr.get("author"), pr.get("base_branch"),
              pr.get("head_repo_owner"), pr.get("head_branch")),
          "", "## Описание", "", pr.get("body") or "_(пусто)_", ""]
    if data["warnings"]:
        md += ["## ⚠️ Предупреждения", ""] + ["- " + w for w in data["warnings"]] + [""]
    md += ["## Комментарии (%d)" % len(comments), ""]
    for c in comments:
        md += ["### %s — %s" % (c["user"]["login"], c["created_at"]), "",
               c["body"], ""]
    if reviews:
        md += ["## Ревью (%d)" % len(reviews), ""]
        for r in reviews:
            md += ["### %s — %s — %s" % (r["user"]["login"], r["state"],
                                         r["submitted_at"]), "",
                   r["body"] or "_(без текста)_", ""]
    if review_comments:
        md += ["## Комментарии к коду (%d)" % len(review_comments), ""]
        for c in review_comments:
            md += ["### %s — %s:%s — %s" % (c["user"]["login"], c.get("path"),
                                            c.get("original_line"), c["created_at"]),
                   "", c["body"], ""]
    p = os.path.join(outdir, "%d.md" % n)
    with open(p, "w", encoding="utf-8") as f:
        f.write("\n".join(md))
    log("  #%d: %d комм., %d ревью, %d к коду%s" % (
        n, len(comments), len(reviews), len(review_comments),
        ("  ⚠️ " + "; ".join(data["warnings"])) if data["warnings"] else ""), quiet)


def main():
    ap = argparse.ArgumentParser(description="Дамп комментариев PR через HTML github.com (без API/токена)")
    ap.add_argument("numbers", nargs="*", type=int, help="номера PR")
    ap.add_argument("--repo", default="nickkolok/chas-ege")
    ap.add_argument("--out", default="pr-dumps")
    ap.add_argument("--list-file", help="файл со списком номеров PR (по одному на строку)")
    ap.add_argument("--delay", type=float, default=1.0, help="пауза между запросами, с")
    ap.add_argument("--quiet", action="store_true")
    args = ap.parse_args()

    nums = list(args.numbers)
    if args.list_file:
        with open(args.list_file, encoding="utf-8") as f:
            nums += [int(x) for x in re.findall(r"\d+", f.read())]
    if not nums:
        ap.error("укажите номера PR или --list-file")
    nums = sorted(set(nums))

    failed = []
    for i, n in enumerate(nums):
        if i:
            time.sleep(args.delay)
        try:
            data = fetch_pr(args.repo, n, quiet=args.quiet, delay=args.delay)
            write_outputs(data, args.repo, n, args.out, quiet=args.quiet)
        except Exception as e:  # noqa: BLE001
            failed.append(n)
            log("  #%d: ОШИБКА %s" % (n, e), args.quiet)
    if failed:
        log("Не удалось: %s" % ", ".join(map(str, failed)), args.quiet)
        sys.exit(1)


if __name__ == "__main__":
    main()

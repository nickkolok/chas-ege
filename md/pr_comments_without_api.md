# Комментарии к PR, когда API заблокирован

Бывает среда, где часть GitHub API закрыта (комментарии не получить, токены не проходят),
а список PR удаётся достать через `gh search`, и **веб `github.com` открывается** — браузер работает.
Тогда комментарии можно брать прямо из HTML-страниц, минуя API. Два способа (см. PR #3832).

## Способ 1. Скрейпер `dev/scripts/pr-comments-html.py` (без API и токена)

Страница PR содержит исходный markdown каждого комментария в атрибуте `value` элемента
`<clipboard-copy … data-dd-action-name="comment.copy_markdown">` (меню «Copy markdown»).
Это тот же текст, что API отдаёт в `body` — проверено байт в байт. Оттуда же берутся
описание PR (`pr.description.copy_markdown`), метаданные (`react-app.embeddedData`),
автор (`class="author"`), время (`<relative-time datetime>`), состояние ревью (цвет/иконка бейджа).
Скрытые outdated-треды ревью догружаются по `data-deferred-content-url` (HTML-фрагменты, не API).

    python3 dev/scripts/pr-comments-html.py 3596 3798 --out dumps
    python3 dev/scripts/pr-comments-html.py --list-file prs.txt --delay 1.5

Выход: `{n}.comments.json` (форма API), `{n}.reviews.json`, `{n}.review-comments.json`,
`{n}.json` (всё вместе), `{n}.md` (читаемый дайджест). Python 3.8+, только stdlib, токен не нужен.
Номера PR можно скормить из рабочего `gh search`.

**Ограничение:** у очень длинных обсуждений (~50+ комментариев) GitHub прячет середину за
progressive-loader, который анонимно отдаёт 404. Скрейпер помечает это в `warnings`;
для таких PR — способ 2.

## Способ 2. CI-дамп в rolling-релиз `pr-comments-latest`

Workflow `.github/workflows/pr-comments-dump.yml` на стороне GitHub (где API доступен) собирает
полные точные дампы (`dev/scripts/dump-pr-comments.py`) и публикует их как ассеты rolling-релиза
`pr-comments-latest` — по образцу `devel-bundle-latest`. Триггеры: каждый комментарий/ревью,
расписание, ручной запуск. Ревьюер скачивает браузером нужный файл:

    https://github.com/nickkolok/chas-ege/releases/download/pr-comments-latest/{n}.json

Формат совпадает со способом 1. Токен — встроенный `GITHUB_TOKEN` (опционально секрет `DUMP_TOKEN`),
в дампах токена нет. Ручная пересылка дампов больше не нужна.

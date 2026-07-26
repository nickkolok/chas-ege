# 🗂 chas-ege — конспект файловой структуры

> Свободный тренажёр к ЕГЭ/ОГЭ. Статический сайт, сборка через `Grunt`, ветка разработки — `devel`.

---

## Корневые файлы

| Файл | Зачем |
|---|---|
| `index.html` | Точка входа (открывается в браузере) |
| `Gruntfile.js` | Скрипты сборки. Изменются крайне редко, для большинства рутинных задач этот файл неинтересен. |
| `package.json` | npm-зависимости (mathjs, nerdamer, seedrandom, flatten-shape-geometry и др.) |
| `eslint.json` / `eslint-tasks.json` | Конфиги линтера (отдельный — для ядерного кода, отдельный — для задач). Увы, линтер почти не используется. |
| `Readme.md` / `LICENSE` (GPLv3) / `CHANGELOG` | Мета |

---

## Основные директории

```
chas-ege/
├── zdn/          ← 🎯 ЗАДАНИЯ (самая «горячая» папка)
├── lib/          ← Библиотеки (математика, массивы, UI, геометрия…)
├── sh/           ← Оболочки (shells) — HTML+JS «страницы-запускалки»
├── c2/           ← Ещё оболочки (в чуть более новом стиле)
├── src/          ← Ядро движка (chas2, chaslib, утилиты сборки)
├── css/          ← Стили
├── ext/          ← Внешние библиотеки (jQuery, MathJax, jqplot, bootstrap…)
├── dev/          ← Dev-инструменты, скрипты, node-тесты, документация
├── doc/          ← HTML-документация
├── md/           ← markdown-документация (по содержанию не совпадает с doc)
├── test/         ← QUnit-тесты
├── .github/workflows/  ← CI (ci.yml, Node 22.12.0)
└── .vscode/      ← Настройки редактора
```

---

## `zdn/` — задания (шаблоны)

Это то, с чем мы работаем чаще всего.
Каждый файл на третьем уровне с числовым именем - это отдельный шаблон задачи.
Шаблон может быть похож на другие,
при разработке шаблона можно смотреть на другие,
но в строгом смысле код шаблона зависит только от библиотек,
но не от других шаблонов.

Активно используются симлинки: как на файлы, так и на папки.

Структура **трёхуровневая**:

```
zdn/
├── <набор>/                    ← matege2024b, matoge2024, physege2026, misc_*…
│   ├── <набор>.js              ← мета-файл набора (matege2024b.js)
│   ├── <номер_задания>/        ← 1, 2, 3 … 21 (номер задания в варианте)
│   │   ├── main.js             ← массив всех номеров задач
│   │   ├── fipi.js             ← массив номеров задач строго по ФИПИ (есть не во всех папках)
│   │   ├── 527976.js           ← конкретная задача (имя = номер на ОБЗ, СдамГИА и т.д.)
│   │   ├── 512907.js
│   │   └── …
│   └── …
├── delete_tasks.sh             ← вспомогательные shell-скрипты
├── fast_variant.sh
├── new_main.sh
└── symbolink.sh
```

**Актуальные наборы** (по последним PR):
- `matege2024b` — ЕГЭ база 2024+ (задания 1–21)
- `matege2024p` — ЕГЭ профиль 2024+
- `matoge2024` — ОГЭ математика 2024+
- `physege2026` — ЕГЭ физика 2026 (едва начат)
- `misc_*` — тематические подборки ( `misc_percentages_base2026`, `misc_progressions`, `misc_vectors`, `misc_equations` и т.д. )

---

## `lib/` — библиотеки

Группировка по смыслу/назначению:

| Группа | Файлы |
|---|---|
| **Числа / математика** | `number.js`, `number_math.js`, `func.js`, `function.js`, `complex.js`, `mathjs_functions.js`, `mathjs_helpers.js`, `mathjs_rules.js` |
| **Массивы** | `array.js`, `array_general.js`, `array_mn.js`, `array_mp.js`, `array_mt.js`, `array_pe.js` |
| **Геометрия / рисование** | `canvas.js`, `circle.js`, `triangle.js`, `project3DTo2D.js` |
| **Прогрессии** | `arithm_progression.js`, `geom_progression.js` |
| **Ядро / движок** | `core_dvig.js`, `core_nabor.js`, `core_vopr.js` |
| **UI** | `func_ui.js`, `func_jquery.js`, `menu.js`, `style.js`, `decorations.js` |
| **Склонения / язык** | `sklon.js`, `lx.js`, `lxchisl.js`, `lxnar.js`, `lxskl.js`, `lxsoch.js` |
| **Загрузка** | `load.js`, `load-chas-lib.js`, `cache.js`, `head.js`, `init.js` |
| **Интеграция** | `autointegr.js`, `quickintegr.js`, `browser.js` |
| **Прочее** | `string.js`, `regexp.js`, `urljson.js`, `umka.js`, `osnmas.js`, `dvig_fn.js`, `dvig_rz.js`, `func_assert.js`, `func_spec_inf.js`, `func_spec_matrix.js` |

Порядок конкатенации задаётся в `load.js` и `load-chas-lib.js` → на выходе `chas-uijs.js` и `chas-lib.js`.

---

## `sh/` — оболочки (shells)

Почти каждая оболочка = пара `*.html` + `*.js`:

| Оболочка | Назначение |
|---|---|
| `katalog` | Каталог заданий (основной интерфейс) |
| `otladka` | Отладка конкретной задачи |
| `mini` | Мини-интеграция (встраивание на внешние сайты) |
| `polnmat` / `poln.js` | Полный вариант |
| `pechmat` | Печать варианта |
| `sluch` / `sluchmat` | Случайный вариант |
| `formula` | Просмотр формул |
| `timetest` | Тест скорости |
| `dvig_lz.js` | Движок в оболочке отладки + генератор шаблонов |
| `chas-ege_to_reshuege.js` | Экспорт в формат РешуЕГЭ |

---

## `src/` — ядро

```
src/
├── chas2/       ← core.js, task.js, test.js, compat.js  (движок задач)
├── chaslib/     ← библиотеки ядра
└── util/        ← pak.js (упаковка заданий в upak.js при сборке)
```

---

## `dev/` — dev-инструменты

- `scripts/` — вспомогательные скрипты (fast_set и др.)
- `parser/` — скрипты, которые очень помогают с лексическим модулем
- `txtdocs/` — текстовая документация (vocabulary.txt, random.txt)
- `node-unit-tests.js`, `run-node-tests.js` — node-тесты
- `nabor-override-*.js` — переопределения наборов для отладки
- `zdn_ustar/` — устаревшие задачи

---

Промежуточные файлы сборки → `build/`, итог сборки → `dist/`.
Они в `.gitignore`, в репозитории их нет.

---

## Конвенции в коммитах / PR

| Префикс | Значение |
|---|---|
| `[zdn][new] <номер>` | Новая задача |
| `[zdn][fix]` | Исправление задачи |
| `[zdn][up]` | Обновление / расширение вариантов |
| `[zdn][ref]` | Рефакторинг задачи |
| `[zdn][main]` | Изменение main.js (частоты, номера) |
| `[zdn][sym]` | Симлинки |
| `[lib]` | Библиотеки |
| `[sh]` | Оболочки |
| `[css]` | Стили |
| `[ext]` | Внешние зависимости |
| `[CI]` | GitHub Actions |
| `[doc]` | Документация |
| `[script]` | Скрипты |
| `[code style]` | Косметика |
| `[core]` | Ядро |

---

## CI

`.github/workflows/ci.yml` — Node.js **22.12.0**, прогоняет сборку + тесты.

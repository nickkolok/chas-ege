# Хранение credentials для ассистентов

## Обзор

Скрипты автоматизации (ask_Marta_to_review.sh, ask_Polina_to_fix.sh, ask_Selena_to_fix.sh) используют новый обработчик `qwen-chat-auto.js`, который поддерживает автоматическую авторизацию в chat.qwen.ai.

## Способы передачи credentials

### 1. Файлы credentials (рекомендуется)

Для каждого профиля Chrome создаётся файл `credentials.json` в папке профиля.

Структура:
  ../chas-ege-chromium-profiles/
    marta-auto/
      credentials.json
      [другие файлы профиля Chrome]
    marta-auto-2/
      credentials.json
      [другие файлы профиля Chrome]
    polina-fix-auto/
      credentials.json
      [другие файлы профиля Chrome]
    selena-fix-auto/
      credentials.json
      [другие файлы профиля Chrome]

Формат файла credentials.json:

{
  "login": "user@example.com",
  "password": "secret-password",
  "created": "2026-10-31T12:00:00+03:00",
  "updated": "2026-10-31T12:00:00+03:00"
}

Безопасность:
- Файл должен иметь права доступа 600 (только владелец может читать/писать)
- Скрипты читают пароль из файла и передают его через stdin (флаг --password-stdin)
- Пароль НЕ попадает в историю команд shell и в аргументы процесса

### 2. Переменные окружения

Для быстрого тестирования можно использовать переменные окружения:

export QWEN_LOGIN="user@example.com"
export QWEN_PASSWORD="secret-password"
./ask_Marta_to_review.sh 123

Внимание: этот способ менее безопасен, так как переменные окружения могут быть видны другим процессам.

### 3. Без credentials (использование существующей сессии)

Если файл credentials.json отсутствует, скрипт полагается на существующую сессию в профиле Chrome. Это работает, если:
- Профиль уже залогинен в chat.qwen.ai
- Сессия не истекла

## Управление credentials

Для управления файлами credentials используйте скрипт manage-credentials.sh:

### Создание credentials

./manage-credentials.sh create marta-auto user@example.com secret-password

### Обновление credentials

./manage-credentials.sh update marta-auto newuser@example.com new-password

### Просмотр credentials

./manage-credentials.sh show marta-auto

### Удаление credentials

./manage-credentials.sh delete marta-auto

### Список всех профилей

./manage-credentials.sh list

## Безопасность

1. Никогда не коммитьте файлы credentials.json в git!
   - Добавьте credentials.json в .gitignore
   - Или добавьте всю папку профилей: ../chas-ege-chromium-profiles/

2. Используйте stdin для передачи паролей
   - Флаг --password-stdin гарантирует, что пароль не попадёт в ps aux или историю команд

3. Ограничьте права доступа
   chmod 600 ../chas-ege-chromium-profiles/*/credentials.json

4. Используйте отдельные учётные записи
   - Для каждого ассистента создайте отдельную учётку в chat.qwen.ai
   - Это позволяет легко отозвать доступ при необходимости

## Пример .gitignore

# Credentials и профили браузеров
../chas-ege-chromium-profiles/
*.credentials.json

## Важные флаги qwen-chat-auto.js

### Обязательные флаги
- --user-data-dir <dir> - путь к профилю Chrome (persistent context)
- --text <строка> или --text-file <путь> - текст сообщения

### Авторизация (нужна только если профиль не залогинен)
- --login <email> - либо переменная окружения $QWEN_LOGIN
- --password <secret> - либо переменная окружения $QWEN_PASSWORD (светится в истории shell!)
- --password-stdin - прочитать пароль из stdin (самый безопасный вариант)

### Режимы работы
- --headless - без окна (по умолчанию с окном)
- --agent - переключиться в Agent Mode
- --new-chat - начать новый чат перед вводом текста
- --dry-run - ввести текст, но НЕ отправлять
- --capture-response - после отправки вытащить текст ответа в лог
- --keep-open - не закрывать браузер после завершения

### Браузер
- --executable-path <path> - явный путь к Chrome/Chromium
- --channel <chrome|...> - канал puppeteer
- --window-size <W,H> - размер окна (default 1440,900)

**Важно:** Флаг --no-sandbox НЕ поддерживается как отдельный аргумент. Он автоматически добавляется при запуске от root (UID 0).

### Тайминги
- --nav-timeout <ms> - default 60000
- --login-timeout <ms> - default 180000 (включая ручное решение капчи)
- --element-timeout <ms> - default 15000
- --settle-delay <ms> - пауза "на успокоение" SPA, default 1200
- --type-delay <ms> - средняя задержка между символами, default 18
- --step-delay <ms> - пауза между шагами, default 400
- --post-wait <sec> - сколько ждать после отправки, default 30
- --capture-timeout <ms> - default 45000

### Диагностика
- --screenshots-dir <dir> - default ./screenshots
- --no-screenshots - не делать скриншоты этапов
- --no-on-error-dump - не делать дамп (png+html) при ошибке
- --log-level <debug|info|warn|error>
- --log-file <path> - дублировать лог в файл
- --verbose-logs - писать console-сообщения страницы в лог

## Логирование пути к профилю

Скрипт всегда выводит путь к профилю Chrome в логах:

### При запуске
В самом начале работы скрипт логирует путь к профилю на уровне INFO:

[2026-11-03 12:15:00.123] [INFO ] === qwen-chat-auto ===
[2026-11-03 12:15:00.124] [INFO ] путь к профилю: /root/git/chas-ege-chromium-profiles/marta-auto

Это помогает быстро определить, где находятся credentials.json и другие файлы профиля.

### В диагностических дампах
При любой ошибке диагностический дамп (FAIL-*.json) содержит поле userDataDir с путём к профилю:

{
  "name": "exit-3",
  "at": "2026-11-03T12:15:30.456Z",
  "userDataDir": "/root/git/chas-ege-chromium-profiles/marta-auto",
  "url": "https://chat.qwen.ai/",
  ...
}

### В сообщениях об ошибках
При ошибке "профиль не залогинен" (exit code 3) сообщение об ошибке явно указывает путь к профилю:

[ERROR] Профиль НЕ залогинен на chat.qwen.ai, а учетные данные не переданы.
       Путь к профилю: /root/git/chas-ege-chromium-profiles/marta-auto
       Нужны --login и --password (или переменные окружения $QWEN_LOGIN/$QWEN_PASSWORD,
       или --password-stdin). Без них скрипт не может авторизоваться - выхожу.
       Альтернатива: залогиньтесь в этом профиле руками один раз, дальше сессия будет жить в --user-data-dir.

Это позволяет сразу перейти в нужную папку и создать/обновить credentials.json.

## Коды выхода

- 0 - успех
- 2 - ошибки аргументов
- 3 - не залогинен и нет credentials (в сообщении указан путь к профилю!)
- 4 - логин не удался
- 5 - Agent Mode недоступен
- 6 - не найдено поле ввода
- 7 - капча (нет окна для решения)
- 8 - не удалось отправить
- 9 - не запустился браузер
- 1 - прочее

## Troubleshooting

### Скрипт не может авторизоваться (exit code 3)

1. Посмотрите в логах путь к профилю:
   [INFO ] путь к профилю: /root/git/chas-ege-chromium-profiles/marta-auto

2. Проверьте, что файл credentials.json существует:
   ls -la /root/git/chas-ege-chromium-profiles/marta-auto/credentials.json

3. Проверьте формат JSON:
   jq . /root/git/chas-ege-chromium-profiles/marta-auto/credentials.json

4. Проверьте права доступа:
   stat -c %a /root/git/chas-ege-chromium-profiles/marta-auto/credentials.json
   # Должно быть 600

5. Если файла нет, создайте его:
   ./manage-credentials.sh create marta-auto user@example.com secret-password

6. Проверьте логи скрипта для деталей ошибки

### Ошибка: Unknown option '--no-sandbox'

Этот флаг НЕ поддерживается как отдельный аргумент qwen-chat-auto.js. Он автоматически добавляется при запуске от root (UID 0). Уберите --no-sandbox из ваших bash-скриптов.

### Сессия истекла

Если профиль уже залогинен, но скрипт всё равно пытается авторизоваться:
1. Откройте профиль вручную в браузере
2. Залогиньтесь заново
3. Закройте браузер
4. Запустите скрипт снова

Или создайте/обновите файл credentials.json для автоматической авторизации.

### Капча Aliyun Baxia

При обнаружении капчи в headless-режиме скрипт выходит с кодом 7. Варианты решения:
1. Запустить без --headless и решить капчу руками (скрипт ждёт --login-timeout)
2. Использовать уже "прогретый" профиль с активной сессией

## Пример использования

Создать credentials для Martы:
./manage-credentials.sh create marta-auto marta@example.com secret123

Запустить ревью PR #456:
./ask_Marta_to_review.sh 456

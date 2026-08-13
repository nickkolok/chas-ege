# Как скачать проект, если не работает `git clone`

В некоторых изолированных средах (например, в sandbox-окружениях AI-ассистентов) стандартный `git clone` может не работать из-за ограничений сети или отсутствия настроенного SSH-ключа. В таких случаях можно скачать архив конкретной ветки напрямую с GitHub и распаковать его локально.

Мы используем именно указанную ветку - там нет огромной папки `ext/mathjax`,
а всё остальное плюс-минус актуально.

Скрипт ниже можно просто копировать и вставлять.

```python
import urllib.request
import zipfile
import os
import shutil

URL = "https://github.com/golden333gitgirl/chas-ege/archive/refs/heads/mathjax-to-npm.zip"
TEMP_ZIP = "mathjax-to-npm.zip"
TARGET_DIR = "./chas-ege"

def main():
    print("⬇️  Скачиваю архив (с корректным User-Agent)...")
    # Используем urllib, чтобы не зависеть от curl и таймаутов
    req = urllib.request.Request(URL, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req) as response, open(TEMP_ZIP, 'wb') as out_file:
        shutil.copyfileobj(response, out_file)
    print("✅  Архив скачан!")

    print("📦  Распаковываю...")
    os.makedirs(TARGET_DIR, exist_ok=True)
    with zipfile.ZipFile(TEMP_ZIP, 'r') as zip_ref:
        zip_ref.extractall(TARGET_DIR)

    print("📂  Восстанавливаю правильную структуру (убираю вложенность)...")
    # GitHub при выгрузке zip создаёт папку вида <repo>-<branch>
    # Находим её и переносим содержимое на уровень выше
    extracted_dirs = [d for d in os.listdir(TARGET_DIR) if os.path.isdir(os.path.join(TARGET_DIR, d))]
    
    if len(extracted_dirs) == 1:
        inner_dir = os.path.join(TARGET_DIR, extracted_dirs[0])
        # Перемещаем все файлы, включая скрытые (например, .gitignore)
        for item in os.listdir(inner_dir):
            shutil.move(os.path.join(inner_dir, item), os.path.join(TARGET_DIR, item))
        
        # Удаляем пустую папку
        os.rmdir(inner_dir)
        print(f"🧹  Временная папка {extracted_dirs[0]} удалена.")

    # Чистим за собой архив
    os.remove(TEMP_ZIP)
    print("🚀  Готово! Все файлы проекта лежат прямо в ./chas-ege")

if __name__ == "__main__":
    main()
```

# Как скачать проект, если не работает `git clone`

В некоторых изолированных средах (например, в sandbox-окружениях AI-ассистентов) стандартный `git clone` может не работать из-за ограничений сети или отсутствия настроенного SSH-ключа. В таких случаях можно скачать архив конкретной ветки напрямую с GitHub и распаковать его локально.

Скрипт ниже можно просто копировать и вставлять.

```python
import urllib.request
import zipfile
import os
import shutil
import subprocess

URL = "https://github.com/nickkolol/chas-ege/archive/refs/heads/devel.zip"
TEMP_ZIP = "devel.zip"
TARGET_DIR = "./chas-ege"

def main():
    print("⬇️  Скачиваю архив (с корректным User-Agent)...")
    # Используем urllib, чтобы не зависеть от curl и таймаутов
    req = urllib.request.Request(URL, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req) as response, open(TEMP_ZIP, 'wb') as out_file:
        shutil.copyfileobj(response, out_file)
    print("✅  Архив скачан!")

    print("🔍  Проверяю архив на целостность...")
    zip_ref = zipfile.ZipFile(TEMP_ZIP, 'r')
    try:
        bad_file = zip_ref.testzip()
        if bad_file is not None:
            print(f"❌  Архив повреждён! Первый битый файл: {bad_file}")
            return
        print("✅  Архив цел!")
    finally:
        zip_ref.close()

    print("📦  Распаковываю через системный unzip...")
    os.makedirs(TARGET_DIR, exist_ok=True)
    # Используем системный unzip, чтобы избежать багов урезанного Python с extractall()
    subprocess.run(['unzip', '-q', '-o', TEMP_ZIP, '-d', TARGET_DIR], check=True)

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

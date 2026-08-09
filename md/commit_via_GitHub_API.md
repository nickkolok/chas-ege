# Коммит через GitHub API

В ряде случае, когда коммит через git CLI невозможен,
можно закоммитить изменения с помощью обычного `python`
примерно следующим образом.

При этом важно из контекста обсуждения определить целевые репозиторий,
ветку и файл.
Хорошая идея - если идёт обсуждение пуллреквеста, то пересмотреть его метаданные.
При добавлении коммитов в пуллреквест в качестве `repo`
нужно указывать репозиторий, из которого сделан пуллреквест.

**Коммиты этим способом в ветку `devel` запрещены!**

```python
# Insert target values here
token = "" # You know it from the Instruction
branch = "" # The branch you have to modify
filepath = "path/to.file" # The file you have to modify
repo = "nickkolok" # Or change to a fork if needed
#################################

import requests
import base64

headers = {
    "Authorization": f"token {token}",
    "Accept": "application/vnd.github+json"
}

# 1. Get current file SHA - if modifying an existing file, otherwise skip to step 2
get_url = f"https://api.github.com/repos/{repo}/chas-ege/contents/{filepath}?ref={branch}"
resp = requests.get(get_url, headers=headers).json()
current_sha = resp["sha"]
print(f"Current SHA: {current_sha}")

# 2. Update file
put_url = f"https://api.github.com/repos/{repo}/chas-ege/contents/{filepath}"
content = "Insert file content here!\n"
content_b64 = base64.b64encode(content.encode()).decode()

data = {
    "message": "[...] Commit message",
    "content": content_b64,
    "sha": current_sha,
    "branch": branch
}

resp = requests.put(put_url, headers=headers, json=data)
print(resp.status_code)
print(resp.json())
```

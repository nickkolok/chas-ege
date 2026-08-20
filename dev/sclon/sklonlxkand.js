const { exec } = require('child_process');
const readline = require('readline');
const fs = require('fs');

// Создаем интерфейс для чтения ввода из консоли
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Функция для вызова Python скрипта
function sklonlxkand(slovo) {
    return new Promise((resolve, reject) => {
        exec(`python sklonlxkand.py "${slovo}"`, (error, stdout, stderr) => {
            if (error) {
                reject(`Ошибка: ${error.message}`);
                return;
            }
            if (stderr) {
                reject(`stderr: ${stderr}`);
                return;
            }
            try {
                const result = JSON.parse(stdout);
                resolve(result);
            } catch (e) {
                reject('Ошибка при разборе результата: ' + e.message);
            }
        });
    });
}

function parseLxFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const regex = /lx\['([^']+)'\]\s*=\s*({[^}]+});/g;
    const entries = [];
    
    let match;
    while ((match = regex.exec(content)) !== null) {
        const word = match[1];
        let objStr = match[2].replace(/'/g, '"');
        
        // При необходимости добавьте пропущенные кавычки вокруг названий свойств
        objStr = objStr.replace(/(\w+):/g, '"$1":');
        
        try {
            const obj = JSON.parse(objStr);
            entries.push({ word, obj });
        } catch (e) {
            console.error(`Ошибка при разборе объекта для слова "${word}":`, e.message);
            continue;
        }
    }
    
    return entries;
}

function writeToFile(slovo, data) {
    const filePath = 'lx.js';
    const existingEntries = parseLxFile(filePath);
    const existingEntry = existingEntries.find(entry => entry.word === slovo);

    if (existingEntry) {
        console.log(`Слово "${slovo}" уже существует в файле lx.js.`);
        
        // Сравниваем объекты
        const existingObj = existingEntry.obj;
        const newEntries = Object.entries(data).sort();
        const existingEntries = Object.entries(existingObj).sort();
        
        if (JSON.stringify(newEntries) === JSON.stringify(existingEntries)) {
            console.log('Объекты совпадают. Нет необходимости обновлять.');
            return;
        } else {
            console.log('Объекты не совпадают:');
            console.log('Существующий объект:');
            console.log(JSON.stringify(existingObj, null, 2));
            console.log('Новый объект:');
            console.log(JSON.stringify(data, null, 2));
            
            rl.question('Хотите заменить существующий объект? (y/n): ', (answer) => {
                if (answer.toLowerCase() === 'y') {
                    // Обновляем объект
                    const fileContent = fs.readFileSync(filePath, 'utf8');
                    const updatedContent = fileContent.replace(
                        new RegExp(`lx\\['${slovo}'\\][^;]+;`, 'g'),
                        `lx['${slovo}']=${JSON.stringify(data, null, 2).replace(/"/g, "'")};`
                    );
                    fs.writeFileSync(filePath, updatedContent, 'utf8');
                    console.log('Объект обновлен.');
                }
                askForWord();
            });
            return;
        }
    }

    // Сортируем существующие записи
    const sortedEntries = [...entries].sort((a, b) => a.word.localeCompare(b.word));
    
    // Находим позицию для вставки нового слова
    const insertIndex = sortedEntries.findIndex(entry => 
        slovo.localeCompare(entry.word) < 0
    );
    
    // Формируем новую запись
    const newEntry = `lx['${slovo}']={\n` +
        Object.entries(data)
            .map(([key, value]) => `  ${key}:${JSON.stringify(value).replaceAll('"', "'")}`)
            .join(',\n') +
        '\n};\n';

    // Читаем текущее содержимое файла
    let fileContent = fs.readFileSync(filePath, 'utf8');
    
    // Если позиция для вставки найдена, вставляем перед найденной записью
    if (insertIndex > -1) {
        const targetWord = sortedEntries[insertIndex].word;
        const targetRegex = new RegExp(`lx\\['${targetWord}'\\][^;]+;`, 'g');
        fileContent = fileContent.replace(targetRegex, newEntry + `lx['${targetWord}']=${JSON.stringify(sortedEntries[insertIndex].obj, null, 2).replace(/"/g, "'")};`);
    } else {
        // Иначе добавляем в конец файла
        fileContent += newEntry;
    }

    fs.writeFileSync(filePath, fileContent, 'utf8');
    console.log(`Данные для слова "${slovo}" записаны в файл lx.js`);
}

// Функция для запроса слова у пользователя
function askForWord() {
    rl.question('Введите слово для обработки (или "exit" для выхода): ', async (slovo) => {
        if (slovo.toLowerCase() === 'exit') {
            rl.close(); // Закрываем интерфейс и завершаем программу
            return;
        }

        try {
            // Вызываем функцию sklonlxkand и получаем результат
            const result = await sklonlxkand(slovo);
            console.log('Результат:', result);

            // Записываем результат в файл lx.js
            writeToFile(slovo, result);
        } catch (error) {
            console.error(error);
        }

        // Повторяем запрос
        askForWord();
    });
}

// Запускаем процесс
askForWord();

// Обработка закрытия интерфейса
rl.on('close', () => {
    console.log('Программа завершена.');
    process.exit(0);
});

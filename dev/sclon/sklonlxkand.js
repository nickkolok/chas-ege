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

// Функция для записи данных в файл lx.js
function writeToFile(slovo, data) {
    const filePath = 'lx.js';

    // Читаем текущее содержимое файла
    let fileContent = '';
    if (fs.existsSync(filePath)) {
        fileContent = fs.readFileSync(filePath, 'utf8');
    }

    // Проверяем, есть ли уже запись для данного слова
    const regex = new RegExp(`${slovo}`, 'g');
    if (regex.test(fileContent)) {
        console.log(`Слово "${slovo}" уже существует в файле lx.js.`);
        return; // Выходим из функции, если слово уже есть
    }

    // Формируем новую запись
    const newEntry = `\nlx['${slovo}']={\n` +
        Object.entries(data)
            .map(([key, value]) => `  ${key}:${JSON.stringify(value)}`)
            .join(',\n') +
        '\n};\n';

    // Добавляем новую запись в файл
    fs.writeFileSync(filePath, fileContent + newEntry, 'utf8');
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

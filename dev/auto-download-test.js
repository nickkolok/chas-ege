/*
 * Скрипт для автоматического запуска генерации и скачивания архива.
 * 
 * Пример запуска:
 * node dev/auto-download-test.js '{"preloadFiles":["../../zdn/2027/nabor/00_nabor-override-common.js"],"autostart":true}'
 * 
 * Если параметр не передан, будут использованы параметры по умолчанию.
 */

const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

(async () => {
    // Получаем JSON-строку из аргументов командной строки
    const args = process.argv.slice(2);
    
    let params;
    if (args.length > 0) {
        try {
            params = JSON.parse(args[0]);
            console.log('Используются параметры из аргументов:', params);
        } catch (e) {
            console.error('❌ Ошибка парсинга JSON:', e.message);
            console.log('Используются параметры по умолчанию.');
            params = {
                preloadFiles: ["../../zdn/2027/nabor/00_nabor-override-common.js"],
                autostart: true
            };
        }
    } else {
        params = {
            preloadFiles: ["../../zdn/2027/nabor/00_nabor-override-common.js"],
            autostart: true
        };
        console.log('Параметры не переданы, используются по умолчанию.');
    }

    const downloadsDir = path.resolve(__dirname, '..', 'downloads');
    if (!fs.existsSync(downloadsDir)) fs.mkdirSync(downloadsDir);

    const projectRoot = path.resolve(__dirname, '..');
    const htmlPath = path.join(projectRoot, 'dist/sh/pechmat.html');
    
    const url = `file://${htmlPath}#${encodeURIComponent(JSON.stringify(params))}`;

    console.log('Открываю:', url);

    const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--allow-file-access-from-files']
    });

    const page = await browser.newPage();
    
    // Автоматически закрываем все всплывающие окна (alert, confirm, prompt)
    page.on('dialog', async dialog => {
        console.log('🌐 Dialog:', dialog.message());
        await dialog.accept();
    });

    page.on('console', msg => console.log('🌐 Browser:', msg.text()));
    page.on('pageerror', error => console.error('❌ Page error:', error.message));
    
    const client = await page.createCDPSession();
    await client.send('Page.setDownloadBehavior', {
        behavior: 'allow',
        downloadPath: downloadsDir
    });

    try {
        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 120000 });
        console.log('HTML загружен, скрипты работают. Жду генерацию задач...');
    } catch (e) {
        console.log('⚠️ goto завершился с ошибкой, но пробуем ждать файл:', e.message);
    }

    // Ждём появления .zip файла (максимум 3 минуты)
    const zipFile = await new Promise((resolve) => {
        const interval = setInterval(() => {
            if (!fs.existsSync(downloadsDir)) return;
            const files = fs.readdirSync(downloadsDir);
            const zip = files.find(f => 
                f.endsWith('.zip') && 
                !files.includes(f + '.crdownload')
            );
            if (zip) {
                clearInterval(interval);
                resolve(zip);
            }
        }, 2000);
        
        setTimeout(() => {
            clearInterval(interval);
            resolve(null);
        }, 180000);
    });

    if (zipFile) {
        console.log('✅ Файл успешно скачан:', zipFile);
    } else {
        console.error('❌ Таймаут: файл не скачался за 3 минуты');
        if (fs.existsSync(downloadsDir)) {
            console.log('Файлы в папке downloads:', fs.readdirSync(downloadsDir));
        }
    }

    await browser.close();
})();

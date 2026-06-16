'use strict';

const { JSDOM, VirtualConsole } = require('jsdom');

// 1. Настраиваем консоль JSDOM
const virtualConsole = new VirtualConsole();
virtualConsole.on('log', console.log);
virtualConsole.on('warn', console.warn);
virtualConsole.on('error', console.error);

// Фильтр для игнорирования предупреждений "Not implemented" (например, scrollTo)
virtualConsole.on('jsdomError', e => {
    if (e.message && e.message.includes('Not implemented')) {
        return; // Тихо игнорируем
    }
    if (e.type === 'not implemented') {
        return;
 // Тихо игнорируем
    }
    console.error('JSDOM Error:', e);
});

const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>', {
    url: "http://localhost/",
    virtualConsole: virtualConsole
});

function setGlobal(key, value) {
    try {
        global[key] = value;
    } catch (e) {
        Object.defineProperty(global, key, {
            value: value,
            writable: true,
            configurable: true,
            enumerable: true
        });
    }
}

setGlobal('window', dom.window);
setGlobal('document', dom.window.document);
setGlobal('navigator', dom.window.navigator);
setGlobal('HTMLElement', dom.window.HTMLElement);
setGlobal('getComputedStyle', dom.window.getComputedStyle);
setGlobal('HTMLCanvasElement', dom.window.HTMLCanvasElement);
setGlobal('CanvasRenderingContext2D', { prototype: {} });

for (let key in dom.window) {
    if (typeof global[key] === 'undefined') {
        try { global[key] = dom.window[key]; } catch (e) {}
    }
}

console.log('✅ Окружение настроено. Загружаем chas-lib.js...');

try {
    require('../build/lib/chas-lib.js');
    console.log('✅ chas-lib.js успешно загружен.');
} catch (err) {
    console.error('❌ ОШИБКА при загрузке chas-lib.js:', err.message);
    console.error('💡 Убедитесь, что вы запустили `grunt` перед тестами.');
    process.exit(1);
}

// 2. Подключаем QUnit
const QUnit = require('qunit');

// КЛЮЧЕВОЙ МОМЕНТ: Отключаем автоматический запуск, чтобы тесты успели зарегистрироваться
QUnit.config.autostart = false;

console.log('📝 Регистрация тестов...');

QUnit.module('Node.js Unit Tests');

QUnit.test('Базовые расширения (iz, sl)', function(assert) {
    assert.ok(typeof [1,2,3].iz === 'function', "Метод iz() доступен");
    assert.ok(typeof sl === 'function', "Функция sl() доступна");
});

/*
QUnit.test('Triangle', function(assert) {
    assert.ok(typeof Triangle !== 'undefined', "Triangle определён в глобальной области");
    if (typeof Triangle !== 'undefined') {
        let t = new Triangle(3, 4, 5);
        assert.ok(t, "Экземпляр Triangle(3,4,5) успешно создан");
    }
});
*/

// 3. Вешаем обработчик завершения ДО вызова start()
// Метод .done() является самым стабильным API в QUnit для Node.js
QUnit.done(function(details) {
    console.log('\n--- Итоговый отчёт QUnit ---');
    console.log(`Всего тестов: ${details.total}, Прошло: ${details.passed}, Упало: ${details.failed}`);

    if (details.total === 0) {
        console.error('⚠️ КРИТИЧЕСКАЯ ОШИБКА: QUnit не выполнил ни одного теста.');
        process.exit(1);
    }

    if (details.failed > 0) {
        console.error(`\n❌ ${details.failed} из ${details.total} тестов провалено.`);
        process.exit(1);
    } else {
        console.log(`\n✅ Все ${details.passed} тестов успешно пройдены!`);
        process.exit(0);
    }
});

console.log('🚀 Явный запуск QUnit...');

// 4. Запускаем тесты вручную
QUnit.start();

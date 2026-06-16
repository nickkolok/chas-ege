'use strict';

const { JSDOM, VirtualConsole } = require('jsdom');

// 1. Настраиваем консоль JSDOM
const virtualConsole = new VirtualConsole();
virtualConsole.on('log', console.log);
virtualConsole.on('warn', console.warn);
virtualConsole.on('error', console.error);

// Фильтр для игнорирования предупреждений "Not implemented"
virtualConsole.on('jsdomError', e => {
    if (e.message && e.message.includes('Not implemented')) {
        return;
    }
    if (e.type === 'not implemented') {
        return;
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

// Базовое браузерное окружение
setGlobal('window', dom.window);
setGlobal('self', dom.window); // Многие UMD-бандлы проверяют self вместо window
setGlobal('document', dom.window.document);
setGlobal('navigator', dom.window.navigator);
setGlobal('HTMLElement', dom.window.HTMLElement);
setGlobal('getComputedStyle', dom.window.getComputedStyle);
setGlobal('HTMLCanvasElement', dom.window.HTMLCanvasElement);
setGlobal('CanvasRenderingContext2D', { prototype: {} });

console.log('✅ Окружение настроено. Загружаем библиотеки...');

// =====================================================================
// 2. ЗАГРУЗКА В ПРАВИЛЬНОМ ПОРЯДКЕ
// =====================================================================

// 2.1. Сначала внешние зависимости, которые объявляют глобальные классы
try {
    require('../node_modules/flatten-shape-geometry/dist/bundle.js');
    console.log('  ↳ flatten-shape-geometry загружен');
} catch (err) {
    console.error('❌ ОШИБКА при загрузке flatten-shape-geometry:', err.message);
    process.exit(1);
}

// 2.2. Пробрасываем появившиеся в window классы в глобальную область Node.js
if (dom.window.Triangle) {
    global.Triangle = dom.window.Triangle;
    console.log('  ↳ Triangle проброшен в global');
}
// Если там есть ещё классы (Point, Vector и т.д.), их тоже можно пробросить так же:
// if (dom.window.Point) global.Point = dom.window.Point;

// 2.3. Теперь загружаем основную библиотеку, которая зависит от Triangle
try {
    require('../build/lib/chas-lib.js');
    console.log('  ↳ chas-lib.js загружен');
} catch (err) {
    console.error('❌ ОШИБКА при загрузке chas-lib.js:', err.message);
    console.error('💡 Убедитесь, что вы запустили `grunt` перед тестами.');
    process.exit(1);
}

// Проверка
if (typeof Triangle === 'undefined') {
    console.warn('⚠️ ВНИМАНИЕ: Triangle всё ещё не найден в global!');
} else {
    console.log('  ↳ Глобальный Triangle успешно доступен!');
}

// =====================================================================
// 3. QUnit SETUP
// =====================================================================
const QUnit = require('qunit');
QUnit.config.autostart = false;

console.log('📝 Регистрация тестов...');

QUnit.module('Node.js Unit Tests');

QUnit.test('Базовые расширения (iz, sl)', function (assert) {
    assert.ok(typeof [1, 2, 3].iz === 'function', "Метод iz() доступен");
    assert.ok(typeof sl === 'function', "Функция sl() доступна");
});

QUnit.test('Triangle', function (assert) {
    assert.ok(typeof Triangle !== 'undefined', "Triangle определён в глобальной области");
    if (typeof Triangle !== 'undefined') {
        let t = new Triangle(3, 4, 5);
        assert.ok(t, "Экземпляр Triangle(3,4,5) успешно создан");
    }
});


try {
    const registerNodeTests = require('./node-unit-tests.js');
    registerNodeTests(QUnit);
    console.log('✅ Дополнительные тесты (node-unit-tests.js) подключены.');
} catch (err) {
    console.error('⚠️  Не удалось загрузить node-unit-tests.js:', err.message);
}

QUnit.testDone(function (details) {
    if (details.failed > 0) {
        console.error(`\n❌ Провален тест: "${details.name}"`);
        if (details.module) {
            console.error(`   Модуль: ${details.module}`);
        }
        details.assertions.forEach(function (assertion) {
            if (!assertion.result) {
                console.error(`   ↳ ${assertion.message || 'Ошибка утверждения (без сообщения)'}`);
                if (assertion.expected !== undefined) {
                    console.error(`     Ожидалось: ${JSON.stringify(assertion.expected)}`);
                }
                console.error(`     Получено:  ${JSON.stringify(assertion.actual)}`);
            }
        });
    }
});

QUnit.done(function (details) {
    console.log('\n--- Итоговый отчёт QUnit ---');
    console.log(`Всего тестов: ${details.total}, Прошло: ${details.passed}, Упало: ${details.failed}`);

    if (details.total === 0) {
        console.error('⚠️  КРИТИЧЕСКАЯ ОШИБКА: QUnit не выполнил ни одного теста.');
        process.exit(1);
    }

    if (details.failed > 0) {
        console.error(`\n❌ ИТОГ: ${details.failed} из ${details.total} тестов провалено.`);
        process.exit(1);
    } else {
        console.log(`\n✅ ИТОГ: Все ${details.passed} тестов успешно пройдены!`);
        process.exit(0);
    }
});

console.log('🚀 Явный запуск QUnit...');
QUnit.start();

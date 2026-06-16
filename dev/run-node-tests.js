'use strict';

const { JSDOM } = require('jsdom');
const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>', {
    url: "http://localhost/"
});

// Универсальная функция для безопасного проброса свойств в global
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

// Пробрасываем браузерное окружение
setGlobal('window', dom.window);
setGlobal('document', dom.window.document);
setGlobal('navigator', dom.window.navigator);
setGlobal('HTMLElement', dom.window.HTMLElement);
setGlobal('getComputedStyle', dom.window.getComputedStyle);
setGlobal('HTMLCanvasElement', dom.window.HTMLCanvasElement);
setGlobal('CanvasRenderingContext2D', { prototype: {} });

// Копируем остальные свойства window в global (эмуляция браузерного скоупа)
for (let key in dom.window) {
    if (typeof global[key] === 'undefined') {
        try {
            global[key] = dom.window[key];
        } catch (e) {
            // пропускаем read-only свойства, которые не удалось перезаписать
        }
    }
}

// Подключаем собранные библиотеки
require('../build/lib/chas-lib.js');

// Если Triangle не находится — раскомментируйте и укажите нужный файл:
// require('../build/lib/chas-uijs.js');

// QUnit
const QUnit = require('qunit');

QUnit.module('Node.js Unit Tests');

QUnit.test('Базовые расширения (iz, sl)', function(assert) {
    assert.ok(typeof [1,2,3].iz === 'function', "Метод iz() доступен");
    assert.ok(typeof sl === 'function', "Функция sl() доступна");
});

QUnit.test('Triangle', function(assert) {
    assert.ok(typeof Triangle !== 'undefined', "Triangle определён");
    let t = new Triangle(3, 4, 5);
    assert.ok(t, "Triangle(3,4,5) создан");
});

QUnit.on('runEnd', function(data) {
    if (data.failed > 0) {
        console.error(`\n❌ ${data.failed} тестов провалено.`);
        process.exit(1);
    } else {
        console.log(`\n✅ Все ${data.passed} тестов пройдены.`);
        process.exit(0);
    }
});

QUnit.start();

'use strict';
// Покадровый лоадер тестов: сканирует test/ и подключает файлы тестов
// вида test/<Модуль>/<метод>.js. Каждый файл экспортирует функцию регистрации
// module.exports = function(QUnit){ ... } (та же конвенция, что у node-unit-tests*.js).
// Любая ошибка загрузки (в т.ч. синтаксическая) фатальна: прогон падает, а не «ворчит».
const fs = require('fs');
const path = require('path');

const TEST_DIR = __dirname;
const SKIP_FILES = new Set(['run-node-tests.js', 'load-tests.js']);
// old/ — старые браузерные QUnit-тесты, их собирает grunt;
// helpers/ — вспомогательные модули тестов: они не регистрируют тестов, их подключают через require()
const SKIP_DIRS = new Set(['old', 'helpers']);
// Легаси-файлы, которые раннер подключает явно (run-node-tests.js). Список явный:
// новый файл в корне test/, которого раннер не подключил, лоадер подключит сам,
// а не пропустит молча.
const LEGACY_FILES = new Set([
    'node-unit-tests.js',
    'node-unit-tests-math-functions.js',
    'node-unit-tests-seedrandom.js',
    'node-unit-tests-task-correspondence.js',
    'node-unit-tests-task-graph-derivative.js',
]);
// Раннер, лоадер и легаси-файлы пропускаются только в корне test/:
// в test/<Модуль>/ файл с таким именем — обычный тест.
const isRootSkipped = (full) => path.dirname(full) === TEST_DIR &&
    (SKIP_FILES.has(path.basename(full)) || LEGACY_FILES.has(path.basename(full)));

function collect(dir, out) {
    for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, ent.name);
        if (ent.isDirectory()) {
            if (!SKIP_DIRS.has(ent.name)) collect(full, out);
        } else if (ent.isFile() && ent.name.endsWith('.js')) {
            if (!isRootSkipped(full)) out.push(full);
        }
    }
    return out;
}

module.exports = function loadTests(QUnit) {
    const files = collect(TEST_DIR, []).sort();
    const loaded = [];
    for (const full of files) {
        const rel = path.relative(TEST_DIR, full);
        // Уже подключён раннером явным require(): второй раз тесты не регистрируются
        if (require.cache[full]) continue;
        let register;
        try {
            register = require(full);
        } catch (err) {
            console.error('\n❌ Не удалось загрузить тест ' + rel + ':\n' + (err && err.stack || err));
            process.exit(1);
        }
        if (typeof register !== 'function') {
            console.error('\n❌ Тест ' + rel + ' не экспортирует функцию регистрации (module.exports = function(QUnit){…})');
            process.exit(1);
        }
        try {
            register(QUnit);
        } catch (err) {
            console.error('\n❌ Ошибка регистрации тестов из ' + rel + ':\n' + (err && err.stack || err));
            process.exit(1);
        }
        loaded.push(full);
        console.log('  ↳ тест подключён: ' + rel);
    }
    console.log('📂 Покадровых файлов тестов подключено: ' + loaded.length);
    return loaded;
};

'use strict';

function parseNaborFromUrl(url) {
    var naborPart = url.split('#nabor')[1]; // Извлекаем часть строки после '#nabor'
    strNabor = '##nabor' + naborPart; // Формируем строку с префиксом '##nabor'
    if (naborPart === undefined) // Если 'naborPart' не определено, выходим из функции
        return;
    var parameters = naborPart.split('&'); // Разделяем строку на части по символу '&'
    parameters.splice(0, 1); // Удаляем первый элемент, так как он пустой
    parameters.map(function(parameter) {
        var keyValue = parameter.split('='); // Разделяем каждую часть на ключ и значение
        nabor[keyValue[0]] = keyValue[1]; // Записываем в объект 'nabor' значение по ключу
    });
}

function assertCheckability(){
    // Проверяем, можно ли проверять загруженный набор заданий
    if (nabor.notCheckable) {
        alert("Загруженный набор заданий не предназначен для проверки компьютером. " +
              "Рекомендуется переключиться в тест на печать или каталог заданий.", "Предупреждение");
    }
}

var strNabor = ''; // Глобальная переменная для хранения строки набора
var nabor = {}; // Глобальная переменная, отвечающая за выбор предмета

// Инициализация свойств объекта 'nabor'
nabor.title = ''; // Заголовок
nabor.allowMultilineAnswer = 0; // Флаг для многострочных ответов
nabor.importFrom({
    numberOfTasks: 11, // Количество заданий в наборе
    adres: '../zdn/matege2024p/', // Адрес
    name: 'matege2024p', // Имя
    prefix: '', // Префикс
    scheduler: 'main', // Планировщик
    preferences: {}, // Настройки
});
nabor.kat = {
    prz: 'Без производной', // Категория: Без производной
    log: 'Без логарифмов', // Категория: Без логарифмов
    tri: 'Без тригонометрии', // Категория: Без тригонометрии
    drs: 'Без дробных степеней', // Категория: Без дробных степеней
};

nabor.vykl = []; // Массив для выключенных элементов
nabor.altz = []; // Массив для альтернативных заданий

parseNaborFromUrl(document.location.href); // Чтение параметров из URL

console.log('core_nabor.js отработал'); // Сообщение в консоль о завершении работы

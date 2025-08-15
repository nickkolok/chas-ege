console.log('Overriding...');

// По одному заданию каждой категории:
vse1();

// Выставляем экспорт в LaTeX
$('#prepareLaTeX').prop("checked", true);

// Редактируемый текст 
$('#redakt').prop("checked", true);
//Увеличить шрифт 
$('#largeFont').prop("checked", true);
//Не разрывать страницу между вариантами 
$('#nopagebreak').prop("checked", false);
//Компактные таблицы ответов 
$('#compact-answers').prop("checked", true);
//$('#solutions-into-answers').prop("checked", false);
$('#solutions-into-answers').prop("checked", false);
//Разделять таблицы ответов при достижении количества заданий:
$('#splitAnswerTables').prop("checked", true);
// количество заданий
$('#split-answers-number').val(30);
// Не преобразовывать графики в фоновые изображения
$('#nobackground').prop("checked", false);
// Начать нумерацию вариантов с
$('#customNumber').prop("checked", true);
$('#start-number').val(1)
// Префикс варианта
$('#variantPrefix').val('');
// Не указывать данные вариантов
$('#vanishVariants').prop("checked", false);
// Генерировать преимущественно натуральные числа
$('#forceIntegers').prop("checked", false);
// Генерировать ТОЛЬКО целые числа
$('#onlyIntegers').prop("checked", false);
// Требовать уникальных ответов, решений или сигнатур (осторожно, ответов может не хватить!) 
$('#uniqueAnswersAndSolutions').prop("checked", false);
// Только в пределах одного варианта 
$('#uniqueAnswersOnlyInOneVariant').prop("checked", false);
// Сквозная нумерация заданий, начиная с
$('#transitTaskNumbers').prop("checked", false);
$('#start-transit-number').val(1);
// Начинать нумерацию однотипных заданий с 
$('#first-task-number').val(1);
// Возможность выгрузки в LaTeX
$('#prepareLaTeX').prop("checked", true);
// Зерно ГПСЧ
$('#randomSeed').val(Date.now());

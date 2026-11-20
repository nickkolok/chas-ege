'use strict';

/**
 * TeX-запись числового промежутка БЕЗ обрамляющих `$` и без `\left...\right`:
 * просто скобки, концы и разделитель `;`. Обрамление формулой — дело вызывающего
 * (например, autoLaTeXLeft/autoLaTeXRight в setCorrespondenceTask).
 * Концы — числа или готовые строки (например, '\\frac{1}{5}'); функция только
 * склеивает запись и НЕ приводит десятичные к стандарту (`.ts()`) — это забота вызывающего.
 * @param {Number|String} a левый конец
 * @param {Number|String} b правый конец
 * @param {Boolean} closedLeft включён ли левый конец (квадратная скобка)
 * @param {Boolean} closedRight включён ли правый конец (квадратная скобка)
 * @return {String} например '(0;5)', '[-3;4]', '(0;\\frac{1}{5}]'
 */
function texInterval(a, b, closedLeft, closedRight) {
	return (closedLeft ? '[' : '(') + a + ';' + b + (closedRight ? ']' : ')');
}

/**
 * TeX-запись луча: `(boundary;+\\infty)` при greater, иначе `(-\\infty;boundary)`.
 * Бесконечный конец всегда открытый; closed относится к конечной границе.
 * Запись без обрамляющих `$` (см. texInterval).
 * @param {Number|String} boundary конечная граница луча
 * @param {Boolean} greater луч вправо (true) или влево (false)
 * @param {Boolean} closed включена ли конечная граница
 * @return {String} например '(5;+\\infty)', '(-\\infty;0]'
 */
function texHalfline(boundary, greater, closed) {
	return greater ?
		texInterval(boundary, '+\\infty', closed, false) :
		texInterval('-\\infty', boundary, false, closed);
}

/**
 * TeX-запись объединения двух промежутков через `\cup`.
 * Части должны быть без обрамляющих `$` (см. texInterval), иначе объединение
 * разорвёт формулу на две.
 * @param {String} a первая часть
 * @param {String} b вторая часть
 * @return {String} a + '\\cup' + b
 */
function texUnion(a, b) {
	return a + '\\cup' + b;
}

try {
	global.texInterval = module.exports.texInterval = texInterval;
	global.texHalfline = module.exports.texHalfline = texHalfline;
	global.texUnion = module.exports.texUnion = texUnion;
} catch (e) {
}

"use strict";

/** @function Number#round
 * Округление числа
 * @param {Number} dec_places точность округления
 * @return число num округлённое до dp
 */
Number.prototype.round = function(dec_places) {
	var dec_places = dec_places || 1;
	return Math.round(this / dec_places) * dec_places;
};


/** @function Number#is_divied_by
 * Проверка кратности
 * @param {Number} divisor делитель
 * @return Кратно ли числу divisor
 */
Number.prototype.isDividedBy = function(divisor) {
	return this % divisor == 0;
};


/** @function Number#isDivisorOf
 * Проверка на кратность числу
 * @param {Number} num делимое
 * @return Является ли число делителем num
 */
Number.prototype.isDivisorOf = function(num) {
	return num % this == 0;
};


/** @function Number#getDivisors
 * Получение делителей числа
 * @return Массив делителей числа
 */
Number.prototype.getDivisors = function() {
	if (this == 0) {
		return [1];
	}
	var divisors = [];
	for (var d = 1; d <= num; d++) {
		if (this.is_divied_by(d)) {
			divisors.push(d);
		}
	}
	return divisors;
};


/** @function Number#getRandomDivisor
 * Случайные делитель
 * @return Случайный делитель числа num
 */
Number.prototype.getRandomDivisor = function() {
	return this.getDivisors().get_random_item();
};


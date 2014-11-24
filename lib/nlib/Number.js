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
Number.prototype.is_divided_by = function(divisor) {
	return this % divisor == 0;
};


/** @function Number#is_divisor_of
 * Проверка на кратность числу
 * @param {Number} num делимое
 * @return Является ли число делителем num
 */
Number.prototype.is_divisor_of = function(num) {
	return num % this == 0;
};


/** @function Number#get_divisors
 * Получение делителей числа
 * @return Массив делителей числа
 */
Number.prototype.get_divisors = function() {
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


/** @function Number#get_random_divisor
 * Случайные делитель
 * @return Случайный делитель числа num
 */
Number.prototype.get_random_divisor = function() {
	return this.get_divisors().get_random_item();
};


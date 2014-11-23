/** @namespace NApi.util
 * Утилиты
 */
NApi.util = {
	/** @namespace NApi.util._
	 * Функционал, используемый только внутри модуля NApi.util
	 * @private
	 */
	_ : {},


	/** @namespace napi.util.str
	 * Работа со строками
	 */
	str : {

	},


	/** @namespace napi.util.math
	 * Работа с числами
	 */
	math : {
		/** @function NApi.util.math.round
		 * Округление числа
		 * @param {Number} num округляемое число
		 * @param {Number} dec_places точность округления
		 * @return число num округлённое до dp
		 */
		round : function(num, dec_places) {
			var dec_places = dec_places || 1;
			return Math.round(num / dec_places) * dec_places;
		},


		/** @function NApi.util.math.randomize
		 * Генерация случайного числа
		 * @param {Number} min минимальное значение
		 * @param {Number} max минимальное значение
		 * @param {Number} dec_places кол-во знаков после запятой
		 * @return случайное число
		 */
		randomize : function(min, max, dec_places) {
			return NApi.util.math.round(Math.random() * ((max || 9007199254740992) - (min || 0)), (dec_places || 1));
		},


		/** @function NApi.util.math.is_divisor
		 * Проверка кратности
		 * @param {Number} num делимое
		 * @param {Number} divisor делитель
		 * @return Кратно ли число a числу divisor
		 */
		is_divisor : function(num, divisor) {
			return num % divisor == 0;
		},


		/** @function NApi.util.math.get_divisors
		 * Получение делителей числа
		 * @param {Number} num делимое
		 * @return Массив делителей числа num
		 */
		get_divisors : function(num) {
			if (num == 0) {
				return [1];
			}
			var divisors = [];
			for (var d = 1; d <= num; d++) {
				if (NApi.util.math.is_divisor(num, d)) {
					divisors.push(d);
				}
			}
			return divisors;
		},


		/** @function NApi.util.math.is_divisor
		 * Случайные делитель
		 * @param {Number} num делимое
		 * @return Случайный делитель числа num
		 */
		random_divisor : function(num) {
			var divisors = NApi.util.math.get_divisors(num);
			var index = 0;
			if (divisors.length > 1) {
				index = NApi.util.math.randomize(0, divisors.length - 1)
			}
			return divisors[index];
		}
	},
};


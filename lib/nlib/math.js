/** @namespace NLib
 * Утилиты
 */
NLib.math = {
	/** @namespace napi.util.math
	 * Работа с числами
	 */
	math : {
		Vec2 : function(x, y) {
			return { x : x || 0, y : y || 0 };
		},


		Vec3 : function(x, y, z) {
			return { x : x || 0, y : y || 0, z : z || 0 };
		},


		/** @class NLib.math.Triangle
		 * @property {Vec2} a
		 * @property {Vec2} b
		 * @property {Vec2} c
		 * @constructor NLib.math.Triangle
		 */
		Triangle : function(a, b, c) {
			this.a = a || Vec(0, 0);
			this.b = b || Vec(0, 0);
			this.c = c || Vec(0, 0);
		},


		/** @function NLib.math.round
		 * Округление числа
		 * @param {Number} num округляемое число
		 * @param {Number} dec_places точность округления
		 * @return число num округлённое до dp
		 */
		round : function(num, dec_places) {
			var dec_places = dec_places || 1;
			return Math.round(num / dec_places) * dec_places;
		},


		/** @function NLib.math.randomize
		 * Генерация случайного числа
		 * @param {Number} min минимальное значение
		 * @param {Number} max минимальное значение
		 * @param {Number} dec_places кол-во знаков после запятой
		 * @return случайное число
		 */
		randomize : function(min, max, dec_places) {
			return NLib.math.round(Math.random() * ((max || 9007199254740992) - (min || 0)), (dec_places || 1));
		},


		/** @function NLib.math.is_divisor
		 * Проверка кратности
		 * @param {Number} num делимое
		 * @param {Number} divisor делитель
		 * @return Кратно ли число a числу divisor
		 */
		is_divisor : function(num, divisor) {
			return num % divisor == 0;
		},


		/** @function NLib.math.get_divisors
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
				if (NLib.math.is_divisor(num, d)) {
					divisors.push(d);
				}
			}
			return divisors;
		},


		/** @function NLib.math.get_random_divisor
		 * Случайные делитель
		 * @param {Number} num делимое
		 * @return Случайный делитель числа num
		 */
		get_random_divisor : function(num) {
			return NLib.get_random_item(NLib.math.get_divisors(num));
		}
	},
};


/** @function NLib.math.Triangle.get_area
 * Вычисление площади
 * @return площадь треугольника
 * @memberof NLib.math.Triangle#
 */
NLib.math.Triangle.prototype.get_area = function() {
	return 0.5 * ((this.a.x * this.b.y) + (this.a.y * this.c.x) + (this.b.x * this.c.y) - (this.b.y * this.c.x) -
	              (this.c.y * this.a.x) - (this.a.y - this.b.x)).abs();
}


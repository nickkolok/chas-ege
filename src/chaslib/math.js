"use strict";

/** @namespace chaslib.math
 * Работа с числами
 */
chaslib.math = {
	Vec2 : function(x, y) {
		return { x : x || 0, y : y || 0 };
	},


	Vec3 : function(x, y, z) {
		return { x : x || 0, y : y || 0, z : z || 0 };
	},

	/** @function chaslib.math.randomize
	 * Генерация случайного числа
	 * @param {Number} min минимальное значение
	 * @param {Number} max минимальное значение
	 * @param {Number} decPlaces кол-во знаков после запятой
	 * @return случайное число
	 */
	randomize : function(min, max, decPlaces) {
		return (Math.random() * ((max || 9007199254740992) - (min || 0))).round(decPlaces || 1);
	}
};


"use strict";

/** @namespace NLib.math
 * Работа с числами
 */
NLib.math = {
	Vec2 : function(x, y) {
		return { x : x || 0, y : y || 0 };
	},


	Vec3 : function(x, y, z) {
		return { x : x || 0, y : y || 0, z : z || 0 };
	},

	/** @function NLib.math.randomize
	 * Генерация случайного числа
	 * @param {Number} min минимальное значение
	 * @param {Number} max минимальное значение
	 * @param {Number} dec_places кол-во знаков после запятой
	 * @return случайное число
	 */
	randomize : function(min, max, dec_places) {
		return (Math.random() * ((max || 9007199254740992) - (min || 0))).round(dec_places || 1);
	}
};


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
			return NApi.util.round(Math.random() * (max - min), (dec_places || 1));
		}
	},
}


/**
 * Алиас на NApi.util
 */
var Nutil = NApi.util;


/**
 * Алиас на NApi.util.str
 */
var Nustr = NApi.util.str;


/**
 * Алиас на NApi.util.math
 */
var Numath = NApi.util.math;



'use strict';

/** @namespace chas2.test
 * Тесты
 */
chas2.test = {
	/** @namespace chas2.test._
	 * Функционал, используемый только внутри модуля chas2.test
	 * @private
	 */
	_ : {},


	/** @function chas2.test.testTemplates
	 * Проверить шаблоны в текущем наборе
	 * @param {Number} triesCount кол-во прогонов каждого шаблона
	 * @param {Function} infoFunc функция вывода информационной строки
	 * @param {Function} warnFunc функция вывода предупреждающей строки
	 * @param {Function} errFunc функция вывода строки об ошибке
	 */
	testTemplates : function(p) {
		var infoFunc = p.infoFunc || chas2.Linfo;
		var warnFunc = p.warnFunc || chas2.Lwarn;
		var errFunc  = p.errFunc || chas2.Lerr;

		infoFunc('Проверка шаблонов в наборе "' + nabor.adres + '"');

		var errCount = 0;
		for (var category in nabor.upak) {
			infoFunc('\tПроверка категории ' + category);

			var errCountPerCat = 0;

			for (var templ in nabor.upak[category]) {
				if (templ != 'main') {
					infoFunc('\t\tПроверка шаблона B1/' + templ);
					for (var i = p.triesCount || 10; i; i--) {
						try {
							nabor.upak[category][templ]();
							var checkResult = dvig.validateVopr();
							if (checkResult != '') {
								warnFunc('\t\t\t' + checkResult);
							}
						} catch (e) {
							errFunc('\t\t\tОшибка :' + e);
							errCountPerCat++;
						}
					}
				}
			}
			infoFunc('\tПроверка категории ' + category + ' закончена c ' + errCountPerCat + ' ошибками');
		}
		infoFunc('Проверка шаблонов в наборе "' + nabor.adres + '" закончена с ' + errCount + ' ошибками');
	}
};

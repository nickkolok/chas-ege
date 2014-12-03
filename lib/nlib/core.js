"use strict";

/** @namespace NLib
 * Утилиты
 */
var NLib = {
	/** @namespace NLib._
	 * Функционал, используемый только внутри модуля NLib
	 * @private
	 */
	_ : {},


	loadJs : function(path) {
		document.write("<script charset=\"utf-8\" src=\"" + path + "\" onload=\"console.log('Loaded " + path + "');\"></script>");
	}
};


(function() {
	NLib.loadJs("../lib/nlib/Array.js");
	NLib.loadJs("../lib/nlib/Number.js");
	NLib.loadJs("../lib/nlib/math.js");
	NLib.loadJs("../lib/nlib/sets.js");

	NLib.loadJs("../lib/nlib/alias.js");
})();


/** @namespace NLib
 * Утилиты
 */
NLib = {
	/** @namespace NLib._
	 * Функционал, используемый только внутри модуля NLib
	 * @private
	 */
	_ : {},


	load_js : function(path) {
		document.write("<script charset=\"utf-8\" src=\"" + path + "\" onload=\"console.log('Loaded " + path + "');\"></script>");
	}
};


(function() {
	NLib.load_js("../lib/nlib/Array.js");
	NLib.load_js("../lib/nlib/Number.js");
	NLib.load_js("../lib/nlib/math.js");
	NLib.load_js("../lib/nlib/sets.js");

	NLib.load_js("../lib/nlib/alias.js");
})();


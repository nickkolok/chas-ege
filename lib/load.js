(function() {
	var libList=[
		'lib/chas-lib.js',
		'ext/jquery-2.1.0.min.js',
		'ext/jqplot/jquery.jqplot.min.js',
		'ext/jqplot/plugins/jqplot.barRenderer.min.js',
		'ext/jqplot/plugins/jqplot.categoryAxisRenderer.min.js',
		'ext/anyslider/js/jquery.anythingslider.js',
		'ext/jstorage.min.js',
		'ext/html2canvas.js',
		'lib/func_jquery.js',
		'lib/umka.js',
		'lib/core_vopr.js',
		'lib/core_nabor.js',
		'lib/core_dvig.js',
		'lib/dvig_fn.js',
		'lib/dvig_rz.js',
		'lib/dvig_lz.js',
		'lib/urljson.js',
		'lib/style.js',
		'lib/menu.js',
		'lib/yametrika.js',
		'lib/browser.js',
		'lib/osnmas.js',
		'lib/cache.js',
		'lib/jstorage.zapomni.js',
		'lib/sovety.js',

		// chas2 API (NApi)
		'js/chas2/core.js',
		'js/chas2/task.js',
		'js/chas2/test.js',
		'js/chas2/compat.js',


//		'ext/keyboard/keyboard.js', //Не стриктуется. TODO: заменить на нормальную
	];
	if(typeof(module)==="undefined"){ //Не node.js		
		for(var i=2; i<libList.length; i++){
				addscript("../"+libList[i]);
		}
	}else{ //node.js
		module.exports.libList=libList;
	}
})();

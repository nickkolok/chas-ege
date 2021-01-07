(function() {
	var nodeJs = typeof(module) !== 'undefined';
	var choosePath = function(nodeModulePath, extPath) {
		if (nodeJs) {
			return nodeModulePath;
		} else {
			return extPath;
		}
	};
	var libList=[
		'build/lib/chas-lib.js',
		'ext/jquery-2.1.0.min.js',
		'ext/jqplot/jquery.jqplot.min.js',
		'ext/jqplot/plugins/jqplot.barRenderer.min.js',
		'ext/jqplot/plugins/jqplot.categoryAxisRenderer.min.js',
		'ext/anyslider/js/jquery.anythingslider.js',
		choosePath('node_modules/html2canvas/dist/html2canvas.min.js', 'ext/html2canvas.js'),
		'ext/JSCPP.es5.min.js',
		choosePath('node_modules/chas-storage/chasStorage.js', 'ext/chasStorage.js'),
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
		'lib/sovety.js',

		// chas2 API (NApi)
		"src/chas2/core.js",
		"src/chas2/task.js",
		"src/chas2/test.js",
		"src/chas2/compat.js",


//		'ext/keyboard/keyboard.js', //Не стриктуется. TODO: заменить на нормальную
	];
	if (!nodeJs) {
		for(var i=2; i<libList.length; i++){
				addscript(chas.mode.root + libList[i]);
		}
	}else{ //node.js
		module.exports.libList=libList;
	}
})();

(function() {
	var libList=[
		'lib/func.js',
		'lib/func_ui.js',
		'lib/object.js',
		'lib/array.js',
		'lib/array_mt.js',
		'lib/array_mp.js',
		'lib/array_mn.js',
		'lib/array_pe.js',
		'lib/string.js',
		'lib/number.js',
		'lib/number_math.js',
		'lib/canvas.js',
		'lib/regexp.js',
		'lib/function.js',
		'lib/lx.js',
		'lib/lxnar.js',
		'lib/lxsoch.js',
		'lib/lxskl.js',
		'lib/lxchisl.js',
		'lib/sklon.js',
		'lib/complex.js',
		'lib/namealias.js',
		'ext/fraction.js',

		// NLib
		"src/nlib/core.js",
		"src/nlib/Array.js",
		"src/nlib/Number.js",
		"src/nlib/math.js",
		"src/nlib/sets.js",
		"src/nlib/alias.js"
	];
	
	if(typeof(module)==="undefined"){ //Не node.js		
		for(var i=0; i<libList.length; i++){
				addscript("../"+libList[i]);
		}
	}else{ //node.js
		module.exports.libList=libList;
	}
})();

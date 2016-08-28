(function() {
	var libList=[
		'ext/fraction.js',
		'lib/func.js',
		'lib/func_ui.js',

		"src/chaslib/Object_generic.js", // Тут деваться некуда, вне очереди
		"src/chaslib/Object_special.js",

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

		// ChasLib
		"src/chaslib/core.js",
		"src/chaslib/Array.js",
		"src/chaslib/Number.js",
		"src/chaslib/String.js",
		"src/chaslib/String_generic.js",
		"src/chaslib/String_tex.js",
		"src/chaslib/String_html.js",
		"src/chaslib/math.js",
		"src/chaslib/sets.js",
		"src/chaslib/compat.js"
	];

	if(typeof(module)==="undefined"){ //Не node.js
		for(var i=0; i<libList.length; i++){
				addscript(chas.mode.root + libList[i]);
		}
	}else{ //node.js
		module.exports.libList=libList;
	}
})();

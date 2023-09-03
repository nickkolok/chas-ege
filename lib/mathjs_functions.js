//{{ Russian-style trigonometric functions
function tg(x){
	return Math.tan(x);
}

tg.toTex = function (node, options) {
	return '\\tg ' + mathjs_helpers.wrapInTeXbracketsIfNeeded(node.args[0], options);
}


function ctg(x){
	return 1 / Math.tan(x);
}

ctg.toTex = function (node, options) {
	return '\\ctg ' + mathjs_helpers.wrapInTeXbracketsIfNeeded(node.args[0], options);
}


math.import({
	tg,
	ctg,
});
//}} Russian-style trigonometric functions


function sindeg(x){
	return Math.sin(x * Math.PI / 180);
}

//https://mathjs.org/docs/expressions/customization.html
//https://mathjs.org/docs/expressions/expression_trees.html
sindeg.toTex = function (node, options) { //handler function
	return mathjs_helpers.TeXtrigDeg('sin', node, options);
}

function cosdeg(x){
	return Math.cos(x * Math.PI / 180);
}

cosdeg.toTex = function (node, options) { //handler function
	return mathjs_helpers.TeXtrigDeg('cos', node, options);
}

math.import({
	sindeg,
	cosdeg,
});

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

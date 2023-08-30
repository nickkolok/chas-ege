function sindeg(x){
	return Math.sin(x * Math.PI / 180);
}

//https://mathjs.org/docs/expressions/customization.html
//https://mathjs.org/docs/expressions/expression_trees.html
sindeg.toTex = function (node, options) { //handler function
	//TODO: не брать корни в скобки?
	//TODO: и всякие там арксинусы тоже?
	//Но бывают ли они в градусах?..

	var innerTeX = node.args[0].toTex(options);
	console.log(node.args[0]);
	if(node.args[0].fn === 'unaryMinus'){
		return '\\sin \\left(' + innerTeX + '^\\circ\\right) ';
	}
	if(node.args[0] instanceof math.ConstantNode){
		return '\\sin ' + innerTeX + '^\\circ ';
	}

	return '\\sin \\left(' + innerTeX + '\\right)^\\circ ';
}

function cosdeg(x){
	return Math.cos(x * Math.PI / 180);
}

cosdeg.toTex = function (node, options) { //handler function
	var innerTeX = node.args[0].toTex(options);
	if(
		node.args[0] instanceof math.ConstantNode
	){
		if(innerTeX[0]==='-'){
			return '\\cos \\left(' + innerTeX + '^\\circ\\right) ';
		}else{
			return '\\cos ' + innerTeX + '^\\circ ';
		}
	}
	return '\\cos \\left(' + innerTeX + '\\right)^\\circ ';
}

math.import({
	sindeg,
	cosdeg,
});

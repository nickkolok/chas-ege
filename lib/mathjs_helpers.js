var mathjs_helpers = {
	TeXtrigDeg : function(trigfunc, node, options){
		//TODO: не брать корни в скобки?
		//TODO: и всякие там арксинусы тоже?
		//Но бывают ли они в градусах?..

		var innerTeX = node.args[0].toTex(options);
		console.log(node.args[0]);
		if(node.args[0].fn === 'unaryMinus'){
			return '\\' + trigfunc + ' \\left(' + innerTeX + '^\\circ\\right) ';
		}
		if(node.args[0] instanceof math.ConstantNode){
			return '\\' + trigfunc + ' ' + innerTeX + '^\\circ ';
		}

		return '\\' + trigfunc + ' \\left(' + innerTeX + '\\right)^\\circ ';
	},

	wrapInTeXbracketsIfNeeded : function(node, options){
		var innerTeX = node.toTex(options);
		if(
			node instanceof math.ConstantNode
		||
			['pow','nthRoot','sqrt','divide'].includes(node.fn)
		){
			return innerTeX;
		}
		return ' \\left(' + innerTeX + '\\right) ';
	},

	forceSimplifyConstantsInNode : function(node){
		if(node.fn && node.fn.name === 'forceSimplifyConstants'){
			return math.simplifyConstant(node.args[0]);
		}
		for(let i = 0; node.args && i < node.args.length; i++){
			node.args[i] = mathjs_helpers.forceSimplifyConstantsInNode(node.args[i]);
		}
		return node;
	},
};

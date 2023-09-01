mathjs_helpers = {
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
};

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
			node instanceof math.SymbolNode
		||
			['pow','nthRoot','sqrt','divide'].includes(node.fn)
		||
			['pow','nthRoot','sqrt','divide'].includes(node.fn.name)
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

	slEvaluate : function(node){
		if(node.fn && node.fn.name === 'sl'){
			let args = node.args.map(n => n.evaluate());
			return math.parse('' + sl(args[0], args[1], args[2]));
		}
		for(let i = 0; node.args && i < node.args.length; i++){
			node.args[i] = mathjs_helpers.slEvaluate(node.args[i]);
		}
		return node;
	},

	shuffleSumsInNode : function(node){
		if(node.fn && node.fn.name && node.fn.name.substr(0,11) === 'shuffledSum'){
			node.args.shuffle();
		}
		for(let i = 0; node.args && i < node.args.length; i++){
			node.args[i] = mathjs_helpers.shuffleSumsInNode(node.args[i]);
		}
		return node;
	},

	testLocalExtremum : function(f,x,step){
		let y = math.evaluate(['x=' + x, f])[1];
		let y_less = math.evaluate(['x=' + x + '-' + step, f])[1];
		let y_more = math.evaluate(['x=' + x + '+' + step, f])[1];

		if( y > y_less && y > y_more){
			console.log('max');
			return 'max';
		}
		if( y < y_less && y < y_more){
			console.log('min');
			return 'min';
		}
		return 'not';
	},
};

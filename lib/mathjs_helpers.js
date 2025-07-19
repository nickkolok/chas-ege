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


// TODO: possibly that should be a separate library
const mathjs_shuffle = {
	shuffleArray(array) {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
	},

	// Addition helpers
	flattenAdditions(node) {
		if (node.type === 'OperatorNode' && node.op === '+') {
			let left = this.flattenAdditions(node.args[0]);
			let right = this.flattenAdditions(node.args[1]);
			return left.concat(right);
		} else {
			return [node];
		}
	},

	buildAdditionTree(nodes) {
		if (nodes.length === 0) {
			return new math.ConstantNode(0);
		}
		if (nodes.length === 1) {
			return nodes[0];
		}
		let tree = new math.OperatorNode('+', 'add', [nodes[0], nodes[1]]);
		for (let i = 2; i < nodes.length; i++) {
			tree = new math.OperatorNode('+', 'add', [tree, nodes[i]]);
		}
		return tree;
	},

	shuffleAdditions(node) {
		if (node.type === 'OperatorNode' && node.op === '+') {
			let summands = this.flattenAdditions(node);
			summands = summands.map(s => this.shuffleAdditions(s));
			this.shuffleArray(summands);
			return this.buildAdditionTree(summands);
		} else if (node.args && node.args.length > 0) {
			const newArgs = node.args.map(arg => this.shuffleAdditions(arg));
			switch (node.type) {
				case 'FunctionNode':
					return new math.FunctionNode(node.name, newArgs);
				case 'OperatorNode':
					return new math.OperatorNode(node.op, node.fn, newArgs);
				case 'ParenthesisNode':
					return new math.ParenthesisNode(newArgs[0]);
				case 'AccessorNode':
					return new math.AccessorNode(newArgs[0], newArgs[1]);
				case 'ArrayNode':
					return new math.ArrayNode(newArgs);
				case 'ConditionalNode':
					return new math.ConditionalNode(newArgs[0], newArgs[1], newArgs[2]);
				default:
					return node.clone();
			}
		} else {
			return node;
		}
	},

	// Multiplication helpers
	flattenMultiplications(node) {
		if (node.type === 'OperatorNode' && node.op === '*') {
			let left = this.flattenMultiplications(node.args[0]);
			let right = this.flattenMultiplications(node.args[1]);
			return left.concat(right);
		} else {
			return [node];
		}
	},

	buildMultiplicationTree(nodes) {
		if (nodes.length === 0) {
			return new math.ConstantNode(1);
		}
		if (nodes.length === 1) {
			return nodes[0];
		}
		let tree = new math.OperatorNode('*', 'multiply', [nodes[0], nodes[1]]);
		for (let i = 2; i < nodes.length; i++) {
			tree = new math.OperatorNode('*', 'multiply', [tree, nodes[i]]);
		}
		return tree;
	},

	shuffleMultipliers(node) {
		if (node.type === 'OperatorNode' && node.op === '*') {
			let factors = this.flattenMultiplications(node);
			factors = factors.map(f => this.shuffleMultipliers(f));
			this.shuffleArray(factors);
			return this.buildMultiplicationTree(factors);
		} else if (node.args && node.args.length > 0) {
			const newArgs = node.args.map(arg => this.shuffleMultipliers(arg));
			switch (node.type) {
				case 'FunctionNode':
					return new math.FunctionNode(node.name, newArgs);
				case 'OperatorNode':
					return new math.OperatorNode(node.op, node.fn, newArgs);
				case 'ParenthesisNode':
					return new math.ParenthesisNode(newArgs[0]);
				case 'AccessorNode':
					return new math.AccessorNode(newArgs[0], newArgs[1]);
				case 'ArrayNode':
					return new math.ArrayNode(newArgs);
				case 'ConditionalNode':
					return new math.ConditionalNode(newArgs[0], newArgs[1], newArgs[2]);
				default:
					return node.clone();
			}
		} else {
			return node;
		}
	},

	randomUnaryMinus(node) {
		if (node.type === 'OperatorNode') {
			if (node.op === '*') {
				if (Math.random() < 0.5) {
					// Flatten all factors
					let factors = this.flattenMultiplications(node);
					// Negate only the first factor
					factors[0] = new math.OperatorNode('-', 'unaryMinus', [factors[0]]);
					// Rebuild multiplication tree
					return this.buildMultiplicationTree(factors);
				}
				return node;
			}
			if (node.op === '/') {
				if (Math.random() < 0.5) {
					return new math.OperatorNode('-', 'unaryMinus', [node]);
				}
				return node;
			}
		}
		if (node.type === 'FunctionNode') {
			if (Math.random() < 0.5) {
				return new math.OperatorNode('-', 'unaryMinus', [node]);
			}
		}
		return node;
	},
};


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
	//Avoid numeric errors!
	x = x % 360 + 360 * (x < 0);
	switch(x){
		case   0:
		case 180: return 0;
		case  90: return 1;
		case 270: return -1;
		case  30:
		case 150: return 1/2;
		case 330:
		case 210: return -1/2;
	}
	return Math.sin(x * Math.PI / 180);
}

//https://mathjs.org/docs/expressions/customization.html
//https://mathjs.org/docs/expressions/expression_trees.html
sindeg.toTex = function (node, options) { //handler function
	return mathjs_helpers.TeXtrigDeg('sin', node, options);
}

function cosdeg(x){
	x = Math.abs(x) % 360;
	switch(x){
		case  90:
		case 270: return 0;
		case   0: return 1;
		case 180: return -1;
		case  60:
		case 120: return 1/2;
		case 300:
		case 240: return -1/2;
	}
	return Math.cos(x * Math.PI / 180);
}

cosdeg.toTex = function (node, options) { //handler function
	return mathjs_helpers.TeXtrigDeg('cos', node, options);
}

function tgdeg(x){
	x = x % 180 + 180 * (x < 0);
	switch(x){
		case  90: return NaN;
		case   0: return 0;
		case  45: return 1;
		case 135: return -1;
	}
	return Math.tan(x * Math.PI / 180);
}

tgdeg.toTex = function (node, options) { //handler function
	return mathjs_helpers.TeXtrigDeg('tg', node, options);
}

function ctgdeg(x){
	x = x % 180 + 180 * (x < 0);
	switch(x){
		case   0: return NaN;
		case  90: return 0;
		case  45: return 1;
		case 135: return -1;
	}
	return 1 / Math.tan(x * Math.PI / 180);
}

ctgdeg.toTex = function (node, options) { //handler function
	return mathjs_helpers.TeXtrigDeg('ctg', node, options);
}


math.import({
	sindeg,
	cosdeg,
	 tgdeg,
	ctgdeg,
});

function sinpow(x,y){
	return Math.pow(Math.sin(x), y);
}

sinpow.toTex = function (node, options) {
	let power = node.args[1].value === 1 ? '' :
		'^{' + node.args[1].toTex(options) + '}';

	return '\\sin' + power + ' ' +
		mathjs_helpers.wrapInTeXbracketsIfNeeded(node.args[0], options);
}

function cospow(x,y){
	return Math.pow(Math.cos(x), y);
}

cospow.toTex = function (node, options) {
	let power = node.args[1].value === 1 ? '' :
		'^{' + node.args[1].toTex(options) + '}';

	return '\\cos' + power + ' ' +
		mathjs_helpers.wrapInTeXbracketsIfNeeded(node.args[0], options);
}

math.import({
	sinpow,
	cospow,
});



function sindegpow(x,y){
	return Math.pow(math.sindeg(x), y);
}

sindegpow.toTex = function (node, options) {
	let power = node.args[1].value === 1 ? '' :
		'^{' + node.args[1].toTex(options) + '}';

	return mathjs_helpers.TeXtrigDeg('sin' + power, node, options);
}

function cosdegpow(x,y){
	return Math.pow(math.cosdeg(x), y);
}

cosdegpow.toTex = function (node, options) {
	let power = node.args[1].value === 1 ? '' :
		'^{' + node.args[1].toTex(options) + '}';

	return mathjs_helpers.TeXtrigDeg('cos' + power, node, options);
}


math.import({
	sindegpow,
	cosdegpow,
});


function divideColon(x,y){
	return x/y;
}

divideColon.toTex = function (node, options) { //handler function
	return mathjs_helpers.wrapInTeXbracketsIfNeeded(node.args[0], options) +
		':' + mathjs_helpers.wrapInTeXbracketsIfNeeded(node.args[1], options);
}

math.import({
	divideColon,
});


function varlog(x,y){
	return math.log(y,x);
}

varlog.toTex = function (node, options) {
	return '\\log_{' + mathjs_helpers.wrapInTeXbracketsIfNeeded(node.args[0], options) + '}' +
		mathjs_helpers.wrapInTeXbracketsIfNeeded(node.args[1], options);
}

math.import({
	varlog,
});

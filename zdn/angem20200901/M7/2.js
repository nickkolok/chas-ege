(function() {
	'use strict';

	function generateStraightLine(){
		var p = sl(-10, 10);
		var q = sl(-10, 10);
		var r = sl(1, 10).pm();
		var s = sl(1, 10).pm();
	
		var A = r;
		var B = -s;
		var C = q * s - r * p;
	
		var gcd = A.nod(B).nod(C);
		A /= gcd;
		B /= gcd;
		C /= gcd;
	
		return {
			'parametricVector':
				'\\begin{pmatrix}x\\\\y\\end{pmatrix} = ' +
				'\\begin{pmatrix}' + p + '\\\\' + q + '\\end{pmatrix}+t' +
				'\\begin{pmatrix}' + s + '\\\\' + r + '\\end{pmatrix}',
			'parametricSystem':
				'\\begin{cases}'+
					('x = ' + p + '+' + s + 't').plusminus()+
				'\\\\'+
					('y = ' + q + '+' + r + 't').plusminus()+
				'\\end{cases}',
			'common':
				(A + 'x+' + B + 'y+' + C + '=0').plusminus(),
		}	
	}
	
	var line = 
	
	NAtask.setTask({
		text: 'Составьте общее уравнение прямой, параметрическое уравнение которой имеет вид:' +
		'$$' + [
			'\\begin{pmatrix}x\\\\y\\end{pmatrix} = ' +
			'\\begin{pmatrix}' + p + '\\\\' + q + '\\end{pmatrix}+t' +
			'\\begin{pmatrix}' + s + '\\\\' + r + '\\end{pmatrix}'
		,	
			'\\begin{cases}'+
				('x = ' + p + '+' + s + 't').plusminus()+
			'\\\\'+
				('y = ' + q + '+' + r + 't').plusminus()+
			'\\end{cases}'
		].iz() + '.$$',
		answers: (A + 'x+' + B + 'y+' + C + '=0').plusminus(),
	});
})();

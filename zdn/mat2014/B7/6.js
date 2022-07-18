(function(){'use strict';

var b=sluchch(1,9).pm();
var power = sl(2,5);
var c=sluchch(1,9);
if (power%2){
	c *= [1,-1].iz();
}
var x=sluchch(1,9);
var a = Math.pow(c,power)-b*x;
var textpower = ('['+power+']').esli(power!=2);

var numerator = sl(1,9);
var multiplier = sl(1,9);

var parts = [
	[ '\\sqrt'+textpower+'{'+[(''+a).esli(a),b+'x'].slag()+'}', c],
	[ '\\sqrt'+textpower+'{\\frac{' + numerator.pow(power)*multiplier + '}{'+[(''+a*multiplier).esli(a*multiplier),b*multiplier+'x'].slag()+'}}', numerator.texrndfrac(c)],
	[ '\\sqrt'+textpower+'{\\frac{'+[(''+a*multiplier).esli(a*multiplier),b*multiplier+'x'].slag()+'}{' + numerator.pow(power)*multiplier + '}}', c.texrndfrac(numerator)],
].iz();


chas2.task.setEquationTask({
	parts: parts,
	roots: x,
	enablePartsSubtraction: 1,
});
})();
// В том числе РешуЕГЭ 501205

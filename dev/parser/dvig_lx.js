//node dvig_lx.js ../dev/dvig/number/ matege2023p/1/

'use strict';
String.prototype.isSpace = function () {
	/**Состоит ли строка только из пробельных символов?*/
	return (/^\s+$/).test(this);
};
String.prototype.isNumeric = function () {
	/**Является ли строка числом, возможно, с десятичной точкой или запятой?*/
	return /^-?[0-9]+([.,][0-9])?$/.test(this);
}

let path = process.argv.slice(2,4);
const fs = require('fs')
const filenames = fs.readdirSync(path[0]);
let text;
for (let i = 0; i < filenames.length; i++) {
	let lib = require('../../lib/dvig_lz.js');
	text = fs.readFileSync(path[0] + filenames[i], 'utf8')
	text = lib.makeTemplateFromPlainText(text);
	try {
		fs.writeFileSync(path[1] + filenames[i].replace('txt', 'js') + '', text);
	} catch (err) {
		console.error(err);
	}
}

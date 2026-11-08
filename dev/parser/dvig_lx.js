//node dvig_lx.js ../dev/dvig/number/ matege2023p/1/

'use strict';

// Костылинг. Но - нам нужна вся мощь наших библиотек.
// Причём именно так, одним куском - чтобы они видели друг друга...
global.document = {};
global.CanvasRenderingContext2D = {prototype:{}};
require('../../dist/lib/chas-lib.min.js');
require('../../dist/lib/decorations.js'); // Не входит в сборку

let path = process.argv.slice(2,4);
const fs = require('fs')
const filenames = fs.readdirSync(path[0]);
let text;
for (let i = 0; i < filenames.length; i++) {
	let lib = require('../../sh/dvig_lz.js');
	text = fs.readFileSync(path[0] + filenames[i], 'utf8')
	text = lib.makeTemplateFromPlainText(text);
	try {
		fs.writeFileSync(path[1] + filenames[i].replace('txt', 'js') + '', text);
	} catch (err) {
		console.error(err);
	}
}

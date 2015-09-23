'use strict';

var fs = require('fs');

var ls = require('ls');


module.exports.packZdnSync = function(src, dest) {
	try {
		fs.mkdirSync(dest);
	} catch (e) {
		if (e.code != 'EEXIST') {
			throw e;
		}
	}
	var sets = ls(src + '/*');
	var crrSet;
	for (var i = 0; i < sets.length; i++) {
		crrSet = sets[i];
		if (!crrSet.stat.isDirectory()) {
			continue;
		}

		var buf = 'nabor.upak={';

		var categories = ls(crrSet.full + '/*');
		var crrCat;
		for (var j = 0; j < categories.length; j++) {
			crrCat = categories[j];
			if (!crrCat.stat.isDirectory()) {
				continue;
			}

			buf += crrCat.name + ' :{';

			var templates = ls(crrCat.full + '/*.js');
			var crrTemplate;
			for (var k = 0; k < templates.length; k++) {
				crrTemplate = templates[k];
				buf += crrTemplate.name + ' :function(){';
				buf += fs.readFileSync(crrTemplate.full);
				buf += '},';
			}

			buf += '},';
		}

		buf += '};';

		var path = dest + '/' + crrSet.name;
		try {
			fs.mkdirSync(path);
		} catch (e) {
			if (e.code != 'EEXIST') {
				throw e;
			}
		}
		fs.writeFileSync(path + '/upak.js', buf);
	}
};

'use strict';

var fs = require('fs');
var ls = require('ls');
var mkdirp = require('mkdirp');


module.exports.packZdnSync = function(src, dest) {

	mkdirp.sync(dest);

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

			buf += '"' + crrCat.name + '" :{';

			var templates = ls(crrCat.full + '/*.js');
			var crrTemplate;
			for (var k = 0; k < templates.length; k++) {
				crrTemplate = templates[k];
				if(/BACKUP|BASE|LOCAL|REMOTE/i.test(crrTemplate.file)){
					console.log('Пропускаем файл '+crrTemplate.full+' - временный файл мёржа');
					continue;
				}
				buf += '"' + crrTemplate.name + '" :function(){';
				buf += fs.readFileSync(crrTemplate.full);
				buf += '},';
			}

			buf += '},';
		}

		buf += '};';

		var path = dest + '/' + crrSet.name;
		mkdirp.sync(path);
		fs.writeFileSync(path + '/upak.js', buf);
	}
};

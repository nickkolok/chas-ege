//Запрашиваем списки библиотек оттуда же, откуда их берёт init.js
var libListChasUijs = require('./lib/load.js');
var libListChasLib  = require('./lib/load-chas-lib.js');

//Нам же нужно запускать скрипты на bash?
var exec = require('child_process').exec;

module.exports = function(grunt) {
	'use strict';
	grunt.initConfig({
		swigtemplates: {
			options: {
				defaultContext: {
					"version_title": "",
					"version_exact": "",
					"version_cache": new Date().getTime(),
				},
				templatesDir: "sh/",
			},
			sh: {
				dest: "dist/sh/",
				src: ["sh/*.html",],
			},
			doc: {
				dest: "dist/doc/",
				src: ["doc/*.html",],
			},
			html: {
				dest: "dist/html/",
				src: ["html/*.html", "!html/templ-*.html"],
			},
		},
		copy: {
			pagesJs: {
				files: [
					{ expand: true, src: ["sh/*.js","html/*.js",], dest: "dist/" },
				]
			},
			taskSets: {
				files: [
					{ expand: true, src: ["zdn/**"], dest: "dist/" },
				]
			},
			css: {
				files: [
					{ expand: true, src: ["css/**.css"], dest: "dist/" },
				]
			},
			lib: {
				files: [
					{ expand: true, src: ["lib/**"], dest: "dist/" },
				]
			},
			externals: {
				files: [
					{ expand: true, src: ["ext/**"], dest: "dist/" }
				]
			},
			other: {
				files: [
					{ expand: true, src: ["index.html"], dest: "dist/" },
				]
			},
		},
		concat: {
			options: {
				reload: true,
				separator: "\n;;;\n"
			},
			chasLib: {
				src: libListChasLib.libList,
				dest: "dist/lib/chas-lib.js"
			},
			chasUijs: {
				src: libListChasUijs.libList,
				dest: "dist/lib/chas-uijs.js"
			},
			init: {
				src: ["dist/lib/init.js", "dist/lib/chas-uijs.js"],
				dest: "dist/lib/init.cat.js"
			},
		},
		uglify: {
			options: {
				screwIE8: true,
			},
			pagesJS: {
				files: [{
					expand: true,
					cwd: 'sh',
					src: '*.js',
					dest: 'dist/sh',
				}],
			},
			tasksPacks: {
				files: [{
					expand: true,
					cwd: 'zdn',
					src: '*/upak.js',
					dest: 'dist/zdn',
				}],
			},
			head: {
				files: {
					"lib/head.min.js": ["lib/head.js"],
				}
			},
			chasLib: {
				files: {
					"dist/lib/chas-lib.min.js": ["dist/lib/chas-lib.js"],
				}
			},
			chasUijs: {
				files: {
					"dist/lib/chas-uijs.min.js": ["dist/lib/chas-uijs.js"],
				}
			},
			init: {
				files: {
					"dist/lib/init.min.js": ["dist/lib/init.cat.js",],
				}
			},
		},
		cssmin: {
			options: {
				shorthandCompacting: false,
				roundingPrecision: -1,
			},
			target: {
				files: [{
					"dist/css/chas-ui.min.css": [
						 "css/browser.css",
						 "css/main.css",
						 "css/menu.css",
						 "ext/anyslider/css/anythingslider.css",
						 "ext/anyslider/css/theme-minimalist-square.css",
						 "ext/fonts/stylesheet.css",
						 "ext/keyboard/keyboard.css",
						 "ext/jqplot/jquery.jqplot.css",
					],
					"dist/css/chas-ui-bs.min.css": [
						 "css/browser.css",
						 "css/menu.css",
						 "ext/anyslider/css/anythingslider.css",
						 "ext/anyslider/css/theme-minimalist-square.css",
						 "ext/fonts/stylesheet.css",
						 "ext/keyboard/keyboard.css",
						 "ext/jqplot/jquery.jqplot.css",
						 "ext/bootstrap/css/bootstrap.min.css",
					],
				},{
					expand: true,
					cwd: 'css',
					src: ['*.css',],
					dest: 'dist/css',
					ext: '.min.css',
				},],
			},
		},

		watch: {
			options: {
				reload: true
			},
			html: {
				files: [
					"doc/*.html",
					"html/*.html",
					"lib/head.js",
					"sh/*.html",
				],
				tasks: ["process-html",]
			},
			pagesJs: {
				files: [
					"doc/*.js",
					"html/*.js",
					"sh/*.js",
				],
				tasks: ["process-pages-js",]
			},
			lib: {
				files: [
					"lib/*","!lib/head*",
				],
				tasks: ["process-lib",]
			},
			taskSets: {
				files: [
					"zdn/*",
				],
				tasks: ["process-task-sets",]
			},
			css: {
				files: [
					"css/*",
				],
				tasks: ["process-css",]
			},
		}
	});

	grunt.loadNpmTasks("grunt-swigtemplates");
	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-contrib-copy");
	grunt.loadNpmTasks("grunt-contrib-cssmin");
	grunt.loadNpmTasks("grunt-newer");

	//С make начинаются задания, результат которых - готовый *.min.{js,css}

	grunt.registerTask('unify-use-strict-chas-uijs', 'Убираем лишние use strict из chas-uijs.js', function() {
		exec('sed \'1 a "use strict";//\' dist/lib/chas-uijs.js > dist/lib/chas-uijs.js.tmp');
		exec('sed \'/^.use strict.;$/d\' dist/lib/chas-uijs.js.tmp > dist/lib/chas-uijs.js');
		exec('rm dist/lib/chas-uijs.js.tmp');
	});
	grunt.registerTask('packTasks', 'Упаковываем задания в соответствующие upak.js', function() {
		exec('dev/upak.sh');
	});
	grunt.registerTask("make-init", ["concat:init", "uglify:init",]);
	grunt.registerTask("make-head", ["newer:uglify:head",]);
	grunt.registerTask("make-chas-lib" , ["concat:chasLib", "uglify:chasLib",]);
	grunt.registerTask("make-chas-uijs", ["concat:chasUijs", /*"unify-use-strict-chas-uijs", "uglify:chasUijs",*/]);

	grunt.registerTask("process-html", ["make-head", "newer:swigtemplates", ]);
	grunt.registerTask("process-pages-js", ["newer:copy:pagesJs"]);
	grunt.registerTask("process-task-sets", ["newer:copy:taskSets",'packTasks']);
	grunt.registerTask("process-lib", ["newer:copy:lib", "make-chas-lib", "make-chas-uijs", "make-init",]);
	grunt.registerTask("process-css", ["cssmin", "newer:copy:css"]);

	grunt.registerTask("build-except-ext", ["process-html", "process-pages-js", "process-task-sets", "process-lib", "process-css",]);
	grunt.registerTask("default", ["build-except-ext", "swigtemplates", "copy", "concat", "uglify", "watch"]);
};

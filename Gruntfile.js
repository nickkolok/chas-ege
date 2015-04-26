module.exports = function(grunt) {
	'use strict';
	grunt.initConfig({
/*
		swigtemplates: {
			options: {
				defaultContext: {
					"version_title": "TODO: version-title",
					"version_exact": "TODO: version-exact",
				},
				templatesDir: "html/"
			},
			templates: {
				dest: "dist/c2",
				src: ["html/*.html","doc/*.html","sh/*.html",]
			}
		},
*/
		swigtemplates: {
			options: {
				defaultContext: {
					"version_title": "",
					"version_exact": "",
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
		},
		copy: {
/*
			pagesJs: {
				files: [
					{ expand: true, src: ["js/page/*.js"], dest: "dist/" },
				]
			},
*/
			pagesJs: {
				files: [
					{ expand: true, src: ["sh/*.js",], dest: "dist/" },
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
		},
		concat: {
			options: {
				reload: true,
				separator: "\n;;;\n"
			},
/*			
			chas2: {
				src: [
					"js/legacy/head.js",
					"js/legacy/init.js",

					"js/legacy/func.js",
					"js/legacy/func_ui.js",
					"js/legacy/object.js",
					"js/legacy/array.js",
					"js/legacy/array_mt.js",
					"js/legacy/array_mp.js",
					"js/legacy/array_mn.js",
					"js/legacy/array_pe.js",
					"js/legacy/string.js",
					"js/legacy/number.js",
					"js/legacy/number_math.js",
					"js/legacy/canvas.js",
					"js/legacy/regexp.js",
					"js/legacy/function.js",
					"js/legacy/lx.js",
					"js/legacy/lxnar.js",
					"js/legacy/lxsoch.js",
					"js/legacy/lxskl.js",
					"js/legacy/lxchisl.js",
					"js/legacy/sklon.js",
					"js/legacy/complex.js",
					"js/legacy/namealias.js",

					"js/legacy/func_jquery.js",
					"js/legacy/umka.js",
					"js/legacy/core_vopr.js",
					"js/legacy/core_nabor.js",
					"js/legacy/core_dvig.js",
					"js/legacy/dvig_fn.js",
					"js/legacy/dvig_rz.js",
					"js/legacy/dvig_lz.js",
					"js/legacy/urljson.js",
					"js/legacy/menu.js",
					"js/legacy/yametrika.js",
					"js/legacy/browser.js",
					"js/legacy/osnmas.js",
					"js/legacy/cache.js",
					"js/legacy/jstorage.zapomni.js",
					"js/legacy/sovety.js",

					"js/page/icon.js",

					"js/nlib/core.js",
					"js/nlib/Array.js",
					"js/nlib/Number.js",
					"js/nlib/math.js",
					"js/nlib/sets.js",
					"js/nlib/alias.js",

					"js/chas2/core.js",
					"js/chas2/task.js",
					"js/chas2/test.js",
					"js/chas2/compat.js",
				],
				// TODO: dest: "build/js/chas2.js"
				dest: "dist/js/chas2.min.js"
			}
*/
		},

		uglify: {
			chas2: {
				files: {
					// "dist/js/chas2.min.js": ["build/js/chas2.js"]
				}
			}
		},
		watch: {
			options: {
				reload: true
			},
			html: {
				files: [
					"css/*",
					"doc/*",
					"lib/*",
					"sh/*",
					"zdn/*",
				],
				tasks: ["process-html",]
			},
/*
			chas2: {
				files: [
					"js/{legacy,nlib,chas2}/*.js"
				],
				tasks: ["process-chas2"]
			},
*/
/*
			pagesJs: {
				files: [
					"sh/*.js",
				],
				tasks: ["process-pages-js"]
			}
*/
		}
	});

	grunt.loadNpmTasks("grunt-swigtemplates");
	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-contrib-copy");
	grunt.loadNpmTasks("grunt-contrib-mincss");
	grunt.loadNpmTasks("grunt-newer");

	grunt.registerTask("process-html", ["newer:swigtemplates",]);
	grunt.registerTask("process-chas2", ["concat:chas2", "uglify:chas2"]);
	grunt.registerTask("process-pages-js", ["newer:copy:pagesJs"]);
	grunt.registerTask("process-task-sets", ["newer:copy:taskSets"]);
	grunt.registerTask("process-lib", ["newer:copy:lib"]);
	grunt.registerTask("process-css", ["newer:copy:css"]);
	grunt.registerTask("default", ["swigtemplates", "copy", "concat", "uglify", "watch"])
	grunt.registerTask("build-except-ext", ["process-html", "process-pages-js", "process-task-sets", "process-lib", "process-css",]);
};

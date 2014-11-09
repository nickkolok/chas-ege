'use strict';

var adresa={
	'//matematikalegko.ru/koordinatnaya-ploskost/uglovoj-koefficient-pryamoj-i-ne-tolko.html':
		[
			'..zdn/mat2014/B5/15.js',
		],
	'//matematikalegko.ru/dvigenie/zadachi-na-nahozhdenie-srednej-skorosti.html':
		[
			'..zdn/mat2014/B13/11.js',
		],
	'//matematikalegko.ru/stereometria-schar/zadachi-s-sharami.html':
		[
			'../zdn/mat2014/B13/11.js', 
			'../zdn/mat2014/B13/3.js', 
		], 

	'//matematikalegko.ru/okrugnost/ugol-vpisannyj-v-okruzhnost-zadachi.html':
		[
			'../zdn/mat2014/B8/13.js',
		],
	'//matematikalegko.ru/priyomy/radiany-v-gradusy-gradusy-v-radiany.html':
		[
			'../zdn/mlegko/M1/1.js',
		],
/*	'':
		[
			'',
		],
	'':
		[
			'',
		],
	'':
		[
			'',
		],
	'':
		[
			'',
		],
	'':
		[
			'',
		],
	'':
		[
			'',
		],
	'':
		[
			'',
		],
	'':
		[
			'',
		],
	'':
		[
			'',
		],
*/

};

var hr=document.location.href.match(/[^#:]+/g);
if(hr && hr[1]){
	var shabl=adresa[hr[1]];
	if(shabl){
		chas.integrate("https://www.math.vsu.ru/chas-ege/sh/mini.html",{
			mini:{
				src:shabl,
			},
		},"100%",150,'chas-predupr');
		chas.autoIntegrated=1;
	}
}

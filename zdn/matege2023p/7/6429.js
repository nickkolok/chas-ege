(function() {
	retryWhileError(function() {
		'use strict';

		NAtask.setTaskWithGraphOfFunctionDerivative({
			authors: 'Суматохина Александра',
			type: 'derivative',
			boundariesOfGraph: {
				minX: sl(-11,-5),
				maxX: sl(5,10),
				minY: -9,
				maxY: 8,
				stepForX: sl(4,8),
				stepForY: 0.1,
			},
			questionsF: {
				main: 'integer_points',
				conditions: ['function_is_decreasing', 'function_is_increasing'],
				variants: ['sum', 'production', 'number', 'largest', 'smallest',],
			},
			canvasSettings: {
				height: 400,
				width: 500,
				scale: 20,
				lineWidth: 0.07,
			},
			minimumDifferenceBetweenExtremes: 1,
			numberOfRoots: {min:2, max:10}, 
			numberOfExtremes: {min: 2, max:10}, 
			rootsIsInteger: {
				int: 'no',
				tolerance: 0.2
			},
		});
	}, 10000);
})();
//6429 8299 27497 6431 8051 8053 8055 8061 8063 8065 8071 8075 8077 8079 8087 
//8091 8093 8101 8103 8105 8107 8113 8115 8119 8125 8127 8131 8133 8137 8143 
//8149 8151 8155 8163 8171 8179 8181 8185 8187 8189 8193 8195 8201 8207 8209 
//8211 8213 8225 8227 8231 8235 8237 8241 8245 8247 8251 8253 8255 8257 8259 
//8263 8267 8269 8271 8273 8283 8287 8291 8293

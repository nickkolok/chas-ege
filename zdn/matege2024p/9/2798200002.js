(function() { 'use strict'; retryWhileError(function() {

	let v=sl(20, 300, 0.01);//скорость
	let l=sl(50, 3000, 0.1);//путь
	let a=500*v*v/l;//ускорение

	genAssertZ1000(a,'ускорение слишком дробное');
	genAssert(a<25000,'ускорение слишком большое');

	let the_vehicleRacingOnRoad = sklonlxkand(['автомобиль','мотоцикл','велосипед','электросамокат','гироскутер','мотоциклист','велосипедист','гонщик','грузовик','автомобилист'].iz());
	let the_RacingRoad = ['шоссе','дороги','трассы'].iz();
	let the_orderToFind = decor.orderToFind.iz();
	let formula=' Скорость '+['','$v$ в конце пути '].iz()+['находится','определяется','вычисляется'].iz()+' по формуле $v = \\sqrt{2la}$, где $l$ — пройденный ' + the_vehicleRacingOnRoad.te +' путь. ';

	NAtask.setTask({
		text:
			the_vehicleRacingOnRoad.ie.toZagl() +' разгоняется на прямолинейном участке '+the_RacingRoad+' с постоянным ускорением',
		questions: [
			// {
			// 	text: ' $a$ км/ч${}^2$.'+ formula +
			// 		the_orderToFind.toZagl() +' ускорение, с которым должен двигаться ' + the_vehicleRacingOnRoad.ie +', '+
			// 		'чтобы, проехав '+[chislitlx(l, 'метр'), l +' м',chislitlx(l/1000, 'километр'), (l/1000) +' км'].iz()+', приобрести скорость ' + v + ' км/ч. '+
			// 		'Ответ выразите в км/ч${}^2$.',
			// 	answers: a,
			// },
			{
				text: ' $a$ = '+a+' км/ч${}^2$.'+ formula +
					the_orderToFind.toZagl() +', сколько километров проедет ' + the_vehicleRacingOnRoad.ie +' к моменту, когда он разгонится до скорости '+v+' км/ч.',
				answers: l/1000,
			}
		],
		authors: ['Aisse-258'],
	});
	NAtask.modifiers.allDecimalsToStandard();
}, 200000);})();
/* РешуЕГЭ: 27982: 28331 28333 42479 42483 500958 505445 513621 548380 656650
			28335 28337 28339 28341 42441 42443 42445 42447 42449 42451 42453
			42455 42457 42459 42461 42463 42465 42467 42469 42471 42473 42475
			42477 42481 510825  27987: 514183 523372 523397 28385 28387 28389
			28391 28393 28395*/

(function() {
	'use strict';
	NAinfo.requireApiVersion(0, 0);
		var dengnabenz = sluchch(30, 50, 0.1);
		var dengi = sluchch(2500, 10000, 100);
		var zalil = sluchch(5, 20);
		var kupil = sluchch(19, 99, 0.5);
		var mesto = ['бензоколонке', 'заправке', 'автозаправке'].iz();
		var napitok = ['воды', 'сока', 'минеральной воды'].iz();
		var benzin = zalil * (dengnabenz * 100); // столько залили бензина в копейках
		var napitvkop = kupil * 100; //  стоймость напитка в копейках
		var dengikop = dengi * 100; // деньги имеющиеся на руках в копейках
		var rashod = benzin + napitvkop; // потраченые деньги в копейках
		var sdacha = dengikop - rashod; // сдача в копейках
		var rezrub = sdacha / 100; // переводим в рубли  
		var gitkostt = ['бензина', 'солярки', 'масла'].iz();
	NAtask.setTask({
		text: 'На ' + mesto + ' один литр ' + gitkostt + ' стоит ' + chislitlx(dengnabenz.floor(), 'рубль') +
		(' ' + chislitlx((dengnabenz * 100) % 100, 'копейка')).esli((dengnabenz * 100) % 100) +
		'. Водитель залил в бак ' + chislitlx(zalil, 'литр') + ' ' + gitkostt + ' и взял бутылку ' + napitok + 'за' +
		 chislitlx(kupil.floor(), 'рубль') + (' ' +
		chislitlx((kupil * 100) % 100, 'копейка')).esli((kupil * 100) % 100) + '.' +
		' Сколько рублей сдачи он получит с ' + chislitlx(dengi, 'рубль') + '?',
		answers: rezrub,     
	});
})();


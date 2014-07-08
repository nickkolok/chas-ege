(function(){

function Downloader(name, file_size, download_time) {
	this.name = name;
	this.file_size = file_size;
	this.download_time = download_time;
	this.get_download_speed = function() {
		return this.file_size / this.download_time;
	}
}

var PEOPLE_COUNT = 3;

var names = [ "Вася", "Миша", "Никита", "Тарас", "Саша", "Петя" ].iz(PEOPLE_COUNT);
var people = [ ];

var NAME_SHIFT = names.length / PEOPLE_COUNT;
for (var i = 0; i < PEOPLE_COUNT; i++) {
	people.push(new Downloader(names[i], 2 .pow(sl(4, 6)), sl(1, 6) * 10));
}

var required_file_size = sl(5, 15) * 50;

var speed = -1;

for (i = 0; i < people.length; i++) {
	if (speed < people[i].get_download_speed())
		speed = people[i].get_download_speed();
}

window.vopr.txt = people[0].name + ' загружает на свой компьютер из Интернета файл размером ' + people[0].file_size +
                  ' Мб за ' + people[0].download_time + ' секунд. ' + people[1].name + ' загружает файл размером ' +
                  people[1].file_size + ' Мб за ' + people[1].download_time + ' секунд, а ' + people[2].name +
                  ' загружает файл размером ' + people[2].file_size+ ' Мб за ' + people[2].download_time + ' секунд.' +
                  'Сколько секунд будет загружаться файл размером ' + required_file_size + ' Мб на компьютер с наибольшей скоростью загрузки?';

window.vopr.ver = [ required_file_size / speed ];

})()
//Обзад 77363
// Sergey Naumov aka DrMGC <drmgc@yandex.ru>

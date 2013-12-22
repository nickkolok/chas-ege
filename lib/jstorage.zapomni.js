/*
Атрибуты (HTML5-data-)
* data-jstorage-id - идентификатор элемента в jStorage. Обязателен!
* data-jstorage-ne - не отслеживать (через пробел)
* 	zn - значение
* 	vi - видимость
* 	ih - innerHTML
*/

/*
Attributes (HTML5-data-)
* data-jstorage-id - identifier to link the element in jStorage with. Necessary!
* data-jstorage-ne - do not track (divided by space)
* 	zn - value
* 	vi - visibility
* 	ih - innerHTML
*/

//Загрузить данные
//Load data
$.jStorage.zagrData=function(){'use strict';
	var storedData=$.jStorage.get('data-jstorage');
	if(!storedData)
		return;
	[].slice.call(document.querySelectorAll('*[data-jstorage-id]'),0).map(
		function(th){'use strict';
			try{
				var stor=storedData[th.getJStorageId()];
				if(stor){
					var ne=th.getAttribute('data-jstorage-ne');
					ne=ne?ne:'';
					if(!ne.match('zn')){
						th.checked=stor.checked;
						th.value=stor.value;
					}
					if(!ne.match('ih'))
						th.innerHTML=stor.innerHTML;
					if(!ne.match('vi'))
						th.style.display=stor.style.display;
				}
			}catch(e){
				console.log(th,' - ошибка в jStorage.zapomni');
				console.log(th,' - error in jStorage.zapomni');
			}
		}
	);
};

//Сохранить данные
//Save data
$.jStorage.sohrData=function(){'use strict';
	var storedData=$.jStorage.get('data-jstorage');
	if(!storedData)
		storedData={};
	[].slice.call(document.querySelectorAll('*[data-jstorage-id]'),0).map(
		function(th){'use strict';
			try{
				var jstid=th.getJStorageId();
				var stor=storedData[jstid];
				if(!stor){
					storedData[jstid]={};
					stor=storedData[jstid];
				}
				var ne=th.getAttribute('data-jstorage-ne');
				ne=ne?ne:'';
				if(!ne.match('zn')){
					stor.checked=th.checked;
					stor.value=th.value;
				}
				if(!ne.match('ih'))
					stor.innerHTML=th.innerHTML;
				if(!stor.style)
					stor.style={};
				if(!ne.match('vi'))
					stor.style.display=th.style.display;
			}catch(e){
				console.log(th,' - ошибка в jStorage.zapomni');
				console.log(th,' - error in jStorage.zapomni');
			}
		}
	);
	$.jStorage.set('data-jstorage',storedData)
};

HTMLElement.prototype.getJStorageId=function(){'use strict';
	return this.getAttribute('data-jstorage-id');
}

//Объявили свой метод у HTMLElement.prototype - сделаем его неперечислимым
//Since we have created a new method in HTMLElement.prototype , we should make the method unenumerable
Object.defineProperty(HTMLElement.prototype, "getJStorageId", { enumerable: false });

/*
Атрибуты (HTML5-data-)
* data-jstorage-id - идентификатор элемента в jstorage. Обязателен!
* data-jstorage-otsl - что отслеживать (через пробел)
* 	zn - значение
* 	vi - видимость
* 	ih - innerHTML
*/

$.jStorage.zagrData=function(){
	var allTracked;
	
	var storedData=$.jStorage.get('data-jstorage');
	if(!storedData)
		return;
	$('[data-jstorage-id][data-jstorage-otsl]').each(
		function(){
			if(storedData[this.getJStorageId]){
				var chto=this.getAttribute('data-jstorage-otsl');
				if(!chto)
					return;
				if(chto.!=undefined){
				
				}
				
			}
		}
	);
};

HTMLElement.prototype.getJStorageId=function(){
	return this.getAttribute('data-jstorage-id');
}

function getJStorageId(){
	return this.getAttribute('data-jstorage-id');
}

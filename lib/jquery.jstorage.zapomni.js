/*
Атрибуты (HTML5-data-)
* data-jstorage-id - идентификатор элемента в jstorage. Обязателен!
* data-jstorage-ne - не отслеживать (через пробел)
* 	zn - значение
* 	vi - видимость
* 	ih - innerHTML
*/

$.jStorage.zagrData=function(){
	
	var storedData=$.jStorage.get('data-jstorage');
	if(!storedData)
		return;
	$('[data-jstorage-id]').each(
		function(){
			try{
				var stor=storedData[this.getJStorageId()];
				if(stor){
					var ne=this.getAttribute('data-jstorage-ne');
					ne=ne?ne:'';
					if(!ne.match('zn')){
						this.checked=stor.checked;
						this.value=stor.value;
					}
					if(!ne.match('ih'))
						this.innerHTML=stor.innerHTML;
					if(!ne.match('vi'))
						this.style.display=stor.style.display;
				}
			}catch(e){
				console.log(this,' - ошибка в jStorage.zapomni');
			}
		}
	);
};


$.jStorage.sohrData=function(){
	
	var storedData=$.jStorage.get('data-jstorage');
	if(!storedData)
		storedData={};
	$('[data-jstorage-id]').each(
		function(){
			try{
				var jstid=this.getJStorageId();
				var stor=storedData[jstid];
				if(!stor){
					storedData[jstid]={};
					stor=storedData[jstid];
				}
				var ne=this.getAttribute('data-jstorage-ne');
				ne=ne?ne:'';
				if(!ne.match('zn')){
					stor.checked=this.checked;
					stor.value=this.value;
				}
				if(!ne.match('ih'))
					stor.innerHTML=this.innerHTML;
				if(!stor.style)
					stor.style={};
				if(!ne.match('vi'))
					stor.style.display=this.style.display;
			}catch(e){
				console.log(this,' - ошибка в jStorage.zapomni');
			}
		}
	);
	$.jStorage.set('data-jstorage',storedData)
};

HTMLElement.prototype.getJStorageId=function(){
	return this.getAttribute('data-jstorage-id');
}

'use strict';
/*Функции, использующие jquery и другие внешние библиотеки*/

function allCanvasToBackgroundImage(){
	$('canvas').each(function(){
		if(!this.style.backgroundImage)
			this.style.backgroundImage='url('+this.toDataURL()+')';
//		this.width=this.width;
	});
}

function spoiler(){
	$('.spoiler-body').hide();
	$('.spoiler-hide').hide();
	$('.spoiler-show').show();
	$('.spoiler-show').click(function(){
		$(this).next().toggle();
		$(this).next().next().slideToggle();
		$(this).hide();
	});
	$('.spoiler-hide').click(function(){
		$(this).next().slideToggle();
		$(this).prev().toggle();
		$(this).hide();
	});
}

function allLinksToBlankTarget(){
	$('a').each(function(){
		this.dataOldTarget=this.target;
		this.target="_blank";
	});
}

function restoreLinksTarget(){
	$('a').each(function(){
		this.target=this.dataOldTarget;
	});
}

function innerHTMLtoImg(elem){
	html2canvas(elem, {
		onrendered: function(canvas) {
			var img=document.createElement('img');
			img.src=canvas.toDataURL();
			img.width=canvas.width;
			img.height=canvas.height;
			elem.innerHTML='';
			elem.appendChild(img);
		}
	});
}

function replaceWithImg(elem){
	html2canvas(elem, {
		onrendered: function(canvas) {
			var img=document.createElement('img');
			img.src=canvas.toDataURL();
			img.width=canvas.width;
			img.height=canvas.height;
			$(elem).replaceWith(img);
		}
	});
}

function allLinksToSpans(){
	$('a').each(function(){
		if(this.target=="_blank"){
			$(this).replaceWith('<span class="spanlink" onclick="linkSpan(\''+
				this.href.replace(/\/\/|https*:\/\//,'_')+'\',1);">'+this.innerHTML+'</span>');
		}else{
			$(this).replaceWith('<span class="spanlink" onclick="linkSpan(\''+
				this.href.replace(/\/\/|https*:\/\//,'_')+'\');">'+this.innerHTML+'</span>');
		}
	});
}

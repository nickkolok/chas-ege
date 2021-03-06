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
	$('.spoiler-body[data-already-inited!=true]').hide();
	$('.spoiler-hide[data-already-inited!=true]').hide();
	$('.spoiler-show[data-already-inited!=true]').show();
	$('.spoiler-show[data-already-inited!=true]').click(function(){
		$(this).next().toggle();
		$(this).next().next().slideToggle();
		$(this).hide();
	});
	$('.spoiler-hide[data-already-inited!=true]').click(function(){
		$(this).next().slideToggle();
		$(this).prev().toggle();
		$(this).hide();
	});

	$('.spoiler-body[data-already-inited!=true]').attr('data-already-inited', true);
	$('.spoiler-show[data-already-inited!=true]').attr('data-already-inited', true);
	$('.spoiler-hide[data-already-inited!=true]').attr('data-already-inited', true);
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

function createImgFromCanvas(canvas){
	var img=document.createElement('img');
	img.src=canvas.toDataURL();
	img.width=canvas.width;
	img.height=canvas.height;
	img.float=canvas.float;
	img.style=canvas.style;
	return img;
}


function replaceWithImg(elem, callback){
	html2canvas(elem, {
		onrendered: function(canvas) {
			var img = createImgFromCanvas(canvas);
			$(elem).replaceWith(img);
			if(callback){
				callback(img);
			}
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

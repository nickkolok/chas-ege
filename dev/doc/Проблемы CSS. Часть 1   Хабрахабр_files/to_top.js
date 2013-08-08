/**
 * В этом файле описан функционал, который добавляет панель в левую часть сайта, которая позволяет промотать экран вверх.
 */


$(function() {

	window.last_scroll_position = 0;
	
	var show = false
	var close_button = g_is_guest ? '<div class="close_panel" title="Убрать панель прокрутки"><span class="close dotted">убрать</span></div>' : ''
	
	//console.log( g_is_guest , close_button)
	
	var to_top_button = $('<div class="to_top" ><div class="to_top_panel" ><div class="to_top_button" title="Наверх"><span class="arrow">&uarr;</span> <span class="label">наверх</span></div>  '+ close_button +'</div></div>')	
		
	$('body').append(to_top_button);
	
	// наверх
	$('.to_top_panel', to_top_button).click(function(){
		if(to_top_button.hasClass('has_position')){
			to_top_button.removeClass('has_position');
			$('.to_top_button .arrow', to_top_button).html('&uarr;');
			$('.to_top_button .label', to_top_button).html('наверх');
			$.scrollTo( window.last_scroll_position , 100,  { axis: 'y' } );
			window.last_scroll_position = 0;
		}else{
			to_top_button.addClass('has_position');
			$('.to_top_button .arrow', to_top_button).html('&darr;');
			$('.to_top_button .label', to_top_button).html('вниз');
			window.last_scroll_position = window.pageYOffset;
			$.scrollTo( $('body') , 100,  { axis: 'y' } );
		}
	})
	
	// закрыть
	$('.close_panel', to_top_button).click(function(){
		$.post('/json/settings/disable_scrollup/', { 'action': 'disable' }, function(json){
			if(json.messages == 'ok'){
				$('.to_top').remove()
				$.jGrowl('Панель отключена. Вы можете настроить показ панели в <a href="/settings/others/">настройках</a>.', { sticky: true })
			}else{
				show_system_error(json)
			}
		})
		return false;
	})
	

	var last_position = 0;
		      
	$(window).scroll(function () {   
		show_or_hide()
		if( last_position < window.pageYOffset){
			//console.log('скролл вниз', last_position , window.pageYOffset);
			if( to_top_button.hasClass('has_position') ){
				//to_top_button.removeClass('has_position');
				//$('.to_top_button .arrow', to_top_button).html('&uarr;');
				//$('.to_top_button .label', to_top_button).html('наверх');
				//to_top_button.hide()
				show = false
			}
		}else{
			//console.log('скролл вверх', last_position , window.pageYOffset);
		}
		last_position = window.pageYOffset;
	})
	

	function show_or_hide(){
		if( window.pageYOffset > 400){
			if(!show){
				to_top_button.show()
				to_top_button.removeClass('has_position');
				$('.to_top_button .arrow', to_top_button).html('&uarr;');
				$('.to_top_button .label', to_top_button).html('наверх');
				show = true
			}
		}else{
			if(show && !to_top_button.hasClass('has_position')){
				to_top_button.hide()
				show = false
			}
		}
	}


	show_or_hide()
	
});
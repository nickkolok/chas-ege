$(document).ready(function(){

	/**
	 * Если пользователь установил фокус на инпут или текстовое поле, то необходимо отключить хоткей, что бы он спокойно мог вводить текст.
	 */
	var shortcuts_enabled = true
	$('input,textarea,select').live('focus', function(){
		shortcuts_enabled = false
	})
	$('input,textarea,select').live('blur', function(){
		shortcuts_enabled = true
	})
	
	/**
	 * Нужно в зависимости от позиции скрола помечать пост как .focus 
	 */
	if($('.shortcuts_items').size()){
		var shortcuts_items = $('.shortcuts_items .shortcuts_item')
		$(window).scroll(function () {
			var active_start_position = window.pageYOffset + 0 // начало активной области (верхняя граница экрана + 10 пикселей)
			var active_end_position = window.pageYOffset + 50 // конец активной области (нижняя граница экрана - 10 пикселей)
			shortcuts_items.each(function(index, item){
				var shortcuts_item = $(item)
				var shortcuts_item_position =  shortcuts_item.offset().top + 20
				if( active_start_position < shortcuts_item_position && shortcuts_item_position < active_end_position){
					if( shortcuts_item.hasClass('focus')){
					}else{
						$('.shortcuts_items .shortcuts_item.focus').removeClass('focus')
						shortcuts_item.addClass('focus')
					}
				}
			})
		})
	}

	/**
	 * Горячие кнопки, нажатые в инпутах, текстовых полях и тд.
	 */
	$('input, textarea').live('keydown', function (e) {

		if ( (e.altKey || e.ctrlKey || e.metaKey) && e.keyCode == 13) {
			
			e.preventDefault();
			var form = $(this).parents('form')
			$(document).trigger('shortcuts.submit_form', form) // Сабмит формы при нажатии ctrl || cmd || alt + Enter
		}else{
			if(shortcuts_enabled){
				shortcuts_enabled = false
			}

		}
	})
	
	
	$('body').live('keyup', function (e) {
	
		
		
		// нужно учитывать что в сочетании ctr + f событие не должно срабатывать.
		var not_meta_key = (!e.altKey && !e.ctrlKey && !e.metaKey  )
		
		if(shortcuts_enabled){
	
			/**
			 * Навигация по страницам. Используется на страницах с постраничным навигатором. (пагинатором)
			 */
			if ( (e.altKey || e.ctrlKey || e.metaKey) && e.which == 37) {
				e.preventDefault()
				$(document).trigger('shortcuts.to_prev_page') // ctrl || cmd || alt + Left arrow - переход к предыдущей странице
			}
			if ( (e.altKey || e.ctrlKey || e.metaKey) && e.which == 39) {
				e.preventDefault()
				$(document).trigger('shortcuts.to_next_page') // ctrl || cmd || alt + Right arrow - переход к следующей странице
			}
		}
	})
		
	/**
	 * Горячие кнопки нажатые на странице.
	 */
	$('body').keypress(function (e) {
	
		// нужно учитывать что в сочетании ctr + f событие не должно срабатывать.
		var not_meta_key = (!e.altKey && !e.ctrlKey && !e.metaKey  )
		

		
		if(shortcuts_enabled){
		
		
			/**
			 * Фокус на инпут поиска в шапке сайта
			 */
			if( e.which == 47 && not_meta_key ) { 
				e.preventDefault()
				$(document).trigger('shortcuts.focus_to_search')
			}
		
		
			/**
			 * Страницы со списком постов/вопросов/событий/хабов/результатов поиска и т.д.
			 */
			if( (e.which == 104 || e.which == 1088)  && not_meta_key ) {
				e.preventDefault()
				$(document).trigger('shortcuts.to_first_post')                // 72 - h - скрол на самый верх страницы, если мы уже вверху - переход к предыдущей странице
			}
			if( (e.which == 108 || e.which == 1076) && not_meta_key ) {
				e.preventDefault()
				$(document).trigger('shortcuts.to_last_post')                 // 76 - l - скрол на самый низ страницы, если мы уже внизу - переход к следующей странице			
			}
			if( (e.which == 106 || e.which == 1086) && not_meta_key ) {
				e.preventDefault()
				$(document).trigger('shortcuts.to_next_post')                 // 74 - j - переход к следующему элементу списка. если элемент последний - переход к следующей странице			
			}
			if( (e.which == 107 || e.which == 1083) && not_meta_key ) {
				e.preventDefault()
				$(document).trigger('shortcuts.to_prev_post')                 // 75 - k - переход к предыдущему элементу списка. если элемент последний - переход к предыдущей странице			
			}
			if( (e.which == 111 || e.which == 1097 ) && not_meta_key ) {
				e.preventDefault()
				$(document).trigger('shortcuts.open_post') // 79/13 - o - открыть текущий пост/вопрос/событие
			}
			
			/** 
			 * События для страницы со списком комментариев
			 */   
			if( (e.which == 99 || e.which == 1089) && not_meta_key ) {
				e.preventDefault()
				$(document).trigger('shortcuts.to_comment_form')              // 67 - c - переход к форме отправки комментария
			}
			if( (e.which == 116 || e.which == 1077) && not_meta_key ) {
				e.preventDefault()
				$(document).trigger('shortcuts.add_to_tracker')             // t - добавить в трекер
			}
			if( (e.which == 109 || e.which == 1100) && not_meta_key ) {
				e.preventDefault()
				$(document).trigger('shortcuts.subscribe_comments')             // m - присылать уведомления в почту
			}
			if( (e.which == 114 || e.which == 1082) && not_meta_key ) {
				e.preventDefault()
				$(document).trigger('shortcuts.refresh_comments')             // 82 - r - обновить/подгрузить комментарии
			}
			if( (e.which == 102 || e.which == 1072) && not_meta_key ) {
				e.preventDefault()
				$(document).trigger('shortcuts.to_next_unreaded_comment')             // 70 - f - перейти к следующему непрочитанному комменту
			}
		}
		
	});
	  
	/**
	 * Событие "присылать уведомления в почту".
	 * Срабатывает на всех страницах, где есть список комментов и галочка "присылать уведомления в почту".
	 * Для инициализации надо нажать 'm' в английской раскладке клавиатуры.
	 */
	$(document).bind('shortcuts.subscribe_comments', function(event, form){
		$('#subscribe_comments').trigger('click');
	})
	
	/**   
	 * Событие "добавить в трекер".
	 * Срабатывает на всех страницах, где есть список комментов и галочка "добавить в трекер".
	 * Для инициализации надо нажать 't' в английской раскладке клавиатуры.
	 */
	$(document).bind('shortcuts.add_to_tracker', function(event, form){
		$('#tracker_comments').trigger('click');
	})
	
	/**
	 * Событие "фокус на инпут в форме поиска в шапке сайта".
	 * Срабатывает на всех страницах, где есть поисковая форма.
	 * Для инициализации надо нажать '/' в английской раскладке клавиатуры.
	 */
	$(document).bind('shortcuts.focus_to_search', function(event, form){
		$('#search_form input[name="q"]').focus()
	})
	
	/**
	 * Событие "сабмит формы".
	 * Срабатывает на страницах, на которых есть формы.
	 * Для инициализации надо нажать 'ctrl || cmd || alt + Enter' в английской раскладке клавиатуры.
	 * Необходимо для отправки коммента по нажатия горячих клавиш.
	 */
	$(document).bind('shortcuts.submit_form', function(event, form){
		$('input[type="submit"],input.submit,input.edit', form).each(function(index, button){
			if($(button).hasClass('hidden')){
				// если кнопка скрыта - то ни чего делать не надо, курим кальян :)
			}else{
				// если кнопка не скрыта от пользователя (пока это все тока в редактировании комментов, но на будущее) сабмитим
				button.click();
			}
		})
	})
	
	/**
	 * Событие "перейти к следующей странице".
	 * Срабатывает на страницах, на которых есть пагинатор.
	 * Для инициализации надо нажать 'ctrl || cmd || alt + Right arrow' в английской раскладке клавиатуры.
	 */
	$(document).bind('shortcuts.to_next_page', function(){
		var url = $('#next_page').attr('href')
		if(typeof(url) !== 'undefined'){
			document.location.href = url
		}
	})
	
	
	/**
	 * Событие "перейти к предыдущей странице".
	 * Срабатывает на страницах, на которых есть пагинатор.
	 * Для инициализации надо нажать 'ctrl || cmd || alt + Left arrow' в английской раскладке клавиатуры.
	 */
	$(document).bind('shortcuts.to_prev_page', function(){
		var url = $('#previous_page').attr('href')
		if(typeof(url) !== 'undefined'){
			document.location.href = url
		}
	})
	
	
	
	
	/**
	 * Событие "перейти к первому посту".
	 * Срабатывает на страницах, на которых есть список постов, вопросов или событий.
	 * Для инициализации надо нажать 'h' в английской раскладке клавиатуры.
	 * Сдвигает экран к первому посту или переходит на предыдущую страницу (если вы находитесь на первом посте).
	 */
	$(document).bind('shortcuts.to_first_post', function(){
		var shortcuts_items = $('.shortcuts_items')
		if(shortcuts_items.size()){
			if( $('.shortcuts_item', shortcuts_items).first().hasClass('focus') ){
				$(document).trigger('shortcuts.to_prev_page')
			}else{
				$('.shortcuts_item.focus', shortcuts_items).removeClass('focus')
				$('.shortcuts_item', shortcuts_items).first().addClass('focus')
			}
			$.scrollTo( $('.shortcuts_item.focus', shortcuts_items) , 200,	{ axis: 'y' } );		
		}
	})
	/**
	 * Событие "перейти к последнему посту".
	 * Срабатывает на страницах, на которых есть список постов, вопросов или событий.
	 * Для инициализации надо нажать 'l' в английской раскладке клавиатуры.
	 * Сдвигает экран к последнему посту или переходит на следующую страницу (если вы находитесь на последнем посте).
	 */
	$(document).bind('shortcuts.to_last_post', function(){
		var shortcuts_items = $('.shortcuts_items')
		if(shortcuts_items.size()){
			if( $('.shortcuts_item', shortcuts_items).last().hasClass('focus') ){
				$(document).trigger('shortcuts.to_next_page')
			}else{
				$('.shortcuts_item.focus', shortcuts_items).removeClass('focus')
				$('.shortcuts_item', shortcuts_items).last().addClass('focus')
			}
			$.scrollTo( $('.shortcuts_item.focus', shortcuts_items) , 200,	{ axis: 'y' } )
		}
	})
	
	/**
	 * Событие "перейти к следующему посту".
	 * Срабатывает на страницах, на которых есть список постов, вопросов или событий.
	 * Для инициализации надо нажать 'j' в английской раскладке клавиатуры.
	 * Сдвигает экран к следующему посту или переходит на следующюю страницу (если вы находитесь на последнем посте).
	 */
	$(document).bind('shortcuts.to_next_post', function(){
		var shortcuts_items = $('.shortcuts_items')
		if(shortcuts_items.size()){
			if( $('.shortcuts_item.focus', shortcuts_items).size() == 0){
				$('.shortcuts_item', shortcuts_items).first().addClass('focus')
			}else{
				var shortcuts_item = $('.shortcuts_item.focus', shortcuts_items)
				var next_shortcuts_item = shortcuts_item.next()
				if( next_shortcuts_item.size() == 0 ){
					$(document).trigger('shortcuts.to_next_page')
				}else{
					shortcuts_item.removeClass('focus')
					next_shortcuts_item.addClass('focus')
				}
						
			}
			$.scrollTo( $('.shortcuts_item.focus', shortcuts_items) , 200,	{ axis: 'y' } )
		}
	})
								
	
	/**
	 * Событие "перейти к предыдущему посту".
	 * Срабатывает на страницах, на которых есть список постов, вопросов или событий.
	 * Для инициализации надо нажать 'k' в английской раскладке клавиатуры.
	 * Сдвигает экран к предыдущему посту или переходит на предыдущую страницу (если вы находитесь на первом посте).
	 */
	$(document).bind('shortcuts.to_prev_post', function(){
		var shortcuts_items = $('.shortcuts_items')
		if(shortcuts_items.size()){
			if( $('.shortcuts_item.focus', shortcuts_items).size() == 0){
				$('.shortcuts_item', shortcuts_items).last().addClass('focus')
			}else{
				var shortcuts_item = $('.shortcuts_item.focus', shortcuts_items)
				var prev_shortcuts_item = shortcuts_item.prev()
				if( prev_shortcuts_item.size() == 0 ){
					$(document).trigger('shortcuts.to_prev_page')
				}else{
					shortcuts_item.removeClass('focus')
					prev_shortcuts_item.addClass('focus')
				}
			}
			$.scrollTo( $('.shortcuts_item.focus', shortcuts_items) , 200,	{ axis: 'y' } )
		}
	})
	
	/**
	 * Событие "открыть текущий пост"
	 * Срабатывает на страницах, на которых есть список постов, вопросов или событий.
	 * Для инициализации нужно нажать 'o' в английской раскладке клавиатуры или 'enter'.
	 * Открывает страницу с постом, вопросом или событием.
	 */
	$(document).bind('shortcuts.open_post', function(){
		if( $('.shortcuts_items').size() ){
			var url = $('.shortcuts_items .shortcuts_item.focus .post_title').attr('href')
			if(url) document.location.href = url
		}
	})
	
	
	/**
	 * Событие "перейти к форме комментария".
	 * Срабатывает на страницах, на которых есть форма комментирования.
	 * Для инициализации нужно нажать клавишу "с" в английской раскладке клавиатуры.
	 */
	$(document).bind('shortcuts.to_comment_form', function(){
		if($('#comments_form_placeholder').size()) {
			$.scrollTo( $('#comments_form_placeholder') , 200,	{ axis: 'y' } )
			$('#comment_text').focus()
		}
	})
	
	/**
	 * Событие "обновить список комментариев".
	 * Срабатывает на страницах, на которых есть форма комментирования.
	 * Работает аналогично нажатию кнопки REFRESH в xpanel
	 * Для инициализации нужно нажать клавишу "r" в английской раскладке клавиатуры.
	 */
	$(document).bind('shortcuts.refresh_comments', function(){
		if(g_show_xpanel){ 
			$('#xpanel .refresh').trigger('click')
		}
	})
	
	/**
	 * Событие "перейти к следующему непрочитанному комментарию".
	 * Срабатывает на страницах, на которых есть форма комментирования и список комментов
	 * Работает аналогично нажатию кнопки REFRESH в xpanel
	 * Для инициализации нужно нажать клавишу "r" в английской раскладке клавиатуры.
	 */
	$(document).bind('shortcuts.to_next_unreaded_comment', function(){
		if(g_show_xpanel){ 
			$('#xpanel .new').trigger('click')
		}
	})
	
})
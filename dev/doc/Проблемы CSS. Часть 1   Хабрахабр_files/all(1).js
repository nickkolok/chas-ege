function show_habralenta_settings_emulator(){
	$('#show_habralenta_settings').click();
	var block = $('#habralenta-settings');
	block.addClass('with_transition').css('box-shadow','0px 0px 10px #6DA3BD')
	setTimeout(function(){
		block.css('box-shadow','0px 0px 0px ')
	},1000);
	
	$.scrollTo(block, 800);
	
	
	return false;
}


$(document).ready(function(){
  

  
  /**
   * Fast Navigator
   */

   
  var navigator_category = $.jStorage.get('last_navigator_category')	
  var navigator_hubs = $.jStorage.get('last_navigator_hubs')
  var navigator_hub = $.jStorage.get('last_navigator_hub')

	//console.log('jStorage', navigator_category, navigator_hubs, navigator_hub)

  if( navigator_category ) {
  	$('#fast_navagator select[name="category"]').val(navigator_category)
  }
  if( navigator_hubs ) {
  	var hubs = '';
    for(k in navigator_hubs){
      hubs += '<option value="'+navigator_hubs[k].alias+'">'+navigator_hubs[k].name+'</option>';
    }
    $('#fast_navagator select[name="hub"]').html(hubs).attr('disabled', false);
    $('#fast_navagator input[type="submit"]').attr('disabled', false);
  }
  if( navigator_category ) {
  	$('#fast_navagator select[name="hub"]').val(navigator_hub);
  	$('#fast_navagator .buttons input').attr('disabled',false).removeClass('loading')
  }
  

  $('#fast_navagator select[name="category"]').change(function(){
    var alias = $(this).val();
    
    //console.log( alias )
    $.jStorage.set('last_navigator_category', alias)
    
    if(alias == 'null'){
    	$('#fast_navagator select[name="hub"]').html('<option>Хаб</option>').attr('disabled', true);
    }else{
	    $.post('/json/hubs/category/'+alias+'/', function(json){
	      if(json.messages=='ok'){
	        var hubs = '';
	        for(k in json.hubs){
	          hubs += '<option value="'+json.hubs[k].alias+'">'+json.hubs[k].name+'</option>';
	        }
	        $.jStorage.set('last_navigator_hubs', json.hubs);
	        $('#fast_navagator select[name="hub"]').html(hubs).attr('disabled', false);
	        $('#fast_navagator input[type="submit"]').attr('disabled', false);
	      }else{
	        show_system_error(json);
	      }
	    },'json');   
    }
  });
  
  $('#fast_navagator').submit(function(){
    var hub = $('#fast_navagator select[name="hub"]').val();
    $.jStorage.set('last_navigator_hub', hub)
    document.location.href = '/hub/'+hub+'/';
    return false;
  });
  
  
  
  
  
  
  /** 
   * Нравится/не нравится компания
   */
  $('#addCompanyFan').click(function(){
    var id = $(this).attr('data-id');
    var link = $(this);
  			link.addClass('loading');
    $.post('/json/corporation/fan_add/', {'company_id':id}, function(json){
      if(json.messages =='ok'){
        $('#removeCompanyFan').removeClass('hidden');
        $('#addCompanyFan').addClass('hidden'); 
        $('#fans_count').text(json.fans_count_str);       
      }else{
        show_system_error(json);
      }
      link.removeClass('loading');
    },'json');
    return false;
  });
  $('#removeCompanyFan').click(function(){
    var id = $(this).attr('data-id');
		var link = $(this);
  			link.addClass('loading');
      $.post('/json/corporation/fan_del/', {'company_id':id}, function(json){
        if(json.messages =='ok'){
          $('#removeCompanyFan').addClass('hidden');
          $('#addCompanyFan').removeClass('hidden');        
          $('#fans_count').text(json.fans_count_str);
        }else{
          show_system_error(json);
        }
        link.removeClass('loading');

      },'json');

    return false;
  });
  
  
  
  /**
   * Ниже расположен код для блока "Настройки ленты".
   * Кратко: при клике на ссылку "показать настройки" мы подгружаем список категорий аяксом.
   * При клике на категорию подгружаем список блогов аяксом.
   * В конце сабмитится форма с настройками :)
   */
  
  // Preload ajax loader
  var ajaxloader = $('<img src="/i/form/ajax_loader.gif" alt="" class="ajax_loader" align="top"/>');
  

  // global objects      
  var hubs_category = $('#hubs_category');
  var habralenta_settings = $('#habralenta-settings');
  var form_habralenta_settings = $('#form_habralenta_settings');
  var show_habralenta_settings = $('#show_habralenta_settings');
  var save_success = $('#save_success');
  
  /* lenta_blogs.tpl - Hide Settings - hide all categories */
  $('#hide_habralenta_settings').live('click', function(e){
    form_habralenta_settings.toggleClass('show');
    show_habralenta_settings.toggleClass('hide');    
    $.scrollTo(habralenta_settings, 800);
    return false;
  });
  
  /* lenta_blogs.tpl - Show Settings - show all categories */
  $('#show_habralenta_settings').live('click', function(e){
    save_success.removeClass('show');
    if( hubs_category.html() != '' ){
      form_habralenta_settings.toggleClass('show');
      show_habralenta_settings.toggleClass('hide');
      return false
    }else{
      $('a',show_habralenta_settings).after(ajaxloader)      
    }
    $.get('/json/hubs/categories/', function(json){
      
          var categorylist = '';
          $.each(json.categories, function(index, category) { 
                        
            var full = category.subscription == 2 ? 'full' : '';
            var part = category.subscription == 1 ? 'part' : '';
            var checkbox_title = category.subscription == 2 ? 'Отписаться от всех хабов в этой категории' : 'Подписаться на все хабы в этой категории';
            var url = (category.alias == 'corporative_blogs') ? '/companies/' : '/hubs/'+category.alias+'/';
            var disabled = (json.lenta_show_all || category.count == 0) ? 'disabled' : '';
            var have_new = category.have_new  ? ' <span class="new">'+category.have_new+'</span>' : '' ;
            var category_title = category.count > 0 ? '<a href="'+url+'" title="Нажмите, чтобы посмотреть хабы из этой категории">'+category.title+'</a>' : '<span class="category_title">'+category.title+'</span>' ;         
            
            categorylist += '<div class="category '+full+' '+part+' '+disabled+'" data-alias="'+category.alias+'">\
                               <div class="checkbox" title="'+checkbox_title+'"></div>\
                               <input type="hidden" name="categories['+category.alias+']" class="input" value="'+category.subscription+'" />\
                               <div class="title">\
                                 '+category_title+'\
                                 <span class="count" title="Количество хабов в категории">('+category.count+')</span>\
                                 '+have_new+'\
                               </div>\
                               <div class="hubs"></div>\
                             </div>';
                             
          });

          ajaxloader.remove();
          hubs_category.html(categorylist);
          form_habralenta_settings.toggleClass('show');
          show_habralenta_settings.toggleClass('hide');
          $(".lenta-tip").tipTip({maxWidth: "300", edgeOffset: 10});
          
          // set subscription settings
          if (typeof json.subscription != 'undefined' && json.subscription) {
              $('input[name="enable_subscription"]').prop('checked', true);
              $('select[name="subscription_frequency"]').val(json.subscription.frequency);
          };

          
          /* lenta_blogs.tpl - Blogs Category - show all blogs in category */
          $('.category .title a', hubs_category).live('click', function(){
            
            var node = $(this);
            var category = node.parent().parent('.category');
            var hubs = $('.hubs', category);
            var count = $('.title .count',category);
            var alias = category.attr('data-alias');
            
            if(category.hasClass('disabled')) return false;
 
            if(hubs.html()){
              hubs.toggleClass('show');
            }else{
              count.after(ajaxloader);
              
              $.get('/json/hubs/category/'+alias+'/', function(json){
                
                  var bloglist = '';
                  if( alias == 'corporative_blogs' ){
                    //bloglist += '<div class="description">Компании, которые мне нравятся &darr;</div>';
                  }
                  
                  
                  $.each(json.hubs, function(index, hub) { 
                  
                    if( category.hasClass('full') ){
                      hub.subscription = 1;                     
                    }else if( category.hasClass('part') ){
                      // если частично стоит - значит берем то что пришло с сервера.
                    }else{
                      hub.subscription = 0;
                    }
                    var subscription = hub.subscription ? 'subscription' : '';                    
                    var checkbox_title = hub.subscription ? 'Отписаться от хаба' : 'Подписаться на хаб';
                    var url = (alias == 'corporative_blogs') ? '/company/'+hub.alias+'/blog/' : '/hub/'+hub.alias+'/';
                    var is_new = hub.is_new ? ' <span class="new">новый</span>' : '' ;
                    bloglist += '<div class="hub '+subscription+'">\
                                   <div class="checkbox" title="'+checkbox_title+'"></div>\
                                   <input type="hidden" name="blogs['+hub.id+']" class="input" value="'+hub.subscription+'" />\
                                   <a href="'+url+'" target="_blank">'+hub.name+'</a>\
                                   '+is_new+'\
                                 </div>';
                  });

                  ajaxloader.remove();
                  hubs.html(bloglist);
                  hubs.toggleClass('show');
                  
                  
                  
                  
                  $('.hub a', hubs).click(function(){
                  		var node = $(this);
                      var hub = node.parent('.hub');
                      var category = hub.parent().parent('.category');
                      
                      if(category.hasClass('disabled')) return false;
                  	
                  });
                  
                  
                  // add click event to blog checkbox
                  
                  $('.hub .checkbox', hubs).click(function(){
                    
                      var node = $(this);
                      var hub = node.parent('.hub');
                      var category = hub.parent().parent('.category');
                      var hub_input = $('.input',hub);
                      var category_input = $('> .input',category);     

                      if(category.hasClass('disabled')) return false;
                                            
                      if( hub.hasClass('subscription') ){
                        hub.removeClass('subscription');
                        hub_input.val(0);
                      }else{
                        hub.addClass('subscription');
                        hub_input.val(1);
                      }
                      
                      // Здесь нужно проверить - сколько галочек в списке поставлено.
                      // Если все - то надо ставить для категории класс 'full'
                      // Если не все, но хотя бы одна - то класс 'part'
                      // Если не одной, то надо убирать у категории классы part или full.
                      var active_hubs = $('.subscription',hubs);
                      var all_hubs = $('.hub',hubs);
                                    
                      if( active_hubs.size() == 0 ){
                        category.removeClass('part').removeClass('full');
                        category_input.val(0);
                      }else if(active_hubs.size() == all_hubs.size()){
                        category.removeClass('part').addClass('full');
                        category_input.val(2);
                      }else{
                        category.removeClass('full').addClass('part');
                        category_input.val(1);
                      }
                    });
                },'json');
            }
            return false;
          });
          
          /* lenta_blogs.tpl - Category Checkbox */
          $('.category > .checkbox',hubs_category).live('click', function(){
          	
            var node = $(this);
            var category = node.parent('.category');
            var alias = category.attr('data-alias');
            var hubs = $('.hubs',category);
            var category_input = $('.input',category);
            
            if(category.hasClass('disabled')) return false;
            
            //console.log('event click category '+alias);
            
            if( category.hasClass('full') ){
              category.removeClass('full').removeClass('part');
              category_input.val(0);
              $('.hub',hubs).removeClass('subscription');
              $('.hub .input',hubs).val(0);
            }else if( category.hasClass('part') ){
              category.removeClass('part').addClass('full');
              category_input.val(2);
              $('.hub',hubs).addClass('subscription');
              $('.hub .input',hubs).val(1);
            }else{
              category.addClass('full');
              category_input.val(2);
              $('.hub',hubs).addClass('subscription');
              $('.hub .input',hubs).val(1);
            }
            return false;
          });
       },'json');
      return false;
  });
  
  ///////// SAVE FORM
  
  $('#form_habralenta_settings').ajaxForm({
  	form: $('#form_habralenta_settings'),
    url: '/json/hubs/save_subscriptions/',		
    beforeSubmit: ajaxFormBeforSubmit,
		error: ajaxFormError,
    success: ajaxFormSuccess(function(json, statusText, xhr, jqForm){
								$.jGrowl('Настройки ленты успешно сохранились');
								document.location.reload(); 
						})
  });











  // subscription settings
  if (window.location.hash == '#subscription_settings') {
      $.scrollTo('#show_habralenta_settings');
      $('#show_habralenta_settings').click();
      /*$('#habralenta-settings').animate({opacity: 0.2}, 1500, function() {
          $('#habralenta-settings').animate({opacity: 1.0}, 1500);
      });*/
  };


});
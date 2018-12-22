$( document ).ready(function() {
    $("#btn").click(function(){
		if (validateForm()){
			return false;
			};
		AddComment( "ajax_form", "form.php");
		});

	$(".del_comment").click(function(){
		var id = $(this).attr('id');
		DelComment(id);
		});	
	});



	
function DelComment(id) {

    $.ajax({
        url:     'form.php', //url страницы (form.php)
        type:     "POST", //метод отправки
        dataType: "html", //формат данных
        data: {id:id},  // Присваиваем id
		success: function(){

			$("#comment-"+id).fadeOut("slow");
			
			 }
			})
		}	



 
function AddComment( ajax_form, url) {
    $.ajax({
        url:     url, //url страницы (form.php)
        type:     "POST", //метод отправки
        dataType: "html", //формат данных
        data: $("#"+ajax_form).serialize(),  // Сеарилизуем объект
		success: function(html){
			$("#result").html(html).fadeIn("slow");
			$("#name").val('');
			$("#email").val('');
			$("#text").val('');
			$("#btn").after('<span class="text-error for-btn">Комментарий добавлен!</span>');
			$(".for-btn").css({top: $("#btn").position().top + $("#btn").outerHeight() + 2,'color':'red'});
			$(".for-btn").fadeOut("slow");
		}
 	});
}


function validateForm() {
	$(".text-error").remove();
	
	// Проверка логина    
	var el_l    = $("#name");
	if ( el_l.val().length < 4 ) {
	  var v_login = true;
	  el_l.after('<span class="text-error for-name">Имя должно быть больше 3 символов</span>');
	  $(".for-name").css({top: el_l.position().top + el_l.outerHeight() + 2,'color':'red'});
	} 
	$("#name").toggleClass('error', v_login );
	
	// Проверка e-mail
	
	var reg     = /^\w+([\.-]?\w+)*@(((([a-z0-9]{2,})|([a-z0-9][-][a-z0-9]+))[\.][a-z0-9])|([a-z0-9]+[-]?))+[a-z0-9]+\.([a-z]{2}|(com|net|org|edu|int|mil|gov|arpa|biz|aero|name|coop|info|pro|museum))$/i;
	var el_e    = $("#email");
	var v_email = el_e.val()?false:true;
  
	if ( v_email ) {
	  el_e.after('<span class="text-error for-email">Поле e-mail обязательно к заполнению</span>');
	  $(".for-email").css({top: el_e.position().top + el_e.outerHeight() + 2,'color':'red'});
	  
	} else if ( !reg.test( el_e.val() ) ) {
	  v_email = true;
	  el_e.after('<span class="text-error for-email">Вы указали недопустимый e-mail</span>');
	  $(".for-email").css({top: el_e.position().top + el_e.outerHeight() + 2,'color':'red'});
	}
	$("#email").toggleClass('error', v_email );
	
	
	// Проверка текста комментария    
	var text    = $("#text");
	if ( text.val().length < 1 ) {
	  var v_text = true;
	  text.after('<span class="text-error for-text">Запрещено пустое сообщение</span>');
	  $(".for-text").css({top: text.position().top + text.outerHeight() + 2,'color':'red'});
	} 
	$("#text").toggleClass('error', v_text );
	return ( v_login || v_email || v_text );
}
   
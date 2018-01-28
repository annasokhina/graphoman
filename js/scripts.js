$(document).ready(function() {
	$("a.scroll").click(function(){
		elementClick = $(this).attr("href");
		destination = $(elementClick).offset().top;
		$("html:not(:animated),body:not(:animated)").animate({scrollTop: destination}, 1100);
		return false;
	});
});

$(document).ready(function(){
	$(window).scroll(function () {
		if ($(this).scrollTop() > 0) {
			$('#totop').fadeIn();
		} else {
			$('#totop').fadeOut();
		}
	});
$('#totop').click(function () {
	$('body,html').animate({scrollTop: 0}, 400); return false;});
});

$(document).ready(function(){
  $('.testimonials__slider').slick(
  	);
});

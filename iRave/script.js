
jQuery(document).ready(function(){
	const $clock = $('#clock')
	const $lockButton = $('#lockButton');
	const $lockScreen = $('.lockScreen');
	/*
	var x = $clock.width();
	$clock.css(
		{'height': x + 'px'}
	);	*/
	
	$lockButton.click(function(){
		$lockScreen.toggle();
	});
	
	$('#touchToUnlock').click(function(){
		$lockScreen.hide();
	});
	
});
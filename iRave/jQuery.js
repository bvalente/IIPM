
jQuery(document).ready(function(){
	const $clock = $('#clock')
	const $lockButton = $('#lockButton');
	const $lockScreen = $('.lockScreen');
	const $mainScreen = $('.mainScreen');
	
	
	$lockButton.click(function(){
		//hide everything else
		$clock.children().hide();
		$lockScreen.show();
	});
	
	$('#touchToUnlock').click(function(){
		$lockScreen.hide();
		//$mainScreen.show();
		showMenu();
	});
	
	function showMenu(){
		$('#mainWidget').css('display', 'inline-block');
	}
});
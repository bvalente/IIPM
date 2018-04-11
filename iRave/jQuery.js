
jQuery(document).ready(function(){
	const $clock = $('#clock')
	const $lockButton = $('#lockButton');
	const $lockScreen = $('.lockScreen');
	const $mainScreen = $('.mainScreen');
	var lock = true;
	
	
	$lockButton.click(function(){
		//hide everything else
		if(!lock){
			$clock.children().fadeOut();
			$lockScreen.show();
			$('#time').animate({top:'10vw', opacity:'1'}, "slow")
			lock = true;
		}
		
	});
	
	$('#touchToUnlock').click(function(){
		lock = false;
		$('#time').animate({top:'0vw',opacity:'0.1'}, "slow", function(){
			$lockScreen.fadeOut('fast');
		} );
		//$lockScreen.hide();
		//$mainScreen.show();
		showMenu();
	});
	
	function showMenu(){
		//$('#mainWidget').css('display', 'inline-block');
		$('.mainScreen').fadeIn("slow");
	}
});

jQuery(document).ready(function(){
	const $lockButton = $('#lockButton');
	const $time = $('#time');
	
	
	
	
	$lockButton.click(function(){
		$time.toggle();
	});
	
});
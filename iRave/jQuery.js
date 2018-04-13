jQuery(document).ready(function(){
	const clock = $('#clock');
	const $lockButton = $('#lockButton');
	const $lockScreen = $('.lockScreen');
	const $mainScreen = $('.mainScreen');
	const MAIN_MENU = 0;
	const FRIEND_LIST = 1;
	const FRIEND_VIEW = 2;
	var lock = true;
	var menu = 0;

	function lockScreen(){
		if(!lock){
			clock.children().fadeOut();
			$('.lockScreen').fadeIn("fast");
			$('#time').animate({top:'0.4in', opacity:'1'}, "slow");
			lock = true;
		}
	}
	
	function unLockScreen(){
		lock = false;
		$('#time').animate({top:'0in', opacity:'0.1'}, "slow");
		loadMainMenu();
	}
	
	function loadMainMenu(){
		clock.children().fadeOut(function(){
			$('.mainScreen').fadeIn();
		});
	}

	$lockButton.click(function(){
		//hide everything else
		lockScreen();
	});

	$('#touchToUnlock').click(function(){
		unLockScreen();
	});



	$('#mainWidget').click(function(){
		$('.friends').fadeIn();
		$('.mainScreen').fadeOut();
		menu = FRIEND_LIST;
	});
	

	$('#back').click(function(){
		$('.friends').fadeOut();
		$('.mainScreen').fadeIn();
		switch(menu){
			case 2://friend view, load friendList
				loadFriendsList();
				menu = FRIEND_LIST;
				break;
			case 1://friendList, load main menu
				loadMainMenu();
				menu = FRIEND_VIEW;
				break;
			default: //error, load main menu
				loadMenu();
				menu = MAIN_MENU;
				break;
				   }
	});

	$('.friends#friend').click(function(){
		$('.friends#friend').fadeOut(function(){
			$('.friendFunctions').fadeIn();
		});
		
	});
});

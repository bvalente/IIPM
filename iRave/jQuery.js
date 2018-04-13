jQuery(document).ready(function(){
	const clock = $('#clock');
	const $lockButton = $('#lockButton');
	const $lockScreen = $('.lockScreen');
	const $mainScreen = $('.mainScreen');
	const LOCK_SCREEN = 0;
	const MAIN_MENU = 1;
	const FRIEND_LIST = 2;
	const FRIEND_VIEW = 3;
	var lock = true;
	var menu = 0;

	function lockScreen(){
		if(!lock){
			clock.children().fadeOut();
			$('.lockScreen').fadeIn("fast");
			$('#time').animate({top:'0.4in', opacity:'1'}, "slow");

		}
		lock = true;
		menu = LOCK_SCREEN;
	}

	function unLockScreen(){
		lock = false;
		menu = LOCK_SCREEN;
		$('#time').animate({top:'0in', opacity:'0.1'}, "slow", function(){
			clock.children().fadeOut(function(){
				$('.mainScreen').fadeIn();
			});
		});

	}

	function loadMainMenu(){
		menu = MAIN_MENU;
		mutex = true;
		clock.children().fadeOut();
		$('.mainScreen').fadeIn();
	}

	function loadFriendsList(){
		menu = FRIEND_LIST;
		clock.children().fadeOut("fast");
		$('.friends').delay("fast").fadeIn();
	}

	$lockButton.click(function(){
		lockScreen();
	});

	$('#touchToUnlock').click(function(){
		unLockScreen();
	});


	$('#mainWidget').click(function(){
		loadFriendsList();
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

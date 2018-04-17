jQuery(document).ready(function(){
	const clock = $('#clock');
	const $lockButton = $('#lockButton');
	const $lockScreen = $('.lockScreen');
	const $mainScreen = $('.mainScreen');
	const subMenus = $('.subMenus');
	const LOCK_SCREEN = 0;
	const MAIN_MENU = 1;
	const FRIEND_LIST = 2;
	const FRIEND_MENU = 3;
	const NOT_VIEW = 4;

	var lock = true;
	var menu = 0;
	var mutex = false; //true if blocked

	function lockScreen(){
		console.log('Locked')
		if(!lock){
			console.log('in if')
			clock.children().fadeOut();
			$('.lockScreen').fadeIn("fast");
			$('#time').animate({top:'0.4in', opacity:'1'}, "slow");

		}
		lock = true;
		menu = LOCK_SCREEN;
	}

	function unLockScreen(){
		lock = false;
		menu = MAIN_MENU;
		$('#time').animate({top:'0in', opacity:'0.1'}, "slow", function(){
			clock.children().fadeOut("fast");
			$('.mainScreen').delay("fast").fadeIn();
		});
	}

	function loadMainMenu(){
		if(mutex) return;
		mutex = true;

		menu = MAIN_MENU;
		clock.children().fadeOut("fast");
		$('.mainScreen').delay("fast").fadeIn();

		mutex = false;
	}

	function loadFriendsMenu(){ //after unlock screen

		if(mutex) return;
		mutex = true;
		if (menu == FRIEND_LIST){
			subMenus.children().not("#back").fadeOut("fast");
			$('.friendsMenu').delay("fast").fadeIn();
		}
		else {
			console.log("cer");
			$mainScreen.delay("fast").fadeOut();
			
			$('#back').delay("fast").fadeIn();
			$('.friendsMenu').delay("fast").fadeIn();
		}

		menu = FRIEND_MENU;
		mutex = false;
	}

	function loadFriendsList(){ //after friends menu
		if(mutex) return;
		mutex = true;

		menu = FRIEND_LIST;

		subMenus.children().not("#back").fadeOut("fast");
		$('.friendsList').delay("fast").fadeIn();

		mutex = false;
	}

	function loadNotificationsMenu(){
		lock = false;
		if (mutex) return;
		mutex = true;
		menu = NOT_VIEW;

		console.log(menu);

		$('#time').animate({top:'0in', opacity:'0.1'}, "slow", function(){
			clock.children().fadeOut("slow");
			//add a delay
			$('.notificationsMenu').delay("slow").fadeIn();
			$('#back').delay("slow").fadeIn();
		});

		mutex = false;
	}

	$lockButton.click(function(){
		lockScreen();
	});

	$('#touchToUnlock').click(function(){
		unLockScreen();
	});

	$("#showLocation,#MeetingLocation").click(function(){
		loadFriendsList();
	});
	$('#mainWidget').click(function(){
		loadFriendsMenu();
	});

	$('#notificationsTab').click(function(){
		loadNotificationsMenu();
	});

	$('#back').click(function(){
		/*
		$('.friends').fadeOut();
		$('.mainScreen').fadeIn();
		*/
		console.log('menu is ' + menu)
		switch(menu){
			case FRIEND_MENU://friend MENU, load friendList
				loadMainMenu();
				break;
			case FRIEND_LIST://friendList, load main menu
				loadFriendsMenu();
				break;
			case NOT_VIEW:
				lockScreen();
				break;
			default: //error, load main menu
				console.log('defaulted')
				loadMainMenu();
				break;
				   }
	});
});

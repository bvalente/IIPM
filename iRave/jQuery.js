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
	const OPT_MENU = 5;


	const SHARE = 10;
	const MEET = 11;

	var option = null;
	var lock = true;
	var menu = 0;
	var mutex = false; //true if blocked

	function lockScreen(){
		console.log('Locked')
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
		menu = MAIN_MENU;
		$('#time').animate({top:'0in', opacity:'0.1'}, "slow", function(){
			clock.children().fadeOut("fast");
			$('.mainScreen').delay("fast").fadeIn();
		});
	}

	function loadOptionShare(){
		if(mutex) return;
		mutex = true;
		menu = OPT_MENU;

		subMenus.children().fadeOut("fast");
		$('#shareMessage').delay("fast").fadeIn();
		$("#doneButton").delay("fast").fadeIn();
		mutex = false;

	}

	function loadOptionMeet(){
		if(mutex) return;
		mutex = true;

		menu = OPT_MENU;
		subMenus.children().not("#back").fadeOut("fast");
		$(".Map").delay("fast").fadeIn();

		mutex = false;
	}


	function loadMainMenu(){
		if(mutex) return;
		mutex = true;
		option = null;

		menu = MAIN_MENU;
		clock.children().fadeOut("fast");
		$('.mainScreen').delay("fast").fadeIn();

		mutex = false;
	}

	function loadFriendsMenu(){ //after unlock screen

		if(mutex) return;
		mutex = true;
		if (menu == FRIEND_LIST){ //In case of FriendsList and #BACK is pressed
			subMenus.children().not("#back").fadeOut("fast");
			$('.friendsMenu').delay("fast").fadeIn();
		}
		else if (menu == MAIN_MENU){ //MainWidget to menu of friends
			console.log("cer");
			$mainScreen.fadeOut("fast");
			$('.subMenus, .friendsMenu').delay("fast").fadeIn();
			$('#back').delay("fast").fadeIn();
			//$('.friendsMenu').delay("fast").fadeIn();

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

	$("#shareLocation").click(function(){
		option = SHARE;
		loadFriendsList();
	});
	$("#MeetingLocation").click(function(){
		option = MEET;
		loadFriendsList();
	});
	$('#mainWidget').click(function(){
		loadFriendsMenu();
	});

	$('#notificationsTab').click(function(){
		loadNotificationsMenu();
	});

	$(".friendsList").click(function(){//
		if (option == SHARE){
			loadOptionShare();
		}
		else if (option == MEET) {
			loadOptionMeet();
		}
		else{
			console.log("error");
			loadMainMenu();
		}

	});

	$("#doneButton").click(function(){
		console.log("done");
		$("#doneButton").fadeOut();
		$("#shareMessage").fadeOut();
		loadMainMenu();
	});


	$('#back').click(function(){
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
			case OPT_MENU:
				loadFriendsList();
				break;
			default: //error, load main menu
				console.log('defaulted')
				loadMainMenu();
				break;
				   }
	});
});

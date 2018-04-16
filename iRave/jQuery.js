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
	var mutex = false; //true if blocked

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
		if(mutex) return;
		mutex = true;
		
		menu = MAIN_MENU;
		clock.children().fadeOut("fast");
		$('.mainScreen').delay("fast").fadeIn();
		
		mutex = false;
	}

	function loadFriendsList(){
		if (mutex) return;
		mutex = true;
		
		menu = FRIEND_LIST;
		clock.children().not("#back").fadeOut("fast");
		$('.friends').delay("fast").fadeIn();
		
		mutex = false;
	}
	
	function loadFriend( name ){
		if(mutex) return;
		mutex = true;
		
		menu = FRIEND_VIEW;
		$('.friends[id^=friend]').fadeOut("fast");
		//TODO
		$('#perfilImage').attr("src","resources/friend-" + name + ".png");
		$('.friendFunctions').delay("fast").fadeIn();
		
		mutex = false;
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
	
	$('.friends#friend1').click(function(){
		loadFriend("name1");
	});
	$('.friends#friend2').click(function(){
		loadFriend("name2");
	});
	$('.friends#friend3').click(function(){
		loadFriend("name3");
	});

	$('#back').click(function(){
		/*
		$('.friends').fadeOut();
		$('.mainScreen').fadeIn();
		*/
		switch(menu){
			case FRIEND_VIEW://friend view, load friendList
				loadFriendsList();
				break;
			case FRIEND_LIST://friendList, load main menu
				loadMainMenu();
				break;
			default: //error, load main menu
				loadMainMenu();
				break;
				   }
	});


});

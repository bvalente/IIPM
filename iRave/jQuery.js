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
		clock.children().fadeOut(function(){
			$('.mainScreen').fadeIn("slow");
			$('#time').animate({top:'0.4', opacity:'1'}, "slow")
		});
	}
	
	function loadMainMenu(){
		

	}

	$lockButton.click(function(){
		//hide everything else
		if(!lock){
			lockScreen();
			lock = true;
		}

	});

	$('#touchToUnlock').click(function(){
		lock = false;
		$('#time').animate({top:'0in',opacity:'0.1'}, "slow", function(){
			$lockScreen.fadeOut('fast');
		} );
		//$lockScreen.hide();
		//$mainScreen.show();
		showMenu();
	});



	$('#mainWidget').click(function(){
		$('.friends').fadeIn();
		$('.mainScreen').fadeOut();
		menu = friendsList;
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

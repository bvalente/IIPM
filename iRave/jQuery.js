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
	const NOTIFICATION = 6;

	const ASK = 9;
	const SHARE = 10;
	const MEET = 11;
	const MAP = 12;

	//mainWidget
	const BIG = 20;
	const SMALL = 21;

	var option = null;
	var lock = true;
	var menu = 0;
	var mutex = false; //true if blocked
	var friendsList = [];
	var mw = BIG;
	function lockScreen(){
		console.log('Locked')
		if(!lock){
			clock.children().fadeOut();
			$('.lockScreen').fadeIn("fast");
			$('#time').animate({top:'0.4in', opacity:'1'}, 0.7);

		}
		lock = true;
		menu = LOCK_SCREEN;
	}

	function unLockScreen(){
		lock = false;
		menu = MAIN_MENU;
		$('#time').animate({top:'0in', opacity:'0.1'}, 0.7, function(){
			clock.children().fadeOut("fast");
			$('.mainScreen').delay("fast").fadeIn();
		});

	}
	function loadMainMenu(){
		if(mutex) return;
		mutex = true;
		option = null;

		menu = MAIN_MENU;
		clock.children().fadeOut("fast");
		$('.mainScreen').delay("fast").fadeIn();
		console.log('load main menu');
		mutex = false;
	}
	function animateWidget(){
		console.log('click');
		console.log(mw);
		if(mw == BIG){
			$('#mainWidget').animate({
				width:'0.4in',
				height: '0.4in',
				position: 'absolute',
				top: '0.1in',
				left: '0.55in',
			});
			$('#notificationsWidget').animate({
				width:'0.8in',
				height: '0.8in',
				position: 'absolute',
				bottom:'0.1in',
				left: '0.35in',
			});
			mw = SMALL;
			console.log('now mw is ' + mw);
			return;
		}
		if(mw == SMALL){
			console.log('big');
			$('#notificationsWidget').animate({
				width:'0.4in',
				height: '0.4in',
				position: 'absolute',
				bottom: '0.1in',
				left: '0.55in',
			});
			$('#mainWidget').animate({
				width:'0.8in',
				height: '0.8in',
				position: 'absolute',
				top:'0.1in',
				left: '0.35in',
			});
			mw = BIG;
			return;

		}
	}

	$('#notificationsWidget').click(function(){
		if(mw==SMALL){
			loadNotificationsMenu();

		} else{
			animateWidget();
		}

	})
	$('#weather').click(function(){
		option = NOTIFICATION;
		$(".notificationsMenu").fadeOut("fast");
		$(".weatherNotification").delay("fast").fadeIn();
	})


	function loadFriendsMenu(){ //after unlock screen

		if(mutex) return;
		mutex = true;
		if (menu == FRIEND_LIST){ //In case of FriendsList and #BACK is pressed
			subMenus.children().not("#back").fadeOut("fast");
			$('.friendsMenu').delay("fast").fadeIn();
		}
		else if (menu == MAIN_MENU){ //MainWidget to menu of friends
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

		$('.check').css("display", "none");

		subMenus.children().not(".btn").fadeOut("fast");
		$('.friendsList').delay("fast").fadeIn();

		mutex = false;
	}
	function loadOptionShare(){
		if(mutex) return;
		mutex = true;

		subMenus.children().fadeOut("fast");
		$('#shareMessage').delay("fast").fadeIn();
		$(".doneButton").delay("fast").fadeIn();
		mutex = false;

	}
	function loadOptionMeet(){
		if(mutex) return;
		mutex = true;

		subMenus.children().not(".btn").fadeOut("fast");
		$(".Map").delay("fast").fadeIn();

		option = MAP;

		mutex = false;
	}
	function loadOptionMeetDone(){
		if(mutex) return;
		mutex = true;
		console.log("ehy");
		subMenus.children().fadeOut("fast");
		$('#meetMessage').delay("fast").fadeIn();
		$(".doneButton").delay("fast").fadeIn();
		document.getElementById("Pointer").style.display = "none";

		mutex = false;
	}
	function loadOptionAsk(){
		if(mutex) return;
		mutex = true;
		console.log("here");

		subMenus.children().fadeOut("fast");
		$('#askMessage').delay("fast").fadeIn();
		$(".doneButton").delay("fast").fadeIn();

		mutex = false;
	}
	function loadNotificationsMenu(){
		lock = false;
		if (mutex) return;
		mutex = true;
		menu = NOT_VIEW;

		console.log(menu);
		$('.Notification').hide();
		$('#time').animate({top:'0in', opacity:'0.1'}, "slow", function(){
			clock.children().fadeOut("slow");
			//add a delay
			$('.subMenus').delay("slow").fadeIn();
			$('.friendsMenu').hide();
			$('.notificationsMenu').delay("slow").fadeIn();
			$('#back').delay("slow").fadeIn();
		});

		mutex = false;
	}


	function point_it(event){ //after friends menu

		if(mutex) return;
		mutex = true;

		var x = event.clientX;
    	var y = event.clientY;
    	var point = document.getElementById("Pointer");
    	point.style.display = '';
    	point.style.position = 'absolute';
		/*
    	point.style.left = x - 300 + 'px';
    	point.style.top = y - 75 + 'px';
		*/
		var left1 = parseInt($('body').css("margin-left"));
		var left2 = parseInt($('#exterior').css("margin-left"));
		var top1 = parseInt($('#top').css('height'));
		var top2 = parseInt($('#back').css('height'));
		console.log(left1+':'+left2+':'+top1+':'+top2);
		point.style.left = x - (left1 + left2) + 'px';
		point.style.top = y - (top1 + top2) + 'px';

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
	$("#askLocation").click(function(){
		option = ASK;
		loadFriendsList();
	});
	$('#mainWidget').click(function(){
		console.log(mw + ': in function');
		if (mw == SMALL){
			animateWidget();
			return;
			console.log('did u return');
		}
		loadFriendsMenu();
	});

	$('#notificationsTab').click(function(){
		loadNotificationsMenu();
	});

	$('#mapImage').click(function(event){
		point_it(event);
	});

	$(".friendsList div").click(function(){
		var button = $('#'+this.id+' .check');
		var name = $('#'+this.id + ' .textf').text();
		var ID = this.id;
		//add friend clicked to array
		if (button.css("display") == "none"){
			friendsList.push(ID);

		} else {
			var index = friendsList.indexOf(ID);
			if (index > -1){
				friendsList.splice(index, 1);
			}
		}

		if (friendsList.length > 0){
			$('.btn').delay("fast").fadeIn();
			$('#next').fadeTo(0.4,1);
		} else if (friendsList.length == 0){
			$('#next').fadeTo(0.4,0.3);
		}
		console.log(friendsList);
		button.toggle();

	});

	$(".doneButton").click(function(){
		console.log("done");
		$(".doneButton").fadeOut();
		$(".message").fadeOut();
		//$(".").fadeOut()
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
				loadMainMenu();
				//lockScreen();
				break;

			case OPT_MENU:
				loadFriendsList();
				break;
			case ASK_MENU:
				loadFriendsMenu();
				break;
			case NOTIFICATION:
				//hide notification and show notificationsMenu
				loadNotificationsMenu();
				break;


			default: //error, load main menu
				console.log('defaulted')
				loadMainMenu();
				break;
				   }
	});

	$('#next').click(function(){

			if(friendsList.length == 0){return}//if no friend is checked

			switch(menu){
			case FRIEND_LIST:
				var i;
				for (i = 0; i < friendsList.length; i++) {
					var button = $('#'+friendsList[i]+' .check');
					button.toggle();
					delete friendsList[i];}
				if(option == SHARE){
					loadOptionShare();
				} else if (option == MEET) {
					loadOptionMeet();

				} else if (option == ASK) {
					loadOptionAsk();
				} else if (option == MAP) {
					loadOptionMeetDone();
				} else {
					loadMainMenu();
				}
				console.log(option);

				break;
			case OPT_MENU:


			default:
				console.log('Error');
				loadMainMenu();
				break;
		}

	});

	$('.box').change(function(){
		if($(this).is(":checked")){
			$('#next').show();
		} else if($(this).is(":not(:checked)")){
			$('#next').hide();
		}
	});
});

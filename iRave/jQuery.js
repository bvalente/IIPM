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
	const ARTIST = 6;
	const DAY_MENU = 7;
	const DAY_LIST = 8;
	const STAGE_MENU = 20;
	const STAGE_LIST = 21;
	const ARTIST_LIST = 22;
	const FAVOURITES = 23;

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
	var artistList = [];
	var favArtists = [];

	function lockScreen(){
		console.log('Locked')
		if(!lock){
			clock.children().fadeOut("fast");
			$('.lockScreen').delay("fast").fadeIn("fast");
			$('#time').delay("fast").animate({top:'0.4in', opacity:'1'}, 0.7);

		}
		lock = true;
		menu = LOCK_SCREEN;
	}

	function unLockScreen(){
		lock = false;
		menu = MAIN_MENU;
		$('#time').animate({top:'0in', opacity:'0.1'}, "fast");
		clock.children().fadeOut("slow");
		$('.mainScreen').delay("slow").fadeIn();
	}
	function loadMainMenu(){
		if(mutex) return;
		mutex = true;
		option = null;

		menu = MAIN_MENU;
		$('.subMenus').children().fadeOut("fast");//TODO teste
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
			},0.2);
			$('#artistWidget').animate({
				width:'0.8in',
				height: '0.8in',
				position: 'absolute',
				bottom:'0.1in',
				left: '0.35in',
			},0.2);
			mw = SMALL;
			return;
		}
		if(mw == SMALL){
			console.log('big');
			$('#artistWidget').animate({
				width:'0.4in',
				height: '0.4in',
				position: 'absolute',
				bottom: '0.1in',
				left: '0.55in',
			},0.2);
			$('#mainWidget').animate({
				width:'0.8in',
				height: '0.8in',
				position: 'absolute',
				top:'0.1in',
				left: '0.35in',
			},0.2);
			mw = BIG;
			return;

		}
	}

	$('#artistWidget').click(function(){
		menu = ARTIST;
		if(mw==SMALL){
			loadArtistMenu();
		} else{
			animateWidget();
		}

	});



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
		subMenus.children().fadeOut("fast");
		$('#meetMessage').delay("fast").fadeIn();
		$(".doneButton").delay("fast").fadeIn();
		document.getElementById("Pointer").style.display = "none";

		mutex = false;
	}
	function loadOptionAsk(){
		if(mutex) return;
		mutex = true;

		subMenus.children().fadeOut("fast");
		$('#askMessage').delay("fast").fadeIn();
		$(".doneButton").delay("fast").fadeIn();

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
		if (mw == SMALL){
			animateWidget();
			return;
		}
		loadFriendsMenu();
	});
	$('#notificationsTab').click(function(){
		lock =false;
		loadArtistMenu();
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
		/* ha varios casos que executam a mesma funçao
		nao e necessario fazermos um switch case tao comprido
		atençao à falta de breaks propositada
		*/
		console.log(menu);
		switch(menu){


			case FRIEND_MENU://friend MENU, load friendList
			case ARTIST:
			case NOT_VIEW:
				//if FRIEND_MENU OR ARTIST OR NOT_VIEW
				loadMainMenu();
				break;

			case FRIEND_LIST://friendList, load main menu
			case ASK:
				loadFriendsMenu();
				break;

			case OPT_MENU:
				loadFriendsList();
				break;

			case STAGE_MENU:
			case DAY_MENU:
			case ARTIST_LIST:
			case DAY_LIST:
			case STAGE_LIST:
			case FAVOURITES:
				loadArtistMenu();
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
				//console.log(option);

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
	/*2A FUNCIONALIDADE*/


	function loadArtistMenu(){
		if (mutex) return;
		mutex = true;

		menu = ARTIST;
		$('.Notification').hide();
		$('#time').animate({top:'0in', opacity:'0.1'}, "slow", function(){
			clock.children().fadeOut("fast");
			$('.dayList').hide();
			$('.stageList').hide();
			$('.friendsMenu').hide();
			$('.artistList').hide();
			$('.showArtist').hide();

			$('.subMenus').delay("fast").fadeIn();
			$('.artistMenu').delay("fast").fadeIn();
			$('#back').delay("fast").fadeIn();
		})

		mutex = false;
	}

	$('#findByDay').click(function(){
		menu = DAY_MENU;
		loadDayList();
	});

	function loadDayList(){
		if(mutex) return;
		mutex = true;

		menu = DAY_LIST;
		subMenus.children().not(".btn").fadeOut("fast");
		$('.dayList').delay("fast").fadeIn();
		mutex = false;
	};

	$('#findByStage').click(function(){
		menu = STAGE_MENU;
		loadStageList();

	})

	function loadStageList(){
		menu = STAGE_LIST;
		subMenus.children().not(".btn").fadeOut("fast");
		$('.stageList').delay("fast").fadeIn();
	}
	$('#favouriteArtists').click(function(){
		menu = FAVOURITES;
		loadFavourites();
	})
	function loadFavourites(){
		subMenus.children().not(".btn").fadeOut("fast");
		createArtistList( 2,0);
	}

	$('#day1').click(function(){
		createArtistList( 0, 1);
	})
	$('#day2').click(function(){
		createArtistList( 0, 2);
	})
	$('#stage1').click(function(){
		createArtistList( 1 , 1);
	})
	$('#stage2').click(function(){
		createArtistList( 1 , 2);
	})

	// STATIC-PARENT  on  click    DYNAMIC-CHILD
	$('.artistList').on('click', '.artistView', function(e){
		var div = $(this);
		var id = div.attr('id');
		var x = $.each(artistList, function(index, value){
			if(value._id == id){
				showArtist(value);
				return true;
			}
		});
		if (!x) console.log("bug showArtist");
	})

	$('.showArtist div').click(function(e){
		var div = $(this);
		var id = div.attr('class');
		$.each(artistList, function(index, value){
			if(value._id == id){
				if ( value._fav == false ){
					value._fav = true;
					console.log("add to fav: " + value._name);
					div.css('background-color','#ffff1a');
					favArtists.push(value);
				}
				else{
					div.css('background-color','');
					console.log("remove	from fav: " + value._name);
					value._fav = false;
					favArtists = jQuery.grep(favArtists, function(value2) {
					  return value2 != value;
					});

				}
				return;

			}
		});
	})
	/* explanation
	primeiro vamos à list de artistas e guradamos todos os que queremos numa lista
	decidimos se queremos ou nao se forem do dia/palco que é passado como argumento
	finalmente adicionamos todos os artistas a uma view
	*/
	function createArtistList( b, n){
		//b-> 0 means day;1 means stage;2 means favourites
		//n-> number of the day/stage
		var parent = $(".artistList");
		list = [];
		menu = ARTIST_LIST;
		subMenus.children().not(".btn").fadeOut("fast");
		$('.artistList').delay("fast").fadeIn();
		//SHENANIGANS
		parent.empty();//clears the div

		if(b==0){ //day
			$.each(artistList, function(index, value){//foreach all artists
				if(value._day == n){
					list.push(value);
				}
			})
		} else if(b==1){ //stage
			$.each(artistList, function(index, value){//foreach all artists
				if(value._stage == n){
					list.push(value);
				}
			})
		} else if (b==2) {
			console.log(favArtists);
			if (favArtists.length == 0){
				parent.append("<p class=noFavourites> No favourites added. </p>");
				return;
			}
			else{
				list = favArtists.slice();//searched google for this
			}
		} else {
			console.log("bug");
			return;
		}
		$.each(list, function(index, value){
			parent.append("<div class=artistView id="+value._id+
			"> <img src="+value._image+"/>"+value._name+"</div>");
			if(value._fav){
				$('#'+value._id).css("background-color", "#ffff1a");
			}
		})
	}

	function showArtist(artist){
		subMenus.children().not(".btn").fadeOut("fast");
		$('.showArtist').delay("fast").fadeIn();

		$('.showArtist img').attr('src', artist._image);
		$('#artistName').text(artist._name);
		$('#artistStage').text("Stage: "+artist._stage);
		$('#artistDay').text("Day: "+artist._day);
		$('#artistTime').text("Time: "+artist._time);
		$('.showArtist div').attr('class', artist._id);
	}

	var artistID = 0;
	function createArtist(name, image, time, day, stage){
		var artist = {_id:artistID, _name:name, _image:image
			, _time:time, _day:day, _stage:stage
			, _fav:false};
		artistID++;
		artistList.push(artist);
	}

	createArtist("Arctic Monkeys", "resources/am.jpeg","22:00", 1, 1);
	createArtist("Pink Floyd", "resources/pink_floyd.png", "23:00", 2 , 1);
	createArtist("Hannah Montana", "resources/hannah_montana.jpg", "21:00", 2 ,2 );
});

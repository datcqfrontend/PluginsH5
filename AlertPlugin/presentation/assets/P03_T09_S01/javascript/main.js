(function () {
    $('#slider').on('ready', '.P03_T09_S01', function (e, el) {
        var slide = $('#container', el);
    startTracking("Library");
    //tracking screen 1
    $(".btn_lib",slide).bind('tapone',function () {
        drcom.navigator.gotoSlide(drcom.navigator.getData("prevSlide"));
    });

    $("#carousel", slide).CloudCarousel({
        minScale: 0.6,
        xPos: 270,
        yPos: 160,
        xRadius: 320,
        yRadius: 50,
        FPS: 35,
        autoRotate: 'no',
        autoRotateDelay: 1000,
        speed: 0.2,
        bringToFront: true
    });

    var activeTab = drcom.helpers.storage.get('P03_T09_S01.activeTab'), showPopup = false;

    if (activeTab) {
        setTimeout(function () {
            $('.cloudcarousel:eq(' + activeTab + ')').trigger('click');
        }, 1000);
    }


    if (drcom.helpers.storage.get('P03_T09_S01.isBack') == 'true') {
        setTimeout(function () {
            var activeTab = drcom.helpers.storage.get('P03_T09_S01.activeTab');
            $('.cloudcarousel:eq(' + activeTab + ')').trigger('click');
            drcom.helpers.storage.set('P03_T09_S01.activeTab', '-1');
        }, 1000);
    }

    $('.cloudcarousel',slide).bind('tapone', function () {
        var index = $(this).index(), gotoSlide = true;

       drcom.helpers.storage.set('P03_T09_S01.activeTab', index);

        $('.box_nav_actived',slide).removeClass('box_nav_actived');
        $(this).addClass('box_nav_actived');

        var slideId = 0;

        switch (index) {
            case 0:
                slideId = 18;
                break;
            case 1:
                gotoSlide = false;
                break;
            case 2:
                gotoSlide = false;
                break;
            case 3:
                gotoSlide = false;
                break;
			case 4:
                gotoSlide = false;
                break;
			
			default:
        }

 console.log(index);
       console.log($('.top_box').is('visible'), index);
        if ($('.top_box').css('display') == "block" && index != 0) $('.top_box', slide).fadeOut(500);
console.log('gotoSlide',gotoSlide);
        if (gotoSlide) {
            setTimeout(function () {
                slideTo(slideId);
            }, 500);
        } else {
			console.log('gotoSlide11');
            if ( (index == 0 || index == 1) && $('.top_box').css('display') == "none") {
							console.log('gotoSlide22');
                $('#box_video').delay(500).fadeIn();
            }
        }

    });

    $('.top_box', slide).delegate('.line1', 'click', function () {
        slideTo(20, true);
    });

    $('.top_box', slide).delegate('.line2', 'click', function () {
        slideTo(21, true);
    });

    
    function slideTo(id, isPopupClick) {

        if (drcom.helpers.storage.get('P03_T09_S01.isBack') == 'true') {
            drcom.helpers.storage.set('P03_T09_S01.activeTab', '-1');
            drcom.helpers.storage.set('P03_T09_S01.isBack', '-1')
            return;
        }

        if (isPopupClick) {
            drcom.helpers.storage.set('P03_T09_S01.isBack', 'true');
            drcom.navigation.goToAsset(id);
        }
        else {
            if (drcom.helpers.storage.get('P03_T09_S01.isBack') != 'true') {
                setTimeout(function () {
                    drcom.navigation.goToAsset(id);
                    drcom.helpers.storage.set('P03_T09_S01.isBack', 'true');
                }, 700);
            }
            else {
                drcom.helpers.storage.set('P03_T09_S01.isBack', '-1');
            }
        }
    }
	var currentVideo = null;
    $('.play_video_btn',slide).bind('tapone', function () {
	  drcom.navigation.disableSwipe();
      var videoObj = '#' + $(this).attr('rel');
      if (currentVideo != null) {
		assignEvent(currentVideo);
        $(currentVideo + ' video',slide).fadeIn();
        if ($(videoObj + ' video').length) {
          $(videoObj + ' video').remove();
        }
      }
      setTimeout(function () {
        $('.coverVideoContainer',slide).addClass('active');
        $(videoObj).drcom_video({
          autoplay: true,
          controls: 'playpause seek reload',
          slider: { range: 'min' }
        });
		var myVideo = $(videoObj);
		$("video", myVideo).bind("ended", function() {
            $(videoObj + ' .ui-slider-range').css('width', '100%');
        })
			
        if (currentVideo != null) {
          $('.videoContainer ' + currentVideo).removeClass('active');
        }
        $('.videoContainer ' + videoObj).addClass('active');
        currentVideo = videoObj;
      }, 100);
    });
    
    
    $('.videoContainer').delegate('.mask_play_pause, .mask_video', 'click', function () {
      var myVideo = '#' + $(this).parent().attr('id') + ' video';
      if ($(myVideo)[0].paused) {
        $(myVideo)[0].play();
      } else {
        $(myVideo)[0].pause();
      }
    });
	
	function assignEvent(obj) {
		$(obj).delegate('.mask_play_pause, .mask_video', 'click', function () {
		  var myVideo = '#' + $(this).parent().attr('id') + ' video';
		  if ($(myVideo)[0].paused) {
			$(myVideo)[0].play();
		  } else {
			$(myVideo)[0].pause();
		  }
		});
	}
	
    $('.closeMe',slide).bind('tapone', function () {
	  drcom.navigation.enableSwipe();
	  if( $(currentVideo + ' video').length ) {
		$(currentVideo).drcom_video().controller().destroy();
		$(currentVideo + ' video').remove();
		$(currentVideo).html('<div class="mask_play_pause"></div><div class="mask_video"></div><div class="bg_video"></div>');
		assignEvent(currentVideo);
	  }
      $('.coverVideoContainer',slide).removeClass('active');
    });
    
    $('.btn_reload',slide).bind('tapone', function(){
    	$(currentVideo).drcom_video().controller().replay();
    });
    
});

})();
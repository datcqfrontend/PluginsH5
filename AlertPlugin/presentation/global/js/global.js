(function (drcom) {
    drcom.ready(function ($) {
		//-----------------------Begin: this is javascript default for lightness framework don't remove this code or modify----------------------------------------------	
	    $('body').on('ready', '.slide', function (ev, el)
	    {
			$(".siCustomeCloseButton").show();//show button "close presentation"
	    	if(drcom.navigation.controllers.menu.isHidden==true && drcom.helpers.storage.get("isForcedHideMenu")=="1")//if menu is hidden and 
	    	{
	    		drcom.helpers.storage.remove("isForcedHideMenu");
	    		drcom.navigation.showMenu();
	    	}
	    	drcom.helpers.storage.set("prevAsset", drcom.navigation.currentAsset().name);//set prev Asset
	    });

		//reset event
        $('#slider').on('reset', '.slide', function () {
            drcom.navigation.enableSwipe();//reset swipe
			
			//remove video after goto other asset
			$(".drcom_video").each(function(){
				$(this).controller().destroy();
			});
        });  
		/*----------Effect show/hide-----*/
        $.effects.show = function (o) {
            return this.queue(function () {
                var el = $(this);
                var mode = $.effects.setMode(el, o.options.mode || 'hide');
                if (mode == "show")
                    el.show();
                else
                    el.hide();
                (o.callback && o.callback.apply(this, arguments));
                el.dequeue();
            });

        };
        //disble swipe on element
        $.fn.drcom_disableswipe = function () {
            if (drcom.navigation == null)
                return;
            $(this).bind("swipeleft swiperight", function (ev) {
				if(drcom.navigation.swipable()==false)
					return;
                drcom.navigation.disableSwipe();
                setTimeout(function () {
                    drcom.navigation.enableSwipe();
                }, 300);
            });
        };
        function Measure() {
			var ul = $("<ul style='position:absolute;z-index:100;background:#000;color:red'></ul>").appendTo("body");
			//this trigger is fired before go to Asset
			var startTime = 0;
			$([drcom]).on('beforeSelect', function (e, el) {
				console.log('beforeSelect', el);
				startTime = new Date().getTime();
			});
			$('#slider').on('ready', '.slide', function (ev, el) {
				var duration = new Date().getTime() - startTime;
				$("<li></li>").appendTo(ul).html(duration);
			});
		}
        //Measure();
		//-----------------------End:this is javascript default for lightness framework don't remove this code or modify----------------------------------------------  	
	
    });
})(drcom || {});



(function (drcom) {
    drcom.ready(function ($) {
		//add Ref
        window.addRef = function (currentSlide) {

        	if ($(".inner_wapper", currentSlide).length > 0) {
        		var myScroll = new iScroll($(".inner_wapper", currentSlide)[0],
        		{
        			scrollbarClass: "scroll",
        			hideScrollbar: false,
        			checkDOMChange: true,
        			checkDOMChanges: true
        		});
        	}
        	$(".ref_warpper", currentSlide).drcom_disableswipe();
        	$(".ref_warpper .close", currentSlide).click(function () {
        		//drcom.navigator.hideRef('showRef');
        		showRef();
        	});
        	$(".btn_ref", currentSlide).on("tapone", showRef);


        	function showRef() {
        		if ($(".ref_warpper", currentSlide).length > 0) {
        			if ($(".btn_ref", currentSlide).hasClass('active')) {
        				$(".btn_ref", currentSlide).removeClass('active');
        			}
        			else {
        				$(".btn_ref", currentSlide).addClass('active');
        			}
        			$(".ref_warpper", currentSlide).toggle('fade', 500, function () {
        				if ($('.ref_warpper', currentSlide).css('display') == 'block') {
        					var myScroll = new iScroll($(".inner_wapper")[0],
        					{
        						scrollbarClass: "scroll",
        						hideScrollbar: false,
        						checkDOMChange: true,
        						checkDOMChanges: true,
        						vScrollbar: true
        					});
        				}
        			});
        		}
        	}
        }
		
		//customize hidemenu
		var _hideMenu=drcom.navigation.hideMenu;
		drcom.navigation.hideMenu=function()
		{
			$(".lg_alexion").hide();
			_hideMenu.apply(this,arguments);
		}
		var _showMenu=drcom.navigation.showMenu;
		drcom.navigation.showMenu=function()
		{
			$(".lg_alexion").show();
			_showMenu.apply(this,arguments);
		}		
		
		
		
        $('#slider').on('ready', '.slide', function (ev, el) {
            el = $('#container', el);
			//for pdf
            var pdfs = [""];
            var exist = false;
            var currentAssetId = drcom.navigation.currentAsset().name;
            for (var i = 0; i < pdfs.length; i++) {
                if (pdfs[i] == currentAssetId)
                    exist = true;
            }
            if (currentAssetId == "s16")
                exist = false;
            if (exist == false)
                drcom.helpers.storage.set("prevAsset", currentAssetId);
            console.log(drcom.helpers.storage.get("prevAsset"));
            // lib btn
            $(".btn_lib", el).bind('tapone', function () {
                goToPdf(drcom.navigation.currentAsset().name, "s16");
            });

            window.goToPdf = function (currSlideId, pdfId) {
                if (currSlideId == pdfId)
                    pdfId = window.prevSlide;
                else
                    window.prevSlide = currentAssetId;

                console.log(currentAssetId, pdfId, window.prevSlide);
                drcom.navigation.goToAsset(pdfId);
            }
			
            if ($('.ref_wrapper', el).length > 0) {
                $('.btn_ref', el).removeClass('disable');
            }
            else {
                $('.btn_ref', el).addClass('disable');
            }
			
			closeAllTracking();//close all Tracking
        });
		$([drcom]).bind('presentation:switch presentation:close',function()
		{
			closeAllTracking();//close all Tracking
		});
		
       /* showPopupPlus ---------------*/
        window.showPopupPlus = function (show, hide) {
            var slide = $("." + drcom.navigation.currentSlide().name);
            $(".btn_plus", slide).drcom_popup({
                closeInside: false,
                effect: "show",
                onShow: function () {

                    var el = null;
                    if ($(".bg_pu_blue", slide).length > 0)
                        el = $(".bg_pu_blue", slide);
                    if ($(".bg_pu_red", slide).length > 0)
                        el = $(".bg_pu_red", slide);
                    if (el != null) {
                        el.css({
                            display: "block",
                            transform: "translate3d(-960px,0px,0px)"
                        });
                        el.animate({
                            transform: "translate3d(0px,0px,0px)"
                        }, 1000);
                    }

                    if (show != null)
                        show();
                },
                onBeforeHide: function () {

                    $("#main_container", slide).fadeIn();
                    if (hide != null)
                        hide();
                }
            });
        }
        /* end showPopupPlus ---------------*/
		
		
        /* tracking ---------------*/
        window.startTracking = function (name) {

            var date = new Date();
            var prevTrackingList = window.prevTrackingList;
            if (window.prevTrackingList == null)
                window.prevTrackingList = [];
            window.prevTrackingList.push({
                time: date.getTime(),
                name: name
            });
            //alert(name);
        }
        window.endTracking = function (name) {
            if (window.prevTrackingList == null)
                return;
            var item = undefined;
            for (var i = prevTrackingList.length - 1; i >= 0; i--) {
                if (prevTrackingList[i].name == name) {
                    item = prevTrackingList[i];
                    break;
                }

            }
            if (item == undefined)
                return;

            var time = item.time;
            var prevDate = new Date(time);
            var date = new Date();
            var duration = (date.getTime() - prevDate.getTime()) / 1000;
            duration = Math.round(duration);
            if (duration == 0)
                duration = 1;
            var endDate = new Date(time + duration * 1000);
            var data = {
                name: name,
                duration: duration + "s.",
                start: prevDate.format('yyyy-mm-dd H:M:s'),
                end: endDate.format('yyyy-mm-dd H:M:s')
            };
            item.data = data;
        }
        window.closeAllTracking = function () {
            if (window.prevTrackingList == null)
                return;
            for (var index in prevTrackingList)
                endTracking(prevTrackingList[index].name);

            for (var i = 0; i < prevTrackingList.length; i++) {
                drcom.navigation.record(prevTrackingList[i].data);
            }
            prevTrackingList = [];
        }
        var dateFormat = function () {
            var token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
                timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
                timezoneClip = /[^-+\dA-Z]/g,
                pad = function (val, len) {
                    val = String(val);
                    len = len || 2;
                    while (val.length < len) val = "0" + val;
                    return val;
                };

            // Regexes and supporting functions are cached through closure
            return function (date, mask, utc) {
                var dF = dateFormat;

                // You can't provide utc if you skip other args (use the "UTC:" mask prefix)
                if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
                    mask = date;
                    date = undefined;
                }

                // Passing date through Date applies Date.parse, if necessary
                date = date ? new Date(date) : new Date;
                if (isNaN(date)) throw SyntaxError("invalid date");

                mask = String(dF.masks[mask] || mask || dF.masks["default"]);

                // Allow setting the utc argument via the mask
                if (mask.slice(0, 4) == "UTC:") {
                    mask = mask.slice(4);
                    utc = true;
                }

                var _ = utc ? "getUTC" : "get",
                    d = date[_ + "Date"](),
                    D = date[_ + "Day"](),
                    m = date[_ + "Month"](),
                    y = date[_ + "FullYear"](),
                    H = date[_ + "Hours"](),
                    M = date[_ + "Minutes"](),
                    s = date[_ + "Seconds"](),
                    L = date[_ + "Milliseconds"](),
                    o = utc ? 0 : date.getTimezoneOffset(),
                    flags = {
                        d: d,
                        dd: pad(d),
                        ddd: dF.i18n.dayNames[D],
                        dddd: dF.i18n.dayNames[D + 7],
                        m: m + 1,
                        mm: pad(m + 1),
                        mmm: dF.i18n.monthNames[m],
                        mmmm: dF.i18n.monthNames[m + 12],
                        yy: String(y).slice(2),
                        yyyy: y,
                        h: H % 12 || 12,
                        hh: pad(H % 12 || 12),
                        H: H,
                        HH: pad(H),
                        M: M,
                        MM: pad(M),
                        s: s,
                        ss: pad(s),
                        l: pad(L, 3),
                        L: pad(L > 99 ? Math.round(L / 10) : L),
                        t: H < 12 ? "a" : "p",
                        tt: H < 12 ? "am" : "pm",
                        T: H < 12 ? "A" : "P",
                        TT: H < 12 ? "AM" : "PM",
                        Z: utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
                        o: (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
                        S: ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
                    };

                return mask.replace(token, function ($0) {
                    return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
                });
            };
        }();

        // Some common format strings
        dateFormat.masks = {
            "default": "ddd mmm dd yyyy HH:MM:ss",
            shortDate: "m/d/yy",
            mediumDate: "mmm d, yyyy",
            longDate: "mmmm d, yyyy",
            fullDate: "dddd, mmmm d, yyyy",
            shortTime: "h:MM TT",
            mediumTime: "h:MM:ss TT",
            longTime: "h:MM:ss TT Z",
            isoDate: "yyyy-mm-dd",
            isoTime: "HH:MM:ss",
            isoDateTime: "yyyy-mm-dd'T'HH:MM:ss",
            isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
        };

        // Internationalization strings
        dateFormat.i18n = {
            dayNames: [
                "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
                "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
            ],
            monthNames: [
                "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
                "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
            ]
        };
        // For convenience...
        Date.prototype.format = function (mask, utc) {
            return dateFormat(this, mask, utc);
        };
        /* end tracking ---------------*/
    });
})(drcom || {});
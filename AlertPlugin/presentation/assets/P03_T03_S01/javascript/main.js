(function () {
    $('#slider').on('ready', '.P03_T03_S01', function (e, el) {
        var slide = $('#container', el);

    startTracking("Clinical_complications");//tracking screen
    $('.btn_back',slide).bind('tapone',function () {
        $(".man_bg",slide).animate({
            transform: 'scale(0.65) translate3d(0px, 0px, 0px)'
        }, 750, 'linear', function () { $('.man_screen, .part1, .part2, .part3, .part4, .part5, .small_title',slide).fadeIn(500); });
        $('.screen_part6, .screen_part5,.screen_part1, .screen_part2, .screen_part3, .screen_part4, .btn_back',slide).hide();
        switch (flag_tracking) {
            case 1:
                endTracking("CNS");
            case 2:
                endTracking("Cardiovascular");
            case 3:
                endTracking("Gastrointestinal");
            case 4:
                endTracking("Pulmonary");
            case 5:
                endTracking("Renal");
            case 6:
                endTracking("Blood");
        }

    });
    var flag_tracking = 0;





    function man_bg(callback) {
        $(".man_bg",slide).animate({
            transform: 'scale(1) translate3d(-350px, 113px, 0px)',
        }, 750, 'linear', callback);

    };
    function man_bg_1(callback) {
        $(".man_bg",slide).animate({
            transform: 'scale(1) translate3d(-350px, 0px, 0px)'
        }, 750, 'linear', callback);

    };

    function man_bg_6(callback) {
        $(".man_bg",slide).animate({
            transform: 'scale(1) translate3d(-350px, -35px, 0px)'
        }, 750, 'linear', callback);

    };

    $('.t1, .part1',slide).bind('tapone',function () {
        startTracking("CNS");
        flag_tracking = 1;
        man_bg(function () {
            $('.screen_part1, .btn_back',slide).fadeIn(500);
        });
        $('.man_screen,.screen_part5, .screen_part2, .screen_part3, .screen_part4, .parts, .small_title',slide).hide();


    });

    $('.t2, .part2',slide).bind('tapone',function () {
        startTracking("Cardiovascular");
        flag_tracking = 2;
        man_bg(function () {
            $('.screen_part2, .btn_back',slide).fadeIn(500);
        });
        $('.man_screen,.screen_part5, .screen_part1, .screen_part3, .screen_part4, .parts, .small_title',slide).hide();

    });

    $('.t3, .part3',slide).bind('tapone',function () {
        startTracking("Gastrointestinal");
        flag_tracking = 3;
        man_bg_1(function () {
            $('.screen_part3, .btn_back',slide).fadeIn(500);
        });
        $('.man_screen,.screen_part5, .screen_part2, .screen_part1, .screen_part4, .parts, .small_title',slide).hide();

    });
    $('.t4, .part4',slide).bind('tapone',function () {
        startTracking("Pulmonary");
        flag_tracking = 4;
        man_bg_6(function () {
            $('.screen_part5, .btn_back',slide).fadeIn(500);
        });
        $('.man_screen,.screen_part4, .screen_part2, .screen_part3, .screen_part1, .parts, .small_title',slide).hide();

    });

    $('.t5, .part5',slide).bind('tapone',function () {
        startTracking("Renal");
        flag_tracking = 5;
        man_bg_1(function () {
            $('.screen_part4, .btn_back',slide).fadeIn(500);
        });
        $('.man_screen,.screen_part1, .screen_part2, .screen_part3, .screen_part5, .parts, .small_title',slide).hide();

    });

    $('.t6, .part6',slide).bind('tapone',function () {
        startTracking("Blood");
        flag_tracking = 6;
        man_bg_6(function () {
            $('.screen_part6, .btn_back',slide).fadeIn(500);
        });
        $('.man_screen,.screen_part1, .screen_part2, .screen_part3, .screen_part5, .parts, .small_title',slide).hide();

    });

});
})();
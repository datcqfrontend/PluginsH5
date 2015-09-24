(function () {
    $('#slider').on('ready', '.P03_T05_S02', function (e, el) {
        var slide = $('#container', el);

    startTracking("Differential_diagnosis");//tracking screen
    $('.btn_active',slide).bind('tapone', function () {
        var clss = $(this).attr('class').split(" ")[0];
        console.log(clss);
        drcom.helpers.storage.set('P03_T05_S02.active', clss);
        //drcom.navigator.gotoSlide(7);
		drcom.navigation.goToAsset("s7");
    });

    if (drcom.helpers.storage.get('P03_T05_S02.show') != 'true') {
        $(".bg_center1",slide).bind('tapone',function () {
            $(".bg_center2",slide).show();
        });

        $(".bg_center2",slide).bind('tapone',function () {
            $(".bg_center3",slide).show();
        });
        $(".bg_center3",slide).bind('tapone',function () {
            $(".bg_center4",slide).show();
        });

        $(".bg_center4",slide).bind('tapone',function () {
            $(".bg_center5",slide).show();
            drcom.helpers.storage.get('P03_T05_S02.show', 'true');
        });
        // 
    } else {
        $(".bg_center1, .bg_center2, .bg_center3, .bg_center4, .bg_center5",slide).show();
    }


    $(".btn_hand",slide).bind('tapone',function () {
        $(".bg_center1, .bg_center2, .bg_center4, .bg_center5",slide).show();
    });

});

})();
(function () {
    $('#slider').on('ready', '.P03_T05_S01', function (e, el) {
        var slide = $('#container', el);

    startTracking("Diagnosis");//tracking screen

    showPopupPlus(function () {
        startTracking("Diagnosis_PU");	//tracking PU	
    }, function () {
        endTracking("Diagnosis_PU");
    });
    
    var active = drcom.helpers.storage.get('P03_T05_S02.active');
    console.log(active);
    switch (active) {
        case 'btn_ttp':
            $('.mask_1',slide).hide();
            $('.mask_2, .mask_3, .conten_left, .conten_right',slide).show();
            break;
        case 'btn_ahus':
            $('.mask_2',slide).css('opacity', '0');
            $('.mask_1, .mask_3, .mask_2, .conten_left, .conten_right',slide).show();
            break;
        case 'btn_stec':
            $('.mask_3',slide).hide();
            $('.mask_1, .mask_2, .conten_left, .conten_right',slide).show();
            break;
        case '-1':
            $('.mask_1, .mask_2, .mask_3',slide).css('display', 'none');
            break;
        case null:
            $('.mask_1, .mask_2, .mask_3',slide).css('display', 'none');
            break;
        default:
            //$('.mask_1',slide).show();
            $('.mask_2, .mask_3',slide).hide();
            break;
    }
    drcom.helpers.storage.set('P03_T05_S02.active', '-1');

    $(".bt_plus_1",slide).bind('tapone',function () {
        $(".pu_1, .mask_3",slide).show();
        $(".mask_2, .mask_1",slide).hide();
    });

    $(".bt_plus_2",slide).bind('tapone',function () {
        $(".pu_2, .mask_1",slide).show();
        $(".mask_2, .mask_3",slide).hide();
    });

    $(".pu_1, .pu_2",slide).bind('tapone',function () {
        $(".mask_1, .mask_3",slide).hide();
        $(this).hide();
    });

    $('.mask_2',slide).bind('tapone',function () {
        $(".mask_1, .mask_2, .mask_3",slide).hide();
        $('.mask_2',slide).css('opacity', '1');
    });
    $('.btn_left',slide).bind('tapone',function () {
        $('.conten_left',slide).show();
    });
    $('.btn_right',slide).bind('tapone',function () {
        $('.conten_right',slide).show();
    });
});

})();
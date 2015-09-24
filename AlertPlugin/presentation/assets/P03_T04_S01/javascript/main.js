(function () {
    $('#slider').on('ready', '.P03_T04_S01', function (e, el) {
        var slide = $('#container', el);

    startTracking("MOD");//tracking screen

    $("#video",slide).drcom_video({
        autoplay: true,
        controls: "playpause seek",
        slider: {
            range: "min"
        }
    });
    var current = 0, prev = 0, block = false;

    $('.screen_btn',slide).bind('tapone', function () {
        if (block) return;
        var index = $(this).index();
        $('.nav li',slide).hide();
        showImage(index);
    });

    $('.image',slide).bind('tapone', function () {
        if (block) return;
        $('.bot_claim_1',slide).fadeIn(500);
        $('.mask, .bot_claim_2',slide).hide();
        $('.nav li',slide).hide();
        $(this).hide();
    });

    function showImage(index) {
        current = index;
        if (index == prev) return;
        block = true;
        if (index > 2) {
            $('.bot_claim_2',slide).fadeIn(500);
            $('.bot_claim_1',slide).hide();
        } else {
            $('.bot_claim_1',slide).fadeIn(500);
            $('.bot_claim_2',slide).hide();
        }
        if (prev == 0)
            $('.mask',slide).show();
        if (prev != 0) {
            $('.img_' + prev).hide();
            prev = 0;
        }
        $('.img_' + index).show("fade", 500, function () {
            checkBtn();
            block = false;
        });

    }

    function checkBtn() {

        if (current == 5) {
            $('li.next',slide).hide();
            $('li.prev',slide).show();
        }
        else if (current == 1) {
            $('li.prev',slide).hide();
            $('li.next',slide).show();
        }
        else {
            $('.nav li',slide).show();
        }

    }

    $('.nav li',slide).bind('tapone', function () {
        var index = $(this).index();
        if (block || prev == current) return;
        prev = current;
        current = index == 0 ? --current : ++current;
        if (current > 5) {
            current = 5;
        }
        else if (current == 0) {
            current = 1;
        }
        $('.nav li',slide).hide();
        showImage(current);
    });

    $(".controlbar",slide).drcom_disableswipe();
});
})();
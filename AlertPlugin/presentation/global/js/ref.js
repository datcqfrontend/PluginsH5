(function(drcom) {
    drcom.ready(function($) {

        //add ref button
        drcom.button.add("ref", function(actived) {
            drcom.ref.container.stop();
            if (actived == true)
            {
                drcom.ref.hide();
            }
            else
            {
                drcom.ref.show();
            }
        });
        //release memory
        $('#slider').on('reset', '.slide', function(ev, el)
        {
            if (el.controller(Drcom.Ref) != undefined)
                el.controller(Drcom.Ref).destroy();
        });
        $('#slider').on('ready', '.slide', function(ev, el)
        {
            var refs = ["PNH_DD_02, PNH_DD_05"];//ref list
            var currentAssetId = drcom.navigation.currentAsset().thumb;
            if (drcom.navigation.isSlideSorter() == true)//for slide sorter
                currentAssetId = drcom.navigation.currentAsset().name;
            var exist = _.indexOf(refs, currentAssetId);
            if (exist == -1)
            {
                drcom.button.disable("ref");
            }
            else
                drcom.button.enable("ref");

            drcom.ref = el.drcom_ref({
                effect:
                        {
                            name: "fade",
                            duration: 500
                        },
                beforeHide: function()
                {
                    drcom.button.deactive("ref");
                    $(".btn_ref", el).removeClass("active");
                },
                beforeShow: function()
                {
                    drcom.button.active("ref");
                    $(".btn_ref", el).addClass("active");
                }
            }).controller(Drcom.Ref);
            $(".btn_ref", el).bind("click", function() {
                var _ref = $(el).find('.ref_warpper');
                if($(_ref).length<1)
                    return;
                if ($(".btn_ref", el).hasClass("active")) {
                    $(".btn_ref", el).removeClass("active");
                    drcom.ref.hide();
                } else {
                    drcom.ref.show();
                }
            });
        });
    });
})(drcom || {});


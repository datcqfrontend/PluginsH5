(function () {
    $('#slider').on('ready', '.P03_T08_S01', function (e, el) {
        var slide = $('#container', el);
	startTracking("Fazit");//tracking screen
	
    $('.dash_white_circle, .mask',slide).css('display', 'block');
	$('.vessel_bg',slide).show().css({transform:"scale(1) translate(59px,62px)"});
	$('.dash_white_circle',slide).addClass('animation');
    
	var isAnimated = true, zoomIn = 'scale(1.2) translate3d(-70px, 0px, 5px)', zoomOut='scale(0.9) translate3d(0, 0, 0)';
	
	$('.box',slide).bind('tapone', function () {
        if (isAnimated) {
            var self = $(this), other = $('.box').not(self);
            if (self.hasClass('active')) {
                self.animate({
                    transform: zoomOut
                }).removeClass('active');
            } else {
                self.animate({
                    transform: zoomIn
                }).addClass('active');

                other.animate({
                    transform: zoomOut
                }).removeClass('active');
            }
        }
    });
});
})();
(function($) {
    // find our elements
    var $div = $('#test');
    var $canvas = $div.find('canvas');
    var $ship = $div.find('img');
    var ctx = $canvas[0].getContext('2d');
    
    // hook up the buttons
    // circle
    $('#circle').click(function(e) {
        e.preventDefault();
        stop();
        tween($.curve.circle, {
            x: $canvas[0].width / 2,
            y: $canvas[0].height / 2,
            radius: ($canvas[0].height / 2) -10
        });
    });
    
    // Ellipse
    $('#ellipse-a').click(function(e) {
        e.preventDefault();
        stop();
        tween($.curve.ellipse, {
            x: $canvas[0].width / 2,
            y: $canvas[0].height / 2,
            major: ($canvas[0].width / 2) - 10,
            minor: ($canvas[0].height/ 2) - $canvas[0].height * .2
        });
    });
    
    // Ellipse
    $('#ellipse-b').click(function(e) {
        e.preventDefault();
        stop();
        tween($.curve.ellipse, {
            x: $canvas[0].width / 2,
            y: $canvas[0].height / 2,
            major: ($canvas[0].width / 2) - $canvas[0].width * .35,
            minor: ($canvas[0].height/ 2) - 10
        });
    });
    
    // Sine Wave
    $('#sine').click(function(e) {
        e.preventDefault();
        stop();
        tween($.curve.sine, {
            x: 0,
            y: $canvas[0].height / 2,
            amp: ($canvas[0].height/ 2) - 10,
            frequency: 1,
            wavelength: $canvas[0].width
        });
    });
    
    // Bezier Curve
    $('#bezier').click(function(e) {
        e.preventDefault();
        stop();
        tween($.curve.bezier, {
            x: 0,
            y: $canvas[0].height,
            points: [
                [0, $canvas[0].height / 2],
                [$canvas[0].width * 0.5, 0],
                [$canvas[0].width * 0.9, $canvas[0].height],
                [$canvas[0].width, $canvas[0].height/ 2]
            ]
        });
    });
    
    // stop the ship
    function stop() {
        $ship.stop();
        ctx.closePath();
        ctx.stroke();
        ctx.clearRect(0, 0, $canvas[0].width, $canvas[0].height);
    }
    
    // some useful variables
    var h = $ship.height(); //the height of the ship, for re-centering it.
    var w = $ship.width();
    var halfPI = (Math.PI / 2);
    //$ship.css('origin', ['50%', '90%']);
    
    // make it so
    function tween(curve, opts) {
        $ship.tween(function(now, fx) {
            // find the element
            var $elem = $(this);
            
            // execute the curve
            var p = curve(fx.pos, opts);
            
            // change the ship's position    
            $elem.css({
                left: (p[0] - w/2) + 'px', // re-center the ship
                top: (p[1] - h/2) + 'px', // re-center the ship
                rotate: (parseFloat(p[2].toFixed(8)) + halfPI) + 'rad'
            });
            
            // draw a line on the canvas
            if (fx.pos === 0) {
                ctx.moveTo(p[0], p[1]);
                ctx.beginPath();
            }
            ctx.lineTo(p[0], p[1]);
            ctx.stroke();
        }, {
            duration: 3000,
        });
    }
})(jQuery);
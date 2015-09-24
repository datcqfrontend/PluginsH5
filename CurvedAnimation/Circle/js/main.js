(function($) {
    // find our elements
    var $div = $('#test');
    var $canvas = $div.find('canvas');
    var $ship = $div.find('img');
    var ctx = $canvas[0].getContext('2d');
    
    // hook up the buttons
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
    
        
    // Bezier Curve
    $('#bezier').click(function(e) {
        e.preventDefault();
        stop();
        tween($.curve.bezier, {
            x: 0,
            y: $canvas[0].height,
            points: [
                [$canvas[0].width*0.5, $canvas[0].height],
                [$canvas[0].width , $canvas[0].height / 2],
				[$canvas[0].width*0.5, 0]
				
                /*[$canvas[0].width * 0.9, $canvas[0].height],
                [$canvas[0].width, $canvas[0].height/ 2]*/
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
            
			//console.log(opts);
			console.log(p);
			
			if(p[1]>=$canvas[0].height / 2){
				halfPI = -(Math.PI / 2);
			}			
			
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
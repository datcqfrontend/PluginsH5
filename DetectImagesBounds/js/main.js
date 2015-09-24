$(document).ready(function(){
	var canvas = $('#canvas')[0];

	var img = new Image,
	    w = canvas.width,
	    h = canvas.height,
	    ctx = canvas.getContext('2d');

	img.crossOrigin ='';
	img.onload = getBounds;
	img.src = 'images/temp_4.png';

	function getBounds() {

	    ctx.drawImage(this, 0, 0, w, h);

	    var idata = ctx.getImageData(0, 0, w, h),
	        buffer = idata.data,
	        buffer32 = new Uint32Array(buffer.buffer),
	        x, y,
	        x1 = w, y1 = h, x2 = 0, y2 = 0;
	    
	    // get left edge
	    for(y = 0; y < h; y++) {
	        for(x = 0; x < w; x++) {
	            if (buffer32[x + y * w] == 0) {
	                if (x < x1) x1 = x;
	            }
	        }
	    }

	    console.log(x1);

	    // get right edge
	    for(y = 0; y < h; y++) {
	        for(x = w; x >= 0; x--) {
	            if (buffer32[x + y * w] == 0) {
	                if (x > x2) x2 = x;
	            }
	        }
	    }
	    
	    // get top edge
	    for(x = 0; x < w; x++) {
	        for(y = 0; y < h; y++) {
	            if (buffer32[x + y * w] == 0) {
	                if (y < y1) y1 = y;
	            }
	        }
	    }

	    // get bottom edge
	    for(x = 0; x < w; x++) {
	        for(y = h; y >= 0; y--) {
	            if (buffer32[x + y * w] == 0) {
	                if (y > y2) y2 = y;
	            }
	        }
	    }

	    ctx.strokeStyle = '#f00';
	    ctx.strokeRect(x1+0.5, y1+0.5, x2-x1, y2-y1);
	    
	}
});
// Marching Squares Edge Detection
// this is a "marching ants" algorithm used to calc the outline path
(function() {
  // d3-plugin for calculating outline paths
  // License: https://github.com/d3/d3-plugins/blob/master/LICENSE
  //
  // Copyright (c) 2012-2014, Michael Bostock
  // All rights reserved.
  //
  //  Redistribution and use in source and binary forms, with or without
  //  modification, are permitted provided that the following conditions are met:
  //* Redistributions of source code must retain the above copyright notice, this
  //  list of conditions and the following disclaimer.
  //* Redistributions in binary form must reproduce the above copyright notice,
  //  this list of conditions and the following disclaimer in the documentation
  //  and/or other materials provided with the distribution.
  //* The name Michael Bostock may not be used to endorse or promote products
  //  derived from this software without specific prior written permission.
  // THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL MICHAEL BOSTOCK BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. 
  geom = {}; 
  geom.contour = function(grid, start) { 
    var s = start || d3_geom_contourStart(grid), // starting point 
        c = [],    // contour polygon 
        x = s[0],  // current x position 
        y = s[1],  // current y position 
        dx = 0,    // next x direction 
        dy = 0,    // next y direction 
        pdx = NaN, // previous x direction 
        pdy = NaN, // previous y direction 
        i = 0; 

    do { 
      // determine marching squares index 
      i = 0; 
      if (grid(x-1, y-1)) i += 1; 
      if (grid(x,   y-1)) i += 2; 
      if (grid(x-1, y  )) i += 4; 
      if (grid(x,   y  )) i += 8; 

      // determine next direction 
      if (i === 6) { 
        dx = pdy === -1 ? -1 : 1; 
        dy = 0; 
      } else if (i === 9) { 
        dx = 0; 
        dy = pdx === 1 ? -1 : 1; 
      } else { 
        dx = d3_geom_contourDx[i]; 
        dy = d3_geom_contourDy[i]; 
      } 

      // update contour polygon 
      if (dx != pdx && dy != pdy) { 
        c.push([x, y]); 
        pdx = dx; 
        pdy = dy; 
      } 

      x += dx; 
      y += dy; 
    } while (s[0] != x || s[1] != y); 

    return c; 
  }; 

  // lookup tables for marching directions 
  var d3_geom_contourDx = [1, 0, 1, 1,-1, 0,-1, 1,0, 0,0,0,-1, 0,-1,NaN], 
      d3_geom_contourDy = [0,-1, 0, 0, 0,-1, 0, 0,1,-1,1,1, 0,-1, 0,NaN]; 

  function d3_geom_contourStart(grid) { 
    var x = 0, 
        y = 0; 

    // search for a starting point; begin at origin 
    // and proceed along outward-expanding diagonals 
    while (true) { 
      if (grid(x,y)) { 
        return [x,y]; 
      } 
      if (x === 0) { 
        x = y + 1; 
        y = 0; 
      } else { 
        x = x - 1; 
        y = y + 1; 
      } 
    } 
  } 

})();

$(document).ready(function(){
	var canvas = $('#canvas')[0];

	var cw = canvas.width,
	    ch = canvas.height,
	    ctx = canvas.getContext('2d');

	// checkbox to show/hide the original image
	var $showImage=$("#showImage");
	$showImage.prop('checked', true);

	// checkbox to show/hide the path outline
	var $showOutline=$("#showOutline");
	$showOutline.prop('checked', true);

	// an array of points that defines the outline path
	var points;

	// pixel data of this image for the defineNonTransparent 
	// function to use
	var imgData,data;

	// This is used by the marching ants algorithm
	// to determine the outline of the non-transparent
	// pixels on the image
	var defineNonTransparent=function(x,y){
	  var a=data[(y*cw+x)*4+3];
	  return(a>20);
	}

	var defineTransparent=function(x,y){
	  var a=data[(y*cw+x)*4+3];
	  return(a==0);
	}

	// load the image
	var img=new Image();
	img.crossOrigin="anonymous";
	img.onload=function(){

	  // draw the image
	  // (this time to grab the image's pixel data
	  ctx.drawImage(img,canvas.width/2-img.width/2,canvas.height/2-img.height/2);

	  // grab the image's pixel data
	  imgData=ctx.getImageData(0,0,canvas.width,canvas.height);
	  data=imgData.data;

	  // call the marching ants algorithm
	  // to get the outline path of the image
	  // (outline=outside path of transparent pixels
	  //points=geom.contour(defineNonTransparent);

	  points=geom.contour(defineTransparent);

	  ctx.strokeStyle="red";
	  ctx.lineWidth=2;

	  $showImage.change(function(){ redraw(); });

	  $showOutline.change(function(){ redraw(); });

	  redraw();

	}
	img.src="images/temp_4.png";


	// redraw the canvas
	// user determines if original-image or outline path or both are visible
	function redraw(){

	  // clear the canvas
	  ctx.clearRect(0,0,canvas.width,canvas.height);

	  // draw the image
	  if($showImage.is(':checked')){
	    ctx.drawImage(img,canvas.width/2-img.width/2,canvas.height/2-img.height/2);
	  }

	  // draw the path (consisting of connected points)
	  if($showOutline.is(':checked')){
	    // draw outline path
	    ctx.beginPath();
	    ctx.moveTo(points[0][0],points[0][4]);
	    for(var i=1;i<points.length;i++){
	      var point=points[i];
	      ctx.lineTo(point[0],point[1]);
	    }
	    ctx.closePath();
	    ctx.stroke();
	  }
	}


	/*img.crossOrigin ='';
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
	    
	}*/
});
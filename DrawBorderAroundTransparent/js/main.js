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

      //console.log(x,y);
      //console.log(s[0],s[1]);
    } while (s[0] != x || s[1] != y); 

    console.log("break");

    //console.log(c.length);
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

	var urlAvatars = [
		'images/1.jpg','images/2.jpg','images/3.jpg','images/4.jpg','images/5.jpg'
	];
	var cw = canvas.width,
	    ch = canvas.height,
	    ctx = canvas.getContext('2d');

	// an array of points that defines the outline path
	// pixel data of this image for the defineNonTransparent 
	// function to use

	var areas=[],points,imgData,data,countArea=0;

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

	var checkTransparent=function(data){
		for(var i = 0, n = data.length; i < n; i += 4) {
            var alpha = data[i + 3];
            if(alpha==0){
            	return true;
            }
        }
        return false;
	}

	// load the image
	var imgOrigin=new Image();
	imgOrigin.crossOrigin="anonymous";
	imgOrigin.onload=function(){

	  	// draw the image
	  	// (this time to grab the image's pixel data
	  	ctx.drawImage(imgOrigin,canvas.width/2-imgOrigin.width/2,canvas.height/2-imgOrigin.height/2);
		
	   	getAreaTransparent();
	}
	imgOrigin.src="images/temp_5.png";

	function getAreaTransparent(){
		console.log("Check transparent");

		imgData=ctx.getImageData(0,0,canvas.width,canvas.height);
		data=imgData.data;

		if(checkTransparent(data)){

			points=geom.contour(defineTransparent);

			ctx.save();
			ctx.beginPath();
		    ctx.moveTo(points[0][0],points[0][4]);
		    for(var i=1;i<points.length;i++){
		      var point=points[i];
		      ctx.lineTo(point[0],point[1]);
		    }
		    ctx.closePath();

		    ctx.fillStyle = '#fff';
	      	ctx.fill();
	      	//ctx.lineWidth = 10;
	      	//ctx.stokeStyle = '#fff';
		    //ctx.stroke();
		    ctx.clip();

			var arrX = [], arrY = [];
	  		for(var j=0;j<points.length;j++){
	  			arrX.push(points[j][0]);
	  			arrY.push(points[j][1]);
	  		}

	  		var minX = Math.min.apply(Math,arrX);
	  		var maxX = Math.max.apply(Math,arrX);
	  		var minY = Math.min.apply(Math,arrY);
	  		var maxY = Math.max.apply(Math,arrY);

	  		areas.push({x:minX,y:minY,width:maxX-minX,height:maxY-minY});	  		
	  		
	  		areas[countArea].url = urlAvatars[countArea];
	  		drawImage(areas[countArea],function(){
	  			ctx.restore();

	  			countArea++;
	  			getAreaTransparent();
	  		});

	  		
	  		//ctx.strokeStyle = '#f00';
	    	//ctx.strokeRect(minX+0.5, minY+0.5, maxX-minX, maxY-minY);	  		
	  	}else{
	  		console.log("End get area");
	  		console.log(areas);

	  		//ctx.drawImage(imgOrigin,canvas.width/2-imgOrigin.width/2,canvas.height/2-imgOrigin.height/2);
	  	}
	}	

	// redraw the canvas
	// user determines if original-image or outline path or both are visible
	function drawImage(options, callback){
		var imgObj = new Image(),
    		x = options.x || 0,
    		y = options.y || 0,
    		w = options.width || canvas.width,
    		h = options.height || canvas.height,
    		delay = options.delay || 0;

	    	//this.drawingImage = true;
	    	imgObj.onload = function() {
	    		setTimeout(function(){
	    			ctx.drawImage(imgObj, x, y, w, h);
	    			if (callback && typeof(callback) === "function") {
					    callback();
					}
	    		},delay);		        		        
		    };
	    	imgObj.src = options.url;	
	}
	
});
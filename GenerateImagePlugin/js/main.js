$(document).on('ready',function(){
	//alert("Ready!");
	
	var geImg = new GenerateImage($('#mainObject')).init();

	//console.log(geImg);

	//Use callback after drawImage because image need time to draw
    /*geImg.drawImage({url:'img/Main.jpg',x:50,y:50,width:200,height:200, delay: 1000},function(){
    	console.log("Callback");
    	geImg.drawText({text:'Hello world!',x:50,y:100,font:'30px Arial',style:'blue', strokeStyle:'white'}).drawText({text:'This is man!',x:50,y:200,font:'30px Arial',style:'black'});

    	geImg.drawImage('img/Main.jpg',100,150,100,100);
    });

    geImg.drawImage({url:'img/Main.jpg',x:350,y:50,width:200,height:200, delay: 500});
   	geImg.drawText({text:'Hello world 2!',x:350,y:100,font:'10px Arial',style:'blue', delay: 1000}).drawText({text:'This is man 2!',x:350,y:200,font:'20px Arial',style:'black', delay: 1500});
	*/

	geImg.drawAvatarToBackground(
		{
			url: "images/temp_5.png",
			avatars: ['images/1.jpg','images/2.jpg','images/3.jpg','images/4.jpg','images/5.jpg']
		}
	);


	$('#btnSave').bind('click',function(){

		geImg.saveImage();
	});

});
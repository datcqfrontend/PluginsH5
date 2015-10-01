$(document).on('ready',function(){
	//alert("Ready!");

	var geImg = new GenerateImage($('#mainObject'),{width:$('#mainObject')[0].clientWidth}).init();
    geImg.drawAvatarToBackground(
        {
            url: "images/temp_5.png",
            avatars: ['images/1.jpg','images/2.jpg','images/3.jpg','images/4.jpg','images/5.jpg'],
            usernames: [
                {	texts:[
                		{text:'Hot ',fontFamily:'Arial',fontSize:'20px',fontWeight:'bold',style:'blue'},
                		{text:'Boy 1 2 ',fontFamily:'Arial',fontSize:'20px',fontWeight:'italic',style:'red',strokeStyle:'black'},
                		{text:'aaa',fontFamily:'Arial',fontSize:'10px',fontWeight:'italic',style:'green'}
                	],
                	wrapRect:'white',
                	textAlign:'center'

            	}, 
                {text:'Hot Boy 2',fontFamily:'Arial',fontSize:'15px',fontWeight:'italic',style:'blue', wrapRect:'white',textAlign:'start'},
                {text:'Hot Boy 3',fontFamily:'Arial',fontSize:'15pt',fontWeight:'',style:'blue', wrapRect:'white',textAlign:'end'},
                {text:'Hot Girl 123',fontFamily:'Arial',fontSize:'20pt',style:'red', strokeStyle:'blue', wrapRect:'white'},
                {text:'Hot Boy 4',fontFamily:'Arial',fontSize:'20px',fontWeight:'normal',style:'blue', wrapRect:'white',textAlign:'left'}]
        }
    );

    $('#btnSave').bind('click',function(){

        geImg.saveImage();
    });

});
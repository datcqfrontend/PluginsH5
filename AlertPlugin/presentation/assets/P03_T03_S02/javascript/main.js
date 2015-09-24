(function () {
    $('#slider').on('ready', '.P03_T03_S02', function (e, el) {
        var slide = $('#container', el);
	
	startTracking("Complement_in_aHUS");//tracking screen
	
	
	var status = 0,
		btnLeftClicked =  false,
		btnRightClicked =  false;
		
	$('.btn_cong1',slide).bind('tapone',function(){
		btnRightClicked = true;
		checkPlusBtnRight();
	});
	$('.btn_cong2',slide).bind('tapone',function(){
		btnLeftClicked = true;
		checkPlusBtnLeft();
	});
	
	function checkPlusBtnLeft()
	{
		if(btnLeftClicked)
		{
			$('.btn_cong2',slide).hide();
			$('.screen_2, .box_note3, .red_left_arrow',slide).show();	
		}
		else
		{
			$('.btn_cong2',slide).show();
			$('.screen_2, .box_note3, .red_left_arrow',slide).hide();	
		}
		
		if(btnRightClicked || btnLeftClicked)
		{
			$('.screen_2',slide).show();
		}
		else
		{
			$('.screen_2',slide).hide();
		}
	}
	
	function checkPlusBtnRight()
	{
		if(btnRightClicked)
		{
			$('.btn_cong1',slide).hide();
			$('.screen_2, .box_note4, .red_right_arrow',slide).show();	
		}
		else
		{
			$('.btn_cong1',slide).show();
			$('.screen_2, .box_note4, .red_right_arrow',slide).hide();				
		}
		
		if(btnRightClicked || btnLeftClicked)
		{
			$('.screen_2',slide).show();
		}
		else
		{
			$('.screen_2',slide).hide();
		}
	}
	
	$('.box_note4',slide).bind('tapone', function(){
		btnRightClicked = false;
		checkPlusBtnRight();
			/*$(this).hide();
			$('.red_right_arrow',slide).hide();
			$('.btn_cong1',slide).show();*/
	});
	
	$('.box_note3',slide).bind('tapone', function(){
		btnLeftClicked = false;
		checkPlusBtnLeft();
			/*$(this).hide();
			$('.red_left_arrow',slide).hide();
			$('.btn_cong2',slide).show();			*/
	});
	/*$('.screen_2',slide).bind('tapone',function(){
		$('.btn_cong2',slide).show();
		$('.btn_cong1',slide).show();
		$('.screen_2',slide).hide();	
	});*/
	var isShow = false;
	$('.z1',slide).bind('tapone',function(){
		$('.screen_3',slide).show();
		$('.screen_1,.btn_cong1,.btn_cong2, .box_note3, .box_note4, .red_right_arrow, .red_left_arrow',slide).hide();
		$('.screen_2, .btn_plus ',slide).hide();
		
	});
	$('.z2',slide).bind('tapone',function(){
		console.log(zoom);
		switch(zoom)
		{
			case 1:
				$('.screen_4, .bnt1_congsc4, .bnt2_congsc4',slide).show();

				break;
			case 2:
				$('.screen_4, .screen_5, .box1_sc5, .arrow2_sc5, .box2_sc5, .arrow1_sc5',slide).show();
				break;
			case 3:
				$('.screen_4, .screen_5, .bnt1_congsc4, .arrow_red_left, .box1_sc5, .arrow2_sc5',slide).show();
				$('.arrow1_sc5, .bnt2_congsc4',slide).hide();	
				break;
			case 4:
				$('.screen_4, .screen_5, .bnt2_congsc4, .arrow_red_right, .arrow1_sc5, .box2_sc5',slide).show();
				$('.arrow2_sc5, .bnt1_congsc4',slide).hide();	
				break;
			default:												
		}
		$('.zoom_outsc4',slide).css('display', 'block');
		$('.screen_1,.btn_cong1,.btn_cong2, .box_note3, .box_note4, .red_left_arrow, .red_right_arrow, .btn_plus',slide).hide();			
	});
	$('.zoom_out',slide).bind('tapone',function(){
		$('.screen_3',slide).hide();
		$('.screen_1,.btn_cong1,.btn_cong2, .btn_plus',slide).show();
		checkPlusBtnRight();
		checkPlusBtnLeft();
	});
	
	var zoom = 1;
	
	$('.zoom_outsc4',slide).bind('tapone',function(){
		if($('.box1_sc5',slide).css('display') == 'none' && $('.box2_sc5',slide).css('display') == 'none')
		{
			zoom = 1;
		}
		else if($('.box1_sc5',slide).css('display') == 'block' && $('.box2_sc5',slide).css('display') == 'block')
		{
			zoom = 2;
		}
		else if($('.box1_sc5',slide).css('display') == 'block')
		{
			zoom = 3;
		}
		else if($('.box2_sc5',slide).css('display') == 'block')
		{
			zoom = 4;
		}
		
		$('.screen_5,.screen_4, .bnt1_congsc4, .bnt2_congsc4, .arrow2_sc5, .arrow1_sc5, .box2_sc5, .box1_sc5',slide).hide();
		$(this).hide();
		$('.screen_1,.btn_cong1,.btn_cong2, .btn_plus',slide).show();
		
		console.log(zoom);
		checkPlusBtnRight();
		checkPlusBtnLeft();
	});
	$('.bnt1_congsc4',slide).bind('tapone',function(){

		status = 5;
		$('.screen_5, .box2_sc5, .arrow1_sc5',slide).show();
		$('.bnt1_congsc4',slide).hide();

	});
	
	$('.box2_sc5',slide).bind('tapone', function(){
		$(this).hide();
		$('.arrow1_sc5',slide).hide();
		$('.bnt1_congsc4',slide).show();
	});
	
	$('.bnt2_congsc4',slide).bind('tapone',function(){
		status = 6;
		$('.screen_5, .box1_sc5, .arrow2_sc5',slide).show();
		$('.bnt2_congsc4',slide).hide();
	});
	

	$('.box1_sc5',slide).bind('tapone',function(){
		$(this).hide();
		$('.arrow2_sc5',slide).hide();
		$('.screen_4',slide).show();
		$('.bnt2_congsc4',slide).show();
	});
	
	$('.btn_back',slide).bind('tapone', function(){
		$('.pu, .zoom_outsc4', slide).hide('fade');
		//$('.screen_1, .btn_methodology, .btn_plus, .btn_cong1, .btn_cong2',slide).css('display', 'block');
		console.log(status);
		switch(status)
		{
			case 1:
				$('.screen_1, .btn_methodology, .btn_cong1, .btn_cong2',slide).css('display', 'block');
				break;
			case 11:
				$('.btn_cong1, .btn_cong2',slide).css('display', 'none');
				$('.screen_1, .screen_2, .box_note3, .box_note4',slide).css('display', 'block');
				break;
			case 12:
				$('.btn_cong2, .box_note4',slide).css('display', 'none');
				$('.screen_1, .screen_2, .box_note3, .btn_cong1',slide).css('display', 'block');
				break;
			case 13:
				$('.btn_cong1, .box_note3',slide).css('display', 'none');
				$('.screen_1, .screen_2, .box_note4, .btn_cong2',slide).css('display', 'block');
				break;	
			case 2:
				break;
			case 3:
				$('.screen_3',slide).show();
				$('.screen_1,.btn_cong1,.btn_cong2, .box_note3, .box_note4, .arrow_red_left, .arrow_red_right',slide).hide();
				$('.screen_2',slide).hide();
				break;
			case 4:
				$('.screen_4, .bnt1_congsc4, .bnt2_congsc4, .zoom_outsc4 ',slide).show();
				$('.screen_1,.btn_cong1,.btn_cong2, .box_note3, .box_note4, .arrow_red_left, .arrow_red_right',slide).hide();
				break;
			case 5:
				$('.screen_4, .screen_5, .box2_sc5, .arrow1_sc5, .bnt2_congsc4, .zoom_outsc4',slide).show();
				$('.bnt1_congsc4',slide).hide();
				break;
			case 6:
				$('.screen_4, .screen_5, .box1_sc5, .arrow2_sc5, .bnt1_congsc4, .zoom_outsc4',slide).show();
				$('.bnt2_congsc4',slide).hide();
				break;
			case 7:
				$('.screen_4, .screen_5, .box1_sc5, .arrow2_sc5, .box2_sc5, .arrow1_sc5, .zoom_outsc4',slide).show();
				$('.bnt2_congsc4, .bnt1_congsc4',slide).hide();
				break;
			default:
		}
		
		$('.btn_plus',slide).css({display:'block'});
	});
	
	
	$(".btn_plus",slide).bind('tapone', function(){
//		endTracking("Complement_in_aHUS");
		startTracking("Complement_in_aHUS_PU");//tracking PU
		if($('.screen_1',slide).css('display') == 'block' && $('.box_note3',slide).css('display') == 'none' && $('.box_note4',slide).css('display') == 'none')
		{
			status = 1;
		}
		else if($('.screen_1',slide).css('display') == 'block' && $('.box_note3',slide).css('display') == 'block' && $('.box_note4',slide).css('display') == 'block')
		{
			status = 11;
		}
		else if($('.screen_1',slide).css('display') == 'block' && $('.box_note3',slide).css('display') == 'block')
		{
			status = 12;
		}
		else if($('.screen_1',slide).css('display') == 'block' && $('.box_note4',slide).css('display') == 'block')
		{
			status = 13;
		}
		else if($('.screen_3',slide).css('display') == 'block')
		{
			status = 3;
		}
		else if($('.screen_4',slide).css('display') == 'block' && $('.box2_sc5',slide).css('display') == 'none' && $('.box1_sc5',slide).css('display') == 'none')
		{
			status = 4;
		}
		else if($('.box2_sc5',slide).css('display') == 'block' && $('.box1_sc5',slide).css('display') == 'block')
		{
			status = 7;
		}
		else if($('.box2_sc5',slide).css('display') == 'block')
		{
			status = 5;
		}
		else if($('.box1_sc5',slide).css('display') == 'block')
		{
			status = 6;
		}

		$('.pu',slide).show('fade');
		$(this).css('display', 'none');
		$('.screen_1, .screen_2, .screen_3, .screen_4, .screen_5, .btn_methodology, .btn_cong1, .btn_cong2, .bnt1_congsc4, .bnt2_congsc4, .zoom_outsc4',slide).css('display', 'none');
		
		endTracking("Complement_in_aHUS_PU");
	});
	
});
})();
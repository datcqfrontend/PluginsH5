$(document).ready(function(){
	var bounceTime = 1000;

	$('.ball').css('bottom',300);

	function ballBounce($obj){
		var $obj = $obj;
		var ballHeight = parseInt($obj.css('bottom').replace('px',''));
		
		$obj.animate({'bottom':0}, bounceTime, 'easeInQuad', function() {
			$(this).animate({'bottom':ballHeight/2}, bounceTime, 'easeOutQuad', function() {
				if(ballHeight/2>=10){
					$(this).css('bottom',ballHeight/2);
					ballBounce($(this));
				}else{
					$obj.animate({'bottom':0}, bounceTime, 'easeInQuad');
				}
			});
		});
	}
	
	ballBounce($('.ball'));
});
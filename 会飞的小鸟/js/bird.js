$(function(){
	var $bird=$(".dbird");
	var pos=$bird.offset();
	var birdsize={width:$bird.width(),height:$bird.height()};
	var speed=10;
	var keyCode=39;
	
	$(document).keydown(function(even){
		var key=even.keyCode;
		   if(key!=keyCode){
		        $bird.removeClass().addClass("list_"+key);
	            }
		keyCode=key;
	
		switch(key){
			case 37://zuo
			pos.left-=speed;
			if(pos.left<=-birdsize.width){
				pos.left=$(window).width();
			}
			break;
			case 38://shang
			pos.top-=speed;
			if(pos.top<=-birdsize.height){
				pos.top=$(window).height();
			}
			break;
			case 39://you
			pos.left+=speed;
			if(pos.left>=$(window).width()){
				pos.left=-birdsize.width;
			}
			break;
			case 40://xia
			pos.top+=speed;
			if(pos.top>=$(window).height()){
				pos.top=-birdsize.height;
			}
			break;
		}
		$bird.offset(pos);
	});
	
});
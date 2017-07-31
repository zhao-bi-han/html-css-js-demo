$(function(){
	$(".menu a").toggle(function(){
		$(this).next().slideDown(); 
		//var index=$(".imenu ul").index($(this).next());
		//$(".imenu ul").not(":eq("+index+")").slideUp();
		$(this).css({'backgroundColor':'#363636'});
		$(this).children('i').removeClass('iconfont icon-jiahao');
		$(this).children('i').addClass('iconfont icon-jianhao1');
	},function(){
		$(this).next().slideUp();
		//var index=$(".imenu ul").index($(this).next());
		//$(".imenu ul").not(":eq("+index+")").slideUp();
		$(this).css({'background':'none'});
		$(this).children('i').removeClass('iconfont icon-jianhao1');
		$(this).children('i').addClass('iconfont icon-jiahao');
		
	});
});
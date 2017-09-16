# CSS3图片两面翻转动画效果
##### CSS
css 方面主要使用了`transform` 、`backface-visibility`、`transition` 属性,主要css如下：
```
.imgItem{
	width: 160px;
	height: auto;
	overflow: hidden;
	position: absolute;
	transition: transform 2s ease;
}
.front{
        backface-visibility: hidden;  /*使背面不可见*/
}
.run{
	transform: rotateY(180deg);  /*这个class 是jquery动态加class的时候用到的，图片翻转效果就靠这句样式来实现的*/
}
```
js相关代码
```
	<script type="text/javascript" src="js/jquery-3.2.1.min.js"></script>
	<script type="text/javascript">

		var img_box=$(".img-box"),
		len=img_box.length,
		timeout=null,     // 定时器初始化
		intTime=null,
		i=0;
		show();

		function show(){
			clearTimeout(timeout);
			var intTime=setInterval(function(){
				var item=img_box.eq(i).find('.imgItem');
				if(item.hasClass('run')){
					item.removeClass('run');
					i--;
				}else{
					item.addClass('run');
					i++;
				}
				if(i>=len){
					i=len-1;					
				}else if(i<0){
					i=0;
				}
				clearInterval(intTime);
				timeout=setTimeout(function(){
					show();
				},8000)
			},3000);
		}

	</script>

```
效果展示<br>
![Image text](https://raw.githubusercontent.com/zhao-bi-han/html-css-js-demo/master/CSS3%E5%9B%BE%E7%89%87%E4%B8%A4%E9%9D%A2%E7%BF%BB%E8%BD%AC%E5%8A%A8%E7%94%BB%E6%95%88%E6%9E%9C/show-img/show.GIF)

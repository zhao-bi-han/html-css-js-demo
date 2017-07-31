	//得到元素的行间样式
		function getstyle(obj,name){
			if(obj.currentStyle){
				return obj.currentStyle[name];
			}else {
				return getComputedStyle(obj,false)[name];
			}
		}

		function move(obj,atrr,itarget){
			clearInterval(obj.timer);
			obj.timer=setInterval(function(){
				var cur=0;
          	//对透明度的处理
          	if(atrr=='opacity'){
          		  //四舍五入小数点
          		cur=Math.round(parseFloat(getstyle(obj,atrr))*100);
          	}else{
          		cur=parseInt(getstyle(obj,atrr));
          	}

          	var speed=(itarget-cur)/6;
          	speed=speed>0?Math.ceil(speed):Math.floor(speed);
          	if(itarget==cur){
          		clearInterval(obj.timer);
          	}else {
          		if(atrr=='opacity'){
          			obj.style[atrr]='alpha(opacity:'+(cur+speed)+')';
          			obj.style[atrr]=(cur+speed)/100;
          		}else {
          			obj.style[atrr]=cur+speed+'px';
          		}
          		
          	}

          },30);
		}



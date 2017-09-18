# html5 实现写字板
画板实现主要使用的是html5中`canvas`
## 技术
* 绘制线条
```
    context.beginPath();
    context.moveTo(0,0);
    context.lineTo(canvasWidth,0);
    context.lineTo(canvasWidth,canvasHeight);
    context.lineTo(0,canvasHeight);
    context.closePath();
    context.lineWidth=5;
    context.stroke();
```
* 通过定义一个变量`isMouseDown`来判断是否是点击状态并且在画布上
```
    canvas.onmousedown=function(e){
          isMouseDown=true;
          startLoc=canvasToWindow(e.clientX,e.clientY)
    }
    canvas.onmouseup=function(e){
          isMouseDown=false;
    }
    canvas.onmouseout=function(e){
        isMouseDown=false;
    }
    canvas.onmousemove=function(e){  
        if(isMouseDown){
            var curLoc=canvasToWindow(e.clientX,e.clientY);
            context.beginPath();
            context.moveTo(startLoc.x,startLoc.y);
            context.lineTo(curLoc.x,curLoc.y);
            context.lineCap="round";
            context.lineJoin="round";
            context.strokeStyle=iscolor;
            context.lineWidth=3;
            context.stroke();
            startLoc=curLoc;

        }
    }
```
* 获取canvas距离浏览器的距离
```
   function canvasToWindow(x,y){
        var box=canvas.getBoundingClientRect();  // 获取canvas距离浏览器的距离
        return {
           x:x-box.left,
           y:y-box.top
        }
    }

```
## 效果图
![Image text](https://raw.githubusercontent.com/zhao-bi-han/html-css-js-demo/master/html5%E5%AE%9E%E7%8E%B0%E5%86%99%E5%AD%97%E6%9D%BF/showImg/gaollg2.GIF)

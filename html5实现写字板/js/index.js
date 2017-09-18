var canvasWidth,canvasHeight,canvas;
var isMouseDown=false;
window.onload=function(){
    canvasWidth=400;
    canvasHeight=400;
    canvas=document.getElementById("canvas");
    context=canvas.getContext('2d');
    var iscolor="black";
    var startLoc={x:0,y:0};
   
    function canvasToWindow(x,y){
        var box=canvas.getBoundingClientRect();  // 获取canvas距离浏览器的距离
        return {
           x:x-box.left,
           y:y-box.top
        }
    }

    drawDrid()
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

    $(".color").click(function(){
        iscolor=$(this).attr("id");
    })
    $("#clear a").click(function(){
        context.clearRect(0,0,canvasWidth,canvasHeight);
        drawDrid();
    })

}

function drawDrid(){   // 画米子格
    canvas.width=canvasWidth;
    canvas.height=canvasHeight;
    context.strokeStyle="#838080";
    context.beginPath();
    context.moveTo(0,0);
    context.lineTo(canvasWidth,0);
    context.lineTo(canvasWidth,canvasHeight);
    context.lineTo(0,canvasHeight);
    context.closePath();
    context.lineWidth=5;
    context.stroke();
    context.beginPath();
    context.moveTo(0,0);
    context.lineTo(canvasWidth,canvasHeight);
    context.moveTo(canvasWidth,0);
    context.lineTo(0,canvasHeight);
    context.strokeStyle="#B1AEAE";
    context.lineWidth=2;
    context.stroke();
}
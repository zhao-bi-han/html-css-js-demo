 function dadishu(){
     var divImg=document.getElementById("img");
      //分数初始值
      var fen=0;
      //定时器
      var timerpo=null;
      var timerimgup=null;
      var timerimgdown=null;
      var timetime=null;
      //灰太狼的位置
      var img_po=[{left:'18px',top:'59px'},{left:'99px',top:'14px'},{left:'190px',top:'41px'},{left:'202px',top:'112px'},{left:'105px',top:'90px'},{left:'18px',top:'121px'},{left:'33px',top:'194px'},{left:'122px',top:'173px'},{left:'209px',top:'195px'}];
    //位置变
    // 用来记录图片上一次出现的位置
    var num=-99999;

    timerpo=setInterval(function(){
        //产生随机数
        var i=Math.floor(Math.random()*(8-0+1)+0);
        //判断图片上一次出现的位置和这次位置是否相同
        if(num==i){
          return;
        }else {
          num=i;
        }

        //产生图片的随机位置
        var img_left=img_po[i].left;
        var img_top=img_po[i].top;

        //产生随机图片
        var wolfImg=new Image();
        //图片的下标
        wolfImg.index=0;
        wolfImg.style.left=img_left;
        wolfImg.style.top=img_top;
        wolfImg.setAttribute('id','image');
        //产生一个随机数，来确定不同的图片 出现的几率不一样
        var j=Math.floor(Math.random()*(10-0+1)+0);
        if(j<8){
          wolfImg.type='h';
        }else{
          wolfImg.type='x';
        }
        wolfImg.src="./img/"+wolfImg.type+wolfImg.index+".png";
        //将产生的图片添加到div里
        divImg.appendChild(wolfImg);

        //产生图片变化  图片出来的效果
        timerimgup=setInterval(function(){
          wolfImg.index++;
          if(wolfImg.index<=5){
            wolfImg.src="./img/"+wolfImg.type+wolfImg.index+".png";
          }else{
            clearInterval(timerimgup);
            //图片下去的效果
            timerimgdown=setInterval(function(){
              wolfImg.index--;
              if(wolfImg.index<=0){
               clearInterval(timerimgdown);
               divImg.removeChild(wolfImg);

             }else {
               wolfImg.src="./img/"+wolfImg.type+wolfImg.index+".png";
             }
           },100);
          }

        }, 100);
        //分数变化
        var image=document.getElementById('image');
        var fendiv=document.getElementById('fen');
        image.onclick=function(){
          fen=fen+10
          fendiv.innerHTML=fen;
        }

      },800);

     //时间变化
     var time=document.getElementById('time');
     var jieshu=document.getElementById('jieshu');
     time.style.width=182+'px';
     timetime=setInterval(function(){

        // var width=time.offsetWidth;

        time.style.width=time.offsetWidth-1+'px';
        if(time.offsetWidth==0){
          clearInterval(timerpo);
          clearInterval(timetime);
          jieshu.style.display='block';
          //return;
        }
      },100);
  }
function add()
{
  alert();
}
window.onload=function(){
  //打地鼠函数
 
  //调用函数

    var start=document.getElementById("start");
    start.onclick=function(){
      start.style.display='none';
          dadishu();
    }
//游戏结束重新开始
     //var p=jieshu.getElementsByTagName('p')[1];
      var jieshu=document.getElementById('jieshu');
     var p=document.getElementById('c');
     p.onclick=function(){
       //location.reload();
      
       start.style.display='none';
       jieshu.style.display='none';
       //alert();

      dadishu();
       
     }

   }

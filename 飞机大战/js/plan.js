window.onload = function () {
    var main = document.getElementById('main');
    var startBtn = document.getElementById('startBtn');
    var startIndex=document.getElementById('start');
    var moveEle = document.getElementById('move');
    var bulletEle = document.getElementById('bullet');
    var enemyEle = document.getElementById("enemy");
    var pause = document.getElementById("pause");
    var gamecontinue = document.getElementById("gamecontinue");
    var continu = document.getElementById("continue");
    var gameover = document.getElementById('gameover');
    var gameover_score = gameover.getElementsByTagName('h1')[0];
    var scoreEle = document.getElementById('score');
    var right = document.getElementById('right');
    var life = document.getElementById('life');
    var lifeImg = life.getElementsByTagName('img');
    var again = document.getElementById('again');
    var signout=document.getElementById('signout');
    var info=document.getElementById("info");
    var overSignOut=document.getElementById('overSignOut');
    var bulletTime = null, enemyTime = null, bulletMoveTime = null, enemyMoveTime = null;
    var num = 0;
    var bullets, enemys;
    var score = 0;
    // 产生敌机
    function drop() {
        enemyTime = setInterval(() => {
            var randomX;
            if (num % 5 == 0) {
                randomX = Math.floor(Math.random() * (main.offsetWidth - 90));
                new EnemyFun(randomX, 90, 90, `img/md${Math.ceil(Math.random() * 6)}.png`);
            } else if (num == 20) {
                randomX = Math.floor(Math.random() * (main.offsetWidth - 160));
                new EnemyFun(randomX, 120, 120, `img/lg${Math.ceil(Math.random() * 2)}.png`);
                num = 0;
            } else {
                randomX = Math.floor(Math.random() * (main.offsetWidth - 60));
                new EnemyFun(randomX, 60, 60, `img/sm${Math.ceil(Math.random() * 7)}.png`);
            }
            num++;
        }, 500)
    }


    //开始游戏 执行
    startBtn.onclick = function (event) {
        startIndex.style.display = "none";
        moveEle.style.display = "block";
        right.style.display = 'block';
        life.style.display = 'block';
        planPosition(event)
    }

    // 开始游戏 函数
    function start(disX, disY) {
        //创建生命值
        if(!lifeImg.length){
            lifeCreate();
        }
       
        // 敌机下落
        drop();
        //创建子弹
        bulletTime = setInterval(() => {
            new bulletFun(moveEle.offsetLeft + moveEle.offsetWidth / 2 - 10, moveEle.offsetTop, 'img/bullet.png');
        }, 300)
        // 本方飞机移动
        document.onmousemove = function (event) {
            var event = event || window.event;
            moveEle.style.left = event.clientX - disX + 'px';
            moveEle.style.top = event.clientY - disY + 'px';
            borderJudge();
        }
        // 相撞   函数调用
        setInterval(enemyToBullet, 10);
    }


    // 相撞
    function enemyToBullet() {
        bullets = bulletEle.getElementsByTagName('img');
        enemys = enemyEle.getElementsByTagName('img');
        // 子弹和敌机相撞
        for (var j = 0; j < bullets.length; j++) {
            for (var i = 0; i < enemys.length; i++) {
                var bulletR = bullets[j].offsetLeft + bullets[j].offsetWidth,
                    bulletB = bullets[j].offsetTop + bullets[j].offsetHeight,
                    itemR = enemys[i].offsetLeft + enemys[i].offsetWidth,
                    itemB = enemys[i].offsetTop + enemys[i].offsetHeight;

                if (bulletR < enemys[i].offsetLeft || bulletB < enemys[i].offsetTop || bullets[j].offsetLeft > itemR || bullets[j].offsetTop > itemB) {
                    // M没有碰撞

                } else {
                    score = score + 10;
                    scoreEle.innerHTML = score;
                    enemyEle.removeChild(enemys[i]);

                }
            }
        }
        // 敌机和本机相撞
        for (var i = 0; i < enemys.length; i++) {
            var moveR = moveEle.offsetLeft + moveEle.offsetWidth,
                moveB = moveEle.offsetTop + moveEle.offsetHeight,
                itemR = enemys[i].offsetLeft + enemys[i].offsetWidth,
                itemB = enemys[i].offsetTop + enemys[i].offsetHeight;
            if (itemR < moveEle.offsetLeft || enemys[i].offsetLeft > moveR || itemB < moveEle.offsetTop || enemys[i].offsetTop > moveB) {

            } else {
                enemyEle.removeChild(enemys[i]);
                lifeImg[lifeImg.length - 1].setAttribute('src','img/die.png');
                moveEle.getElementsByTagName('img')[0].setAttribute('src','img/info.png');
                setTimeout(()=>{
                    life.removeChild(lifeImg[lifeImg.length - 1]);
                    moveEle.getElementsByTagName('img')[0].setAttribute('src','img/img_item.png');
                    if (lifeImg.length<1) {
                        gameover.style.display = "block";
                        pauseFun();
                        gameover_score.innerHTML = score + '分';
                    } 
                },400)
                

            }
        }
    }


    // 创建子弹类
    function bulletFun(bulletX, bulletY, imgSrc) {
        this.bulletLeft = bulletX + 'px';
        this.bulletTop = bulletY + 'px';
        this.bullet = null;
        this.init = function () {
            this.bullet = document.createElement('img');
            this.bullet.setAttribute('src', imgSrc);
            this.bullet.style.left = this.bulletLeft;
            this.bullet.style.top = this.bulletTop;
            bulletEle.appendChild(this.bullet);
            this.bulletMove();
        }
        this.bulletMove = function () {
            bulletMoveTime = setInterval(() => {
                this.bullet.style.top = this.bullet.offsetTop - 24 + 'px';
                if (this.bullet.offsetTop < 0) {
                    bulletEle.removeChild(this.bullet);
                }
            }, 50)

        }
        this.init();
    }

    // 创建敌机类
    function EnemyFun(x, sizeW, sizeH, imgSrc) {
        this.enemyLeft = x + 'px';
        this.enemyWidth = sizeW + 'px';
        this.enemyHeight = sizeH + 'px';
        this.enemy = null;

        this.init = function () {
            this.enemy = document.createElement('img');
            this.enemy.setAttribute('src', imgSrc);
            this.enemy.style.left = this.enemyLeft;
            this.enemy.style.width = this.enemyWidth;
            this.enemy.style.height = this.enemyHeight;
            enemyEle.appendChild(this.enemy);
            this.enemyMove();
        }

        this.enemyMove = function () {
            enemyMoveTime = setInterval(() => {
                this.enemy.style.top = this.enemy.offsetTop + 16 + 'px';
                if (this.enemy.offsetTop > main.offsetHeight) {

                    enemyEle.removeChild(this.enemy);
                }
            }, 100)
        }
        this.init();
    }
    // 创建生命
    function lifeCreate() {
        for (var i = 0; i < 5; i++) {
            var createImg = document.createElement('img');
            createImg.setAttribute('src', 'img/life.png');
            life.appendChild(createImg);
        }
    }

    // 本方飞机移动边界判断
    function borderJudge() {
        var mleft = moveEle.offsetLeft,
            mtop = moveEle.offsetTop,
            mwidth = moveEle.offsetWidth,
            mheight = moveEle.offsetHeight;
        // 左边
        if (mleft < 0) {
            moveEle.style.left = 0;
        } else if (mleft + mwidth > main.offsetWidth) {   // 右边
            moveEle.style.left = main.offsetWidth - mwidth + 'px';
        } else if (mtop < 0) {
            moveEle.style.top = 0;
        } else if (mtop + mheight > main.offsetHeight) {
            moveEle.style.top = main.offsetHeight - mheight + 'px';
        }
    }

    // 暂停
    pause.onclick = function () {

       
        pauseFun();
        if(lifeImg.length<1){
            gameover.style.display = "block";
        }else{
            gamecontinue.style.display = "block";
        }

    }
    // 继续游戏

    continu.onclick = function (event) {
        planPosition(event);
        gamecontinue.style.display = "none";
    }
    // 重新开始
    again.onclick = function (event) {
        score=0;
        planPosition(event);
        gameover.style.display = "none";
        scoreEle.innerHTML = score;
    }
    // 退出游戏

    signout.onclick=SignOut;
    overSignOut.onclick=SignOut;
  //退出游戏
  function SignOut(){
    startBtn.style.display = "block";
    gameover.style.display = "none";
    moveEle.style.display = "none";
    right.style.display = 'none';
    life.style.display = 'none';
    gamecontinue.style.display = "none";
    score=0;
    life.innerHTML='';
    enemyEle.innerHTML='';
  }

    // 暂定
    function pauseFun() {
        clearInterval(bulletTime);
        clearInterval(enemyTime);

        document.onmousemove = null;
    }

    // 本机位置和 获取点击位置
    function planPosition(event){
        var event = event || window.event;
        var x = event.clientX - main.offsetLeft;
        var y = event.clientY - main.offsetTop;
        moveEle.style.left = x - 40 + 'px';
        moveEle.style.top = y - 40 + 'px';
        var disX = event.clientX - moveEle.offsetLeft,
        disY = event.clientY - moveEle.offsetTop;
         start(disX, disY);
    }

}

/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 14-2-19
 * Time: 上午9:23
 * To change this template use File | Settings | File Templates.
 */


    //按键  ,点击颜色
function clickColor(){
    header_span[0].onclick=function (){
        if(colorIsInHinder(temp_color[0], temp_hinder)){
            boy_img.src = "images/boy1.gif";
            setTimeout("boy_img.src = 'images/boy.png'", 100);
            drawBullet(temp_color[0]);
            one_color = temp_color[0];
        } else{
            gameOver();
        }
    }
    header_span[1].onclick=function (){
        if(colorIsInHinder(temp_color[1], temp_hinder)){
            boy_img.src = "images/boy1.gif";
            setTimeout("boy_img.src = 'images/boy.png'", 100);
            drawBullet(temp_color[1]);
            one_color = temp_color[1];
        } else{
            gameOver();
        }
    }
    header_span[2].onclick=function (){
        if(colorIsInHinder(temp_color[2], temp_hinder)){
            boy_img.src = "images/boy1.gif";
            setTimeout("boy_img.src = 'images/boy.png'", 100);
            drawBullet(temp_color[2]);
            one_color = temp_color[2];
        } else{
            gameOver();
        }
    }
    header_span[3].onclick=function (){
        if(colorIsInHinder(temp_color[3], temp_hinder)){
            boy_img.src = "images/boy1.gif";
            setTimeout("boy_img.src = 'images/boy.png'", 100);
            drawBullet(temp_color[3]);
            one_color = temp_color[3];
        } else{
            gameOver();
        }
    }
    header_span[4].onclick=function (){
        if(colorIsInHinder(temp_color[4], temp_hinder)){
            boy_img.src = "images/boy1.gif";
            setTimeout("boy_img.src = 'images/boy.png'", 100);
            drawBullet(temp_color[4]);
            one_color = temp_color[4];
        } else{
            gameOver();
        }
    }
}

//开始游戏创建一个障碍物
function createHinder() {
    hinder_count++;
    //创建一个随机数来随机获取障碍物
    hinder_canvas.style.right = '-160px';
    var random_num = Math.floor(Math.random() * 10);
    temp_hinder = hinder[random_num];
    temp_hinder.one.mark = 1;
    temp_hinder.two.mark = 1;
    temp_hinder.three.mark = 1;
    temp_hinder.four.mark = 1;

    if(hinder_count <= 10){
        if(hinder_count == 1){
            while (1){
                random_num = Math.floor(Math.random() * color_num);
                if(stringIsInArray(color[random_num],temp_color)){
                    temp_color.push(color[random_num]);
                    break;
                }
            }
            setTimeout("handleClassList(color_div, 'add', 'two-span')", 50);
            header_span[0].style.backgroundColor=temp_color[0];
            header_span[1].style.backgroundColor=temp_color[1];
        }
        else if(hinder_count == 3){
            while (1){
                random_num = Math.floor(Math.random() * color_num);
                if(stringIsInArray(color[random_num],temp_color)){
                    temp_color.push(color[random_num]);
                    break;
                }
            }
            handleClassList(color_div, 'remove', 'two-span');
            setTimeout("handleClassList(color_div, 'add', 'three-span')", 50);
            header_span[2].style.backgroundColor=temp_color[2];
        }
        else if(hinder_count == 6){
            while (1){
                random_num = Math.floor(Math.random() * color_num);
                if(stringIsInArray(color[random_num],temp_color)){
                    temp_color.push(color[random_num]);
                    break;
                }
            }
//                 console.log(temp_color);
            header_span[3].style.backgroundColor=temp_color[3];
            handleClassList(color_div, 'remove', 'three-span');
            setTimeout("handleClassList(color_div, 'add', 'four-span')", 50);
        }
        else if(hinder_count == 10){
            while (1){
                random_num = Math.floor(Math.random() * color_num);
                if(stringIsInArray(color[random_num],temp_color)){
                    temp_color.push(color[random_num]);
                    break;
                }
            }
//                 console.log(temp_color);
            header_span[4].style.backgroundColor=temp_color[4];
            handleClassList(color_div, 'remove', 'four-span');
            setTimeout("handleClassList(color_div, 'add', 'five-span')", 50);
        }

    }



    var temp_len = temp_color.length;
    while (1){
        random_num = Math.floor(Math.random() * temp_len);
        if(one_color != temp_color[random_num]){
            temp_hinder.one.color = temp_color[random_num];
            break;
        }
    }
    while (1){
        random_num = Math.floor(Math.random() * temp_len);
        if(one_color != temp_color[random_num]){
            temp_hinder.two.color = temp_color[random_num];
            break;
        }
    }
    while (1){
        random_num = Math.floor(Math.random() * temp_len);
        if(one_color != temp_color[random_num]){
            temp_hinder.three.color = temp_color[random_num];
            break;
        }
    }
    while (1){
        random_num = Math.floor(Math.random() * temp_len);
        if(one_color != temp_color[random_num]){
            temp_hinder.four.color = temp_color[random_num];
            break;
        }
    }
    temp_hinder.draw();
    moveHinder();
}

//移动障碍物
function moveHinder() {
    //障碍物移动
    hinder_canvas.style.right = parseInt(hinder_canvas.style.right) + 1 + 'px';
    if(parseInt(hinder_canvas.style.right) >= 450 ){
        //障碍物接近人物，人物消失，游戏结束
        gameOver();
    }else {
        hinder_id = setTimeout(moveHinder, game_time);
    }
}

//子弹向右移动并处理碰撞和颜色变化
function moveBullet(){
    bullet.style.left = parseInt(bullet.style.left) + 20 + "px";
    //处理子弹与障碍物碰撞
    if(parseInt(bullet.style.left) >= (640 - parseInt(hinder_canvas.style.right) )){
        main_arc_r = 0;
        bullet.style.left = '160px';
        clear_color_count++;
        score_span.innerHTML = parseInt(score_span.innerHTML) + 200;


        arc_x = 720-parseInt(hinder_canvas.style.right);
        mainBackColorMove();
        if(temp_hinder.one.color == one_color){
            temp_hinder.one.mark = 0;
        }
        if(temp_hinder.two.color == one_color){
            temp_hinder.two.mark = 0;
        }
        if(temp_hinder.three.color == one_color){
            temp_hinder.three.mark = 0;
        }
        if(temp_hinder.four.color == one_color){
            temp_hinder.four.mark = 0;
        }
        temp_hinder.draw();
        //当每种颜色都被消除，此时障碍物消失，从新春构建一个障碍物
        if(temp_hinder.one.mark == 0 && temp_hinder.two.mark == 0 && temp_hinder.three.mark == 0 && temp_hinder.four.mark == 0){
            if(game_time >=2 && hinder_count % 3 == 0){
                game_time--;
            }
            score_span.innerHTML = parseInt(score_span.innerHTML) + 1000;
            clearTimeout(hinder_id);
            createHinder();
        }
    }else {
        bullet_id = setTimeout(moveBullet, 8);
    }

}

//让背景产生扩散效果
function mainBackColorMove(){
    main_arc_r += 30;
    main_context.beginPath();
    main_context.arc(arc_x,230,main_arc_r,0,Math.PI*2,false);
    main_context.fillStyle=one_color;
    main_context.fill();
    if(main_arc_r <= 1000){
       spread_id =  setTimeout(mainBackColorMove, 1);
    }

}



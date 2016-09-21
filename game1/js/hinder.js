/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 14-2-18
 * Time: 上午9:01
 * To change this template use File | Settings | File Templates.
 */
    //障碍物数组+
var hinder = new Array(10),
    color = ['silver', 'maroon', 'fuchsia', 'purple', 'green', 'lime',  'yellow', 'navy', 'teal', 'aqua', 'orange'],
    temp_color=[],
    box = document.getElementById("box"),     //玩游戏的整个容器div
    main_canvas = box.firstElementChild,   //大的canvas
    click_div = main_canvas.nextElementSibling,    //点击颜色的div
    hinder_canvas = click_div.nextElementSibling,  //障碍物的canvas区域
    hinder_context = hinder_canvas.getContext("2d"),     //障碍物的2d绘图上下文区域
    boy_img = hinder_canvas.nextElementSibling,        //小男孩的图片
    bullet = boy_img.nextElementSibling,               //子弹绘图对象
    bullet_context = bullet.getContext('2d'),           //子弹2d绘图上下文
    main_context = main_canvas.getContext("2d"),       // 大的canvas 2d绘图上下文
    main_arc_r = 0,                                      //  大的canvas画圆的R半径
    temp_hinder = null,                                 //临时存储障碍物的对象
    temp_color = [],                              //临时存储每一次游戏所需的颜色数组
    hinder_count = 0,                                    //对障碍物计数
    clear_color_count = 0,                               //对消除颜色计数
    color_div = main_canvas.nextElementSibling,      //点击颜色的div
    header_span = color_div.children,                  //颜色span标签
    hinder_id=null,                                    //控制障碍物移动的临时变量
    bullet_id=null,                                    //控制子弹移动的临时变量
    spread_id=null,                                    //控制颜色扩散的临时变量
    start_div = document.getElementById("bei"),    //存储开始界面的容器div
    score_span = bullet.nextElementSibling.lastElementChild,    //记录分数的span
    rank_div = document.getElementById("rank"),                     //游戏结束时整个界面的div
    arc_x = 800,                                                        //扩散颜色的中心X坐标
    db = null,                                                         //本地数据库
    suspend_ul = box.lastElementChild,                            //暂停界面
    game_time = 10,                                                  //每次障碍物移动的间隔时间
    color_num = color.length,                                      //颜色数量
    one_color = color[0];                              //临时存储颜色的变量




   temp_color[0] = color[Math.floor(Math.random()*color_num)];                           //临时颜色数组赋初值
   one_color = temp_color[0];
//对子弹进行绘图
   function drawBullet(color) {
       bullet.width = 18;
       bullet.height = 12;
       bullet_context.strokeStyle = color;
       bullet_context.lineCap = 'round';
       bullet_context.lineWidth = '12';
       bullet_context.beginPath();
       bullet_context.moveTo(2,9);
       bullet_context.lineTo(13,9);
       bullet_context.stroke();
       bullet_context.closePath();
       bullet.style.left = "160px";        //对子弹位置初始化
       moveBullet();
   }



//自行车
hinder[0] = {
    one : {mark: 1, color: color[0]},
    two : {mark: 1, color: color[1]},
    three : {mark: 1, color: color[2]},
    four : {mark: 1, color: color[3]},
    draw : function(){
        hinder_canvas.width = 160;
        hinder_canvas.height = 160;
        if(this.one.mark){
            hinder_context.strokeStyle = this.one.color;
            hinder_context.lineWidth = '10';
            hinder_context.beginPath();
            hinder_context.moveTo(55, 90);
            hinder_context.arc(30, 90, 25, 0, Math.PI*2, true);
            hinder_context.stroke();
            hinder_context.closePath();
            hinder_context.beginPath();
            hinder_context.moveTo(155, 90);
            hinder_context.arc(130, 90, 25, 0, Math.PI*2, true);
            hinder_context.stroke();
            hinder_context.closePath();
        }
        if(this.two.mark){
            hinder_context.fillStyle = this.two.color;
            hinder_context.beginPath();
            hinder_context.moveTo(30, 90);
            hinder_context.arc(30, 90, 21, 0, Math.PI*2, true);
            hinder_context.fill();
            hinder_context.closePath();
            hinder_context.beginPath();
            hinder_context.moveTo(130, 90);
            hinder_context.arc(130, 90, 21, 0, Math.PI*2, true);
            hinder_context.fill();
            hinder_context.closePath();
        }
        if(this.three.mark){
            hinder_context.strokeStyle = this.three.color;
            hinder_context.fillStyle = this.three.color;
            hinder_context.lineWidth = '10';
            hinder_context.lineCap = 'round';
            hinder_context.lineJoin = 'bevel';
            hinder_context.beginPath();
            hinder_context.moveTo(30, 90);
            hinder_context.lineTo(55, 40);
            hinder_context.lineTo(45, 30);
            hinder_context.lineTo(30, 40);
            hinder_context.lineTo(40, 45);
            hinder_context.moveTo(55, 40);
            hinder_context.lineTo(105, 50);
            hinder_context.lineTo(130, 90);
            hinder_context.moveTo(50, 50);
            hinder_context.lineTo(90, 90);
            hinder_context.lineTo(105, 30);
            hinder_context.moveTo(90, 90);
            hinder_context.lineTo(130, 90);
            hinder_context.moveTo(90, 80);
            hinder_context.lineTo(130, 90);
            hinder_context.moveTo(90, 100);
            hinder_context.lineTo(130, 90);
            hinder_context.stroke();
            hinder_context.closePath();
            hinder_context.beginPath();
            hinder_context.arc(90,90,15,0, Math.PI*2, true);
            hinder_context.fill();
            hinder_context.closePath();
        }
        if(this.four.mark){
            hinder_context.fillStyle = this.four.color;
            hinder_context.strokeStyle = this.four.color;
            hinder_context.lineCap = 'round';
            hinder_context.lineWidth = '10';
            hinder_context.beginPath();
            hinder_context.moveTo(95, 30);
            hinder_context.lineTo(115, 25);
            hinder_context.stroke();
            hinder_context.closePath();
        }
    }
};
//熊
hinder[1] = {
    one : {mark: 1, color: color[0]},
    two : {mark: 1, color: color[1]},
    three : {mark: 1, color: color[2]},
    four : {mark: 1, color: color[3]},
    draw : function(){
        hinder_canvas.width = 160;
        hinder_canvas.height = 160;
        if(this.one.mark){
            hinder_context.fillStyle = this.one.color;
            hinder_context.beginPath();
            hinder_context.moveTo(0, 70);
            hinder_context.lineTo(10, 77);
            hinder_context.lineTo(30, 70);
            hinder_context.lineTo(40, 75);
            hinder_context.lineTo(40, 75);
            hinder_context.lineTo(55, 30);
            hinder_context.lineTo(25, 40);
            hinder_context.lineTo(10, 50);
            hinder_context.lineTo(10, 60);
            hinder_context.lineTo(0, 70);
            hinder_context.fill();
            hinder_context.closePath();
        }
        if(this.two.mark){
            hinder_context.fillStyle = this.two.color;
            hinder_context.beginPath();
            hinder_context.moveTo(40, 75);
            hinder_context.lineTo(25, 95);
            hinder_context.lineTo(22, 120);
            hinder_context.lineTo(37, 120);
            hinder_context.lineTo(57, 85);
            hinder_context.lineTo(62, 102);
            hinder_context.lineTo(55, 120);
            hinder_context.lineTo(75, 120);
            hinder_context.lineTo(82, 95);
            hinder_context.lineTo(78, 80);
            hinder_context.lineTo(75, 40);
            hinder_context.lineTo(55, 30);
            hinder_context.lineTo(40, 75);
            hinder_context.fill();
            hinder_context.closePath();
        }
        if(this.three.mark){
            hinder_context.fillStyle = this.three.color;
            hinder_context.beginPath();
            hinder_context.moveTo(78, 80);
            hinder_context.lineTo(110, 90);
            hinder_context.lineTo(115, 35);
            hinder_context.lineTo(75, 40);
            hinder_context.lineTo(78, 80);
            hinder_context.fill();
            hinder_context.closePath();
        }
        if(this.four.mark){
            hinder_context.fillStyle = this.four.color;
            hinder_context.beginPath();
            hinder_context.moveTo(110, 90);
            hinder_context.lineTo(115, 110);
            hinder_context.lineTo(110, 120);
            hinder_context.lineTo(125, 120);
            hinder_context.lineTo(130, 85);
            hinder_context.lineTo(145, 110);
            hinder_context.lineTo(137, 120);
            hinder_context.lineTo(150, 120);
            hinder_context.lineTo(160, 105);
            hinder_context.lineTo(137, 55);
            hinder_context.lineTo(115, 35);
            hinder_context.lineTo(110, 90);
            hinder_context.fill();
            hinder_context.closePath();
        }
    }
};
//花
hinder[2] = {
    one : {mark: 1, color: color[0]},
    two : {mark: 1, color: color[1]},
    three : {mark: 1, color: color[2]},
    four : {mark: 1, color: color[3]},
    draw : function(){
        hinder_canvas.width = 160;
        hinder_canvas.height = 160;
        hinder_context.translate(0, 0);
        if(this.one.mark){
            hinder_context.save();
            hinder_context.fillStyle = this.one.color;
            hinder_context.beginPath();
            hinder_context.moveTo(45, 70);
            hinder_context.arc(45,70,12,0,Math.PI*2,true);
            hinder_context.fill();
            hinder_context.closePath();
            hinder_context.restore();
        }
        if(this.two.mark){
            hinder_context.save();
            hinder_context.fillStyle = this.two.color;
            hinder_context.translate(45, 70);
            hinder_context.rotate(0);
            hinder_context.beginPath();
            hinder_context.arc(10, -23, 20,  -Math.PI*2/3, Math.PI*2/3, true);
            hinder_context.fill();
            hinder_context.closePath();
            hinder_context.beginPath();
            hinder_context.arc(-10, -23, 20,  -Math.PI*1/3, Math.PI*1/3, false);
            hinder_context.fill();
            hinder_context.closePath();
            hinder_context.restore();
            hinder_context.save();
            hinder_context.translate(45, 70);
            hinder_context.rotate(Math.PI*2/5);
            hinder_context.fillStyle = this.two.color;
            hinder_context.beginPath();
            hinder_context.arc(11, -23, 20,  -Math.PI*2/3, Math.PI*2/3, true);
            hinder_context.fill();
            hinder_context.closePath();
            hinder_context.beginPath();
            hinder_context.arc(-10, -23, 20,  -Math.PI*1/3, Math.PI*1/3, false);
            hinder_context.fill();
            hinder_context.closePath();
            hinder_context.restore();
        }
        if(this.three.mark){
            hinder_context.save();
            hinder_context.translate(45, 70);
            hinder_context.rotate(Math.PI*4/5);
            hinder_context.fillStyle = this.three.color;
            hinder_context.beginPath();
            hinder_context.arc(11, -23, 20,  -Math.PI*2/3, Math.PI*2/3, true);
            hinder_context.fill();
            hinder_context.closePath();
            hinder_context.beginPath();
            hinder_context.arc(-10, -23, 20,  -Math.PI*1/3, Math.PI*1/3, false);
            hinder_context.fill();
            hinder_context.closePath();
            hinder_context.restore();
            hinder_context.save();
            hinder_context.translate(45, 70);
            hinder_context.rotate(Math.PI*6/5);
            hinder_context.fillStyle = this.three.color;
            hinder_context.beginPath();
            hinder_context.arc(11, -23, 20,  -Math.PI*2/3, Math.PI*2/3, true);
            hinder_context.fill();
            hinder_context.closePath();
            hinder_context.beginPath();
            hinder_context.arc(-10, -23, 20,  -Math.PI*1/3, Math.PI*1/3, false);
            hinder_context.fill();
            hinder_context.closePath();
            hinder_context.restore();
        }
        if(this.four.mark){
            hinder_context.save();
            hinder_context.translate(45, 70);
            hinder_context.rotate(Math.PI*8/5);
            hinder_context.fillStyle = this.four.color;
            hinder_context.beginPath();
            hinder_context.arc(11, -23, 20,  -Math.PI*2/3, Math.PI*2/3, true);
            hinder_context.fill();
            hinder_context.closePath();
            hinder_context.beginPath();
            hinder_context.arc(-10, -23, 20,  -Math.PI*1/3, Math.PI*1/3, false);
            hinder_context.fill();
            hinder_context.closePath();
            hinder_context.restore();
        }
    }
};
//山
hinder[3] = {
    one : {mark: 1, color: color[0]},
    two : {mark: 1, color: color[1]},
    three : {mark: 1, color: color[2]},
    four : {mark: 1, color: color[3]},
    draw : function(){
        hinder_canvas.width = 160;
        hinder_canvas.height = 160;
        if(this.one.mark){
            hinder_context.beginPath();
            hinder_context.moveTo(0,146);
            hinder_context.lineTo(0,146);
            hinder_context.lineTo(27,100);
            hinder_context.lineTo(57,146);
            hinder_context.fillStyle=this.one.color;
            hinder_context.fill();
        }
        if(this.two.mark){
            hinder_context.beginPath();
            hinder_context.moveTo(57,146);
            hinder_context.lineTo(57,146);
            hinder_context.lineTo(36,116);
            hinder_context.lineTo(54,84);
            hinder_context.lineTo(62,91);
            hinder_context.lineTo(69,82);
            hinder_context.lineTo(76,88);
            hinder_context.lineTo(82,77);
            hinder_context.lineTo(90,77);
            hinder_context.lineTo(101,98);
            hinder_context.fillStyle=this.two.color;
            hinder_context.fill();
        }
        if(this.three.mark){
            hinder_context.beginPath();
            hinder_context.moveTo(54,84);
            hinder_context.lineTo(54,84);
            hinder_context.lineTo(62,91);
            hinder_context.lineTo(69,82);
            hinder_context.lineTo(76,88);
            hinder_context.lineTo(82,77);
            hinder_context.lineTo(90,77);
            hinder_context.lineTo(73,48);
            hinder_context.fillStyle=this.three.color;
            hinder_context.fill();
        }
        if(this.four.mark){
            hinder_context.beginPath();
            hinder_context.moveTo(57,146);
            hinder_context.lineTo(57,146);
            hinder_context.lineTo(155,144);
            hinder_context.lineTo(120,78);
            hinder_context.fillStyle=this.four.color;
            hinder_context.fill();
        }
    }
};
//风扇
hinder[4] = {
    one : {mark: 1, color: color[0]},
    two : {mark: 1, color: color[1]},
    three : {mark: 1, color: color[2]},
    four : {mark: 1, color: color[3]},
    draw : function(){
        hinder_canvas.width = 160;
        hinder_canvas.height = 160;
        if(this.one.mark){
            hinder_context.beginPath();
            hinder_context.arc(50,65,50,0,Math.PI*2,true);
            hinder_context.fillStyle=this.one.color;
            hinder_context.fill();
        }
        if(this.two.mark){
            hinder_context.beginPath();
            hinder_context.arc(125,98,66,2.1,Math.PI*0.926,false);
            hinder_context.arc(-23,98,66,0.251,Math.PI/3,false);
            hinder_context.fillStyle=this.two.color;
            hinder_context.closePath();
            hinder_context.fill();
        }
        if(this.three.mark){
            hinder_context.beginPath();
            hinder_context.arc(50,65,12,0,Math.PI*2,true);
            hinder_context.fillStyle=this.three.color;
            hinder_context.fill();
        }
        if(this.four.mark){
            hinder_context.beginPath();
            hinder_context.arc(-7,90,66,-0.6,Math.PI*1.62,true);
            hinder_context.arc(66,15,50,2.1,Math.PI/1.11,false);
            hinder_context.fillStyle=this.four.color;
            hinder_context.lineTo(40,56);
            hinder_context.closePath();
            hinder_context.fill();
            hinder_context.beginPath();
            hinder_context.arc(50,7,60,0.7,Math.PI/2.2,false);
            hinder_context.arc(99,110,64,-1.6,Math.PI*1.29,true);
            hinder_context.fillStyle=this.four.color;
            hinder_context.lineTo(60,66);
            hinder_context.closePath();
            hinder_context.fill();
            hinder_context.beginPath();
            hinder_context.arc(96,100,60,-2.7,Math.PI*0.93,true);
            hinder_context.arc(-15,76,64,0,Math.PI/5,false);
            hinder_context.fillStyle=this.four.color;
            hinder_context.lineTo(51,78);
            hinder_context.closePath();
            hinder_context.fill();
        }
    }
};
//台灯
hinder[5] = {
    one : {mark: 1, color: color[0]},
    two : {mark: 1, color: color[1]},
    three : {mark: 1, color: color[2]},
    four : {mark: 1, color: color[3]},
    draw : function(){
        hinder_canvas.width = 160;
        hinder_canvas.height = 160;
        if(this.one.mark){
            hinder_context.beginPath();
            hinder_context.arc(26,146,16,3,Math.PI*1.5,false);
            hinder_context.lineTo(105,130);
            hinder_context.arc(108,146,18,-1,Math.PI/18,false);
            hinder_context.fillStyle=this.one.color;
            hinder_context.fill();
        }
        if(this.two.mark){
            hinder_context.beginPath();
            hinder_context.moveTo(64,130);
            hinder_context.lineTo(62,132);
            hinder_context.lineTo(99,98);
            hinder_context.lineTo(100,92);
            hinder_context.lineTo(98,86);
            hinder_context.lineTo(61,54);
            hinder_context.lineTo(60,64);
            hinder_context.lineTo(91,93);
            hinder_context.lineTo(49,130);
            hinder_context.fillStyle=this.two.color;
            hinder_context.fill();
        }
        if(this.three.mark){
            hinder_context.beginPath();
            hinder_context.moveTo(60,64);
            hinder_context.lineTo(60,64);
            hinder_context.lineTo(78,48);
            hinder_context.lineTo(79,40);
            hinder_context.lineTo(67,26);
            hinder_context.lineTo(57,27);
            hinder_context.lineTo(41,42);
            hinder_context.lineTo(24,43);
            hinder_context.lineTo(7,53);
            hinder_context.lineTo(49,98);
            hinder_context.lineTo(61,81);
            hinder_context.fillStyle=this.three.color;
            hinder_context.fill();
        }
        if(this.four.mark){
            hinder_context.beginPath();
            hinder_context.arc(20,83,20,0.2,Math.PI*1.45,false);
            hinder_context.fillStyle=this.four.color;
            hinder_context.fill();
        }
    }
};
//椅子
hinder[6] = {
    one : {mark: 1, color: color[0]},
    two : {mark: 1, color: color[1]},
    three : {mark: 1, color: color[2]},
    four : {mark: 1, color: color[3]},
    draw : function(){
        hinder_canvas.width = 160;
        hinder_canvas.height = 160;
        if(this.one.mark){
            hinder_context.beginPath();
            hinder_context.moveTo(82,90);
            hinder_context.lineTo(82,90);
            hinder_context.lineTo(61,91);
            hinder_context.lineTo(44,91);
            hinder_context.lineTo(27,89);
            hinder_context.lineTo(19,94);
            hinder_context.lineTo(19,96);
            hinder_context.lineTo(22,101);
            hinder_context.lineTo(33,107);
            hinder_context.lineTo(39,108);
            hinder_context.lineTo(72,109);
            hinder_context.lineTo(81,106);
            hinder_context.lineTo(92,96);
            hinder_context.lineTo(89,93);
            hinder_context.fillStyle=this.one.color;
            hinder_context.fill();
        }
        if(this.two.mark){
            hinder_context.beginPath();
            hinder_context.moveTo(27,89);
            hinder_context.lineTo(25,63);
            hinder_context.lineTo(22,37);
            hinder_context.lineTo(21,29);
            hinder_context.lineTo(27,22);
            hinder_context.lineTo(36,17);
            hinder_context.lineTo(71,17);
            hinder_context.lineTo(80,19);
            hinder_context.lineTo(84,21);
            hinder_context.lineTo(89,25);
            hinder_context.lineTo(89,35);
            hinder_context.lineTo(87,46);
            hinder_context.lineTo(84,67);
            hinder_context.lineTo(83,79);
            hinder_context.lineTo(82,90);
            hinder_context.lineTo(61,91);
            hinder_context.lineTo(44,91);
            hinder_context.fillStyle=this.two.color;
            hinder_context.fill();
        }
        if(this.three.mark){
            hinder_context.beginPath();
            hinder_context.moveTo(7,78);
            hinder_context.lineTo(7,78);
            hinder_context.lineTo(10,85);
            hinder_context.lineTo(13,91);
            hinder_context.lineTo(18,96);
            hinder_context.lineTo(21,96);
            hinder_context.lineTo(18,89);
            hinder_context.lineTo(16,87);
            hinder_context.lineTo(13,82);
            hinder_context.lineTo(16,78);
            hinder_context.lineTo(20,78);
            hinder_context.lineTo(23,72);
            hinder_context.lineTo(19,67);
            hinder_context.lineTo(8,67);
            hinder_context.lineTo(3,69);
            hinder_context.lineTo(2,74);
            hinder_context.lineTo(3,77);
            hinder_context.fillStyle=this.three.color;
            hinder_context.fill();
            hinder_context.beginPath();
            hinder_context.moveTo(88,92);
            hinder_context.lineTo(87,100);
            hinder_context.lineTo(97,90);
            hinder_context.lineTo(99,87);
            hinder_context.lineTo(101,78);
            hinder_context.lineTo(105,78);
            hinder_context.lineTo(108,75);
            hinder_context.lineTo(110,72);
            hinder_context.lineTo(106,68);
            hinder_context.lineTo(102,66);
            hinder_context.lineTo(92,66);
            hinder_context.lineTo(89,70);
            hinder_context.lineTo(87,74);
            hinder_context.lineTo(91,78);
            hinder_context.lineTo(97,78);
            hinder_context.lineTo(97,81);
            hinder_context.lineTo(95,86);
            hinder_context.lineTo(92,88);
            hinder_context.fillStyle=this.three.color;
            hinder_context.fill();

        }
        if(this.four.mark){
            hinder_context.beginPath();
            hinder_context.moveTo(46,108);
            hinder_context.lineTo(62,108);
            hinder_context.lineTo(61,123);
            hinder_context.lineTo(96,134);
            hinder_context.lineTo(97,140);
            hinder_context.lineTo(102,144);
            hinder_context.lineTo(99,149);
            hinder_context.lineTo(95,152);
            hinder_context.lineTo(90,149);
            hinder_context.lineTo(88,145);
            hinder_context.lineTo(90,141);
            hinder_context.lineTo(59,132);
            hinder_context.lineTo(59,141);
            hinder_context.lineTo(61,147);
            hinder_context.lineTo(53,151);
            hinder_context.lineTo(47,147);
            hinder_context.lineTo(49,141);
            hinder_context.lineTo(49,132);
            hinder_context.lineTo(20,141);
            hinder_context.lineTo(21,146);
            hinder_context.lineTo(14,151);
            hinder_context.lineTo(4,144);
            hinder_context.lineTo(6,145);
            hinder_context.lineTo(12,136);
            hinder_context.lineTo(46,123);
            hinder_context.fillStyle=this.four.color;
            hinder_context.fill();
        }
    }
};

//第一红绿灯
hinder[7] = {
    one : {mark: 1, color: color[0]},
    two : {mark: 1, color: color[1]},
    three : {mark: 1, color: color[2]},
    four : {mark: 1, color: color[3]},
    draw : function(){
        hinder_canvas.width = 160;
        hinder_canvas.height = 160;
        //灯身
        if(this.one.mark){
            hinder_context.beginPath();
            hinder_context.lineWidth=55;
            hinder_context.lineCap='round';
            hinder_context.strokeStyle=this.one.color;
            hinder_context.moveTo(45,35);
            hinder_context.lineTo(45,130);
            hinder_context.stroke();
            hinder_context.fill();
        }
        //泡 灯 01
        if(this.two.mark){
            hinder_context.beginPath();
            hinder_context.arc(45,65,15,0,Math.PI*2,true);
            hinder_context.closePath();
            hinder_context.fillStyle=this.two.color;
            hinder_context.fill();


        }
        //泡 灯 02
        if(this.three.mark){
            hinder_context.beginPath();
            hinder_context.arc(45,100,15,0,Math.PI*2,true);
            hinder_context.closePath();
            hinder_context.fillStyle=this.three.color;
            hinder_context.fill();
        }
        // 泡 灯 03
        if(this.four.mark){
            hinder_context.beginPath();
            hinder_context.arc(45,135,15,0,Math.PI*2,true);
            hinder_context.closePath();
            hinder_context.fillStyle=this.four.color;
            hinder_context.fill();
        }
    }
};


//  第二电视机
hinder[8] = {
    one : {mark: 1, color: color[0]},
    two : {mark: 1, color: color[1]},
    three : {mark: 1, color: color[2]},
    four : {mark: 1, color: color[3]},
    draw : function(){
        hinder_canvas.width = 160;
        hinder_canvas.height = 160;
//     电视外壳
        if(this.one.mark){
            hinder_context.beginPath();
            hinder_context.lineCap='round';
            hinder_context.fillStyle=this.one.color;
            hinder_context.fillRect(0,25,100,100) ;
            hinder_context.stroke();
            hinder_context.fill();
        }
//    电视显示屏
        if(this.two.mark){
            hinder_context.beginPath();
            hinder_context.lineCap='round';
            hinder_context.fillStyle=this.two.color;
            hinder_context.fillRect(17,45,65,60) ;
            hinder_context.stroke();
            hinder_context.fill();
        }
//    电视底部
        if(this.three.mark){
            hinder_context.beginPath();
            hinder_context.lineCap='round';
            hinder_context.fillStyle=this.three.color;
            hinder_context.fillRect(15,125,70,10) ;
            hinder_context.stroke();
            hinder_context.fill();
        }
//    电视按钮
        if(this.four.mark){
            hinder_context.beginPath();
            hinder_context.lineCap='round';
            hinder_context.fillStyle=this.four.color;
            hinder_context.fillRect(70,110,10,10) ;
            hinder_context.stroke();
            hinder_context.fill();
            hinder_context.beginPath();
            hinder_context.lineCap='round';
            hinder_context.fillStyle=this.four.color;
            hinder_context.fillRect(50,113,5,5) ;
            hinder_context.stroke();
            hinder_context.fill();
            hinder_context.beginPath();
            hinder_context.lineCap='round';
            hinder_context.fillStyle=this.four.color;
            hinder_context.fillRect(30,113,5,5) ;
            hinder_context.stroke();
            hinder_context.fill();
        }
    }
};

//    第三房子
hinder[9] = {
    one : {mark: 1, color: color[0]},
    two : {mark: 1, color: color[1]},
    three : {mark: 1, color: color[2]},
    four : {mark: 1, color: color[3]},
    draw : function(){
        hinder_canvas.width = 160;
        hinder_canvas.height = 160;
        //房顶
        if(this.one.mark){
            hinder_context.beginPath();
            hinder_context.moveTo(0,70);
            hinder_context.lineTo(0,70);
            hinder_context.lineTo(150,70);
            hinder_context.lineTo(75,15);
            hinder_context.closePath();
            hinder_context.fillStyle=this.one.color;
            hinder_context.fill();
        }
        //    房屋身子
        if(this.two.mark){
            hinder_context.beginPath();
            hinder_context.lineCap='round';
            hinder_context.fillStyle=this.two.color;
            hinder_context.fillRect(15,70,120,80) ;
            hinder_context.stroke();
            hinder_context.fill();
        }
        //烟囱和窗子
        if(this.three.mark){
            hinder_context.beginPath();
            hinder_context.moveTo(95,30);
            hinder_context.lineTo(95,30);
            hinder_context.lineTo(125,30);
            hinder_context.lineTo(125,52);
            hinder_context.closePath();
            hinder_context.fillStyle=this.three.color;
            hinder_context.fill();
            hinder_context.beginPath();
            hinder_context.lineCap='round';
            hinder_context.fillStyle=this.three.color;
            hinder_context.fillRect(30,110,15,15) ;
            hinder_context.stroke();
            hinder_context.fill();
            hinder_context.beginPath();
            hinder_context.lineCap='round';
            hinder_context.fillStyle=this.three.color;
            hinder_context.fillRect(55,110,15,15) ;
            hinder_context.stroke();
            hinder_context.fill();
        }
        //房子门
        if(this.four.mark){
            hinder_context.beginPath();
            hinder_context.lineCap='round';
            hinder_context.fillStyle=this.four.color;
            hinder_context.fillRect(90,110,25,40) ;
            hinder_context.stroke();
            hinder_context.fill();
            hinder_context.beginPath();
            hinder_context.arc(103,130,24,-0.99,Math.PI/0.302,true);
            hinder_context.closePath();
            hinder_context.fillStyle=this.four.color;
            hinder_context.fill();
        }
    }
};
//跨浏览器处理类名
function handleClassList(element, handle, value) {
    if (element.classList != "undefined") {
        if(handle == "add") {
            element.classList.add(value);
        }else if (handle == "contains") {
            return element.classList.contains(value);
        }else if (handle == "remove") {
            element.classList.remove(value);
        }else if (handle == "toggle") {
            element.classList.toggle(value);
        }else {
            throw new Error(handle + "不是类的操作方法");
        }
    } else {
        var classNames = element.className.split(/\s+/);
        var pos = -1,
            i,
            len;

        for (i=0, len=classNames.length; i<len; i++) {
            if (classNames[i] == value) {
                pos = i;
                break;
            }
        }

        if((handle == "add" || handle == "toggle") && pos == -1) {
            element.className += " " + value;
        }
        if ((handle == "remove" || handle == "toggle") && pos != -1){
            classNames.splice(i, 1);
            element.className = classNames.join(" ");
        }
        if (handle == "contains") {
            if(pos == -1) {
                return true;
            }else {
                return false;
            }
        }
    }
}
/*共享onload事件*/
function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != "function") {
        window.onload = func;
    }
    else {
        window.onload = function(){
            oldonload();
            func();
        }
    }
}
 //判断某个字符串是否在数组中
function stringIsInArray(str,arr){
    var len = arr.length,
         i = 0;
    while(i<=len){
        if(str == arr[i]){
            return false;
            break;
        }
        i++;
    }
    return true;
}

//判断某个颜色是否存在障碍物中
function colorIsInHinder(color, hinder){
   if(hinder.one.mark == 1 && hinder.one.color == color){
       return true;
   }else if(hinder.two.mark == 1 && hinder.two.color == color){
       return true;
    } else if(hinder.three.mark == 1 && hinder.three.color == color){
       return true;
   }else if(hinder.four.mark == 1 && hinder.four.color == color){
       return true;
   }else {
       return false;
   }
}




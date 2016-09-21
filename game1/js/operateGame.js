/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 14-2-19
 * Time: 上午9:24
 * To change this template use File | Settings | File Templates.
 */
//点击开始游戏
addLoadEvent(startGame);
//暂停游戏
addLoadEvent(suspendGame);
//排名页面
addLoadEvent(rankPage);
//继续游戏
addLoadEvent(continueGame);
//从新开始游戏
addLoadEvent(restartGame);
//返回主界面
addLoadEvent(returnHome);


//点击开始游戏
function startGame() {
   var start_btn = start_div.lastElementChild.firstElementChild, //开始游戏的按钮
       audio_bnt = start_btn.nextElementSibling;    //声音开关按钮
    var m=0;
    audio_bnt.onclick = function(){
        m++;
        var audio1=document.getElementById("audio");
        if(m%2==1){
            audio1.pause();   //暂停
            audio_bnt.style.color = "red";
        }
        else{
            audio1.play();    //开始
            audio_bnt.style.color = "#9cf";
        }
    }


       start_btn.onclick = function() {
           clearTimeout(hinder_id);
           score_span.innerHTML = "0";
           handleClassList(color_div, 'remove', 'two-span');
           handleClassList(color_div, 'remove', 'three-span');
           handleClassList(color_div, 'remove', 'four-span');
           handleClassList(color_div, 'remove', 'five-span');
           clear_color_count = 0;
           hinder_count = 0;
           temp_color = [];
           temp_color[0] = color[Math.floor(Math.random()*5)];
           handleClassList(start_div, "remove", "show");
           handleClassList(box, "add", "show");
           createHinder();
           clickColor();
       }
}
//暂停游戏
function suspendGame() {
    var suspend_btn = bullet.nextElementSibling.firstElementChild; //暂停按钮
    suspend_btn.onclick = function() {
        clearTimeout(hinder_id);
//        clearTimeout(bullet_id);
//        clearTimeout(spread_id);
        handleClassList(suspend_ul, "add", "show-suspend");
    }
}

//暂停后开始继续游戏
function continueGame(){
    var suspend_continue = suspend_ul.lastElementChild;
    suspend_continue.onclick = function() {
        handleClassList(suspend_ul, "remove", "show-suspend");
        moveHinder();
//        moveBullet();
    }
}
//重新开始游戏
function restartGame(){
    var suspend_restart =  suspend_ul.firstElementChild.nextElementSibling;
    var dead_restart = document.getElementById("dead-restart");
    suspend_restart.onclick = function() {
        clearTimeout(hinder_id);
        temp_color = [];
        temp_color[0] = color[Math.floor(Math.random()*color_num)];                           //临时颜色数组赋初值
        game_time = 10;
        score_span.innerHTML = "0";
        handleClassList(color_div, 'remove', 'two-span');
        handleClassList(color_div, 'remove', 'three-span');
        handleClassList(color_div, 'remove', 'four-span');
        handleClassList(color_div, 'remove', 'five-span');
        clear_color_count = 0;
        hinder_count = 0;
        temp_color = [];
        temp_color[0] = color[Math.floor(Math.random()*5)];                                      //临时颜色数组赋初值
//        one_color = temp_color[0];
        handleClassList(suspend_ul, "remove", "show-suspend");
        createHinder();
        clickColor();

    }
    dead_restart.onclick = function() {
        clearTimeout(hinder_id);
        temp_color = [];
        temp_color[0] = color[Math.floor(Math.random()*color_num)];                           //临时颜色数组赋初值
        game_time = 10;
        score_span.innerHTML = "0";
        handleClassList(color_div, 'remove', 'two-span');
        handleClassList(color_div, 'remove', 'three-span');
        handleClassList(color_div, 'remove', 'four-span');
        handleClassList(color_div, 'remove', 'five-span');
        clear_color_count = 0;
        hinder_count = 0;
        temp_color = [];
        temp_color[0] = color[Math.floor(Math.random()*5)];                            //临时颜色数组赋初值
//        one_color = temp_color[0];
        handleClassList(rank_div, "remove", "show");
        handleClassList(box, "add", "show");
        clickColor();
        createHinder();
    }

}
//返回主页面
function returnHome(){
    var return_btn1 =  suspend_ul.firstElementChild;
    var return_btn2 = document.getElementById("return-btn2");
    return_btn1.onclick = function(){
        handleClassList(suspend_ul, "remove", "show-suspend");
        handleClassList(box, "remove", "show");
        handleClassList(start_div, "add", "show");
    }
    return_btn2.onclick = function(){
        handleClassList(suspend_ul, "remove", "show-suspend");
        handleClassList(rank_div, "remove", "show");
        handleClassList(start_div, "add", "show");
    }
}

//游戏结束
function gameOver() {
    clearTimeout(hinder_id);
//    clearTimeout(bullet_id);
//    clearTimeout(spread_id);
    handleClassList(box, "remove", "show");
    handleClassList(rank_div, "add", "show");
    var  mack1 =document.getElementById("score_2rg").firstChild;
    var score_div = document.getElementById("score_2");
    score_div.style.display = "block";
    score_div.firstElementChild.nextElementSibling.lastElementChild.firstElementChild.focus();
    game_time = 10;
    mack1.nodeValue = score_span.innerHTML;
    score_span.innerHTML = "0";
    temp_color = [];
    temp_color[0] = color[Math.floor(Math.random()*color_num)];                           //临时颜色数组赋初值
//    one_color = temp_color[0];
    //添加数据
    document.getElementById("tijiao").onclick = function addDataToDb(event){
        event = window.event || event;
        var target = event.srcElement || event.target;
        var  mack2 =document.getElementById("score_2re").firstChild.value;
        if(mack2 != ""){
            target.parentNode.style.display = "none";
            db.transaction(function(zx){
                zx.executeSql('select max(f_id) as ct from t_of',[],
                    function(dx,rs){
                        var    countnum =   rs.rows.item(0).ct+1;
//                              console.log(mack1,mack2);
                        dx.executeSql('insert into t_of values(?,?,?)',[countnum,mack2,parseInt(mack1.nodeValue)]);
                        queryAllEvent() ;
                    }) ;
            });
        }

    }


    //  将数据库的数据同步到页面中去
    function  queryAllEvent(){
        db.transaction(function(tx){
            tx.executeSql('select * from t_of  order by f_fenshu desc limit 10',[],
                function(dx,rs){
                    var tempul = document.getElementById("taitou3");
                    var str = "";
                    for(var i=0;i<rs.rows.length;i++){
                        str +=' <li >'+ (i+1) +'</li>'+
                            '<li class="color_02">'+ rs.rows.item(i).f_name+'</li>'+
                            '<li class="color_03">'+ rs.rows.item(i).f_fenshu+'</li> ';
                    }
                    tempul.innerHTML = str;
                });
        });
    }
    queryAllEvent() ;

}

function rankPage(){
    var temp1=document.getElementById("taitou3_ok");
    var temp2=document.getElementById("taitou4_ok");
    var temp3=document.getElementById("taitou5_ok");
    var click_list = temp1.previousElementSibling.children;
    click_list[0].onclick = function(){
        temp1.style.display="block";
        temp2.style.display="none";
        temp3.style.display="none";
    }
    click_list[1].onclick = function(){
        temp2.style.display="block";
        temp1.style.display="none";
        temp3.style.display="none";
    }
    click_list[2].onclick = function(){
        temp3.style.display="block";
        temp1.style.display="none";
        temp2.style.display="none";
    }
    var game_ul = document.getElementById("ico1_01");
    var game_list = game_ul.children;
    var rank_div = game_ul.nextElementSibling;
    var store_div = rank_div.nextElementSibling;
    var house_div = store_div.nextElementSibling;


    game_list[0].onclick = function() {
        temp1.style.display="block";
        temp2.style.display="none";
        temp3.style.display="none";
        game_list[0].style.color="#ad0000"
        game_list[1].style.color="#62dbca"
        game_list[2].style.color="#62dbca"
    }
    game_list[1].onclick = function() {
        temp2.style.display="block";
        temp1.style.display="none";
        temp3.style.display="none";
        game_list[0].style.color="#62dbca"
        game_list[1].style.color="#ad0000"
        game_list[2].style.color="#62dbca"
    }
    game_list[2].onclick = function() {
        temp3.style.display="block";
        temp1.style.display="none";
        temp2.style.display="none";
        game_list[0].style.color="#62dbca"
        game_list[1].style.color="#62dbca"
        game_list[2].style.color="#ad0000"
    }


    //创建数据库和表
    var tempul=document.getElementById("taitou3") ;
    function inIt(){
        db = openDatabase('apui','','',4000) ;
        db.transaction(function(tx){
            tx.executeSql('create table if not exists t_of' +
                '(f_id int primary key ,f_name varchar(80),f_fenshu int)');
        });
    }
    inIt();

//                 删除表
//                  db.transaction(function(tx){
//                      tx.executeSql('drop table t_o8')
//                  })
    db.transaction(function(tx){
//              tx.executeSql('select * from t_of  order by f_fenshu desc limit 10',[],
//                      function(dx,rs){
//                          for(var i=0;i<rs.rows.length;i++){
//                              console.log(rs.rows.item(i).f_fenshu)
//                          }
//                      });
        //删除所有数据
//                  tx.executeSql('drop table t_of');
//                         tx.executeSql('insert into t_info values(?,?,?,?)',[3,"做事2",13,12]);
    });
}

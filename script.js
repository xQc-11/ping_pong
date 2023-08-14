localStorage.setItem("HS",0);
alert("press enter to start the game. A>-Left, D->Right");
// Moving_Bars
var box = document.querySelectorAll(".game_box")[0];
var dim = box.getBoundingClientRect();
var mxr = dim.right;
var mxl = dim.left;
var dis = mxr - mxl;
var move = 0.035 * dis;
var up = document.querySelectorAll(".upper")[0];
var down = document.querySelectorAll(".lower")[0];


document.addEventListener("keypress", function (event) {
    var j = up.getBoundingClientRect();
    var dis_left = j.left - mxl;
    var dis_right = mxr - j.right;
    if (event.key == 'A' || event.key == 'a') {
        if (move > dis_left) {
            up.style.left = "0%";
        }
        else {
            up.style.left = dis_left - move + "px";
        }
    }
    if (event.key == 'D' || event.key == 'd') {
        if (j.right + move > mxr) {
            up.style.left = dis - (j.right - j.left) - 3 + "px";
        }
        else {
            up.style.left = dis_left + move + "px";
        }
    }
    j = down.getBoundingClientRect();
    dis_left = j.left - mxl;
    dis_right = mxr - j.right;
    if (event.key == 'A' || event.key == 'a') {
        if (move > dis_left) {
            down.style.left = "0%";
        }
        else {
            down.style.left = dis_left - move + "px";
        } 
    }
    if (event.key == 'D' || event.key == 'd') {
        if (j.right + move > mxr) {
            down.style.left = dis - (j.right - j.left) - 3 + "px";
        }
        else {
            down.style.left = dis_left + move + "px";
        }
    }

    if(event.key=='s'||event.key=='S'){
        var now = dim_ball.left-dim.left;
        alert(now);
        ball.style.left = parseInt(now)+ymove+"px";
    }
});

// Moving_the_ball
//diry==0 => down
//dirx==0 => right(-45 degree)
var diry = 0;
var dirx = 0;
var ball = document.querySelectorAll(".ball")[0];
var dim_up = up.getBoundingClientRect();
var dim_down = down.getBoundingClientRect();
var dim_ball = ball.getBoundingClientRect();
var y_total = dim_down.top-dim_up.bottom;
var ymove = y_total/80;
var cnt = 0;
var sc = document.querySelectorAll(".score")[0];
var curr = setInterval(() => {
    var ball = document.querySelectorAll(".ball")[0];
    var dim_up = up.getBoundingClientRect();
    var dim_down = down.getBoundingClientRect();
    var dim_ball = ball.getBoundingClientRect();
    var now = dim_ball.left-mxl;
    if (check()) {
        var dim_up = up.getBoundingClientRect();
        var dim_down = down.getBoundingClientRect();
        var dim_ball = ball.getBoundingClientRect();
        var a = "GAME OVER";
        if (parseInt(localStorage.getItem("HS"))<parseInt(sc.innerHTML)) {
            localStorage.setItem("HS",sc.innerHTML);
            document.querySelectorAll(".hs")[0].innerHTML = sc.innerHTML;
            a = "GAME OVER, Congratulations You made the high score."
        }
        ball.style.left = dim_down.left-dim.left+dim_ball.right-dim_ball.left+"px";
        ball.style.top = dim_down.top-dim.top-(dim_ball.right-dim_ball.left)+"px";
        cnt = 0;
        alert(a);
        return;
    }
    var chk = 0;
    var chk1 = 0;
    if(diry==0&&!chk){
        if(dim_ball.bottom+ymove>=dim_down.top){
            ball.style.top = dim.bottom-dim.top-(dim_ball.bottom-dim_ball.top)-(dim_down.bottom-dim_down.top)-1+"px";
            diry = diry^1;
        }
        else{
            ball.style.top = dim_ball.top-dim.top + ymove + "px";
        }
        chk = 1;
    }
    if(dirx==0&&!chk1){
        if(dim_ball.right+ymove>=dim.right){
            ball.style.left = dis-(dim_ball.right-dim_ball.left)-1+"px";
            dirx = dirx^1;
        }
        else{
            ball.style.left = now + ymove + "px";
        }
        chk1 = 1;
    }
    if(diry==1&&!chk){
        if (dim_ball.top-ymove<=dim_up.bottom) {
            ball.style.top = dim_up.bottom-dim_up.top+"px";
            diry = diry^1;
        }
        else{
            ball.style.top = dim_ball.top-dim.top-ymove+"px";
        }
        chk = 1;
    }
    if (dirx==1&&!chk1) {
        if (dim_ball.left-ymove<=dim.left) {
            ball.style.left = "0%";
            dirx^=1;
        }
        else{
            ball.style.left = dim_ball.left-dim.left-ymove+"px";
        }
        chk1 = 1;
    }
}, 25);


// Boundries of Ball
function check(){
    var ball = document.querySelectorAll(".ball")[0];
    var dim = box.getBoundingClientRect();
    var dim_up = up.getBoundingClientRect();
    var dim_down = down.getBoundingClientRect();
    var dim_ball = ball.getBoundingClientRect();
    if(dim_ball.bottom>=dim_down.top){
        if (dim_down.left>dim_ball.right) {
            return 1;
        }
        if(dim_down.right<dim_ball.left){
            return 1;
        }
        cnt++;
        sc.innerHTML = cnt+"";
    }
    if (dim_ball.top<=dim_up.bottom+1) {
        if (dim_up.left>dim_ball.right) {
            return 1;
        }
        if(dim_up.right<dim_ball.left){
            return 1;
        }
        cnt++;
        sc.innerHTML = cnt+"";
    }
    return 0;
}
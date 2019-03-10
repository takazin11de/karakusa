var canvas ;
var ctx ;
var winx=600;
var winy=900;
var key=[];
var mouse = 0;
var mousex = 0;
var mousey = 0;
var click_mousex = 0;
var click_mousey = 0;
function page_onload()
{
val=1;
  canvas = document.getElementById("canvas01");
  ctx = canvas.getContext("2d");
  canvas.setAttribute("width", winx * val);
    canvas.setAttribute("height",winy * val);

// マウスイベントリスナー登録
canvas.onmousemove = function(e) {
    var rect = e.target.getBoundingClientRect();
    mousex = e.clientX - rect.left;
    mousey = e.clientY - rect.top;
};

canvas.onmousedown = function(e) {
        var rect = e.target.getBoundingClientRect();
        mouse = 1;
        click_mousex = e.clientX - rect.left;
        click_mousey = e.clientY - rect.top;
        };

canvas.onmouseup = function(e) {
        mouse = 0;

        };
document.onkeyup = function (e){
// InternetExplorer 用
if (!e)	e = window.event;
key[e.keyCode]=0;

return;
};

document.onkeydown = function (e){

// InternetExplorer 用
if (!e)	e = window.event;
num=e.keyCode;
key[num]=1;

};
document.onmouseout = function (e){
 mouse = 0;
};

window.onblur = function (){

// 配列をクリアする

var i;
  for(i=0;i<256;i++)
    {
    key[i]=0;
    }

    mouse = 0;
};

  ctx.scale(val,val);
  ctx.fillStyle = "rgb(0,0,0)";
  ctx.fillRect (0, 0, winx, winy);

  ctx.fillStyle = "rgb(255,255,255)";
  ctx.fillRect (1, 1, winx-2, winy-2);

var i;
  for(i=0;i<256;i++)
    {
    key[i]=0;
    }
  main();
}


var color_str;
var stroke_color_str;
var fill_color_str;

function color(r,g,b){
color_str="rgb("+r+","+g+","+b+")";
stroke_color(r,g,b);
fill_color(r,g,b);
}
function stroke_color(r,g,b){
stroke_color_str="rgb("+r+","+g+","+b+")";
}
function fill_color(r,g,b){
fill_color_str="rgb("+r+","+g+","+b+")";
}


var f_stroke=1
function stroke_on(){
f_strok=1;
}
function stroke_off(){
f_strok=0;
}
var f_fill=1;
function fill_on(){
f_fill=1;
}
function fill_off(){
f_fill=0;
}

var posx=0;
var posy=0;
function position(x,y){
posx=x;
posy=y;
}

var font_name;
var font_size;
function font(fn,fs){
font_name=fn;
font_size=fs;
}
function text(str){
ctx.fillStyle = fill_color_str;
ctx.font = ""+font_size+"px '"+font_name+"'";
ctx.textAlign = "left";
ctx.textBaseline = "top";
ctx.fillText(str, posx+0.5, posy+0.5);
}


function line(x1,y1,x2,y2){
ctx.strokeStyle= stroke_color_str;
ctx.beginPath();
ctx.moveTo(x1+0.5,y1+0.5);
ctx.lineTo(x2+0.5,y2+0.5);
  ctx.closePath();
  ctx.stroke();

}
function circle(x,y,r){
ctx.strokeStyle= stroke_color_str;
ctx.fillStyle = color_str;
ctx.beginPath();
  ctx.arc(x+0.5, y+0.5, r, 0, Math.PI*2, false);
  ctx.closePath();
  if(f_fill){
    ctx.fill();
  }
if(f_stroke){
  ctx.stroke();
}



}
function line_width(a){
ctx.lineWidth=a;
}
function rect(x1,y1,x2,y2){

ctx.strokeStyle= stroke_color_str;
ctx.fillStyle = color_str;
ctx.beginPath();
  ctx.moveTo(x1+0.5,y1+0.5);
ctx.lineTo(x2+0.5,y1+0.5);
ctx.lineTo(x2+0.5,y2+0.5);
ctx.lineTo(x1+0.5,y2+0.5);
  ctx.closePath();
  if(f_fill){
    ctx.fill();
  }
if(f_stroke){
  ctx.stroke();
}


}

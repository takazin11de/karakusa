var eda_list;
var yobi_eda_list=[];
var len_haita=10;
var haita=new Array();
var retry_count=0;
var y_scale=0.6;
function main(){
	setInterval(loop,30);//30ミリ秒おきにloop()を呼び出す
	eda_list= new Array();

	for(i=0;i<Math.floor(winx/len_haita)+1;i++){
		haita[i]=new Array();
		for(j=0;j<Math.floor(winy/len_haita)+1;j++){
			haita[i][j]=0;
		}
	}

	color(0,0,0);


	fill_on();

	rect(0,0,winx,winy);


	for(i=0;i<12;i++){
		eda_list.push(new eda_data(winx*Math.random(), winy*Math.random(), 2*Math.PI*Math.random(), Math.round(Math.random()),1));
	}
	fill_color(255,0,0);
	stroke_color(255,140,0)
}


function loop(){


	if(eda_list.length>0){
		eda(eda_list[0].base_posx, eda_list[0].base_posy, eda_list[0].base_angle, eda_list[0].direction, eda_list[0].parent_eda_id/*, eda_list[0].scale, eda_list[0].curve1, eda_list[0].curve2, eda_list[0].curve3, eda_list[0].curve4*/);
		eda_list.shift();
	}else{
		if(yobi_eda_list.length>0){
			i=Math.floor(yobi_eda_list.length*Math.random());
			eda_list.push(yobi_eda_list[i]);
			yobi_eda_list.splice(i,1);
		}
		//stroke_color(0,140,255);

	}
	color(0,0,0);
hax=450;
hay=750;
fill_on();
stroke_off();
rect(0,0,(winx-hax)/2,winy);
rect(winx-(winx-hax)/2,0,winx,winy);
rect((winx-hax)/2,0,winx-(winx-hax)/2,(winy-hay)/2);
rect((winx-hax)/2,winy-(winy-hay)/2,winx-(winx-hax)/2,winy);

	fill_off();

	line_width(1);
	stroke_color(255,140,0);
	stroke_on();
	rect((winx-hax)/2,(winy-hay)/2,winx-(winx-hax)/2,winy-(winy-hay)/2);
	line_width(1);
}

function eda_data(base_posx, base_posy, base_angle, direction, parent_eda_id){

	this.base_posx=base_posx;
	this.base_posy=base_posy;
	this.base_angle=base_angle;
	this.direction=direction;
	this.parent_eda_id=parent_eda_id;
}
function eda(base_posx, base_posy, base_angle, _direction, parent_eda_id){
	var i;
	var x=0;
	var y=0;
	var angle=0;
	var oldx=0;
	var oldy=0;
	var fault=0;
	var direction;
	var f_direction=0;

	var tmp_angle;
	var x_list=[];
	var y_list=[];
	var haitax_list=[];
	var haitay_list=[];
	var middle_base_posx,middle_base_posy,middle_base_angle,middle_direction;
	var middle2_base_posx,middle2_base_posy,middle2_base_angle,middle2_direction;
	var end_base_posx,end_base_posy,end_base_angle,end_direction;
	var scale;
	var curve1;
	var curve2;
	var curve3;
	var curve4;
	var len;
	var f_40;
	var f_60;
	var f_99;

	var eda_id=Math.random()+1.0;
	var tmp_eda_list=[];


for(j=0;j<30;j++){
	x_list=[];
	y_list=[];
	haitax_list=[];
	haitay_list=[];
	direction=_direction;
	f_direction=0;
	if(Math.random()<0.25){
		f_direction=1;
		if(_direction==1){
			direction=0;
		}else{
			direction=1;
		}
	}

	tmp_eda_list=[];

	aaa=Math.random()
	scale=Math.random()/3.0+2.0/3.0;
	curve1=3;
	curve2=Math.random()*0.6;
	curve3=Math.random()*0.5;
	curve4=Math.random()*0.3;
	if(aaa< 0.6){
		scale=(Math.random()/3.0+2.0/3.0)*1.2;
		curve1=2.7;
		curve2=Math.random()*0.5;
		curve3=Math.random()*0.4;
		curve4=Math.random()*0.2;
	}
	if(aaa< 0.17){
		scale=(Math.random()/3.0+2.0/3.0)*1.5;
		curve1=1;
		curve2=Math.random()*0.4;
		curve3=Math.random()*0.28;
		curve4=Math.random()*0.1;
	}
	len=scale*1.0;
	f_parent_eda_id=0
	f_40=0;
	f_60=0;
	f_99=0;
	x=0;
	y=0;
	angle=0;
	oldx=0;
	oldy=0;
	x_list.push(base_posx);
	y_list.push(base_posy);
	bunki1=Math.floor(Math.random()*40)+20;
	bunki2=Math.floor(Math.random()*40)+40;
	for(i=0;i<100;i++){
		tmp_angle=2*Math.PI/600*curve1+2*Math.PI*i*i*i/30000000*curve4+2*Math.PI*i*i/600000*curve3+2*Math.PI*i/10000*curve2;

		if(direction==1){
			angle+=tmp_angle;
			haita_angle=Math.PI/2.0;
		}else{
			angle-=tmp_angle;
			haita_angle=-Math.PI/2.0;
		}
		x+=len*Math.cos( base_angle+angle);
		y+=len*Math.sin( base_angle+angle)*y_scale;

		if(base_posx+x<0 || base_posy+y<0 || base_posx+x>winx || base_posy+y>winy){fault=1;break;}
		x_list.push(base_posx+x);
		y_list.push(base_posy+y);
		haita_blockx=Math.floor((base_posx+x)/len_haita);
		haita_blocky=Math.floor((base_posy+y)/len_haita);
		if(haita[haita_blockx][haita_blocky]==0||haita[haita_blockx][haita_blocky]!=parent_eda_id){
			f_parent_eda_id=1;
		}

		if(haita[haita_blockx][haita_blocky]!=0&&(haita[haita_blockx][haita_blocky]!=parent_eda_id||f_parent_eda_id==1)/*&&(f_direction==1 && i<20)*/){
			if(f_direction==1){
				if(i>10){
					fault=1;break;
				}
			}else{
				fault=1;break;
			}
			if(i>0){
				fault=1;break;
			}
		}
		haitax=base_posx+x+len_haita*Math.cos( base_angle+angle+haita_angle)*2/3*0.5;
		haitay=base_posy+y+len_haita*Math.sin( base_angle+angle+haita_angle)*2/3*0.5;
		haita_blockx=Math.floor((haitax)/len_haita);
		haita_blocky=Math.floor((haitay)/len_haita);
		haitax_list.push(haita_blockx);
		haitay_list.push(haita_blocky);
		if(20<i&&i<80&&Math.random()<0.2){
			var tmp_direc=Math.round(Math.random());
			tmp_eda_list.push(new eda_data(base_posx+oldx, base_posy+oldy, base_angle+angle, tmp_direc,eda_id));
		}
		if(i==bunki1){
			f_40=1;
			var tmp_direc;
			if(direction==1){
				tmp_direc=0;
			}else{
				tmp_direc=1;
			}
			middle_base_posx=base_posx+oldx;
			middle_base_posy=base_posy+oldy;
			middle_base_angle=base_angle+angle;
			middle_direction=tmp_direc;
		}
		if(i==bunki2){
			f_60=1;
			var tmp_direc;
			if(direction==1){
				tmp_direc=0;
			}else{
				tmp_direc=1;
			}
			middle2_base_posx=base_posx+oldx;
			middle2_base_posy=base_posy+oldy;
			middle2_base_angle=base_angle+angle;
			middle2_direction=tmp_direc;
				}
		if(i==99){
			f_99=1;
			var tmp_direc;
			if(direction==1){
				tmp_direc=0;
			}else{
				tmp_direc=1;
			}
			end_base_posx=base_posx+oldx;
			end_base_posy=base_posy+oldy;
			end_base_angle=base_angle+angle;
			end_direction=tmp_direc;
				}
		oldx=x;
		oldy=y;
	}
	if(f_parent_eda_id==0){
		fault=1;
	}
	if(fault==0){
		break;
	}
}
if(fault==0){

	yobi_eda_list= yobi_eda_list.concat(tmp_eda_list);

	for(i=0;i<x_list.length-1;i++){
		line(x_list[i],y_list[i],x_list[i+1],y_list[i+1]);
	}
	for(i=0;i<haitax_list.length;i++){
		haita[haitax_list[i]][haitay_list[i]]=eda_id;
		//rect(haitax_list[i]*len_haita,haitay_list[i]*len_haita,haitax_list[i]*len_haita+len_haita,haitay_list[i]*len_haita+len_haita)
	}
	if(f_40==1){
		eda_list.push(new eda_data(middle_base_posx, middle_base_posy, middle_base_angle, middle_direction,eda_id));
	}
	if(f_60==1){
		eda_list.push(new eda_data(middle2_base_posx, middle2_base_posy, middle2_base_angle, middle2_direction,eda_id));
	}
	if(f_99==1){
		eda_list.push(new eda_data(end_base_posx, end_base_posy, end_base_angle, end_direction,eda_id));
	}
}
}

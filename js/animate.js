
function getStyle(obj, attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	} else {
		return getComputedStyle(obj, null)[attr];
	}
}
function animate(obj,json,callback){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var isStop = true;
		for(var attr in json){
			var now = 0;
			if(attr == 'opacity'){
				now = parseInt(getStyle(obj,attr)*100);
			}else{
				now = parseInt(getStyle(obj,attr));
			}
			var speed = (json[attr] - now) / 8;
			speed = speed>0?Math.ceil(speed):Math.floor(speed);
			var cur = now + speed;
			if(attr == 'opacity'){
				obj.style[attr] = cur / 100;
			}else{
				obj.style[attr] = cur + 'px';
			}
			if(json[attr] !== cur){
				isStop = false;
			}
		}
		if(isStop){
			clearInterval(obj.timer);
			callback&&callback();
		}
	}, 30)
}
var word=document.getElementById("word");
var box=document.getElementById("box");
var oNavlist=document.getElementById("nav").children;
var slider=document.getElementById("slider");
var slide=document.getElementById("slide");
var left=document.getElementById("left");
var right=document.getElementById("right");
var index=1;
var isMoving=false;
var j=800;
var k=1;
function roll(){
	if(5*k>1600){
		word.style.left='800px';
		k=1;
	}
	word.style.left=(j-5*k)+'px';
	k++;	
}
var rol=setInterval(roll,100);
function next(){
	if(isMoving){
		return;
	}
	isMoving=true;
	index++;
	navmove();
	animate(slider,{left:-1200*index},function(){
		if(index==6){
			slider.style.left='-1200px';
			index=1;
		}
		isMoving=false;
	});
}
var timer=setInterval(next,3000);
box.onmouseover=function(){
	animate(left,{opacity:50})
	animate(right,{opacity:50})
	clearInterval(timer);
}
box.onmouseout=function(){
	animate(left,{opacity:0});
	animate(right,{opacity:0});
	timer=setInterval(next,3000);
}
for(var i=0;i<oNavlist.length;i++){
	oNavlist[i].index=i;
	oNavlist[i].onclick=function(){
		index=this.index+1;
		navmove();
		animate(slider,{left:-1200*index});
	}
}
right.onclick=next;
left.onclick=back;
function back(){
	if(isMoving){
		return;
	}
	isMoving=true;
	index--;
	navmove();
	animate(slider,{left:-1200*index},function(){
		if(index==0){
			slider.style.left='-6000px';
			index=5;
		}
		isMoving=false;
	});
}
function navmove(){
	for(var i=0;i<oNavlist.length;i++){
		oNavlist[i].className='';
	}
	if(index>5){
		oNavlist[0].className='active';
	}
	else if(index<=0){
		oNavlist[4].className='active';
	}
	else{
		oNavlist[index-1].className='active';
	}
}
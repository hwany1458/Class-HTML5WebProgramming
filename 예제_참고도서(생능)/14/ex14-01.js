var canvas, context; // 전역 변수
var colorInputObj, widthInputObj, mouseLocationObj;
var lineWidth;
var strokeColor;

function init() {
	canvas = document.getElementById("myCanvas");
	context = canvas.getContext("2d");
	widthInputObj = document.getElementById("widthInput");	
	lineWidth =  widthInputObj.value;
	
	colorInputObj = document.getElementById("colorInput");
	colorInputObj.onchange = function (e) { // 사용자가 지금 선택한 색으로 strokeColor 변경
		strokeColor=e.target.value;
		selectedColor.style.backgroundColor = strokeColor;	
	}
	colorInputObj.onclick = function (e) { // 클릭하면 현재 색으로 strokeColor 변경
		strokeColor=e.target.value;
		selectedColor.style.backgroundColor = strokeColor;	
	}
	selectedColor = document.getElementById("selectedColor");
	strokeColor = colorInputObj.value;
	selectedColor.style.backgroundColor = strokeColor;
	
	mouseLocationObj = document.getElementById("mouseLocation");	

	// 컬러 팔레트 안에 있는 모든 색상 <div> 태그에 onclick 리스너를 등록한다
	var colorObjs = document.getElementsByClassName("color");
	for(var i=0; i<colorObjs.length; i++) {
		colorObjs[i].onclick = function (e) {  // 사용자가 선택한 색으로 strokeColor 변경
			var obj = e.target;
			strokeColor = obj.style.backgroundColor;
			selectedColor.style.backgroundColor = strokeColor;
		}
	}
	
	// 마우스 리스너를 캔버스에 등록한다.
	canvas.addEventListener("mousemove", function (e) { move(e) }, false);
	canvas.addEventListener("mousedown", function (e) { down(e) }, false);
	canvas.addEventListener("mouseup", function (e) { up(e) }, false);
	canvas.addEventListener("mouseout", function (e) { out(e) }, false);
}

var startX=0; startY=0; // 마우스의 마지막 포인터 좌표
var drawing=false;

function draw(curX, curY) { // e는 MouseEvent 객체
	context.beginPath();
	context.lineWidth = lineWidth;
	context.strokeStyle = strokeColor;	
	context.moveTo(startX, startY);
	context.lineTo(curX, curY);
	context.stroke();
}
function down(e) { 
	startX = e.offsetX; startY = e.offsetY;
	drawing = true;
}
function up(e) { drawing = false; }
function move(e) {
	// 마우스 포인터의 위치 출력
	mouselocation.innerHTML = "x="+e.offsetX + "<br>y=" + e.offsetY;
	if(!drawing) 
		return; // 마우스가 눌러지지 않았으면 리턴
	var curX = e.offsetX, curY = e.offsetY;
	draw(curX, curY);	
	startX = curX; startY = curY;
}
function out(e) { drawing = false; }
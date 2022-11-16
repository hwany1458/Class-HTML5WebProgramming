var mark = new Array(24);	// 24개의 달걀에 대해 강아지가 숨은 경우 true(8개), 나머지는 false
var timerID=null;			// 타이머 ID
var NOOFANSWER=8			// 숨은 그림의 개수
var MAXTRY=5;				// 허용되는 실패 개수
var FINDINGSECONDS=20;		// 정답을 찾는데 허용된 시간(20초)
var THINKSECONDS=10;		// 기억하도록 허용된 시간(10초)

var restNum;                // 찾아야 할 잔여 정답 개수
var failNum=0;              // 틀린 횟수
var watingSeconds; 			// 기억하도록 허용된 시간(10초)

var audio=null;				// <audio> 태그 객체로 효과음 울림
var gameTitle=null;			
var startMenuObj=null;		// 시작 메뉴
var timeObj=null;			// 시간을 출력하는 태그 영역
var restObj=null;			// 남은 개수를 출력하는 태그 영역
var failObj=null;			// 틀린 개수를 출력하는 태그 영역
var resultObj=null;			// 게임 진행 상태를 보려주는 태그 영역
var gameoverObj=null;			// 게임 진행 상태를 보려주는 태그 영역

// "게임시작" 메뉴를 선택한 경우
function clickStartGame() {
	audio = document.getElementById("audio");
	startMenuObj = document.getElementById("startMenu");
	timeObj = document.getElementById("time");
	restObj = document.getElementById("rest");
	failObj = document.getElementById("fail");
	resultObj = document.getElementById("result");	
	gameoverObj = document.getElementById("gameover");
	startGame();
}

function startGame() {
	if(audio == null || startMenuObj == null || timeObj == null ||
		restObj == null || failObj == null || resultObj == null)
		return; // 게임을 진행할 수 없음

	playsound("media/recycle.mp3"); // 시작 사운드 재생

	gameoverObj.style.display = "none"; // GAMEOVER나 WINNER 텍스트 숨김
	
	watingSeconds=THINKSECONDS; // 기억하도록 허용된 시간(10초) 초기화
	restNum = NOOFANSWER; // 남은 개수는 8개
	failNum = 0; // 실패한 개수는 0개 
	timeObj.innerHTML="남은시간 : " + watingSeconds; // 남은 시간 표시 
	restObj.innerHTML="남은수 :  " + restNum; // 남은 수  표시
	failObj.innerHTML="실패수 :  " + failNum; // 실패 수 표시
	resultObj.innerHTML="숨은 그림을 보세요"; // 개임 진행 메시지
	
	startMenuObj.style.visibility="hidden"; // 게임 시작 텍스트 숨김

	// mark 배열을 false로 초기화. 각 셀을 모두 달걀 이미지로 초기화
	for(var i=0; i<mark.length; i++){
		mark[i]=false; // 숨은 강아지 없음으로 초기화
		document.images[i].src="media/img1.gif"; // 보통 달걀이미지
		document.images[i].style.borderWidth="0px"; // 테두리 숨기기
	}

	// 숨은 강아지의 달걀 위치를 랜덤하게 선택
	for(var i=0; i<NOOFANSWER;){ 
		var index = Math.floor(Math.random()*24); // 0~23사이의 정수 index 
		if(mark[index] != true) { // 이미 정답으로 설정된 위치가 아닌 경우에만
			mark[index] = true; // 정답 위치 기억 
			document.images[index].src="media/img2.gif"; // 숨은 강아지 이미지
			i++;
		}
	}

	// 1초간격으로 showTime(true) 호출하여 사용자에게 기억하도록 정답을 보여줌
	timerID=setInterval("thinkTime()",1000);
}

function playsound(src) {
	audio.src=src; 
	audio.play(); // src에 주어진 효과음을 발생시킨다.
}

//1초 간격으로 남은 시간을 출력하고 나머지 5초동안 효과음을 내는 함수
function thinkTime() {
	watingSeconds--; // 남은 시간 감소
	timeObj.innerText="남은 시간 : "+ watingSeconds; // 남은 시간 출력
	
	if(watingSeconds == 0) { // 남은 시간이 다 된 경우                  
		playsound("media/bi.mp3"); // 남은 시간이 끝나고 사용자가 찾아야 함을 알리는 경고음
		hideAnswer();  // 정답 숨기기
	}
	else if(watingSeconds > 0 && watingSeconds <= 5) // 남은 시간이 1~5초 사이이면 경고음
		playsound("media/clock.mp3");
}

// 답을 숨기고 클릭이 가능하게 하여 사용자가 문제를 풀게하는 함수
function hideAnswer() {
	clearInterval(timerID); // 타이머 해제
	// 숨은 강아지가 보이지 않도록 보통 달걀 이미지 출력. 이미지 객체에 onclick 리스너 등록
	for(var i=0; i<document.images.length; i++) {
		document.images[i].src="media/img1.gif";
		
		// 이미지 클릭시 checkAnswer()함수를 호출하는 onclick 리스너 등록
		document.images[i].onclick=checkAnswer;
	}

	watingSeconds=FINDINGSECONDS; // 정답을 찾는 시간 20초로 설정
	resultObj.innerHTML="정답을 찾으세요"; // 개임 진행 메시지
	
	// 1초간격으로 showTime(false) 함수 호출. 사용자가 정답을 찾는 시간
	timerID=setInterval("findTime()",1000);
}

//1초 간격으로 남은 시간을 출력하고 나머지 5초동안 효과음을 내는 함수
function findTime() {
	watingSeconds--; // 남은 시간 감소
	timeObj.innerText="남은 시간 : "+ watingSeconds; // 남은 시간 출력
	
	if(watingSeconds == 0) { // 남은 시간이 다 된 경우                  
		playsound("media/bi.mp3"); // 남은 시간이 끝나고 사용자가 찾아야 함을 알리는 경고음
		gameOver(false); // 게임오버        
	}
	else if(watingSeconds > 0 && watingSeconds <= 5) // 남은 시간이 1~5초 사이이면 경고음
		playsound("media/clock.mp3");
}

// 이미지가 클릭되었을 경우 호출. 정답과 오답 여부를 체크한다.
function checkAnswer(e) { // e는 click 이벤트 객체
	var clickIndex = -1; // 초기 값 -1. 찾으면 발견한 인덱스 

	// 클릭된 이미지 객체의 인덱스를 찾음
	for(var i=0; i<document.images.length; i++) {         
		if(e.target == document.images[i]) { // 찾았음
			clickIndex = i;
			break;
		}
	}

	if(clickIndex == -1) {
		alert("클릭이 발생하였지만 클릭한 달걀을 찾지 못함. 심각한 오류");
		return;
	}
	
	if(mark[clickIndex] == true) { // 클릭한 이미지가 정답인 경우
		mark[clickIndex] = false; // 정답이 아님으로 표시
		playsound("media/chimes.mp3"); // 숨은 강아지 발견의 성공을 알리는 소리 출력
		
		document.images[clickIndex].src="media/img2.gif"; // 숨은 강아지 달걀 이미지  출력
		document.images[clickIndex].onclick = null; // 이 이미지의 onclick 리스너 삭제
		restNum--; // 남은 개수 감소
		restObj.innerText = "남은수 :  " + restNum;
		if(restNum == 0) { // 숨은 이미지를 모두 찾은 경우
			if(audio.currentTime != audio.duration) { // 아직 이전 오디오가 "media/chimes.mp3"가 연주중인 경우
/*				audio.pause();
				audio.load();
				playsound("media/tada.mp3"); // 게임에 승리하였을 알리는 빵빠레 */
				audio.onended = function () {
					playsound("media/tada.mp3"); // 게임에 승리하였을 알리는 빵빠레
					audio.onended = null;
				}
			}
			else
				playsound("media/tada.mp3"); // 게임에 승리하였을 알리는 빵빠레
			gameOver(true); // true는 모두 찾아서 게임 승리를 뜻함
		}
	}
	else { // 오답을 클릭한경우
		playsound("media/bad.mp3"); // 오답을 선택한 경우 울리는 경고음
		failNum++;
		failObj.innerText="실패수 :  " + failNum;
		if(failNum == MAXTRY) 
			gameOver(false); // false는 찾기에 실패한 상태로 게임이 종료됨을 뜻함
   
	}
}

// 게임 오버가 된 경우
function gameOver(winner) {
	clearInterval(timerID); // 타이머 해제

	gameoverObj.style.display = "block"; // game over 문자 출력
	
	if(winner == true) { // 모두 찾았음 !!	
		resultObj.innerHTML = "성공"; // 개임 진행 메시지
		gameoverObj.innerHTML = "WINNER"; // WINNER 텍스트 출력
		//alert("모두 찾으셨습니다. 기억력의 달인이십니다.");
	}
	else { // 게임 실패
		resultObj.innerHTML = "실패"; // 개임 진행 메시지
		for(var i=0; i<mark.length; i++) {
			if(mark[i] == true) { // 인덱스 i가 정답인데 찾지 못한 경우
				document.images[i].src="media/img2.gif"; // 숨은 강아지 달걀 출력
				document.images[i].onclick = null;	
				document.images[i].style.border="1px solid red"; // 테두리 그리기
			}
		}
		gameoverObj.innerHTML = "GAME OVER"; // GAME OVER 텍스트 출력		
	}

	// 24개의 이미지들에 대해 이미지 클릭 효과 없앰
	for(var i=0; i<document.images.length; i++)
		document.images[i].onclick = null;

	startMenuObj.style.visibility="visible"; // 게임 시작 텍스트가 보이도록 함
}
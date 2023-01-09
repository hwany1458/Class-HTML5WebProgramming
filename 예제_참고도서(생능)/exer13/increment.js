// 웹 페이지로부터 숫자를 기다린다.
onmessage = function (e) { // (2) 답
	var n = parseInt(e.data);
	n++;
	postMessage(n);
}

onmessage = function (e) {
	var sum=0;
	var from = parseInt(e.data.from);
	var to = parseInt(e.data.to);
	for(var i=from; i<=to; i++) 
		sum += i;
	postMessage(sum);
}


var div;

function finish(isWin) {
	clock.stop();
	div = document.createElement("div");
	div.className = "finish";
	document.body.appendChild(div);
	if (isWin) {
		successFinish();
	}
	else {
		failFinish();
	}
	var newGame = document.createElement("div");
	newGame.className = "new-game";
	newGame.innerHTML = "Play again";
	div.appendChild(newGame);

	newGame.onclick = function() {
		window.location.reload(true);
	}
}

function successFinish() {
	var congratulate = document.createElement("div");
	congratulate.innerHTML = "You win!";
	congratulate.className = "congratulation";
	div.appendChild(congratulate);
}

function failFinish() {
	div.classList.add("finish-fail");
	var label = document.createElement("div");
	label.innerHTML = "You lose:(";
	label.className = "fail";
	div.appendChild(label);
}
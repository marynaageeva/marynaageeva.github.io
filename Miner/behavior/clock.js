
function Clock() {
	var timer;
	var clockField = document.getElementsByClassName("data-field")[0];
	this.start = function() {
		timer = setInterval(function () {
			clockField.innerHTML++;
		}, 1000);
	}

	this.stop = function () {
		clearInterval(timer);
	}
}

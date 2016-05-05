
	var openCells = 0;
	var isClock = false;
	var clock;
	mineField.onclick = function (event) {
		if (event.target.tagName != "TD") return;
		if (!isClock) {
			clock = new Clock();
			clock.start();
			isClock = true;
		}
		var td = event.target;
		nextOpen(td);

	}

	mineField.oncontextmenu = function (event) {
		var numbMines = document.getElementsByClassName("data-field")[1];
		if (event.target.tagName != "TD") return;
		console.log("hello");
		var td = event.target;
		if(td.classList.contains("open")) return false;
		td.classList.toggle("flag");
		if (td.classList.contains("flag")){
			numbMines.innerHTML--;
		}
		else {
			numbMines.innerHTML++;			
		}
		return false;
	}

	function nextOpen(cell) {

		if (cell.classList.contains("open") || cell.classList.contains("flag"))
			return;

		var n = cell.parentNode.rowIndex;
		var m = cell.cellIndex;		

		if (valueField[n][m] === "b") {
			openAllMines();
			return;
		}

		openCell(cell);

		if (valueField[n][m] != 0) {
			return;
		}

		if (n > 0) {
			nextOpen(mineField.rows[n-1].cells[m]);			
		}
		if (n < GAME_FIELD_SIZE-1) {
			nextOpen(mineField.rows[n+1].cells[m]);			
		}
		if (m > 0) {
			nextOpen(mineField.rows[n].cells[m-1]);			
		}
		if (m < GAME_FIELD_SIZE-1) {
			nextOpen(mineField.rows[n].cells[m+1]);
		}
	}


	function openCell(cell) {

		var n = cell.parentNode.rowIndex;
		var m = cell.cellIndex;
		cell.className="open";
		switch (valueField[n][m]) {
			case 0:
				cell.classList.add("zero");			
			break;
			case 1:
				cell.classList.add("one");			
			break;

			case 2:
				cell.classList.add("two");
			break;

			case 3:
				cell.classList.add("three");
			break;

			default:
				cell.classList.add("other");
			break;

		}

		cell.innerHTML = valueField[n][m];	
		openCells++;
		if (openCells == (GAME_FIELD_SIZE*GAME_FIELD_SIZE - NUMB_MINE)) {
			finish(true);
		}
	}

	function openAllMines() {
		for (var i = 0; i < valueField.length; i++) {
			for (var j = 0; j < valueField.length; j++) {
				if (valueField[i][j] == "b") {
					openOneMine(mineField.rows[i].cells[j]);
				}
			}			
		}
		finish(false);
	}

	function openOneMine(cell) {
		cell.className = "mine";
	}


	var GAME_FIELD_SIZE = 9;
	var valueField = [];
	var NUMB_MINE = 10;

	createValueField();
	placeMines();
	placeNumbers();
	//printValueField();


	function createValueField() {
		for (var i = 0; i < GAME_FIELD_SIZE; i++) {
			valueField[i] = new Array(GAME_FIELD_SIZE);
		}	
	}

	function placeMines () {
		var n, m;
		for (var i = 0; i < NUMB_MINE; i++) {
			n = getRandomNumber(0, GAME_FIELD_SIZE - 1);
			m = getRandomNumber(0, GAME_FIELD_SIZE - 1);
			if (!valueField[n][m])
				valueField[n][m] = "b";
			else {
				i--;
			}
		}
	}

	function placeNumbers () {

		for (var i = 0; i < GAME_FIELD_SIZE; i++) {
			for (var j = 0; j < GAME_FIELD_SIZE; j++) {
				if (!valueField[i][j]) {
					valueField[i][j] = numbMinesBeside(i,j);
				}		
			}
		}	

		function numbMinesBeside(i, j)	{
			var countMines = 0;
			if (i !=0) {
				checkMine(i-1, j);
				if (j != 0) {
					checkMine(i-1, j-1);
				}
				if (j != valueField.length-1) {
					checkMine(i-1, j+1);					
				}
			}
			if (i!=valueField.length-1) {
					checkMine(i+1, j);
					if (j != 0) {
						checkMine(i+1, j-1);
					}
					if (j != valueField.length-1) {
						checkMine(i+1, j+1);					
					}
				}	

			if (j != 0)	{
				checkMine(i, j-1);
			}
			if (j != valueField.length-1) {
				checkMine(i, j+1);
			}

			function checkMine(x,y) {
				if (valueField[x][y]) {
					if (valueField[x][y]=="b") {
						countMines++;

					}
				}
			}
			return countMines;
		}
	}

	function getRandomNumber(min, max) {
		return parseInt(Math.random() * (max - min) + min);
	}

/*	function printValueField() {
		for (var i = 0; i < GAME_FIELD_SIZE; i++) {
			console.log(valueField[i]);		
		}			
	}*/



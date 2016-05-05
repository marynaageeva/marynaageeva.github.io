"use strict";

	var mineField = document.getElementById('mine-field');
	fillField();

	function fillField() {
		var n = 9;

		for (var i = 0; i < n; i++) {
			var tr = document.createElement("tr");
			for (var j = 0; j < n; j++) {
				var td = document.createElement("td");	
				tr.appendChild(td);		
			}
			mineField.appendChild(tr);			
		}
	}

	

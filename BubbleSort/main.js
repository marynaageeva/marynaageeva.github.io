"use strict";

(function () {
    var next, cancel, parentNode, childNodes, text; /*элементы страницы*/
    var numbers, currentValue, preventChar;
    next = document.getElementById("next");
    cancel = document.getElementById("cancel");
    text = document.getElementById("text-field");
    parentNode = document.getElementById("sort-numb");

    initValue();

    next.addEventListener("click", getNumbers);
    cancel.addEventListener("click", clear);

    text.onkeypress = function (e) {
        e = e || event;
        if (e.ctrlKey || e.altKey || e.metaKey)
            return;
        var chr = getChar(e);
        if (chr == null)
            return;

        if (chr < '0' || chr > '9') {
            if (chr != ',' || preventChar == ",") {
                return false;
            }
        }
        preventChar = chr;
    }

    function getChar(event) {
        if (event.which == null) {
            if (event.keyCode < 32)
                return null;
            return String.fromCharCode(event.keyCode)
        }

        if (event.which != 0 && event.charCode != 0) {
            if (event.which < 32)
                return null;
            return String.fromCharCode(event.which);
        }

        return null;
    }

    function initValue(){
	    currentValue = 0;
	    childNodes = [];
	    preventChar = ",";    	
    }

    function getNumbers() {
        next.removeEventListener("click", getNumbers);
        numbers = toNumb(text.value);
        if (numbers.length !== 0) {
            text.disabled = true;
            addNumberToHTML(numbers);
            next.addEventListener("click", sorting);
        } else {
            clear();
        }
    }

    function sorting() {
        if (numbers.length > 1) {
            if (currentValue === numbers.length - 1) {
                childNodes[currentValue - 1].style.backgroundColor = "khaki";
                childNodes[currentValue].style.backgroundColor = "gray";
                currentValue = 0;
                numbers.pop();
            } else {

                if (currentValue !== 0) {
                    childNodes[currentValue - 1].style.backgroundColor = "khaki";
                }
                childNodes[currentValue].style.backgroundColor = "green";
                childNodes[currentValue + 1].style.backgroundColor = "green";
                swap(currentValue);
                currentValue++;
            }
        } else {
            childNodes[0].style.backgroundColor = "gray";
            next.removeEventListener("click", sorting);
        }

        function swap(currentValue) {
            var tmp;
            if (numbers[currentValue] > numbers[currentValue + 1]) {
                childNodes[currentValue].style.backgroundColor = "red";
                childNodes[currentValue + 1].style.backgroundColor = "red";
                tmp = numbers[currentValue];
                numbers[currentValue] = numbers[currentValue + 1];
                numbers[currentValue + 1] = tmp;
                childNodes[currentValue].innerHTML = numbers[currentValue];
                childNodes[currentValue + 1].innerHTML = numbers[currentValue + 1];
            }
        }
    }

    function addNumberToHTML(numb) {
        var nodeNumb;

        for (var i = 0; i < numb.length; i++) {
            nodeNumb = document.createElement("div");
            nodeNumb.innerHTML = numbers[i];
            nodeNumb.className = " numb";
            parentNode.appendChild(nodeNumb);
        }
        childNodes = parentNode.children;
    }

    function toNumb(strNumbers) {
        var numbers = strNumbers.split(",");
        numbers = numbers.map(function (el) {
            return parseInt(el);
        });
        for ( var i = numbers.length - 1; i >= 0; i--) {
	        if (isNaN(numbers[i])) {
	            clear();
	            numbers = [];	        	
	        }

    	}
        return numbers;
    }

    function clear() {
        for (var i = 0; i < parentNode.childNodes.length; ) {
            parentNode.removeChild(parentNode.childNodes[i]);
        }
        next.addEventListener("click", getNumbers);
        initValue();
        text.disabled = false;
    }

})();
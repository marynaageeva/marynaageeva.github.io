

(function () {

    var btn0, btn1, btn2, btn3, btn4, btn5, btn6, btn7, btn8, btn9, btnPoint;

    var btnPlus, btnMinus, btnDevide, btnMul;
    var btnC, btnCE, btnBackSpace;
    var btnEqually;

    var textField = document.getElementById("text-field");
    var stringField = document.getElementById("string-field");
    btnEqually = document.getElementById("equally");
    btnEqually.addEventListener("click", getResult);

    var numbers = [], operators = [];

    initNumberButtons();
    initOperationButtons();
    initClearButtons();

    function initNumberButtons() {
        btn0 = document.getElementById("zero");
        btn0.addEventListener("click", appendText.bind(this, btn0.value));
        btn1 = document.getElementById("one");
        btn1.addEventListener("click", appendText.bind(this, btn1.value));
        btn2 = document.getElementById("two");
        btn2.addEventListener("click", appendText.bind(this, btn2.value));
        btn3 = document.getElementById("three");
        btn3.addEventListener("click", appendText.bind(this, btn3.value));
        btn4 = document.getElementById("four");
        btn4.addEventListener("click", appendText.bind(this, btn4.value));
        btn5 = document.getElementById("five");
        btn5.addEventListener("click", appendText.bind(this, btn5.value));
        btn6 = document.getElementById("six");
        btn6.addEventListener("click", appendText.bind(this, btn6.value));
        btn7 = document.getElementById("seven");
        btn7.addEventListener("click", appendText.bind(this, btn7.value));
        btn8 = document.getElementById("eight");
        btn8.addEventListener("click", appendText.bind(this, btn8.value));
        btn9 = document.getElementById("nine");
        btn9.addEventListener("click", appendText.bind(this, btn9.value));
        btnPoint = document.getElementById("point");
        btnPoint.addEventListener("click", setPoint);
    }

    function initOperationButtons() {
        btnPlus = document.getElementById("plus");
        btnPlus.addEventListener("click", setOperationAction.bind(this, btnPlus.value));
        btnMinus = document.getElementById("minus");
        btnMinus.addEventListener("click", setOperationAction.bind(this, btnMinus.value));
        btnMul = document.getElementById("multiply");
        btnMul.addEventListener("click", setOperationAction.bind(this, btnMul.value));
        btnDevide = document.getElementById("devide");
        btnDevide.addEventListener("click", setOperationAction.bind(this, btnDevide.value));
    }

    function initClearButtons() {
        btnC = document.getElementById("C");
        btnC.addEventListener("click", clear);
        btnCE = document.getElementById("CE");
        btnCE.addEventListener("click", clearStringField);
        btnBackSpace = document.getElementById("backSpace");
        btnBackSpace.addEventListener("click", clearOne);
    }

    function appendText(value) {
        textField.value += value;
    }

    function setPoint() {
        if (textField.value === "") {
            textField.value = "0.";
        } else if (textField.value.indexOf('.') === -1) {
            appendText(".")
        }
    }

    function setOperationAction(op) {
        if (textField.value !== "") {
            if (textField.value.charAt(textField.value.length - 1) === ",") {
                textField.value += '0';
            }
            addToArrays(textField.value, op);
        } else {
            if (numbers.length === 0) {
                addToArrays(0, op);
            } else {
                operators.pop();
                operators.push(op);
                stringField.value = stringField.value.slice(0, stringField.value.length - 1);
                stringField.value += op;
            }
        }
        textField.value = "";
    }



    function addToArrays(value, op) {
        stringField.value += value + op;
        numbers.push(value);
        operators.push(op);
    }

    /*	для C*/
    function clear() {
        textField.value = "";
        stringField.value = "";
        numbers = [];
        operators = [];
    }

    function clearStringField() {
        textField.value = "";
    }

    /*	для backSpace*/
    function clearOne() {
        textField.value = textField.value.slice(0, textField.value.length - 1);
    }

    function getResult() {

        if (textField.value !== "") {
            numbers.push(textField.value);
            stringField.value += textField.value;
        } else if (operators.length !== 0) {
            operators.pop();
        }

        if (numbers.length !== 0) {
            computing();
            if (!isNaN(numbers[0]) && isFinite(numbers[0])) {
                textField.value = numbers[0].toFixed(3);
                stringField.value = "";
                numbers = [];
                operators = [];
            } else {
                clear();
            }
        }
    }

    function computing() {
        var lastIndex = numbers.length - 1;
        for (var i = 0; i < lastIndex; i++) {
            if (operators[i] === '/') {
                numbers[i] = numbers[i] / numbers[i + 1];
                remove(i);
                i--;
            }
        }

        for (i = 0; i < lastIndex; i++) {
            if (operators[i] === '*') {
                numbers[i] = numbers[i] * numbers[i + 1];
                remove(i);
                i--;
            }
        }

        for (i = 0; i < lastIndex; i++) {
            if (operators[i] === '-') {
                numbers[i] = numbers[i] - numbers[i + 1];
                remove(i);
                i--;
            }
        }

        for (i = 0; i < lastIndex; i++) {
            if (operators[i] === '+') {
                numbers[i] = +numbers[i] + (+numbers[i + 1]);
                remove(i);
                i--;
            }
        }
        function remove(index) {
            numbers.splice(index + 1, 1);
            operators.splice(index, 1);
            lastIndex--;
        }
    }
})();
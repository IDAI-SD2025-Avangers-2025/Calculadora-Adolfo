let igualPressed = 0;
let buttonInput = document.querySelectorAll(".boton");
let input = document.getElementById("input");
let igual = document.getElementById("igual");
let limpiar = document.getElementById("limpiar");
let borrar = document.getElementById("borrar");

window.onload = () => {
    input.value = "";
};

buttonInput.forEach((buttonClass) => {
    buttonClass.addEventListener("click", (event) => {
        let value = event.target.dataset.number;

        if (igualPressed === 1 && !isNaN(value) && value !== "." && !["AC", "DEL", "+", "-", "*", "/", "√", "^"].includes(value)) {
            input.value = "";
            igualPressed = 0;
        } else if (igualPressed === 1) {
            igualPressed = 0;
        }

        if (value === "AC") {
            input.value = "";
            return;
        }

        if (value === "DEL") {
            input.value = input.value.slice(0, -1);
            return;
        }

        if (value === "√") {
            input.value += "Math.sqrt(";
            return;
        }

        if (input.value.endsWith("Math.sqrt(") && "+-*/".includes(value)) {
            input.value = input.value.slice(0, -10); 
            input.value += value;
            return;
        }

        input.value += value;

        if (input.value.includes("Math.sqrt(") && !isNaN(value)) {
            input.value += ")";
        }
    });
});

igual.addEventListener("click", () => {
    igualPressed = 1;
    let inputValue = input.value;

    try {
        let expression = inputValue
            .replaceAll("^", "**");
        
        let result = eval(expression);
        
        if (Number.isNaN(result) || !Number.isFinite(result)) {
            input.value = "Error";
            return;
        }

        input.value = Number.isInteger(result) ? result : result.toFixed(2);
    } catch {
        input.value = "Error";
    }
});
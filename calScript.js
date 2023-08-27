const keys = document.querySelectorAll('.key');
const display_input = document.querySelector('.display-container .input');
const display_output = document.querySelector('.display-container .output');
let input = "";
for (let key of keys) {
    const value = key.dataset.key;
    key.addEventListener('click', () => {
        if (value == "clear")
        {
            input = "";
            display_input.innerHTML = "";
            display_output.innerHTML = ""; 
        } else if (value == "backspace") {
            input = input.slice(0, -1);
            display_input.innerHTML = cleanInput(input);
        } else if (value == "=") {
            try {
                let result = eval(PrepareInput(input));
                result = Math.round(result * 100) / 100;
                display_output.innerHTML = cleanOutput(result);
            }
            catch (err) {
                display_output.innerHTML = "Error";
            }
        }
        else {
            if( validateInput(value)){
                input += value;
                display_input.innerHTML = cleanInput(input);
            }
        }
    })
}
function cleanInput(input) {
    let input_array = input.split("");
    let input_array_length = input_array.length;
    for (let i = 0; i < input_array.length; i++){
        if (input_array[i] == "*") {
            input_array[i] = '<span class="action"> x </span>';
        } else if (input_array[i] == "/") {
            input_array[i] = '<span class="action"> ÷ </span>';
        }
        else if (input_array[i] == "+") {
            input_array[i] = '<span class="action"> + </span>';
        }
        else if (input_array[i] == "-") {
            input_array[i] = '<span class="action"> - </span>';
        }
        else if (input_array[i] == "/") {
            input_array[i] = '<span class="action">÷</span>';
        }
        else if (input_array[i] == "/") {
            input_array[i] = '<span class="percent">÷</span>';
        }
    }
    return input_array.join("");
}
function cleanOutput(output) {
    let output_string = output.toString();
    let decimal = output_string.split(".")[1];
    output_string = output_string.split(".")[0];
    let output_array = output_string.split("");
    if (output_array.length > 3){
        for (let i = output_array.length - 3; i > 0; i -= 3){
            output_array.splice(i, 0, ",");
        }
    }
    if (decimal) {
        output_array.push(".");
        output_array.push(decimal);
    }
    return output_array.join("");
}
function validateInput(value){
    let last_input = input.slice(-1);
    let operators = ["+", "-", "*", "/"];
    if (value == "." && last_input == ".") {
        return false;
    }

    if (operators.includes(value)) {
        if (operators.includes(last_input)) {
            return false;
        }
        else {
            return true;
        }
    }
    return true;
}
function PrepareInput(input) {
    let input_array = input.split("");
    for (let i = 0; i < input_array.length; i++){
        if (input_array[i] == "%") {
            input_array[i] = "/100";
        }
    }
    return input_array.join("");
}
// Проверяет корректностьскобок в массиве символов.
function parseBrackets(tokens){
    let brackets = "";
    for (let token of tokens){
        if ("()<>".indexOf(token) != -1 && token.length == 1){
            brackets += token;
        }
    }
    let stack = [];
    // Быстрая проверка корректности скобок за O(n) с использованием стека.
    for (let br of brackets){
        if (br == "(" || br == "<"){
            stack.push(br);
        }
        else if (br == ")") {
            if (!stack.length || stack.pop() != "(") {
                return "неправильное расположение скобок";
            }
        } else {
            if (!stack.length || stack.pop() != "<") {
                return "неправильное расположение скобок";
            }
        }
    }
    return stack.length ? "неправильное расположение скобок" : "";
}

let split_sentence;

// Проверяет корректность предложения поля программы.
function parseSentence(sent){
    let equals_found = false;
    let split_sent = [[], []];
    for (let token of sent){
        if (token != "=="){
            if (!equals_found && (token == "<" || token == ">")) {
                return "скобки активации в левой части поля программы";
            }
            split_sent[equals_found ? 0 : 1].push(token);
        } else {
            if (equals_found){
                return 'слишком много знаков "="';
            }
            equals_found = true;
        }
    }
    if (!equals_found){
        return 'нет знака "="';
    }
    let not_correct_brackets = parseBrackets(split_sent[0]) + parseBrackets(split_sent[1]);
    if (not_correct_brackets.length){
        return "неправильное расположение скобок";
    }
    // Быстрая проверка вхождений с помощью хеш-таблицы.
    let variable_set = new Set();
    for (let token of split_sent[1]){
        if (token.length > 1 && "set".indexOf(token[0]) != -1){
            variable_set.add(token);
        }
    }
    for (let token of split_sent[0]){
        if (token.length > 1 && "set".indexOf(token[0]) != -1 && !variable_set.has(token)){
            return `неопределённая переменная: "${token}"`;
        }
    }
    split_sentence = split_sent;
    return "";
}
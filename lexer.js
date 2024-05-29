function parseInput(select_string){
    let elems = [];
    for (let elem of document.querySelector(select_string).childNodes){
        if (!(elem instanceof Comment)){
            elems.push(elem.textContent.replaceAll(String.fromCharCode(160), " "));
        }
    }
    return elems;
}

function scanProgramField(){
    let res = [];
    let len = 0;
    strings = parseInput("#program_field");
    for (let [str_num, str] of Object.entries(strings)){
        res.push([]);
        let var_name = "";
        for (let i = 0; i < str.length; i++){
            let symb = str[i];
            try {
                switch (symb){
                    case " ":
                        if (var_name.length){
                            res[len].push(var_name);
                            var_name = "";
                        }
                        break;
                    case "\\":
                        if (i == str.length - 1 || str[i + 1] == " ") {
                            throw `символ \\ не задаёт escape-последовательность (строка ${Number(str_num) + 1}, столбец ${i + 1})`;
                        }
                        res[len].push(str[i + 1]);
                        i++;
                        break;
                    case "#":
                        i = str.length;
                        break;
                    case "=":
                        if (var_name.length){
                            res[len].push(var_name);
                            var_name = "";
                        }
                        res[len].push("==");
                        break;
                    case "s":
                    case "t":
                    case "e":
                        if (i != str.length - 1 && str[i + 1] != " " || var_name.length) {
                            var_name += symb;
                        } else {
                            if (var_name.length){
                                res[len].push(var_name);
                                var_name = "";
                            }
                            res[len].push(str[i]);
                        }
                        break;
                    default:
                        if (var_name.length && str[i].match("[a-zA-Z0-9]")){
                            var_name += symb;
                        } else {
                            if (var_name.length){
                                res[len].push(var_name);
                                var_name = "";
                            }
                            res[len].push(symb);
                        }
                    }
            } catch (err){
                document.querySelector("#result_field").innerHTML = "Ошибка: " + err + ".";
                return [];
            }
        }
        if (var_name.length){
            res[len].push(var_name);
        }
        if (res[len].length){
            len++;
        }
        else{
            res.pop();
        }
    }
    return res;
}

function scanViewField() {
    let res = [];
    let len = 0;
    strings = parseInput("#view_field");
    for (let [str_num, str] of Object.entries(strings)){
        res.push([]);
        let cur_str = "";
        for (let i = 0; i < str.length; i++){
            let symb = str[i];
            try {
                switch (symb){
                    case " ":
                        break;
                    case "\\":
                        if (i == str.length - 1 || str[i + 1] == " ") {
                            throw `символ \\ не задаёт escape-последовательность (строка ${Number(str_num) + 1}, столбец ${i + 1})`;
                        }
                        cur_str += str[i + 1];
                        i++;
                        break;
                    case "#":
                        i = str.length;
                        break;
                    case "=":
                    default:
                        cur_str += symb;
                    }
            } catch (err){
                document.querySelector("#result_field").innerHTML = "Ошибка: " + err + ".";
                return [];
            }
        }
        res[len] = cur_str;
        if (res[len].length){
            len++;
        }
        else{
            res.pop();
        }
    }
    return res;
}

document.querySelector("button").addEventListener("click", () => {
    document.querySelector("#result_field").innerHTML = "";
    let tokens_program = scanProgramField();
    let tokens_view = scanViewField();
    let result_array = [];
    if (tokens_program.length && tokens_view.length){
        for (let str of tokens_view){
            let parse_res = parseBrackets(str);
            if (parse_res.length){
                document.querySelector("#result_field").innerHTML = `Ошибка: ${parse_res}.`;
                return;
            }
        }
        for (let [key, sent] of Object.entries(tokens_program)){
            let parse_res = parseSentence(sent);
            if (parse_res.length){
                document.querySelector("#result_field").innerHTML = `Ошибка: ${parse_res}.`;
                return;
            }
            tokens_program[key] = split_sentence;
        }
        for (let [key, str] of Object.entries(tokens_view)){
            result_array.push(str);
            let matched = true;
            let open_br = str.lastIndexOf("<");
            while (open_br != -1 && matched){
                matched = false;
                let close_br = open_br;
                while (str[close_br] != ">"){
                    close_br++;
                }
                let expr = str.substr(open_br + 1, close_br - open_br - 1);
                for (let pattern of tokens_program){
                    let match_obj = match(expr, 0, pattern[1], 0, {});
                    if (match_obj.ok){
                        matched = true;
                        expr = structuredClone(pattern[0]);
                        for (let [key2, token] of Object.entries(expr)){
                            if (match_obj[token] != undefined){
                                expr[key2] = match_obj[token];
                            }
                        }
                        str = str.slice(0, open_br) + expr.join("") + str.slice(close_br + 1);
                        console.log(str);
                        result_array.push(str);
                        open_br = str.lastIndexOf("<");
                        break;
                    }
                }
                open_br = str.lastIndexOf("<");
            }
            if (!matched){
                document.querySelector("#result_field").innerHTML = `Ошибка: скобки активации не соотвествуют ни одному из образцов: ${str}.`;
                return;
            }
            tokens_view[key] = str;
        }
        let total_string = "";
        for (let str2 of result_array){
            str2 = str2.replaceAll("<", "&lt;")
            total_string += str2.replaceAll("<", "&gt;") + "<br>";
        }
        document.querySelector("#result_field").innerHTML = total_string;
    }
});
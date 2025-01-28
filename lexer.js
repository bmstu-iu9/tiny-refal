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
        str = str.replaceAll(" ", "");
        res.push([]);
        for (let i = 0; i < str.length; i++){
            let symb = str[i];
            try {
                switch (symb){
                    case "\\":
                        if (i == str.length - 1 || !["\\", "s", "t", "e", "#", "="].includes(str[i + 1])) {
                            throw `некорректная escape-последовательность (строка ${Number(str_num) + 1}, столбец ${i + 1})`;
                        }
                        res[len].push(str[i + 1]);
                        i++;
                        break;
                    case "#":
                        i = str.length;
                        break;
                    case "=":
                        res[len].push("==");
                        break;
                    case "s":
                    case "t":
                    case "e":
                        if (i != str.length - 1 && !["=", "<", ">", "(", ")", "#", "\\"].includes(str[i + 1])) {
                            res[len].push(str[i] + str[i + 1]);
                            i++;
                        }
                        break;
                    default:
                        res[len].push(symb);
                        break;
                    }
            } catch (err){
                document.querySelector("#result_field").innerHTML = "<span style='color: red'>Ошибка: " + err + ".</span>";
                return [];
            }
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
        str = str.replaceAll(" ", "");
        res.push([]);
        let cur_str = "";
        for (let i = 0; i < str.length; i++){
            let symb = str[i];
            try {
                switch (symb){
                    case "\\":
                        if (i == str.length - 1 || !["\\", "#"].includes(str[i + 1])) {
                            throw `некорректная escape-последовательность (строка ${Number(str_num) + 1}, столбец ${i + 1})`;
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
                document.querySelector("#result_field").innerHTML = "<span style='color: red'>Ошибка: " + err + ".</span>";
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

function *executeProgram() {
    const MAX_STEPS = 30;
    let tokens_program = scanProgramField();
    let tokens_view = scanViewField();
    let result_array = [];
    if (tokens_program.length && tokens_view.length){
        for (let str of tokens_view){
            let parse_res = parseBrackets(str);
            if (parse_res.length){
                result_array.push(`<span style='color: red'>Ошибка: ${parse_res}.</span>`)
                return result_array;
            }
        }
        for (let [key, sent] of Object.entries(tokens_program)){
            let parse_res = parseSentence(sent);
            if (parse_res.length){
                result_array.push(`<span style='color: red'>Ошибка: ${parse_res}.</span>`)
                return result_array;
            }
            tokens_program[key] = split_sentence;
        }
        for (let [key, str] of Object.entries(tokens_view)){
            let str_mod = str.replaceAll("<", "&lt;");
            result_array.push(str_mod.replaceAll(">", "&gt;"));
            let matched = true;
            let close_br = str.indexOf(">");
            while (close_br != -1 && matched){
                matched = false;
                let open_br = close_br;
                while (str[open_br] != "<"){
                    open_br--;
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
                        let str_mod = str.replaceAll("<", "&lt;");
                        result_array.push(str_mod.replaceAll(">", "&gt;"));
                        if (result_array.length == MAX_STEPS) {
                            yield result_array;
                            result_array = [];
                        }
                        close_br = str.indexOf(">");
                        break;
                    }
                }
                close_br = str.indexOf(">");
            }
            if (!matched){
                result_array.push(`<span style='color: red'>Ошибка: скобки активации не соответствуют ни одному из образцов.</span>`)
                return result_array;
            }
            tokens_view[key] = str;
        }
    }
    return result_array;
}

document.querySelector("button").addEventListener("click", () => {
    let prog = executeProgram();
    let total_string = "";
    let exec = () => {
        if (document.querySelector("a")) {
            total_string = total_string.slice(0, total_string.length - "<a style='color: blue'>Продолжить</a><br>".length);
        }
        let result = prog.next();
        if (result.value.length) {
            for (let str2 of result.value){
                total_string += str2 + "<br>";
            }
            if (!result.done) {
                total_string += "<a style='color: blue'>Продолжить</a><br>";
            }
            document.querySelector("#result_field").innerHTML = total_string;
            document.querySelector("a")?.addEventListener("click", exec);
        }
    }
    exec();
});
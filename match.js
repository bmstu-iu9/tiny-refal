function match(expr, expr_pos, pattern, pattern_pos, vars){
    while (pattern_pos != pattern.length && expr_pos != expr.length){
        if (pattern[pattern_pos].length == 1){
            if (expr[expr_pos] == pattern[pattern_pos]){
                pattern_pos++;
                expr_pos++;
            } else {
                return {ok: false};
            }
        } else if (vars[pattern[pattern_pos]] != undefined){
            if (expr.slice(expr_pos).startsWith(vars[pattern[pattern_pos]])){
                expr_pos += vars[pattern[pattern_pos]].length;
                pattern_pos++;
            } else {
                return {ok: false};
            }
        } else if (pattern[pattern_pos][0] == "s"){
            if ("()".indexOf(expr[expr_pos]) != -1){
                return {ok: false};
            }
            return match(expr, expr_pos + 1, pattern, pattern_pos + 1, {
                [pattern[pattern_pos]]: expr[expr_pos],
                __proto__: vars
            });
        } else if (pattern[pattern_pos][0] == "t"){
            if (expr[expr_pos] == ")"){
                return {ok: false};
            } else if (expr[expr_pos] == "("){
                let close_bracket = expr_pos;
                while (expr[close_bracket] != ")"){
                    close_bracket++;
                }
                return match(expr, close_bracket + 1, pattern, pattern_pos + 1, {
                    [pattern[pattern_pos]]: expr.substr(expr_pos, close_bracket - expr_pos + 1),
                    __proto__: vars
                });
            }
            return match(expr, expr_pos + 1, pattern, pattern_pos + 1, {
                [pattern[pattern_pos]]: expr[expr_pos],
                __proto__: vars
            });
        } else {
            let end = expr_pos - 1;
            while (end != expr.length && expr[end] != ")"){
                if (expr[end] == "("){
                    while (expr[end] != ")"){
                        end++;
                    }
                }
                let res = match(expr, end + 1, pattern, pattern_pos + 1, {
                    [pattern[pattern_pos]]: expr.substr(expr_pos, end - expr_pos + 1),
                    __proto__: vars
                })
                if (res.ok){
                    return res;
                }
                end++;
            }
            return {ok: false};
        }
    }
    if (expr_pos == expr.length && pattern_pos == pattern.length){
        return { ok: true, __proto__: vars };
    }
    else{
        return {ok: false};
    }
}
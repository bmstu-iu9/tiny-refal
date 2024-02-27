document.querySelector("#program_field").addEventListener("input", (event) =>{
    if (event.data == null){
        return;
    }
    let isText = false;
    let text_node = document.querySelector("#program_field");
    let select_node_num = 0;
    let absolute_offset = document.getSelection().anchorOffset;
    let text_str = [], counter = 0;
    for (let elem of text_node.childNodes){
        if (elem instanceof Text){
            text_str.push(elem.nodeValue);
            isText = true;
            if (!select_node_num && Array.from(elem.childNodes).includes(document.getSelection().anchorNode.parentNode)
            || document.getSelection().anchorNode.parentNode == elem){
                select_node_num = counter;
            } else {
                counter++;
            }
        } else if (elem instanceof HTMLElement){
            if (!elem.textContent.length){
                continue;
            }
            text_str.push(elem.textContent);
            if (!select_node_num && Array.from(elem.childNodes).includes(document.getSelection().anchorNode.parentNode)
            || document.getSelection().anchorNode.parentNode == elem){
                select_node_num = counter;
            } else {
                counter++;
            }
        }
    }
    for (let elem of text_node.childNodes[select_node_num].childNodes){
        let a_node = document.getSelection().anchorNode;
        if (elem != a_node && !Array.from(elem.childNodes).includes(a_node)){
            absolute_offset += (elem instanceof Text) ? elem.nodeValue.length : elem.textContent.length;
        } else {
            break;
        }
    }
    for (let i = 0; i < text_str.length; i++){
        for (let j = 0; j < text_str[i].length; j++){
                if (text_str[i][j] == "<") {
                    text_str[i] = text_str[i].slice(0, j) + '&lt;' + text_str[i].slice(j + 1);
                    j += '&lt;'.length - 1;
                } else if (text_str[i][j] == ">") {
                    text_str[i] = text_str[i].slice(0, j) + '&gt;' + text_str[i].slice(j + 1);
                    j += '&gt;'.length - 1;
                } else if (text_str[i][j] == "#" && (j == 0 || text_str[i][j - 1] != "\\")) {
                    text_str[i] = text_str[i].slice(0, j) + '<span style="color: grey">#' + text_str[i].slice(j + 1) + '</span>';
                    break;
                } else if ((text_str[i][j] == "e" || text_str[i][j] == "s" || text_str[i][j] == "t") && j != text_str[i].length - 1
                     && RegExp("[0-9a-zA-Z]").test(text_str[i][j + 1])) {
                    let var_index = j;
                    while (var_index != text_str[i].length - 1 && RegExp("[0-9a-zA-Z]").test(text_str[i][var_index + 1])) {
                        var_index++;
                    }
                    text_str[i] = text_str[i].slice(0, j) + '<span style="color: magenta">' + text_str[i].slice(j, var_index + 1) + 
                        '</span>' + text_str[i].slice(var_index + 1);
                    j = var_index + '</span>'.length + '<span style="color: magenta">'.length;

                } else if (text_str[i][j] == "(" && (j == 0 || text_str[i][j - 1] != "\\")) {
                    text_str[i] = text_str[i].slice(0, j) + '<span style="color: rgb(255, 94, 20)">(</span>' + text_str[i].slice(j + 1);
                    j += '<span style="color: rgb(255, 94, 20)">(</span>'.length - 1;
                } else if (text_str[i][j] == ")" && (j == 0 || text_str[i][j - 1] != "\\")){
                    text_str[i] = text_str[i].slice(0, j) + '<span style="color: rgb(255, 94, 20)">)</span>' + text_str[i].slice(j + 1);
                    j += '<span style="color: rgb(255, 94, 20)">)</span>'.length - 1;
                } else if (text_str[i][j] == "=" && (j == 0 || text_str[i][j - 1] != "\\")){
                    text_str[i] = text_str[i].slice(0, j) + '<span style="color: blue">=</span>' + text_str[i].slice(j + 1);
                    j += '<span style="color: blue">=</span>'.length - 1;
                }
            }
        text_str[i] = text_str[i].replaceAll("&lt;", '<span style="color: rgb(193, 210, 14)">&lt;</span>');
        text_str[i] = text_str[i].replaceAll("&gt;", '<span style="color: rgb(193, 210, 14)">&gt;</span>');
    }
    let combined_str = "";
    for (let str of text_str){
        combined_str += "<div>" + str + "</div>";
    }
    text_node.innerHTML = combined_str;
    let new_node = null;
    for (let node of text_node.childNodes[select_node_num].childNodes){
        if (node instanceof Text){
            if (absolute_offset <= node.nodeValue.length){
                new_node = node;
                break;
            }
            absolute_offset -= node.nodeValue.length;
        } else if (node instanceof HTMLElement){
            if (absolute_offset <= node.textContent.length){
                new_node = node.firstChild;
                break;
            }
            absolute_offset -= node.textContent.length;
        }
    }
    document.getSelection().setBaseAndExtent(new_node, (!isText) ? absolute_offset : 1
    , new_node, (!isText) ? absolute_offset : 1);
});

document.querySelector("#view_field").addEventListener("input", (event) =>{
    if (event.data == null){
        return;
    }
    let isText = false;
    let text_node = document.querySelector("#view_field");
    let select_node_num = 0;
    let absolute_offset = document.getSelection().anchorOffset;
    let text_str = [], counter = 0;
    for (let elem of text_node.childNodes){
        if (elem instanceof Text){
            text_str.push(elem.nodeValue);
            isText = true;
            if (!select_node_num && Array.from(elem.childNodes).includes(document.getSelection().anchorNode.parentNode)
            || document.getSelection().anchorNode.parentNode == elem){
                select_node_num = counter;
            } else {
                counter++;
            }
        } else if (elem instanceof HTMLElement){
            if (!elem.textContent.length){
                continue;
            }
            text_str.push(elem.textContent);
            if (!select_node_num && Array.from(elem.childNodes).includes(document.getSelection().anchorNode.parentNode)
            || document.getSelection().anchorNode.parentNode == elem){
                select_node_num = counter;
            } else {
                counter++;
            }
        }
    }
    for (let elem of text_node.childNodes[select_node_num].childNodes){
        let a_node = document.getSelection().anchorNode;
        if (elem != a_node && !Array.from(elem.childNodes).includes(a_node)){
            absolute_offset += (elem instanceof Text) ? elem.nodeValue.length : elem.textContent.length;
        } else {
            break;
        }
    }
    for (let i = 0; i < text_str.length; i++){
        for (let j = 0; j < text_str[i].length; j++){
            if (text_str[i][j] == "<") {
                text_str[i] = text_str[i].slice(0, j) + '&lt;' + text_str[i].slice(j + 1);
                j += '&lt;'.length - 1;
            } else if (text_str[i][j] == ">") {
                text_str[i] = text_str[i].slice(0, j) + '&gt;' + text_str[i].slice(j + 1);
                j += '&gt;'.length - 1;
            } else if (text_str[i][j] == "#" && (j == 0 || text_str[i][j - 1] != "\\")) {
                text_str[i] = text_str[i].slice(0, j) + '<span style="color: grey">#' + text_str[i].slice(j + 1) + '</span>';
                break;
            } else if (text_str[i][j] == "(" && (j == 0 || text_str[i][j - 1] != "\\")) {
                text_str[i] = text_str[i].slice(0, j) + '<span style="color: rgb(255, 94, 20)">(</span>' + text_str[i].slice(j + 1);
                j += '<span style="color: rgb(255, 94, 20)">(</span>'.length - 1;
            } else if (text_str[i][j] == ")" && (j == 0 || text_str[i][j - 1] != "\\")){
                text_str[i] = text_str[i].slice(0, j) + '<span style="color: rgb(255, 94, 20)">)</span>' + text_str[i].slice(j + 1);
                j += '<span style="color: rgb(255, 94, 20)">)</span>'.length - 1;
            }
        }
        text_str[i] = text_str[i].replaceAll("&lt;", '<span style="color: rgb(193, 210, 14)">&lt;</span>');
        text_str[i] = text_str[i].replaceAll("&gt;", '<span style="color: rgb(193, 210, 14)">&gt;</span>');
    }
    let combined_str = "";
    for (let str of text_str){
        combined_str += "<div>" + str + "</div>";
    }
    text_node.innerHTML = combined_str;
    let new_node = null;
    for (let node of text_node.childNodes[select_node_num].childNodes){
        if (node instanceof Text){
            if (absolute_offset <= node.nodeValue.length){
                new_node = node;
                break;
            }
            absolute_offset -= node.nodeValue.length;
        } else if (node instanceof HTMLElement){
            if (absolute_offset <= node.textContent.length){
                new_node = node.firstChild;
                break;
            }
            absolute_offset -= node.textContent.length;
        }
    }
    document.getSelection().setBaseAndExtent(new_node, (!isText) ? absolute_offset : 1
    , new_node, (!isText) ? absolute_offset : 1);
});
const fs = require ('fs');
const ini = require('ini');

function parseINIString(data){
    console.log(data)
    var regex = {
        section: /^\s*\[\s*([^\]]*)\s*\]\s*$/,
        param: /^\s*([^=]+?)\s*=\s*(.*?)\s*$/,
        comment: /^\s*;.*$/
    };
    var value = {};
    var lines = data.split(/[\r\n]+/);
    var section = null;
    lines.forEach(function(line){
        if(regex.comment.test(line)){
            return;
        }else if(regex.param.test(line)){
            var match = line.match(regex.param);
            if(section){
                value[section][match[1]] = match[2];
            }else{
                value[match[1]] = match[2];
            }
        }else if(regex.section.test(line)){
            var match = line.match(regex.section);
            value[match[1]] = {};
            section = match[1];
        }else if(line.length == 0 && section){
            section = null;
        };
    });
    return value;
}

try {
    console.log("initiated")
let data = fs.readFileSync(`C:\\Users\\ChristopherMurray\\Documents\\PRM_Adapter_Config`)
let ini = ini.parse(fs.readFileSync(`C:\\Users\\ChristopherMurray\\Documents\\PRM_Adapter_Config`))
// let javascript_ini = parseINIString(data)
console.log(ini)
}
catch(e) {
    console.log(e);
}
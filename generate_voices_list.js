var fs = require("fs");

function getFiles (dir, files_){
    files_ = files_ || [];
    var files = fs.readdirSync(dir);
    for (var i in files){
        var name = dir + '/' + files[i];
        if (fs.statSync(name).isDirectory()){
            getFiles(name, files_);
        } else {
            files_.push(name.replace('./public/voices/', ''));
        }
    }
    return files_;
}

files = getFiles('./public/voices');
console.log(files);
console.log('================================');

var voices = {};
voices.groups = [];

class group {
    constructor(name) {
        this.name = name;
        this.translation = {
            "Chinese": "",
            "Japanese": ""
        };
        this.voicelist = [];
    }
}

for(let i = 0;i < 8;i++) {
    voices.groups.push(new group((i+1).toString()));
}

files.forEach(function (item) {
    let i = item.toString().split('/');
    let group_index = parseInt(i[0].split('.')[0]);
    let group_name = i[0].split('.')[1]
    voices.groups[group_index-1].name = group_name;
    voices.groups[group_index-1].translation = {
        "Chinese": group_name,
        "Japanese": ""
    };
    voices.groups[group_index-1].voicelist.push({
        "name": i[1],
        "path": item,
        "translation": {
            "Chinese": i[1],
            "Japanese": ""
        }
    })
});

out_json = JSON.stringify(voices, null, 2);

fs.writeFileSync('./temp.json', out_json);


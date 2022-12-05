const fs = require("fs") 

var arr = fs.readdirSync('images')
console.log(arr);

var html = ''
arr.forEach(src => {
    html += `<image style="height:100px;width:100px;" src='images/${src}'>\n`   
});


fs.writeFileSync("preview.html",html )






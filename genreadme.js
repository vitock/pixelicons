const fs = require("fs") 

var arr = fs.readdirSync('images')
console.log(arr);

var html = ''
var md = `
||||||
|-|-|-|-|-|
`

arr.forEach((src,idx) => {
    html += `<img style="height:100px;width:100px;" src='images/${src}'>\n`   
    md += `| <img style="height:100px;width:100px;" src='images/${src}'>  `
 
    if(idx % 5 == 4){
        md +="|\n"
    }

});


fs.writeFileSync("preview.html",html )
fs.writeFileSync("preview.md",md )






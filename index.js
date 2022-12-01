const _axios = require("axios")
const fs = require("fs")
const xpath = require("xpath")
const zlib = require("zlib")

const dom=require('xmldom').DOMParser



const client = _axios.create({
    decompress:false,
    responseType:'arraybuffer',
    headers:{
        "Accept-Language"	:"zh-CN,en;q=0.5",
        "Accept-Encoding": "gzip",
    },
})
 
    


async function getPage(pageNo){
    var url = `https://dotown.maeda-design-room.net/page/${pageNo}/`
    if(pageNo == 0){
        url = 'https://dotown.maeda-design-room.net/'
    }
    console.log(url)
    let d = await  client.get(url)
    var z = zlib.gunzipSync(d.data).toString("utf-8")
    return z;
}

async  function downloadImage(src){
    var arr = src.split("/")
    var fname = arr[arr.length -1]
    var path = `images/${fname}`
    if(fs.existsSync(path)){
        return
    }
    var d = await client.get(src)
    var img = d.data;
 

    fs.writeFileSync(path,img)

}

async function wait(t){
    return new Promise(r=>{
        setTimeout(() => {
            r()
        }, t * 1000);
    })
}

function getImageSrc(html){
    var xml = html
    var doc = new dom({errorHandler: { warning: w=>{}}}).parseFromString(xml)
    var nodes = xpath.select("//main//ul/li//img/@src", doc)
    var res = []
    nodes.forEach(e=>{res.push(e.value)})
    return res
}


(async function(){
    var a = 0;

    

    
    
    var i = 0;
    while(i ++ < 45){
        console.log('page start ',i)
        let html  = await getPage(i);
        var arr = getImageSrc(html);
        for (let index = 0; index < arr.length; index++) {
            const element = arr[index];
            await downloadImage(element)
            
        }

        wait(0.5)
        console.log('page end',i)
    
    }

    
 
   


    // https://dotown.maeda-design-room.net/wp-content/uploads/2022/08/hanabi_06.png
    // https://dotown.maeda-design-room.net/wp-content/uploads/2022/09/other_Lantern_01.png


    

    return;
    while (a < 45) {
        await getPage(0);   
        await wait(0.3); 
    }
    
})();


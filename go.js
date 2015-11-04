//捉火影剩下章節
//http://www.mh5.in/comic/846

var fs = require('fs');
var request = require("request");
var mkdirp = require('mkdirp');

//http://146.71.114.173/Pic/35/846/107085/53337e08c5d61.jpg
var requrl = process.argv[2] || 'http://www.mh5.in/comic/846/152433';
var foldername = process.argv[3] || 'images';
var re=/picTree =[\d\D]*?];/gm;
var re1=/pic_base =[\d\D]*?;/gm;


var download = function(url, dir, filename){
    request.head(url, function(err, res, body){
        request(url).pipe(fs.createWriteStream(dir + "/" + filename));
    });
};

request(requrl, function(error, response, body) {

        var picTree=JSON.parse(body.match(re)[0].replace(/(picTree =|;)/g,''));
        var pic_base=body.match(re1)[0].replace(/(pic_base =|;|')/g,'');

        // console.log(picTree);
        // console.log(pic_base);

        var picfloder = pic_base.split("/").filter(Boolean);
        var foldersubname=process.argv[4] || picfloder.pop();
        var dir = './' + foldername + '/' + foldersubname;
        console.log(dir);

        mkdirp(dir, function(err) {

        if(err){
            console.log(err);
          }
        });

        for (var i = 0, len = picTree.length; i < len; i++) {
                src=pic_base + picTree[i];
                console.log('src->',src);
              //download(src, dir, Math.floor(Math.random()*10000) + src.substr(-3,3));
                download(src, dir, i + '.jpg');
        }
});

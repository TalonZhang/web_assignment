var express = require('express')
var app = express()
var MongoClient = require('mongodb').MongoClient
var ejs = require('ejs')


app.set('views', './view')
app.engine('html', ejs.__express);
app.set('view engine', 'html');
app.use(express.static('static'));

var url = "mongodb://47.93.216.105:27017/"

MongoClient.connect(url, {useNewUrlParser: true}, function (err, db) {
    if (err) throw err
    var dbo = db.db("csdn")
    dbo.collection("blog_article").find({}).toArray(function (err, result) {
        if (err) throw err
        // for (var i = 0; i < result.length; i++) {
        //     if (result[i]['blog_title'].charAt(0)!='【')
        //         result[i]['blog_title']=' '+result[i]['blog_title'];
        // }
        // console.log(typeof (result[3]['blog_content']))
        app.get('/', function (req, res) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "X-Requested-With");
            var data={'obj':result};
            res.render('list.html',data);
        })
        app.get('/article', function (req, res) {

            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "X-Requested-With");

            for (var i = 0; i < result.length; i++) {
                if (result[i]['_id']==req.query.id) {
                    res.render('article',{
                        blog_title: result[i]['blog_title'],
                        blog_time: result[i]['blog_time'],
                        blog_content: result[i]['blog_content']
                    })

                    break
                }
            }


        })
    })
})

app.listen(8081,function () {
    console.log("127.0.0.1:8081")
})
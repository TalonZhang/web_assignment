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
        //console.log(result[3]['blog_content'])
        app.get('/', function (req, res) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "X-Requested-With");
            //res.send(result)
            var data={'obj':result};
            res.render('list.html',data);
        })
    })
})

app.listen(8081)
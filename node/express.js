var express = require('express')
var app = express()
var MongoClient = require('mongodb').MongoClient

var url = "mongodb://47.93.216.105:27017/"

MongoClient.connect(url, {useNewUrlParser: true}, function (err, db) {
    if (err) throw err
    var dbo = db.db("csdn")
    dbo.collection("blog_article").find({}).toArray(function (err, result) {
        if (err) throw err
        console.log(result[3]['blog_content'])
        app.get('/', function (req, res) {
            res.send(result[3]['blog_content'])
        })
    })
})

app.listen(8081)
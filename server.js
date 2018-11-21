
var express = require("express");
var app = express();
app.use(express.static("./public"));
app.use(function(req, res){
    console.log(req.method,"access",req.url);
    res.status(404).send("This page is not found");
});
app.listen(3000);
console.log("Express server is connect to my local port");


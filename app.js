const express = require("express");
const bodyParser = require('body-parser');
const date = require(__dirname+"/date.js");

const app = express();

const items = [];
const workItems = []

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended : true}));
app.use(express.json());

app.use(express.static("public"));


app.get("/", function(req, res){

    let day = date.getDate();
    
    res.render("list", {
        listTitle : day, 
        newListItems : items 
    });
    
});

app.post("/", function(req,res){

    var item = req.body.newItem;

    if(req.body.list === "Work List"){
        workItems.push(item);
        res.redirect("/work");
    } else {
         items.push(items);
         res.redirect("/");
    }
    
});

app.get("/work", function(req, res){
    res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.post("/work", function(req, res){
    let item = req.body.newItem;
    workItems.push(item);
    res.redirect("/work");
})


app.listen(3000, function(){
    console.log("Server is started on port 3000");
});
var express = require("express");
var fs = require("fs");
var app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(__dirname + "/Develop/public"));
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/Develop/public/index.html")
});

app.get("/notes", function (req, res) {
    res.sendFile(__dirname + "/Develop/public/notes.html")
})

app.get("/api/notes", function (req, res) {
 var data = getDbData();  
res.json(data);

});

app.post("/api/notes", function (req, res) {
    var newNotes = req.body;
    console.log(newNotes);
    var data = addToDbData(newNotes);
res.json(data);
    //  var data = getDbData();
    // data.push(req.body)
    // res.json(data);
    // console.log(data);
});

app.delete("/api/notes/:id", function (req, res) {
 let id = req.params.id;
 console.log(id);
let data = deleteDbData(id);
res.json(data);
    
});
app.listen(3000, function () {
    console.log("localhost: 3000")
});
 function getDbData(){
    let rawdata = fs.readFileSync('./Develop/db/db.json');
    let data = JSON.parse(rawdata);
    console.log(data);
  return data;
 }

 function addToDbData(newNote){
   
    let data = getDbData();
    data.push(newNote);
    saveDbData(data);
    return data;
 }

 function saveDbData(data){
    var json = JSON.stringify(data);
    fs.writeFileSync('./Develop/db/db.json', json, 'utf8');
 } 

 function deleteDbData(index){
   let data = getDbData();
   data.splice(index, 1); 
   saveDbData(data);
   return data;
 } 
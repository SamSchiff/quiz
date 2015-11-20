/*var http = require('http');
var server = http.createServer();
*/
var fs = require("fs");
var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser'); 
var ejs = require("ejs");

app.use(bodyParser.json());  
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/files", express.static('files'));
app.set('view engine', 'ejs');


app.set('port', (process.env.PORT || 3000));
var quizID;

app.get('/', function(req,res){
	//console.log("1");

//var contents = fs.readFileSync("views/index.ejs", "utf8");
//console.log(contents);
var quizzes = JSON.parse(fs.readFileSync("data/quiz.json", "utf8"));
var table = [];
for(var i = 0; i<quizzes.length; i++){
//console.log("2");
table.push(quizzes[i].title);



}
//res.render(index.ejs, {quizzes : names})
res.render('index.ejs', {titles: table});



//console.log(contents);
//console.log("3");
});


//app.get("/quiz", function (req, res){

//var json = fs.readFileSync("data/Quiz.json", "utf8");
//res.send(json);

	//});



app.get('/quiz/:id', function (req,res){
 quizID = req.params.id;
var theData = JSON.parse(fs.readFileSync("data/quiz.json", "utf8"));
console.log(theData);
	res.send(theData[quizID]);

	




});



app.post('/quiz', function (req, res) {
  console.log(req.body);
 //console.log(JSON.stringify(req.body));
   console.log("this works");
  
var theObject = req.body;
console.log(theObject.title);
  

var original = JSON.parse(fs.readFileSync("data/quiz.json", "utf8"));


for(var i = 0; i<theObject.questions.length; i++){

original[quizID].questions[i].global_correct += theObject.questions[i].global_correct;
original[quizID].questions[i].global_total += theObject.questions[i].global_total;

}


var toSend =  JSON.stringify(original);

  fs.writeFile('data/Quiz.json', toSend);
 res.send(toSend);
});




app.listen(app.get('port'));

/*
server.on('request', function(req,res){
//console.log(res);

res.writeHead(200, {'Content-Type': 'text/html'});



page = "";




res.write(page);
res.end();
})

server.listen(4000);*/
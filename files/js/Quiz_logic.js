











var quiz;






var state = -1;
var prevState = -2;
var firstButton = document.getElementById("mainButton1");
var userAnswers = [];
var radios = [];
var name = "";
firstButton.addEventListener('click', checkQuestion1, false);
//firstButton.addEventListener('click', changeState1, false);
//firstButton.addEventListener('click', function(){main(state, prevState)}, false);


function main(theState,thePrevState){










	///console.log(theState);
	//console.log(thePrevState);
	//console.log(state);
	//console.log(prevState);

	if(thePrevState >=0){
		
		for(var i = 0; i<quiz.questions[thePrevState].answers.length; i++){


			$(("#"+(i*2))).remove();

		}

	}
//var testVariable = quiz.title;
if(state>=quiz.questions.length){

var correct = 0;
var total = quiz.questions.length;
//var correctByQuestion = [];

for(var i = 0; i<quiz.questions.length; i++){


	if(userAnswers[i] === quiz.questions[i].correct_answer){
		correct++;
		//correctByQuestion.push(1);
		quiz.questions[i].global_correct +=1;
		quiz.questions[i].global_total +=1;
	}
	else{
		
		//correctByQuestion.push(0);
		quiz.questions[i].global_total +=1;
	}
}

//console.log(correct);

quiz.global_correct += correct;
quiz.global_total += total;

var dataToSend = JSON.stringify(quiz);
console.log(dataToSend);
	/*$.post('/quiz', dataToSend, function(){
console.log("this runs");

	endQuiz();

	});*/

$.ajax({
	    url : "/quiz",
	    type: "POST",
	    data : dataToSend,
	    contentType : "application/json; charset=utf-8",
	});

//console.log("this runs");
	endQuiz();
	console.log("before return");
	return;
	console.log("return inside");
	
	


//}
	


}

else{

$("#radio1").fadeOut(400,function(){
     
   
	radios = [];

	for(var i = 0; i<quiz.questions[theState].answers.length; i++){
		var tempRadio = document.createElement("INPUT");
		tempRadio.type = "radio";
		tempRadio.id = i;
		tempRadio.name = "question";
	
		//console.log(tempRadio.id);
		radios.push(tempRadio);
		
	}

	var radioDiv = document.getElementById("radio1");
	for(var i = 0; i<quiz.questions[theState].answers.length; i++)	{
		var tempLabel = document.createElement("LABEL");
		tempLabel.id = i*2;
		tempLabel.innerHTML = (i+1) +".)      " +quiz.questions[theState].answers[i];
		radioDiv.appendChild(tempLabel);
		tempLabel.appendChild(radios[i]);
		tempLabel.appendChild(document.createElement("BR"));


	}



 


if(userAnswers[state] || userAnswers[state] === 0){
console.log(userAnswers[state]);
		radios[userAnswers[state]].checked = true;

	}

	$("#radio1").fadeIn();
	var flickr = $.getJSON("https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=cdee2fb40b5836133622812035d9c75e&tags=" + quiz.questions[state].meta_tags[0] + "&format=json&nojsoncallback=1", function(data){

 // Creating the image URL. Info: http://www.flickr.com/services/api/misc.urls.html
      console.log("inside callback");
      var img_src = "http://farm" + data.photos.photo[state].farm + ".static.flickr.com/" + data.photos.photo[state].server + "/" + data.photos.photo[state].id + "_" + data.photos.photo[state].secret + ".jpg";
    //  var img_thumb = $("<img/>").attr("src", img_src).css("margin", "8px");
    //  $(img_thumb).appendTo("#flickr-images");
    $("#image").attr("src", img_src);



	});

  
console.log(flickr);
     
  
	
});


//var element = document.createElement("P");
//element.id = 'main';
//console.log(element.id);
//console.log(element);
//var node = document.createTextNode(quiz.questions[state].text);
//element.appendChild(node);
//document.getElementById("main");
//document.write("this works");
//document.body.insertBefore(element, document.getElementById("last"));
//console.log("this works");
if(thePrevState==0 && theState == 1){
	var secondButton = document.createElement("BUTTON");
	secondButton.id = "mainButton2";
	var secondNode = document.createTextNode("Previous Question");
	secondButton.appendChild(secondNode);
	var buttonDiv = document.getElementById("submit");
	buttonDiv.appendChild(secondButton);
	buttonDiv.insertBefore(secondButton, firstButton);
	secondButton.addEventListener('click', checkQuestion2, false);
	//secondButton.addEventListener('click', changeState2, false);
	//secondButton.addEventListener('click', function(){main(state, prevState)}, false);

}


if(thePrevState == 1 && theState == 0){
	$("#mainButton2").remove(); 

}

$("#main").fadeOut(400,function(){
      $("#main").html(quiz.questions[state].text).fadeIn();  
    });

//$("#main").fadeOut();
//document.getElementById("main").innerHTML = quiz.questions[state].text;
//$("#main").fadeIn();
document.getElementById("mainButton1").innerHTML = "Next Question";
if(theState == quiz.questions.length-1){

	document.getElementById("mainButton1").innerHTML = "Submit Answers Forever!!!!!";
}


//document.getElementById("mainButton2").innerHTML = "Previous Question";


//prevState = state;
/*if(state+1 < quiz.questions.length){

	state++;
}

else{
state = 0;

}
*/
}



console.log("return outside");
}


function changeState1(){
	//console.log("works1");
	state++;
	prevState= state-1;


}

function changeState2(){
	state--;
	prevState= state+1;


}


function endQuiz(){
	$("#mainButton1").remove(); 
	$("#mainButton2").remove(); 
	$("#image").remove();
	//$("#main").remove();

var header = document.getElementById("header");
var headNode = document.createTextNode("Congratulations on finishing the Quiz, "+ name + ".  Check out how you did below.");
header.innerHTML = "";
header.appendChild(headNode);

var correct = 0;
var wrong = 0;
for(var i = 0; i<quiz.questions.length; i++){


	if(userAnswers[i] === quiz.questions[i].correct_answer){
		correct++;
	}
	else{
		wrong++;
	}
}

console.log(correct);
console.log(wrong);

//var results = document.createElement("P");

document.getElementById("main").innerHTML = "You got " + correct + " out of " +(correct+wrong) + " questions right";
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var data = [correct,wrong];

var colors = ["#0000ff", "#ff0000"];

var center = [canvas.width / 2, canvas.height / 2];

var radius = Math.min(canvas.width, canvas.height) / 2;

var lastPosition = 0, total = 0;

var questionCount = quiz.questions.length;


for(var i = 0;  i<data.length; i++){
console.log("hello" + 1);
ctx.fillStyle = colors[i];

ctx.beginPath();

ctx.moveTo(center[0],center[1]);

ctx.arc(center[0],center[1],radius,lastPosition,lastPosition+(Math.PI*2*(data[i]/questionCount)),false);

ctx.lineTo(center[0],center[1]);

ctx.fill();

lastPosition += Math.PI*2*(data[i]/questionCount);

}


var results = document.createElement("P");
document.body.insertBefore(results, document.getElementById("last"));

results.id = "global";
var resultString = "";
resultString += "Total Questions answered correctly ever: " + quiz.global_correct + " out of a total of " + quiz.global_total + "<br> </br>";
for(var i = 0; i<quiz.questions.length; i++){

if(userAnswers[i] === quiz.questions[i].correct_answer){
		resultString+= "You got Question " + (i+1) + " correct!!!";
	}
	else{
		resultString+= "You got Question " + (i+1) + " wrong!!!";
	}

resultString += ("<br></br>Global Stats for Question " + (i+1) + ": <br></br> Total correct ever: " + quiz.questions[i].global_correct + " out of " + quiz.questions[i].global_total + " total. " + ((quiz.questions[i].global_correct/quiz.questions[i].global_total)*100) + "% of people who have taken this quiz have gotten this question right.<br> </br>");

}

results.innerHTML = resultString;





/*
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.beginPath();
ctx.arc(200,200,100,0,2*Math.PI*(correct/(correct+wrong)));
ctx.strokeStyle = '#550000';
ctx.stroke();
ctx.fillStyle = 'red';
ctx.fill();

var ctx2 = c.getContext("2d");
ctx2.beginPath();
ctx2.arc(200,200,100,0,2*Math.PI*(wrong/(correct+wrong)));
ctx2.strokeStyle = '#550000';
ctx.stroke();
ctx2.fillStyle = 'green';
ctx2.fill();


*/
}


function checkQuestion1(){

if(prevState === -2){

// added
console.log("test1");
//var quizNumber = "3";
var theID =2;
console.log("before");
console.log(document.getElementById("options").length);
console.log("after");


for(var i = 0; i<document.getElementById("options").length; i++){
console.log(theID);
if(document.getElementById("options")[i].selected === true){
	theID = i;
	break;
}


}


$.get("/quiz/"+theID, function(data, status){
console.log("test2");
quiz = data;
document.getElementById("options").remove();

}).done(function(){
















name = document.getElementById("theName").value;
if(!name){
	alert("enter a name");
	return;
}
else{
console.log(name);
$("#theName").remove();
var header = document.getElementById("header");
var headNode = document.createTextNode("Good luck on my quiz, "+ name);
header.innerHTML = "";
header.appendChild(headNode);

	changeState1();
	main(state,prevState);
	return;
}

}); //end of anonymous function inside .done

// added
} //end prev state -2


 							
if(state >=0){
//	console.log(userAnswers[0]);
//	console.log(userAnswers[1]);
//	console.log(userAnswers[2]);
	//console.log(userAnswers[3]);


	if(userAnswers[state] === 0 || userAnswers[state]){

		for(var i = 0; i<quiz.questions[state].answers.length; i++){
			if(radios[i].checked === true){
				userAnswers[state] = i;
				console.log(userAnswers[state]);
				changeState1();
				main(state,prevState);
				break;

			}

		}

	}

	else if(!userAnswers[state]){

		for(var i = 0; i<quiz.questions[state].answers.length; i++){
			if(radios[i].checked === true){
				userAnswers.push(i);

				changeState1();
				main(state,prevState);
				break;

			}

			else if(i === quiz.questions[state].answers.length-1){
				alert("You Must Select an answer!");
			}

		}

	}



}


}



function checkQuestion2(){






if(state >=0){
	if(userAnswers[state] === 0 || userAnswers[state]){

		for(var i = 0; i<quiz.questions[state].answers.length; i++){
			if(radios[i].checked === true){
				userAnswers[state] = i;
				changeState2();
				main(state,prevState);
				break;

			}

		}

	}

	else if(!userAnswers[state]){

		for(var i = 0; i<quiz.questions[state].answers.length; i++){
			if(radios[i].checked === true){
				userAnswers.push(i);
				changeState2();
				main(state,prevState);
				break;

			}

			else if(i === quiz.questions[state].answers.length-1){
				alert("You Must Select an answer!");
			}

		}

	}



}


}


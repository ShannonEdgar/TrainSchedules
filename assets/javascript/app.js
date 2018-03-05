$(document).ready(function(){

var config = {
    apiKey: "AIzaSyBxbcxBVOuISbYk87j49wJhV5vWThQxsxI",
    authDomain: "train-project-7a5e7.firebaseapp.com",
    databaseURL: "https://train-project-7a5e7.firebaseio.com",
    projectId: "train-project-7a5e7",
    storageBucket: "train-project-7a5e7.appspot.com",
    messagingSenderId: "687009406793"
  };

firebase.initializeApp(config);

	var database = firebase.database();

	var trainName = "";
	var firstTrainTime = "";
	var frequency = 0;
	var nextArrival = 0;
	var minutesAway = 0;


$("#addRows").on("click", function(){

	event.preventDefault();

	$("#train-name").empty();
	$("#destination-input").empty();
	$("#ftt-input").empty();
	$("#frequency-input").empty();

	trainName = $("#train-name").val().trim();
	destination = $("#destination-input").val().trim();
	firstTrainTime = $("#ftt-input").val().trim();
	frequency = $("#frequency-input").val().trim();

	// Code in the logic for storing and retrieving the most recent user.
    database.ref().push({
    	trainName: trainName,
        destination: destination,
        frequency: frequency,
        minutesAway: minutesAway
    });


	//First time
	var firstTimeConverted = moment(firstTrainTime, "hh:mm").subtract(1, "years");
	console.log(firstTimeConverted);

	// Current time
	var currentTime = moment();
	console.log("CURRENT TIME:" + moment(currentTime).format("HH:mm"));

	// Difference between times
	var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
	console.log("DIFFERENCE IN TIME: " + diffTime);

	// Time apart (remainder)
	var tRemainder = diffTime % frequency;
	console.log(tRemainder);

	// Mins until train
	var tMinutesTillTrain = frequency - tRemainder;
	console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

	// Next train
	var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("hh:mm");
	console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

	var newLine = $("<tr></tr>") 

	newLine.append('<td>' + trainName + '</td>')
	newLine.append('<td>' + destination + '</td>')
	newLine.append('<td>' + frequency + '</td>')
	newLine.append('<td>' + nextTrain + '</td>')
	newLine.append('<td>' + tMinutesTillTrain + '</td>')


	$("#tbody").append(newLine)


});


// database.ref().on("child_added", function(snapshot) {

// 	$("#train-name").text(snapshot.val().trainName);
// 	$("#ftt-input").text(snapshot.val().firstTrainTime);
// 	$("#frequency-input").text(snapshot.val().frequency);
 
// });

database.ref().on("child_added", function(childSnapshot){
	console.log(childSnapshot.val());

	// Store everything into a variable
	var tName = childSnapshot.val().trainName;
	var dest = childSnapshot.val().destination;
	var freq = childSnapshot.val().frequency;
	var nextArrival = childSnapshot.val().tMinutesTillTrain;

	// Train info
	console.log(tName);
	console.log(dest);
	console.log(freq);
	console.log(nextArrival);
});

});
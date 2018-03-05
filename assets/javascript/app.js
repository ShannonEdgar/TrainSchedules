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
	firstTrainTime = $("#destination-input").val().trim();
	frequency = $("#ftt-input").val().trim();
	minutesAway = $("#frequency-input").val().trim();

	// Code in the logic for storing and retrieving the most recent user.
    database.ref().push({
    	trainName: trainName,
        firstTrainTime: firstTrainTime,
        frequency: frequency,
        minutesAway: minutesAway
    });

	var newLine = $("<tr></tr>") 

	newLine.append('<td>' + trainName + '</td>')
	newLine.append('<td>' + firstTrainTime + '</td>')
	newLine.append('<td>' + frequency + '</td>')
	newLine.append('<td>' + nextArrival + '</td>')
	newLine.append('<td>' + minutesAway + '</td>')
	

	$("#tbody").append(newLine)


});


database.ref().on("child_added", function(snapshot) {

	$("#train-name").text(snapshot.val().trainName);
	$("#destination-input").text(snapshot.val().firstTrainTime);
	$("#ftt-input").text(snapshot.val().frequency);
	$("#frequency-input").text(snapshot.val().minutesAway);
});

});
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


	// Time
	var firstTimeConverted = moment(firstTrainTime, "hh:mm").subtract(1, "years");

	// Current time
	var currentTime = moment();

	// Difference between times
	var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

	// Remainder
	var tRemainder = diffTime % frequency;

	// Mins until train
	var tMinutesTillTrain = frequency - tRemainder;

	// Next train
	var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("hh:mm");



	// Storing and retrieving the user
    database.ref().push({
    	trainName: trainName,
        destination: destination,
        frequency: frequency,
        nextTrain: nextTrain,
        tMinutesTillTrain: tMinutesTillTrain,
    });

	$("#train-name").val("");
	$("#destination-input").val("");
	$("#ftt-input").val("");
	$("#frequency-input").val("");

});



database.ref().on("child_added", function(childSnapshot){

	// Store everything into a variable in Firebase
	var tName = childSnapshot.val().trainName;
	var dest = childSnapshot.val().destination;
	var freq = childSnapshot.val().frequency;
	var nextArrival = childSnapshot.val().nextTrain;
	var nextTrain = childSnapshot.val().tMinutesTillTrain;

    // Push to page
	var newLine = $("<tr></tr>"); 

	newLine.append('<td>' + childSnapshot.val().trainName + '</td>');
	newLine.append('<td>' + childSnapshot.val().destination + '</td>');
	newLine.append('<td>' + childSnapshot.val().frequency + '</td>');
	newLine.append('<td>' + childSnapshot.val().nextTrain + '</td>');
	newLine.append('<td>' + childSnapshot.val().tMinutesTillTrain + '</td>');

	$("#tbody").append(newLine);


});


});








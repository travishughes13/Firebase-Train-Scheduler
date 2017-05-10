// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("clickMe");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal 
btn.onclick = function() {
    $('#myModal').css('display', 'block');
};

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    $('#myModal').css('display', 'none');
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
    $('#myModal').css('display', 'none');
    }
};

childKeys = [];

// Firebase Set-Up - commented out until further notice
var config = {
      apiKey: "AIzaSyAJS4YQWU5DmESeYueG1qH1NGkjv3DncEY",
      authDomain: "helloworld-4ff96.firebaseapp.com",
      databaseURL: "https://helloworld-4ff96.firebaseio.com/",
      storageBucket: "helloworld-4ff96.appspot.com"
    };
      firebase.initializeApp(config);

// This gives us our referrant
var database = firebase.database();

// This resets the modal
function reset() {
    // This resets the field
    $('#myModal').css('display', 'none');
    $('.inputry1').val('');
    $('.inputry2').val('');
    $('.inputry3').val('');
    $('.inputry4').val('');
    $('.inputry1').val('Enter your train name');
    $('.inputry2').val('Enter the destination');
    $('.inputry3').val('Enter the first arrival time');
    $('.inputry4').val('Enter the frequency (in minutes)');
};


// This click function updates firebase, updates the table,
// makes the time calculations, and runs the rest function
$(document).on('click', '#makeEntry', function() {
  event.preventDefault();

  // This is reserved for firebase data entry and updating the table on screen
      var tName = $('.inputry1').val();
      var dName = $('.inputry2').val();
      var aTime = $('.inputry3').val();
      var lambda = $('.inputry4').val();

      var newPostRef = database.ref().push({
        name: tName,
        destination: dName,
        initial: aTime,
        frequency: lambda
      });
      var postId = newPostRef.key;

      childKeys.push(postId);

  // This resets the modal
  reset();

});

// This click function runs the reset function only
$(document).on('click', '#abortAbort', function() {
  reset();
});

$('.inputry1').on('click', function(){
  $('.inputry1').val('');
});

$('.inputry2').on('click', function(){
  $('.inputry2').val('');
});

$('.inputry3').on('click', function(){
  $('.inputry3').val('');
});

$('.inputry4').on('click', function(){
  $('.inputry4').val('');
});

database.ref().on("child_added", function(snapshot) {
    
    console.log(snapshot.val());
    var newPost = snapshot.val();
    console.log("Destination: " + newPost.destination);

      var now = moment();
      var frequency = snapshot.val().frequency;
      var iTime = snapshot.val().initial;
      trainName = snapshot.val().name;
      trainDestination = snapshot.val().destination;
      initialATime = snapshot.val().initial;

      var initialTime = moment(iTime, 'HHmm');
      var minutesSinceInitial = now.diff(initialTime, 'minutes');
      var minutesUntilNext = frequency - (minutesSinceInitial % frequency);
      var nextArrival = moment(now).add(minutesUntilNext, 'minutes').format('HHmm');

      var newRow = $('<tr>');
      var newRowClose = $('</tr>');
      var newTrain = $('<td>' + trainName + '</td>')
      var newDestination = $('<td>' + trainDestination + '</td>');
      var initialArrival = $('<td>' + initialATime + '</td>');
      var upcomingArrival = $('<td>' + nextArrival + '</td>');

      newRow.append(newTrain);
      newRow.append(newDestination);
      newRow.append(initialArrival);
      newRow.append(upcomingArrival);
      newRow.append(newRowClose);

      $('#trainTable').append(newRow);
      
    }), function(errorObject) {
      console.log("The read failed: " + errorObject.code);
    };

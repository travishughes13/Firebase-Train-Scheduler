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

$(document).on('click', '#makeEntry', function() {
  // This is reserved for firebase data entry and updating the table on screen


  // This resets the modal
  reset();
  
});

$(document).on('click', '#abortAbort', function() {
  // This is reserved for firebase data entry and updating the table on screen


  // This resets the modal
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
// Firebase Set-Up - commented out until further notice
// var config = {
//       apiKey: "AIzaSyAJS4YQWU5DmESeYueG1qH1NGkjv3DncEY",
//       authDomain: "helloworld-4ff96.firebaseapp.com",
//       databaseURL: "https://helloworld-4ff96.firebaseio.com/",
//       storageBucket: "helloworld-4ff96.appspot.com"
//     };
//       firebase.initializeApp(config);

// // This gives us our referrant
// var database = firebase.database();

// // This adds the information to the database
// $("#okGo").on("click", function() {
//       database.ref().set({
//       });
//     });

// // This lets us access data for display from Firebase
// database.ref().on("value", function(snapshot) {
//       console.log(snapshot.val());
//       $("#okGo").html(snapshot.val().clickCount);
//       clickCounter = snapshot.val().clickCount;
//     }, function(errorObject) {
//       console.log("The read failed: " + errorObject.code);
//     });
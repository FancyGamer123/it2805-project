/*
FILENAME: joinuspopup.js
WRITTEN BY: Sandor Zeestraten
WHEN: 2016-10-17
PURPOSE: Display a popup for after 4 page views prompting them to join the club.
Sets a cookie for returning visitors so they do not get annoyed with popups on every pageview.
CREDITS: Inspired by the Animated Modal with Header and Footer example from W3Schools.
URL: http://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_modal2
*/

// Setup vars
var modal = document.getElementById('modal-popup');
var popup_no = document.getElementById('popup_no');
var popup_yes = document.getElementById('popup_yes');
var popupVisitTarget = '3';
var popupVisitCounter = localStorage.getItem('popupVisitCounter');

// Check if we need to display popup
window.onload = function() {
    // Check if it's a new user
    if (popupVisitCounter === null) {
        // Set the initial visit counter
        localStorage.setItem('popupVisitCounter', '1');

    // Check if the user has visited before, but has not reached the popup counter
    } else if (popupVisitCounter < popupVisitTarget) {
        // Increment the visit counter
        localStorage.setItem('popupVisitCounter', parseInt(popupVisitCounter) + 1);

    // Check if the user has hit the magic popup visit counter target
    } else if (popupVisitCounter === popupVisitTarget) {
        // Display popup when user hits visit counter target
        modal.style.display = 'block';
        // Set visit counter to false to stop counting
        localStorage.setItem('popupVisitCounter', 'False');
    }
};

// Interacting with the popup
window.onclick = function(event) {
    // Check if user clicks outside popup or selects no
    if (event.target == modal || event.target == popup_no) {
        // Hide popup
        modal.style.display = 'none';
    }

    // Check if user clicks join me in the popup
    if (event.target == popup_yes) {
        // Redirect to the join us page
        window.location.href = '../blimedlem.html';
    }
};

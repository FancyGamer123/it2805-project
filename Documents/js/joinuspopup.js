/*
FILENAME: joinuspopup.js
WRITTEN BY: Sandor Zeestraten
WHEN: 2016-10-17
PURPOSE: Create a popup for new visitor prompting them to join the club.
Sets a cookie for returning visitors so they do not get annoyed with popups on every pageview.
CREDITS: Inspired by the Animated Modal with Header and Footer example from W3Schools.
URL: http://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_modal2
*/

// Get elements
var modal = document.getElementById('modal-popup');
var popup_no = document.getElementById('popup_no');
var popup_yes = document.getElementById('popup_yes');

// Check if we need to display popup
window.onload = function() {
    // Check if user has visited in localStorage
    if (localStorage.getItem('popupVisited') === null) {
        // Display popup as user has not visited before
        modal.style.display = 'block';
    }
};

// Interacting with the popup
window.onclick = function(event) {
    // If user clicks outside popup or selects no, hide the popup
    if (event.target == modal || event.target == popup_no) {
        modal.style.display = 'none';
    }

    // Redirect to the join us page if user wants to join
    if (event.target == popup_yes) {
        window.location.href = '../blimedlem.html';
    }

    // Set localStorage item to mark that user has visited
    localStorage.setItem('popupVisited', 'True');
};

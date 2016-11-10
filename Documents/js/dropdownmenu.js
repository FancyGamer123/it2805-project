/*
FILENAME: dropdownmenu.js
PURPOSE: Add a clickable dropdown menu with CSS and JS.
WHEN: 2016-11-05
CREDITS: The code is a lightly modified version from the Dropdown Menu in Navbar example from W3Schools.
URL: http://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_dropdown_navbar_click
*/

// Setup vars
var myDropdown = document.getElementById("myDropdown");
var dropbtn = document.getElementById("dropbtn");

// Function for toggling between hiding and showing the dropdown
function toggleDropdownMenu() {
  myDropdown.classList.toggle("show");
}

// Add eventlistener for clicking outside the dropdown when displayed
document.addEventListener("click", function(e) {
  if (myDropdown.classList.contains("show") && !myDropdown.contains(e.target)) {
    toggleDropdownMenu();
  }
});

// Add eventlistener for clicking the dropdown button
dropbtn.addEventListener("click", function(e) {
  toggleDropdownMenu();
  // Stop event from propagating to the other eventlistener
  e.stopPropagation();
});

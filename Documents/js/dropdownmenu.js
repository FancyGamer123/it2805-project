/*
FILENAME: dropdownmenu.js
PURPOSE: Add a clickable dropdown menu with CSS and JS.
WHEN: 2016-11-05
CREDITS: The code is a lightly modified version from the Dropdown Menu in Navbar example from W3Schools.
URL: http://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_dropdown_navbar_click
*/

// Toggle between hiding and showing the dropdown content when clicked
function toggleDropdownMenu() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(e) {
  // Check if target is not dropdown button
  if (!e.target.matches('.dropbtn')) {
    // Go through all dropdown classes
    var dropdowns = document.getElementsByClassName("dropdown-content");
    for (var d = 0; d < dropdowns.length; d++) {
      // Loop through all open dropdown menus
      var openDropdown = dropdowns[d];
      // If any dropdowns are open, remove them
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

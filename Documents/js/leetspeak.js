/*
FILENAME: leetspeak.js
WRITTEN BY: Håvard Løkensgard
WHEN: 2016-11-13
PURPOSE: Change the text on the webpage to leetspeak. Once enabled, the leetspeak function will stay 
        until the user clicks on the button once again, which will disable it.
*/

// Leetspeak dictionary
var alphabets = {
    a: "4",
    b: "8",
    e: "3",
    g: "6",
    i: "1",
    o: "0",
    p: "9",
    s: "5",
    t: "7",
    z: "2"
};

// List of all selectors to be rewritten
var selectors = [
    "h1",
    "h2",
    "h3",
    "h4",
    "#navbar-container li a",
    ".sectionbar > div"
];


window.addEventListener("load", function(){
    // find out if the site should be converted
    var haveConvertet = localStorage.getItem("leetspeak");

    //if it should be converted, convert it.
    if (haveConvertet == "1")
        convertToLeet();

    // Get the element to attaching eventlistener to
    var btn = document.getElementById("leetspeak-btn");
    // Add click listener to the button
    btn.addEventListener("click", leetspeakConverter);
});


// Function that converts the page to leetspeak. If already converted, reload the page.
function leetspeakConverter() {
    //get the current state of the site, (is leetspeak used or not)
    haveConvertet = localStorage.getItem("leetspeak");
    //if it is used
    if (haveConvertet == "1") {
        //then change it to not used and reload the page
        localStorage.setItem("leetspeak", "0")
        location.reload();
    } else {
        //else then change it to used and convert the page
        localStorage.setItem("leetspeak", "1")
        convertToLeet();
    }
}

// Main function that converts text to leetspeak
function convertToLeet() {
    // Go through the list of selectors we wish to convert
    for (var i = 0; i < selectors.length; i++) {
        // Get list of elements with the current selector
        var currentSelector = document.querySelectorAll(selectors[i]);

        // Iterate over all the elements with the current selector
        for (var j = 0; j < currentSelector.length; j++) {
            // Get the text of the current element
            var currentText = currentSelector[j].innerHTML;

            // Replace characters in the text with leetspeak
            for (var k = 0; k < currentText.length; k++) {
                // If the the current character exists in the leepspeak dict then replace it
                if (alphabets[currentText[k]]) {
                    currentText = currentText.replace(currentText[k], alphabets[currentText[k]]);
                }
            }

            // Set new innerHTML
            currentSelector[j].innerHTML = currentText;
        }
    }
}

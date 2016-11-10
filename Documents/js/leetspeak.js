/*
FILENAME: leetspeak.js
WRITTEN BY: Håvard Løkensgard
WHEN: 2016-10-25
PURPOSE: Change the text on the webpage to leetspeak.
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

// List of all tags to be rewritten
var tags = [
    "h1",
    "h2"
];

// Variabel that is set when the site is converted
var haveConvertet = false;

// Function that converts the page to leetspeak. If already converted, reload the page.
function leetspeakConverter() {
    if (!haveConvertet) {
        convertToLeet();
        haveConvertet = true;
    } else {
        location.reload();
        haveConvertet = false;
    }
}

// Main function that converts text to leetspeak
function convertToLeet() {
    // Go through the list of tags we wish to convert
    for (var i = 0; i < tags.length; i++) {
        // Get list of elements with the current tag
        var currentTag = document.getElementsByTagName(tags[i]);

        // Iterate over all the elements with the current tag
        for (var j = 0; j < currentTag.length; j++) {
            // Get the text of the current element
            var currentText = currentTag[j].innerHTML;

            // Replace characters in the text with leetspeak
            for (var k = 0; k < currentText.length; k++) {
                // If the the current character exists in the leepspeak dict then replace it
                if (alphabets[currentText[k]]) {
                    currentText = currentText.replace(currentText[k], alphabets[currentText[k]]);
                }
            }

            // Set new innerHTML
            currentTag[j].innerHTML = currentText;
        }
    }
}

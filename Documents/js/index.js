/*
FILE NAME: index.js
WRITTEN BY: Tony Timmy Tran
WHEN: 2016-11-05
PURPOSE:
	Make the "list-items" for the new-articles and new-reviews
*/



//get the current html page file name
window.onload = function() {
	var urlStr = window.location.pathname;
	var fileName = urlStr.substring(urlStr.lastIndexOf('/')+1, urlStr.length);
	if (fileName == "index.html" || fileName == ""){ //if the html is index.html

		for (let i = 0; i < 5, i++){ //I want only 5 list-items each

		}
	}

}


function listItem(img, title, text){

}

/* 
FILE NAME: js/index.js 
WRITTEN BY: Tony Timmy Tran
START DATE: 05.11.2016
FINISH DATE: ---------
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
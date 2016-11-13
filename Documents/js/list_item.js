/*
FILE NAME: list_item.js
WRITTEN BY: Tony Timmy Tran
WHEN: 2016-11-11
PURPOSE:
	A function for list-items for the sections (especially for "#nye-artikler" and "#nye-omtaler" in index.html)

Notes:
	- Should be at least 5 list-items
	- The images with size of 62x62 is preferred, but whatever size would work
	- there is two lines of text. One for the title and one for the contents.
	- The content doesn't need to be over 100 characters in length. More text will not be visible.
*/


//global function to make a list-item
function makeListItem(imgSrc, title, text, link){
	//create an empty list-item
	var item = document.createElement('li');
	//create the innerHTML of the item. The li element should contain one img, one title and one line of text.
	var child = '<div class="image"><img src="' + imgSrc + '"></div><div class="desc"><h4>' + 
	title + '</h4><p class="line-clamp">' + text + '</p></div>';
	item.innerHTML = child;
	//listen to a user click. And go to the link 
	item.addEventListener('click', function(){
		window.location.href = link;
	});
	//return this list-item as an element.
	return item;
}
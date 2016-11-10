/*
FILE NAME: index.js
WRITTEN BY: Tony Timmy Tran
<<<<<<< HEAD
START DATE: 05.11.2016
FINISH DATE: 10.11.2016
=======
WHEN: 2016-11-05
>>>>>>> master
PURPOSE:
	Make list-items for the sections ("nye-artikler" and "nye-omtaler")

Notes:
	- Should be at least 5 list-items
	- The images with size of 62x62 is preferred, but whatever size would work

*/


/*

/* add list-items to */
let nyeArtiklerList = document.querySelector('#nye-artikler > .content > ul');
let imgRelativePath1 = "articles/listImages/";
let articleList = [
{img:"1.png", link:"1.html", title:"title1", text:"text1 - Lorem.... bla bla bla blabla blabla blabla blabla bla"},
{img:"2.png", link:"2.html", title:"title2", text:"text2 - Lorem.... bla bla bla blabla blabla blabla blabla bla"},
{img:"3.png", link:"3.html", title:"title3", text:"text3 - Lorem.... bla bla bla blabla blabla blabla blabla bla"},
{img:"4.png", link:"4.html", title:"title4", text:"text4 - Lorem.... bla bla bla blabla blabla blabla blabla bla"},
{img:"5.png", link:"5.html", title:"title5", text:"text5 - Lorem.... bla bla bla blabla blabla blabla blabla bla"},
]
for (let i = 0; i < articleList.length; i++){
	let a = articleList[i];
	let listItem = makeListItem(imgRelativePath1 + a.img, a.title, a.text, a.link);
	nyeArtiklerList.appendChild(listItem);
}

let nyeOmtalerList = document.querySelector('#nye-omtaler > .content > ul');
let imgRelativePath2 = "articles/listImages/";
let reviewList = [
{img:"1.png", link:"1.html", title:"title1", text:"text1 - Lorem.... bla bla bla blabla blabla blabla blabla bla"},
{img:"2.png", link:"2.html", title:"title2", text:"text2 - Lorem.... bla bla bla blabla blabla blabla blabla bla"},
{img:"3.png", link:"3.html", title:"title3", text:"text3 - Lorem.... bla bla bla blabla blabla blabla blabla bla"},
{img:"4.png", link:"4.html", title:"title4", text:"text4 - Lorem.... bla bla bla blabla blabla blabla blabla bla"},
{img:"5.png", link:"5.html", title:"title5", text:"text5 - Lorem.... bla bla bla blabla blabla blabla blabla bla"},
]
for (let i = 0; i < reviewList.length; i++){
	let a = reviewList[i];
	let listItem = makeListItem(imgRelativePath2 + a.img, a.title, a.text, a.link);
	nyeOmtalerList.appendChild(listItem);
}

//function to make a list-item
function makeListItem(imgSrc, title, text, link){
	var item = document.createElement('li');
	var child = '<div class="image"><img src="' + imgSrc + '"></div><div class="desc"><h4>' + 
	title + '</h4><p class="line-clamp">' + text + '</p></div>';
	item.innerHTML = child;
	item.addEventListener('click', function(){
		window.location.href = link;
	});
	return item;
}
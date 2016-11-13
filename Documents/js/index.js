/*
FILE NAME: index.js
WRITTEN BY: Tony Timmy Tran
WHEN: 2016-11-12
PURPOSE:
	Create slideshow and list-items for index.html
*/


//set where the slideshow is
let slideshow = document.querySelector("#newsfeed-slideshow .slideshow");
//set where the description is
let description = document.querySelector("#newsfeed-slideshow .description");
console.log("creating");
// optional way to write the array's of images, descriptions and links
// Declares the relative paths
let imageRelativePath = "docs/newsfeed/images/";
let descriptionRelativePath = "docs/newsfeed/texts/";
// Declares the filename of the desired files
let slides = [
{img:'Gears-of-War-4.jpg', alt:'Gears of War 4',desc:'1.xml', link:'docs/articles/dummy1.html'},
{img:'RPG.jpg', alt:'Role Playing Game',desc:'2.xml', link:'docs/articles/dummy2.html'},
{img:'cod4-remastered.jpg', alt:'Call of Duty 4 Modern Warfare Remastered',desc:'3.xml', link:'docs/reviews/smartie1.html'},
{img:'owlboy.jpg', alt:'Owlboy Game',desc:'4.xml', link:'docs/reviews/smartie2.html'},
{img:'PS1.jpg', alt:'A car game of Playstation',desc:'5.xml', link:'docs/articles/dummy3.html'}];

//join together the relative path and filenames
let imageList = [];
let altList = [];
let descriptionList = [];
let linkList = [];
for (let i = 0; i < slides.length; i++){
	imageList[i] = imageRelativePath + slides[i].img;
	altList[i] = slides[i].alt;
	descriptionList[i] = descriptionRelativePath + slides[i].desc;
	linkList[i] = slides[i].link;
}

//make the slideshow object (put it into an variable because someone could easily control the slideshow (with commands) with this variable)
let ss = new Slideshow(slideshow, imageList, altList, description, descriptionList, linkList);





//select the unordered list of new articles
let nyeArtiklerList = document.querySelector('#nye-artikler > .content > ul');
//a convenient way to declare strings of image (source), link, title and text
let imgRelativePath1 = "docs/articles/images_62x62/";
let linkRelativePath1 = "docs/articles/"
let articleList = [
{img:"art1.png", link:"dummy1.html", title:"Suggesting Some Fixed Dialogue for Gears of War 4", text:"I may have given the impression, in my review of Gears of War 4, that I picked up on a degree of re"},
{img:"art2.png", link:"dummy2.html", title:"This is How You Fix RPG Sidequests", text:"For no particular reason I'd like to bring up the concept of sidequests. The essential component of an o"},
{img:"art3.png", link:"dummy3.html", title:"Predicting What's New on the Nostalgia Horizon - The PS1 Era", text:"Whoops, been a while since the last column, hasn't it; I've been rather occupied with moving from one sovereign nation"},
{img:"art4.png", link:"dummy4.html", title:"id Software's History Parallels the Seven Ages of Man and the History of PC Gaming", text:"So in the end credits of ZP last week I made a throwaway comment to the effect that Id Software's game release history"},
{img:"art5.png", link:"dummy5.html", title:"There's More to Comedy Games than Just Comic Relief Characters", text:"So let's talk about comedy games. In my last ZP I talked about Headlander, and how it felt more like a game with too many comic"},
]
//loop though the array of objects 
for (let i = 0; i < articleList.length; i++){
	//shorten articleList[i] to a
	let a = articleList[i];
	//create the list-item according to the properties of the current object
	let listItem = makeListItem(imgRelativePath1 + a.img, a.title, a.text, linkRelativePath1 + a.link);
	//append the list-item to the unordered list
	nyeArtiklerList.appendChild(listItem);
}



//select the unordered list of new reviews
let nyeOmtalerList = document.querySelector('#nye-omtaler > .content > ul');
let imgRelativePath2 = "docs/reviews/images_62x62/";
let linkRelativePath2 = "docs/reviews/"
let reviewList = [
{img:"1.png", link:"smartie1.html", title:"Call of Duty: Modern Warfare Remastered Review", text:"Once held up as the great example for contemporary-era shooters, Call of Duty 4: Modern Warfare is now"},
{img:"2.png", link:"smartie2.html", title:"Owlboy Review", text:"Owlboy is a game about weakness, but for its lovable cast of characters, individual weaknesses only strengthen"},
{img:"3.png", link:"smartie3.html", title:"Hitman Episode 6: Hokkaido Review", text:"Io Interactive’s episodic Hitman experiment is over – or at least, the first season is anyhow. The end result"},
{img:"4.png", link:"smartie4.html", title:"The Elder Scrolls V: Skyrim Special Edition PC Review", text:"When I play a remastered version of a game I love, I expect it to be at least as good as the old one in every"},
{img:"5.png", link:"smartie5.html", title:"Dark Souls 3: Ashes of Ariandel", text:"There’s something for every Dark Souls 3 fan to enjoy in Ashes of Ariandel, the first of two planned DLC packs. "}, //we still don't have 5 reviews ready
]
for (let i = 0; i < reviewList.length; i++){
	let a = reviewList[i];
	let listItem = makeListItem(imgRelativePath2 + a.img, a.title, a.text, linkRelativePath2 + a.link);
	nyeOmtalerList.appendChild(listItem);
}
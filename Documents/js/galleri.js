/*
FILE NAME: slideshow.js
WRITTEN BY: Tony Timmy Tran
WHEN: 2016-10-27
PURPOSE:
	create a slideshow showing the desired images.
*/

//select the slideshow element
let slideshow = document.querySelector("#gallery1 .slideshow");
let imageRelativePath = "docs/slideshow/";
//list of the images I want to show
let imageList = ["cod.jpg","watchdogs.jpg","games.jpg","owlboy.jpg","got.jpg","rpg.jpg","asscreed.jpg","car.jpg"];
let altList = ["Call of Duty Modern Warfare Remastered", "Watch Dogs", "Image of games", "Owlboy Game", "Game of Thrones", "Role Playing Games", "Assassin's Creed", "A retro Car game"];

//join together the relative path and filenames
for (let i = 0; i < imageList.length; i++)
	imageList[i] = imageRelativePath + imageList[i];

//make the slideshow object
new Slideshow(slideshow, imageList, altList);
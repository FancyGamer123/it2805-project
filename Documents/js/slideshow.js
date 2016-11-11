/*
FILE NAME: slideshow.js
WRITTEN BY: Tony Timmy Tran
WHEN: 2016-10-27
PURPOSE:
	Including this script to a html file will give the user the possibility to easily create a Slideshow object.
	The Slideshow object constructer will automatically add DOM elements to the slideshow (and the description if wanted)
	Automatically listens to events, such as left arrow click, right arrow click, clicking on dots and the event of the end of a css transition.
	The script is meant to work with style.css.
	(By "user", I mean the man who wants to use this script, which in this case, me)

HOW TO USE:
	The Slideshow object constructer normally takes 2 arguments. If a description text beside the slideshow is wanted,
	then the user has to add parse additionally 3 parametres.
	First parameter has to be the DOM element where the client wants the slideshow to be. That element has to have
	a "slideshow" in its classList
	Second parameter has to be an array with sources of the images the user wants to show. The first element
	in the array will be shown first.
	Optional parametres:
		If a description is wanted, add the 3rd, 4th and 5th parametres
		Third parameter has to be the DOM element where the user wants the description texts to be displayed
		Fourth parameter has to be the list of filepaths of the texts to show.
		Fifth parameter has to be the list of links of the where to read the whole text.
INSPIRATION:
	http://www.w3schools.com/howto/howto_js_slideshow.asp (which did not really help me that much, except for the look).
OTHER NOTES:
	- I made the arrow_next.svg and arrow_prev.svg myself
	- I've included my older coding in the bottom of this file (commented away) to prove that it is my code.
	- The reason that there is 3 images, is to preload the images adjacent to the current visible image.
	  So that the user can navigate through the images without waiting too long for the images to be downloaded.
	  But when pressing the dots, the images has to be downloaded at the time the user presses, since if the slideshow hundreds of images, we preload all the images in the beginning, it will consume unnecessary much data.
*/


//get the current html page file name
var urlStr = window.location.pathname;
var fileName = urlStr.substring(urlStr.lastIndexOf('/')+1, urlStr.length);
if (fileName == "index.html" || fileName == ""){ //if the html is index.html
	//set where the slideshow is
	let slideshow = document.querySelector("#newsfeed-slideshow .slideshow");
	//set where the description is
	let description = document.querySelector("#newsfeed-slideshow .description");
	console.log("creating");
	// optional way to write the array's of images, descriptions and links
	// Declares the relative paths
	let imageRelativePath = "docs/images/";
	let descriptionRelativePath = "docs/texts/";
	let linkRelativePath = "docs/pages/";
	// Declares the filename of the desired files
	let slides = [
	{img:'1.jpg', alt:'a',desc:'1.xml', link:'1.html'},
	{img:'2.jpg', alt:'b',desc:'2.xml', link:'2.html'},
	{img:'3.jpg', alt:'c',desc:'3.xml', link:'3.html'},
	{img:'4.jpg', alt:'d',desc:'4.xml', link:'4.html'},
	{img:'5.jpg', alt:'e',desc:'5.xml', link:'5.html'}];

	//join together the relative path and filenames
	let imageList = [];
	let altList = [];
	let descriptionList = [];
	let linkList = [];
	for (let i = 0; i < slides.length; i++){
		imageList[i] = imageRelativePath + slides[i].img;
		altList[i] = slides[i].alt;
		descriptionList[i] = descriptionRelativePath + slides[i].desc;
		linkList[i] = linkRelativePath + slides[i].link;
	}

	//make the slideshow object
	let ss = new Slideshow(slideshow, imageList, altList, description, descriptionList, linkList);

}
else if (fileName == "galleri.html"){
	let slideshow = document.querySelector("#gallery1 .slideshow");
	let imageRelativePath = "docs/images/";
	let imageList = ["1.jpg","2.jpg","3.jpg","4.jpg","5.jpg","6.jpg"];
	let altList = ["a", "b", "c", "d", "e", "f"];

	//join together the relative path and filenames
	for (let i = 0; i < imageList.length; i++)
		imageList[i] = imageRelativePath + imageList[i];
	//make the slideshow object
	let ss = new Slideshow(slideshow, imageList, altList);
}




/*-------------------*/
/* GENERAL FUNCTIONS */
/*-------------------*/

//An object constructor for slideshows
function Slideshow(slideshow, imageList, altList, description, descList, linkList){
	//------START OF VERY SIMPLE ERROR HANDLING-----------------------------------
	//Error handling for slideshow
	var checkObject = function (param){
		throw "ERROR, " + e + " is not an object";
	}
	if (slideshow != "" || imageList != "" || altList != ""){
		if (typeof slideshow !== "object")
			errNotObject("slideshow");
		if (typeof imageList !== "object")
			errNotObject("imageList");
		if (typeof altList !== "object")
			errNotObject("altList");
	}
	//Error handling for description
	//if one of the optional parametres are used, then the other optional parametres also needs to be set.
	if (description != "" || descList != "" || linkList != ""){
		if (typeof description !== "object")
			errNotObject("description");
		if (typeof descList !== "object")
			errNotObject("descList");
		if (typeof linkList !== "object")
			errNotObject("linkList");
	}
	//-----END OF ERROR HANDLING---------------------------------------

	//store the parametres into private variables
	this.ss = slideshow;	//the element with class="slideshow"
	this.imageList = imageList; // an array of image sources
	this.altList = altList; // an array of alt texts
	this.description = description || ""; // optional, the element intended to be a slideshow-description
	this.descList = descList || ""; // optional, an array of description sources
	this.linkList = linkList || ""; // optional, an array of links


	/*
	This Slideshow object will create HTML elements automatically on creation.
	The moving is performed by adding and removing css classes. (img-move-<direction> and desc-move-<direction>)
	*/


	/* START Default elements */

	/* there should be 3 image containers.
		One to the left, outside of the visible container, calls imageContainer[0]
		One in the middle covering the visible container, calls imageContainer[1]
		One to the right, outside of the viewable container, calls imageContainer[2]
		(the positions and styling are set in style.css)*/
	/* 	The first container will contain an img with the last source in the imageList
		The second will contain an img with the first source in the imageList
		The third one with the second source*/
	var image_str = ""; //a string to be applied as an innerHTML later
	for (let i = 0; i < 3; i++){
		let l = this.imageList.length;
		image_str += '<div class="image img' + i + '"><div><img src="' +
		this.imageList[((i-1)%l+l)%l] + '" alt="' + 
		this.altList[((i-1)%l+l)%l] + '"></div></div>';
	}
	/*add the image_str to innerHTML, even the slideshow shouldn't have anything yet.
	But in case there is an absolute positioned element the "user"of this js decided to put into the slideshow element.
	Therefore I use "+=" instead of "=" */
	this.ss.innerHTML += image_str;
	//create buttons to be added to the innerHTML of the slideshow
	var buttons_str = '<div class="buttons">' +
	'<div class="arrows wrapper-valign-center">' +
		'<div class="prev">'+
			'<img src="images/buttons/arrow_prev.svg">'+
		'</div><div class="next">' +
			'<img src="images/buttons/arrow_next.svg">' +
	'</div></div>';
	//create the dots to be added to the buttons
	//the amount of dots should be the same as the length of the imageList
	var dots_string = '<div class="dots"><div><div class="dot selected"></div>';
	for(let i = 1; i < this.imageList.length; i++)//generate the dots
		dots_string += '<div class="dot"></div>';
	//add the dots to the buttons, together with the end-tags of the buttons
	buttons_str += dots_string + "</div></div></div>";
	//add the buttons to the slideshow.
	this.ss.innerHTML += buttons_str;
	/* END Default elements*/

	//create private members for easier to work with
	var arrows = this.ss.querySelectorAll(".buttons > .arrows > *");
	var dots = this.ss.querySelectorAll(".buttons .dot");
	var imageContainers = this.ss.querySelectorAll(".image");
	var images = this.ss.querySelectorAll(".image > div > img");

	//create methods for later use
	this.getCurrentDirection = function () {
		/* gets the current direction of the slide. (Actually the clicked direction, because the images move to the opposite direction)
		Can only be used before the img-move-<direction> class gets removed
		Which also means that he img-move-<direction> class must be removed last*/
		if (imageContainers[1].className.indexOf("img-move-right") != -1){
			//if the imageContainer has the class "img-move-right", then returns "right"
			return "right";
		}
		else if (imageContainers[1].className.indexOf("img-move-left") != -1){
			//if the imageContainer has the class "img-move-left", then returns "left"
			return "left";
		}
		else return ""; //else, the slideshow is not moving
	}
	this.getCurrentIndex = function () {
		/* gets the current index of the image according to the imageList of the visible imageContainer
		While the containers are moving, this method will return that index of the image of the
		containter which will come to the visible area.
		*/
		//gets the direction
		var currentDirection = this.getCurrentDirection();
		//if it is not moving, then imageContainer[1] is the visible container
		//if clicked to the left (image moved to right), then imageContainer[0] is visible
		//if clicked to the right (image moved to left), then imageContainer[2] is visible
		var img = currentDirection == "" ? 1 : currentDirection == "left" ? 0 : 2;
		//return the index of that image in the imageList
		return this.imageList.indexOf(imageContainers[img].querySelector("div > img").getAttribute("src"));
	}
	this.getCurrentContainer = function() {
		/*returns the index of the visible container*/
		var direction = this.getCurrentDirection();
		//if the containers has moved to the right, then the visible container index is 0
		if (direction == "left")
			return 0;
		else if (direction == "right") // if containers moved to left, then it is 2
			return 2;
		else return 1; //if the container didn't move, then the middle one is the visible one.
	}
	this.changeToThisDot = function(dot) {
		//dot is the element with the class dot
		//remove class "selected" away from all dot-elements
		this.ss.querySelector(".dot.selected").classList.remove("selected");
		//add class "selected" to the specified class.
		dot.classList.add("selected");
	}
	this.moveImage = function(direction) {
		/*moves the image to the desired direction (actually the opposite,
		  but it is the css that does this opposite job)*/
		//add the move-class to all the imageContainers
		for (let i = 0; i < 3; i++)
			imageContainers[i].classList.add("img-move-" + direction);
		/*since the image is already moving, the getCurrentIndex() will return the
		index of the image that will soon come to the middle.*/
		var index = this.getCurrentIndex();
		//change the dot
		this.changeToThisDot(dots[index]);
	}
	this.moveImageToIndex = function(index){
		//move the imageContainers to the desired index. Index in this context means the index of the imageList
		//get the current index
		var currentIndex = this.getCurrentIndex();
		//don't move when the desired index is the same as the current one.
		if (currentIndex == index)
			console.log("no moving desired");
		else {
			/*if the current is less than the desired one then, change the right imageContainer to the desired image.
			Else, change the left imageContainer to the desired image. This make sure that the desired image will show up when the image starts moving.
			*/
			//n is the which image (left or right) to change to the desired image.
			var n = currentIndex < index ? 2 : 0;
			//set the direction to nothing for later use
			var direction = n == 2 ? "right" : "left";
			//change the alt text and src of the image
			images[n].alt = this.altList[index];
			images[n].src = this.imageList[index];
			/* move the imageContainers to the direction, so that the css animation could start */
			this.moveImage(direction); //this automatically changes the dots
		}
	}
	this.moveImageTransitionend = function() {
		/* this method moves the imageContainers back to where they are
		in order to do it beautifully, it has to CHANGE the image of the imageContainer[1]
		which will soon jump back to the center, TO the image of the current visible image.
		After that, it has to change the images of imageContainer[0] and imageContainer[2] to
		the images adjacent to the index of the image in imageContainer[1]*/

		//get the current visible imageContainer
		var currentContainer = this.getCurrentContainer();
		//make the imageContainers[1] have the same elements as the currentContainer
		imageContainers[1].innerHTML = imageContainers[currentContainer].innerHTML;
		//move all imageContainers back to place by removing the class "img-move-<direction>"
		var direction = this.getCurrentDirection();
		for (let i = 0; i < 3; i++)
			imageContainers[i].classList.remove("img-move-"+direction);
		//change the src of the images to the left and right. We already know that the one in the middle is correct
		//get the index of the image in the middle according to the imageList
		var index = this.getCurrentIndex();
		//loop two times, i=0 and i=2. And the change the src and alt according to the index.
		//left img should have src of index - 1, and right img should have src of index + 1
		for (let i = 0, l = this.imageList.length; i < 3; i+=2){
			images[i].alt = this.altList[(( i - 1 + index)%l + l)%l];
			images[i].src = this.imageList[(( i - 1 + index)%l + l)%l];
		}
	}

	console.log("it is working");
	/*inside addEventListeners, "this" changes to that specific element listening for events.
	so i have to store this in that for later use*/
    var that = this;
    if (this.description != ""){ //if a description is wanted
    	//create new methods for later use
		this.loadFileToElement = function(filepath, element){
			//make a request for a file by the filepath
			var xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200){
					//when the file is ready without errors
					//put the retrieved text into the element
					element.innerHTML = this.responseText;
					//console.log(element.querySelector('title').innerHTML);
				}
			};
			xhttp.open("GET", filepath, true);
			xhttp.send();
		}
		//add 3 description containers as innerHTML
		var desc_str = "";
		for (let i = 0; i < 3; i++)
			desc_str += '<div class="desc desc' + i + '"><div><div class="article"></div><a href>Les mer</a></div></div>';
		//add them to the description element
		this.description.innerHTML += desc_str;

		//create new private members for easier to work with
		descContainers = this.description.querySelectorAll(".desc");
		seeMores = this.description.querySelectorAll(".article + a");
		articles = this.description.querySelectorAll(".article");
		//load the articles according to the index, and change the links
		for (let i = 0; i < 3; i++){
			let l = this.descList.length, n = ((i-1)%l+l)%l;
			//the "see more" links also need to be changed.
			seeMores[i].href = this.linkList[n];
			//load the article by the loadFileToElement method
			this.loadFileToElement(this.descList[n], articles[i]);
		}
		this.moveDesc = function(direction) {
			/* serves the same purpose as the moveImage() method
			, but just for the description*/
			for (let i = 0; i < 3; i++)
				descContainers[i].classList.add("desc-move-" + direction);
			//the difference is that this method doesn't change the dots, since the moveImage() already does this work
		}
		this.moveDescToIndex = function(index){
			// serves the same purpose as the moveImageToIndex() method, but only for description
			var currentIndex = this.getCurrentIndex();
			var desiredDirection = "";
			var direction = "";
			if (currentIndex == index) { //don't move when pressing the same index dot
				//console.log("no moving desired");
			}
			else if (currentIndex < index) {
				// load the file and put it into the description.
				this.loadFileToElement(this.descList[index], articles[2]); //right desc changes the content
				//change the link to match the description
				seeMores[2].href = this.linkList[index]; //change the link of the right desc
				direction = "right";
			}
			else {
				// load the file and put it into the description.
				this.loadFileToElement(this.descList[index], articles[0]); //left desc changes the content
				//change the link to match the description
				seeMores[0].href = this.linkList[index]; //change the link of the left desc
				direction = "left";
			}
			// add the animation class to the descContainers by calling this method
			this.moveDesc(direction);
		}
		this.moveDescTransitionend = function() {
			// serves the same purpose as the moveImageTransitionend() method, but only for description
			var currentContainer = this.getCurrentContainer();
			descContainers[1].innerHTML = descContainers[currentContainer].innerHTML;
			//move all desc back to place
			var direction = this.getCurrentDirection();
			for (let i = 0; i < 3; i++)
				descContainers[i].classList.remove("desc-move-"+direction);
			//change the innerHTML back to the correct ones
			var index = this.getCurrentIndex();
			for (let i = 0, l = this.descList.length; i < 3; i+=2){
				//store (( i - 1 + index)%l + l)%l for effectiveness
				let n = (( i - 1 + index)%l + l)%l;
				//load the files into the descriptions.
				this.loadFileToElement(this.descList[n], articles[i]);
				//also change the links to the correct ones
				seeMores[i].href = this.linkList[n]
			}
		}
		//listen to the click of the left arrow button
		arrows[0].addEventListener('click', function() {
			//if the images are not moving
			if (that.getCurrentDirection() == ""){
				//move the descriptions and images to left
				that.moveDesc("left");
				that.moveImage("left");
			}
			//if the images are already moving, then presseing this button will do nothing
		});
		//listen to the click of the right arrow button
		arrows[1].addEventListener('click', function() {
			//if the images are not moving
			if (that.getCurrentDirection() == ""){
				//move the descriptions and images to right
				that.moveDesc("right");
				that.moveImage("right");
			}
			//if the images are already moving, then presseing this button will do nothing
		});

		//when the middle imageContainer stops after a moving
		imageContainers[1].addEventListener("transitionend", function() {
			//run the methods special made for this event
			that.moveDescTransitionend();
			that.moveImageTransitionend();
		});

		//loop through all the dots and listen to the click event of each of them.
		for (let i = 0; i < dots.length; i++){
			dots[i].addEventListener('click', function(){
				//if the images are not moving
				if (that.getCurrentDirection() == ""){
					//move the images and description containers to the specific index of the dot
					that.moveDescToIndex(i);
					that.moveImageToIndex(i);
				}
				//if the images are already moving, then presseing these dot-buttons will do nothing
			});
		}
	}
	else {	//if only slideshow
		//listen to the click of the left arrow button
		arrows[0].addEventListener('click', function() {
			//if the images are not moving
			if (that.getCurrentDirection() == ""){
				//move the images to left
				that.moveImage("left");
			}
			//if the images are already moving, then presseing this button will do nothing
		});
		//listen to the click of the right arrow button
		arrows[1].addEventListener('click', function() {
			//if the images are not moving
			if (that.getCurrentDirection() == ""){
				//move the images to right
				that.moveImage("right");
			}
			//if the images are already moving, then presseing this button will do nothing
		});

		//when the middle imageContainer stops after a moving
		imageContainers[1].addEventListener("transitionend", function() {
			//run the method special made for this event
			that.moveImageTransitionend();
		});

		//loop through all the dots and listen to the click event of each of them.
		for (let i = 0; i < dots.length; i++){
			dots[i].addEventListener('click', function(){
				//if the images are not moving
				if (that.getCurrentDirection(imageContainers[1]) == ""){
					//move the images to the specific index of the dot
					that.moveImageToIndex(i);
				}
				//if the images are already moving, then presseing these dot-buttons will do nothing
			});
		}
	}
}


	/*
Here is the code I made, and then I changed the slideshow to an object instead.
Because too many global functions are bad practice.



function main() {
	add_images(slideshow1, 3, slideshow1_image_list)
	add_buttons(slideshow1, slides.length);


	var slideshow1_arrows = slideshow1.querySelectorAll(".buttons > .arrows > *");
	var slideshow1_dots = slideshow1.querySelectorAll(".buttons .dot");
	slideshow1_arrows[0].addEventListener('click', function(){
		if (getCurrentDirection(slideshow1.querySelector(".image")) == ""){
			move_image(slideshow1, "left");
			slideshow1_description.innerHTML = slideshow1_description_xml_list[0];
			loadFile(slideshow1_description, slideshow1_description_xml_list[0]);
		}
	});

	slideshow1_arrows[1].addEventListener('click', function(){
		if (getCurrentDirection(slideshow1.querySelector(".image")) == ""){
			move_image(slideshow1, "right");
		}
	});

	slideshow1.querySelector(".image").addEventListener("transitionend", function(){
		move_image_transitionend(slideshow1, slideshow1_image_list);
	})

	for (let i = 0; i < slideshow1_dots.length; i++){
		slideshow1_dots[i].addEventListener('click', function(){
			if (getCurrentDirection(slideshow1.querySelector(".image")) == ""){
				change_dot(slideshow1, this); //this = slideshow1_dots[i]
				move_image_to_index(slideshow1, slideshow1_image_list, i);
			}
		});
	}
}
	*/

/*
function add_images(slideshow, amount, image_list){
	var image_str = "";
	for (let i = 0; i < amount; i++){
		let l = image_list.length;
		image_str += '<div class="image img' + i + '"><div><img src="' +
		image_list[((i-1)%l+l)%l] + '"></div></div>';
	}
	slideshow.innerHTML += image_str;
}

function add_buttons(slideshow, amount){
	var buttons = document.createElement("div");
	buttons.className = "buttons";
	buttons.innerHTML = `
	<div class="arrows wrapper-valign-center">
		<div class="prev">
			<img src="buttons/arrow_prev.svg">
		</div>
		<div class="next">
			<img src="buttons/arrow_next.svg">
		</div>
	</div>`;
	var dots_string = '<div class="dots"><div><div class="dot selected"></div>'
	for(let i = 1; i < amount; i++) dots_string += '<div class="dot"></div>';
	buttons.innerHTML += dots_string;
	slideshow.appendChild(buttons);
}


function change_dot(slideshow, dot){
	slideshow.querySelector(".dot.selected").classList.remove("selected");
	dot.classList.add("selected");
}

function move_image_transitionend(slideshow, image_list){
	var imageContainers = slideshow.querySelectorAll(".image");
	var direction = getCurrentDirection(imageContainers[1]);
	var current_index;
	if (direction == "left")
		current_index = image_list.indexOf(imageContainers[0].querySelector("div > img").getAttribute("src"));
	else
		current_index = image_list.indexOf(imageContainers[2].querySelector("div > img").getAttribute("src"));
	change_image_to_index(slideshow, image_list, current_index);
	for (let i = 0; i < imageContainers.length; i++){
		imageContainers[i].classList.remove("img-move-"+direction);
	}
}

function move_image(slideshow, direction){
	var imageContainers = slideshow.querySelectorAll(".image");
	var currentDirection = getCurrentDirection(imageContainers[1]);
	if (currentDirection != "")
		return -1
	for (let i = 0; i < imageContainers.length; i++){
		imageContainers[i].classList.add("img-move-" + direction);
	}
	var dots = slideshow.querySelectorAll(".dot");
	var step = direction == "left" ? -1 : 1;
	let l = dots.length;
	for (let i = 0; i < l; i++){
		if (dots[i].className.indexOf("selected") != -1){
			dots[i].classList.remove("selected");
			dots[((i+step)%l+l)%l].classList.add("selected");
			break;
		}
	}
}*/
/*
function move_image_to_index(slideshow, image_list, index){
	var imageContainers = slideshow.querySelectorAll(".image");
	var images = slideshow.querySelectorAll(".image > div > img");
	var current_index = image_list.indexOf(images[1].getAttribute("src"));
	if (current_index == -1)
		console.log("Cannot find img0 in image_list[]");
	var direction = "";
	if (current_index == index) //don't move when pressing the same index dot
		return -1;
	else if (current_index < index) {
		images[2].src = image_list[index];
		direction = "right";
	}
	else {
		images[0].src = image_list[index];
		direction = "left";
	}
	images = slideshow.querySelectorAll(".image");
	for (let i = 0; i < images.length; i++){
		images[i].classList.add("img-move-" + direction);
	}
}

function change_image_to_index(slideshow, image_list, index){
	var images = slideshow.querySelectorAll(".image > div > img");
	var arr_img = [];
	let l = image_list.length;
	for (let i = 0; i < images.length; i++){
		arr_img[i] = image_list[(( i - 1 + index)%l + l)%l];
	}
	for (var i = -1; ++i < images.length; images[i].src = arr_img[i]);
}

function getCurrentDirection(imageContainer1){ //prevent moving both ways
	if (imageContainer1.className.indexOf("img-move-right") != -1)
		return "right";
	else if (imageContainer1.className.indexOf("img-move-left") != -1)
		return "left";
	else return "";
}
*/

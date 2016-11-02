//browser support from ie 10+ and all major browsers. Now, it doesnt work for ie, because template literals `` are used.


var urlStr = window.location.pathname;
var fileName = urlStr.substring(urlStr.lastIndexOf('/')+1, urlStr.length);
/*if (fileName.indexOf("indexOf") != 1){ */
if (fileName == "index.html" || fileName == ""){
	let slideshow = document.querySelector("#newsfeed-slideshow .slideshow");
	let description = document.querySelector("#newsfeed-slideshow .description");

	let imageRelativePath = "articles/images/";
	let descriptionRelativePath = "articles/texts/";
	let linkRelativePath = "articles/pages/"
	let slides = [
	{img:'1.jpg',desc:'1.xml', link:'1.html'},
	{img:'2.jpg',desc:'2.xml', link:'2.html'},
	{img:'3.jpg',desc:'3.xml', link:'3.html'},
	{img:'4.jpg',desc:'4.xml', link:'4.html'},
	{img:'5.jpg',desc:'5.xml', link:'5.html'}];

	let imageList = [];
	let descriptionList = [];
	let linkList = [];
	for (let i = 0; i < slides.length; i++){
		imageList[i] = imageRelativePath + slides[i].img
		descriptionList[i] = descriptionRelativePath + slides[i].desc;
		linkList[i] = linkRelativePath + slides[i].link;
	}

	let ss1 = new Slideshow(slideshow, imageList, description, descriptionList, linkList);

}
else if (fileName == "galleri.html"){
	let slideshow = document.querySelector("#gallery1 .slideshow");
	let imageRelativePath = "articles/images/";
	let imageList = ["1.jpg","2.jpg","3.jpg","4.jpg","5.jpg","6.jpg"];

	for (let i = 0; i < imageList.length; i++){
		imageList[i] = imageRelativePath + imageList[i];
	}
	let ss = new Slideshow(slideshow, imageList);
}




/*-------------------*/
/* GENERAL FUNCTIONS */
/*-------------------*/


function Slideshow(slideshow, imageList, description, descList, linkList){  //descList is optional
	this.ss = slideshow;
	this.imageList = imageList;
	this.description = description || "";
	this.descList = descList || "";
	this.linkList = linkList || "";

	//a little error handling
	if (this.description != "" || this.descList != "" || this.linkList != ""){
		if (this.description == "")
			console.log("ERROR, missing description-element");
		if (this.descList == "")
			console.log("ERROR, missing description list");
		if (this.linkList == "")
			console.log("ERROR, missing link list");
	}

	/* START Default elements */
	var image_str = "";
	for (let i = 0; i < 3; i++){
		let l = this.imageList.length;
		image_str += '<div class="image img' + i + '"><div><img src="' +
		this.imageList[((i-1)%l+l)%l] + '"></div></div>';
	}
	this.ss.innerHTML += image_str;
	var buttons_str = `<div class="buttons">
	<div class="arrows wrapper-valign-center">
		<div class="prev">
			<img src="buttons/arrow_prev.svg">
		</div>
		<div class="next">
			<img src="buttons/arrow_next.svg">
		</div>
	</div>`;
	var dots_string = '<div class="dots"><div><div class="dot selected"></div>'
	for(let i = 1; i < this.imageList.length; i++) dots_string += '<div class="dot"></div>';
	buttons_str += dots_string + "</div></div></div>"
	this.ss.innerHTML += buttons_str;

	/* END Default elements*/

	this.arrows = this.ss.querySelectorAll(".buttons > .arrows > *");
	this.dots = this.ss.querySelectorAll(".buttons .dot");
	this.imageContainers = this.ss.querySelectorAll(".image");
	this.images = this.ss.querySelectorAll(".image > div > img");


	this.getCurrentDirection = function () {
		if (this.imageContainers[1].className.indexOf("img-move-right") != -1)
			return "right";
		else if (this.imageContainers[1].className.indexOf("img-move-left") != -1)
			return "left";
		else return "";
	}
	this.getCurrentIndex = function () {
		var currentDirection = this.getCurrentDirection();
		var img = currentDirection == "" ? 1 : currentDirection == "left" ? 0 : 2;
		return this.imageList.indexOf(this.imageContainers[img].querySelector("div > img").getAttribute("src"));
	}
	this.moveImage = function(direction) {
		for (let i = 0; i < this.imageContainers.length; i++)
			this.imageContainers[i].classList.add("img-move-" + direction);
		var step = direction == "left" ? -1 : 1;
		for (let i = 0, l = this.dots.length; i < l; i++){ //need improvements!!!!!!!!!!!!!!!!!!!!!!
			if (this.dots[i].className.indexOf("selected") != -1){
				this.dots[i].classList.remove("selected");
				this.dots[((i+step)%l+l)%l].classList.add("selected");
				break;
			}
		}
	}
	this.moveImageToIndex = function(index){
		var currentIndex = this.getCurrentIndex();
		var desiredDirection = "";
		if (currentIndex == index){ //don't move when pressing the same index dot
			console.log("no movig desired");
			return -1;
		}
		else if (currentIndex < index) {
			this.images[2].src = this.imageList[index];
			direction = "right";
		}
		else {
			this.images[0].src = this.imageList[index];
			direction = "left";
		}
		for (let i = 0; i < this.imageContainers.length; i++)
			this.imageContainers[i].classList.add("img-move-" + direction);
	}
	this.changeImagesToMovedIndex = function() {
		var index = this.getCurrentIndex();
		var arr_img = [];
		for (let i = 0, l = this.imageList.length; i < this.images.length; i++)
			arr_img[i] = this.imageList[(( i - 1 + index)%l + l)%l];
		for (let i = -1; ++i < this.images.length; this.images[i].src = arr_img[i]);
	}
	this.moveImageTransitionend = function() {
		this.changeImagesToMovedIndex();
		var direction = this.getCurrentDirection();
		for (let i = 0; i < this.imageContainers.length; i++){
			this.imageContainers[i].classList.remove("img-move-"+direction);
		}
	}
	this.changeToThisDot = function(dot) {
		this.ss.querySelector(".dot.selected").classList.remove("selected");
		dot.classList.add("selected");
	}


	this.loadFileToElement = function(filepath, element){
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				element.innerHTML = this.responseText;
				console.log(element.querySelector("article title"));
			}
		};
		xhttp.open("GET", filepath, true);
		xhttp.send();
	}


    var that = this; //inside addEventListeners, "this" changes to that specific element listening for events

    if (this.description != "" && this.descList != ""){
		var desc_str = "";
		for (let i = 0; i < 3; i++){
			let l = this.descList.length;
			desc_str += '<div class="desc desc' + i + '"><div><div class="article"></div><a href>Les mer</a></div></div>';
		}
		this.description.innerHTML += desc_str;
		this.descContainers = this.description.querySelectorAll(".desc");
		this.seeMores = this.description.querySelectorAll(".article + a");
		this.articles = this.description.querySelectorAll(".article");
		//load the descs...
		for (let i = 0; i < 3; i++){
			let l = this.descList.length;
			this.seeMores[i].href = this.linkList[((i-1)%l+l)%l];
			this.loadFileToElement(this.descList[((i-1)%l+l)%l], this.articles[i]);
		}

		this.getCurrentContainer = function() {
			var direction = this.getCurrentDirection();
			if (direction == "left")
				return 0;
			else if (direction == "right")
				return 2;
			else return 1;
		}
		this.moveDescToIndex = function(index){
			var currentIndex = this.getCurrentIndex();
			var desiredDirection = "";
			if (currentIndex == index){ //don't move when pressing the same index dot
				console.log("no movig desired");
				return -1;
			}
			else if (currentIndex < index) {
				this.loadFileToElement(this.descList[index], this.articles[2]);
				direction = "right";
			}
			else {
				this.loadFileToElement(this.descList[index], this.articles[0]);
				direction = "left";
			}
			for (let i = 0; i < 3; i++)
				this.descContainers[i].classList.add("desc-move-" + direction);
		}
		this.moveDesc = function(direction) {
			for (let i = 0; i < 3; i++)
				this.descContainers[i].classList.add("desc-move-" + direction);
		}
		this.changeDescriptionToMovedIndex = function() {
			var currentContainer = this.getCurrentContainer();
			this.descContainers[1].innerHTML = this.descContainers[currentContainer].innerHTML;
			//move all desc back to place
			var direction = this.getCurrentDirection();
			for (let i = 0; i < 3; i++)
				this.descContainers[i].classList.remove("desc-move-"+direction);
			//change the innerHTML back to the correct ones
			var index = this.getCurrentIndex();
			var arr_filename = [];
			for (let i = 0, l = this.descList.length; i < 3; i++)
				arr_filename[i] = this.descList[(( i - 1 + index)%l + l)%l];
			for (let i = 0; i < 3; i++)
				this.loadFileToElement(arr_filename[i], this.articles[i]);
		}

		this.arrows[0].addEventListener('click', function() {
			this.moving = "left";
			if (that.getCurrentDirection() == ""){
				that.moveDesc("left");
				that.moveImage("left");
			}
		});
		this.arrows[1].addEventListener('click', function() {
			if (that.getCurrentDirection() == ""){
				that.moveDesc("right");
				that.moveImage("right");
			}
		});

		this.imageContainers[1].addEventListener("transitionend", function() {
			that.changeDescriptionToMovedIndex();
			that.moveImageTransitionend();
		});
		for (let i = 0; i < this.dots.length; i++){
			this.dots[i].addEventListener('click', function(){
				if (that.getCurrentDirection(that.imageContainers[1]) == ""){
					that.changeToThisDot(this); //this = that.dots[i]
					that.moveDescToIndex(i);
					that.moveImageToIndex(i);
				}
			});
		}
	}
	else {
		this.arrows[0].addEventListener('click', function() {
			if (that.getCurrentDirection() == "")
				that.moveImage("left");
		});
		this.arrows[1].addEventListener('click', function() {
			if (that.getCurrentDirection() == "")
				that.moveImage("right");
		});
		this.imageContainers[1].addEventListener("transitionend", function() {
			that.moveImageTransitionend();
		});

		for (let i = 0; i < this.dots.length; i++){
			this.dots[i].addEventListener('click', function(){
				if (that.getCurrentDirection(that.imageContainers[1]) == ""){
					that.changeToThisDot(this); //this = that.dots[i]
					that.moveImageToIndex(i);
				}
			});
		}
	}
}


	/*
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
}*/


var actualWidth, drawnHeight;
var theMolecule; //this keeps a memory of the molecule typed just in case.
var countOfInstruction = 0, waiting = 0;
window.addEventListener("load", giveWidth);
window.addEventListener("load", giveHeight);
window.addEventListener("load", setWidth);
window.addEventListener("load", setHeight);
//window.addEventListener("load", loadUpData);
window.addEventListener("load", function(){
	setTimeout(function(){
		data = temp;
		dataOnSiteKeys = Object.keys(data.onSite);
		dataToAddKeys = Object.keys(data.toAdd);
	}, 10);
});
window.addEventListener("resize", giveWidth);
window.addEventListener("scroll", displayBackTo);
function giveWidth(){
	actualWidth = document.getElementById("drawingSpace").offsetWidth;
	// console.log(actualWidth); 
	if (theMolecule){
		displayMolecule(theMolecule);
	}
} //This function generates the right viewbox when an element is called on the input.
function giveHeight(){drawnHeight = document.getElementById("drawingSpace").offsetHeight;}
function setWidth(){ var units = (5/8)*actualWidth; document.getElementById("drawingSpace").innerHTML = "<svg viewbox ='0 0 "+units+" 200' id='drawn'></svg>";}
function setHeight(){
	var accessIt = document.getElementById("smallDisplay");
	accessIt.innerHTML = "...Molecule...";
	var actualHeight = (accessIt.offsetHeight+30).toString()+"px";
	accessIt.innerHTML = "";
	accessIt.style.minHeight = actualHeight;
	accessIt.style.lineHeight = actualHeight;
}
var jsonFile, data, dataOnSiteKeys, dataToAddKeys, temp;
/*function ajaxCall(){
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function(){
		if (this.readyState == 4 && this.status == 200) {
			jsonFile = this.responseText;
			console.log("SUCCESS");
		}
	}
	xhttp.open("GET", "data.json", true);
	xhttp.send();
}
function loadUpData(){
	ajaxCall();
	setTimeout(function(){
		data = JSON.parse(jsonFile);
		dataOnSiteKeys = Object.keys(data.onSite);
		dataToAddKeys = Object.keys(data.toAdd);
		console.log("data saved");
	}, 100);
}*/
//https://developers.google.com/speed/docs/insights/v2/reference/ 
//https://gtmetrix.com/reports/robertvunabandi.github.io/6aWjwGTq
//https://tools.pingdom.com/#!/dmRMo5/https://robertvunabandi.github.io/shape-lewis/
//CHECK THAT WEBSITE FOR SPEED
$.ajax({
	url: 'data.json',
	dataType: 'json',
	async: false,
	cache: false,
	success: function (data, status){temp = data; console.log(status);},
	error: function (xhr, textStatus, err){console.log(xhr); console.log(textStatus);}
});
function displayBackTo(){
	var element = document.getElementById("backTo"); var scrollTop = document.body.scrollTop; var op = 0;
	if (scrollTop > 650){ element.style.opacity = 1; element.style.display = "block";
	} else {element.style.opacity = 0;setTimeout(function(){element.style.display = "none";}, 300);}
}
function instruction(){
	if (countOfInstruction <= 25){
		if (waiting % 3 == 0){
			var instruct = document.createElement("pre");
			instruct.setAttribute("id","instructions"); instruct.appendChild(document.createTextNode(". . . Click here to clear content . . ."));
			// var identif = document.getElementById("instructions");
			document.getElementById("drawingSpace").appendChild(instruct);
			fade(instruct);
		}
		countOfInstruction++; waiting++;
	}
}
function fade(element) {
	//This function is taken from http://stackoverflow.com/questions/6121203/how-to-do-fade-in-and-fade-out-with-javascript-and-css
    var op = 1;  // initial opacity
    var timer = setInterval(function () {
        if (op <= 0.01){ //modified from 0.1 to 0.01
            clearInterval(timer); element.style.display = 'none';
        }
        element.style.opacity = op; element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.05; //modified from .01 to 0.05.
    }, 100); //modified from 50 to 100.
}
window.mobilecheck = function() { 
	//This function is taken from http://detectmobilebrowsers.com/ 
	// and fromhttp://stackoverflow.com/questions/11381673/detecting-a-mobile-browser
	var check = false;
	(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
	return check;
};
function detectBrowser(){
	var browser = {chrome: false, ie:false, opera: false, safari: false};
	if (navigator.userAgent.indexOf('Chrome/') != -1) browser.chrome = true;
	if (navigator.userAgent.indexOf('MSIE/') != -1 || (!!document.documentMode == true )) browser.ie = true;
	if ((!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf('OPR/') != -1 || navigator.userAgent.indexOf("Opera") != -1 ) browser.opera = true;
	if (navigator.userAgent.indexOf('Safari/') != -1) browser.safari = true;
	if (browser.chrome == false && browser.ie == false && browser.opera == false && browser.safari == false) return "unknown browser";
	return browser;
	//Safari: safari only
	//Chrome: chrome || chrome & safari
	//Opera: opera || opera & chrome || opera & chrome & safari
	//IE: ie || ie & safari (?)
} //This function returns true for browsers that apply. 
//--------------------------------------------------------------------------------------------------
//Below here are all the specific functions working in the background.
//These need to be implemented for different browsers and different screen sizes.
var twoLetSplit = 32, oneLetSplit = 25;
function element(element, location){
	//This location works in px! This is where the top left corner of an uppercase letter would be.
	// var location = recognizeLineDirection(location);
	var units = (8/5);
	var xCorrection = 0, yCorrection = 4.7;
	var x = (location[0]*units) - (xCorrection*units), y = (location[1]*units) - (yCorrection*units);
	if (element === "-"){
		var append = "<span style='position: absolute; color: rgba(255,50,50,0.9); font-size: 28px; left:"+(x)+"px; top: "+(y)+"px;'>"+element+"</span>";
	} else if (element === "+"){
		var append = "<span style='position: absolute; color: rgba(50,100,255,0.9); font-size: 28px; left:"+(x)+"px; top: "+(y)+"px;'>"+element+"</span>";
	}
	else var append = "<span style='position: absolute; font-size: 28px; left:"+(x)+"px; top: "+(y)+"px;'>"+element+"</span>";
	document.getElementById("drawingSpace").innerHTML += append;
}
function nElements(listOfElements, locations){
	var j = 0;
	for (var i = 0; i < listOfElements.length; i++){
		element(listOfElements[i], [locations[j],locations[j+1]]);
		j+=2;
	}
}
//------------------------------------------------------------------------------------------------------
//DOTS
function dot(location){
	var x = location[0], y = location[1];
	var append = "<circle cx='"+x+"' cy='"+y+"' r='1.25' stroke='black' stroke-width='1' fill='black' />";
	document.getElementById("drawn").innerHTML += append;
}
function twoVDots(locationArray) {
	var x = locationArray[0], y2 = locationArray[1] + 8;
	dot(locationArray);
	dot([x,y2]);
}
function twoHDots(locationArray) {
	var x2 = locationArray[0] + 8, y = locationArray[1];
	dot(locationArray);
	dot([x2,y]);
}
function twoTDots(locationArray, angle){
	var angle = angle*(Math.PI/180);
	var xChange = 8*Math.cos(angle);
	var yChange = 8*Math.sin(angle);
	var x = locationArray[0]+xChange, y = locationArray[1] + yChange;
	dot(locationArray);
	dot([x,y]);
}
function fourVDots(locationArray){
	twoHDots(locationArray);
	var v1 = locationArray[0];
	// if (twoLetters == true) var v2 = locationArray[1]+twoLetSplit;
	var v2 = locationArray[1]+oneLetSplit;
	var newLocation = [v1, v2];
	twoHDots(newLocation);
} //Here, the locationArray refers to the top left dot. HDots goes two H on top, two H on bottom.
function fourHDots(locationArray, twoLetters){
	twoVDots(locationArray);
	if (twoLetters == true) var v1 = locationArray[0]+twoLetSplit;
	else var v1 = locationArray[0]+oneLetSplit;
	var v2 = locationArray[1];
	var newLocation = [v1, v2];
	twoVDots(newLocation);
} //Here, the locationArray refers to the top left dot. VDots goes two V on top, two V on bottom.
function sixDots(locationArray, sideNone, twoLetters){ //locationArray is the location of the top left dot.
	//twoLetters is a boolean!
	switch (sideNone){
		case "top":
			fourHDots(locationArray, twoLetters);
			if (twoLetters == true) var change = twoLetSplit/2;
			else var change = oneLetSplit/2;
			var yChange = oneLetSplit/2;
			var x = locationArray[0], y = locationArray[1];
			x = x + change - 4; y = y + 4 + yChange;
			twoHDots([x,y]);
		break;
		case "bottom":
			fourHDots(locationArray, twoLetters);
			if (twoLetters == true) var change = twoLetSplit/2;
			else var change = oneLetSplit/2;
			var yChange = oneLetSplit/2;
			var x = locationArray[0], y = locationArray[1];
			x = x + change - 4; y = y + 4 - yChange;
			twoHDots([x,y]);
		break;
		case "right":
			fourVDots(locationArray);
			if (twoLetters == true) var change = twoLetSplit/2;
			else var change = oneLetSplit/2;
			var yChange = oneLetSplit/2;
			var x = locationArray[0], y = locationArray[1];
			x = x + 4 - change; y = y + yChange - 4;
			twoVDots([x,y]);
		break;
		case "left":
			fourVDots(locationArray);
			if (twoLetters == true) var change = twoLetSplit/2;
			else var change = oneLetSplit/2;
			var yChange = oneLetSplit/2;
			var x = locationArray[0], y = locationArray[1];
			x = x + 4 + change; y = y + yChange - 4;
			twoVDots([x,y]);
		break;
		default:
		break;
	}
}//Here, the location Array refers to the one it'd be on any of the four*Dots fxns.
//------------------------------------------------------------------------------------------------------
//LINES
function line(direction){
	// var newDir = recognizeLineDirection(direction);
	var x1 = direction[0], y1 = direction[1], x2 = direction[2], y2 = direction[3];
	var append = "<line x1='"+x1+"' y1='"+y1+"' x2='"+x2+"' y2='"+y2+"' stroke-width='0.5' stroke='black'/>";
	document.getElementById("drawn").innerHTML += append;
} // I might not use this function anymore, so I might get rid of it.
function lineDash(direction){
	// var newDir = recognizeLineDirection(direction);
	var x1 = direction[0], y1 = direction[1], x2 = direction[2], y2 = direction[3];
	var append = "<line stroke-dasharray='3, 3' x1='"+x1+"' y1='"+y1+"' x2='"+x2+"' y2='"+y2+"' stroke-width='0.5' stroke='black'/>";
	document.getElementById("drawn").innerHTML += append;
} // I might not use this function anymore, so I might get rid of it.
function nVLines(location, n){ //Vertical lines
	var x = parseInt(location[0]);
	var y = [parseInt(location[1])];
	var final = 2*n-2;
	for (var i = 0; i <= final; i++){
		if (i % 2 == 0){y.push(y[i]+30);}
		else {y.push(y[i]+35);} //one letter split = 35, two letters split = 45
	}
	var append = "";
	// console.log("Y:"+y); //THESE ARE TO BE REMOVED
	// console.log("MIDDLES Y:"+locateMiddles(y, true)); //THESE ARE TO BE REMOVED
	for (var j = 0; j <= final; j += 2){
		append += "<line x1='"+x+"' y1='"+y[j]+"' x2='"+x+"' y2='"+y[j+1]+"' stroke-width='0.5' stroke='black'/>";
	}
	// console.log("Length Y: "+(y[y.length - 1] - y[0]));
	// console.log("X-coord.:"+x);
	document.getElementById("drawn").innerHTML += append;
}
function nVLinesBonds(location, n, numberOfBonds){
	var xVal = location[0];
	switch (numberOfBonds){
		case 1:
			nVLines(location, n);
			break;
		case 2:
			location.shift();
			xVal -= 2.5;
			location.unshift(xVal);
			nVLines(location, n);
			location.shift();
			xVal += 5;
			location.unshift(xVal);
			nVLines(location, n);
			break;
		case 3:
			location.shift();
			xVal -= 4.0;
			location.unshift(xVal);
			nVLines(location, n);
			location.shift();
			xVal += 4.0;
			location.unshift(xVal);
			nVLines(location, n);
			location.shift();
			xVal += 4.0;
			location.unshift(xVal);
			nVLines(location, n);
			break;
		default:
			nVLines(location, n);
			break;
	}
}
function nHLines(location, n){ //Horizontal lines
	var x = [parseInt(location[0])];
	var y = parseInt(location[1]);
	var final = 2*n-2;
	for (var i = 0; i <= final; i++){
		if (i % 2 == 0){x.push(x[i]+30);}
		else {x.push(x[i]+35);}
	}
	var append = "";
	// console.log("X:"+x); //THESE ARE TO BE REMOVED
	// console.log("MIDDLES X:"+locateMiddles(x, true)); //THESE ARE TO BE REMOVED
	for (var j = 0; j <= final; j += 2){
		append += "<line x1='"+x[j]+"' y1='"+y+"' x2='"+x[j+1]+"' y2='"+y+"' stroke-width='0.5' stroke='black'/>";
	}
	// console.log("Length X:"+(x[x.length - 1] - x[0]));
	// console.log("Y-coord.:"+y);
	document.getElementById("drawn").innerHTML += append;
}
function nHLinesBonds(location, n, numberOfBonds){
	var yVal = location[1];
	switch (numberOfBonds){
		case 1:
			nHLines(location, n);
			break;
		case 2:
			location.pop();
			yVal -= 2.5;
			location.push(yVal);
			nHLines(location, n);
			location.pop();
			yVal += 5;
			location.push(yVal);
			nHLines(location, n);
			break;
		case 3:
			location.pop();
			yVal -= 4.0;
			location.push(yVal);
			nHLines(location, n);
			location.pop();
			yVal += 4.0;
			location.push(yVal);
			nHLines(location, n);
			location.pop();
			yVal += 4.0;
			location.push(yVal);
			nHLines(location, n);
			break;
		default:
			nHLines(location, n);
			break;
	}
}
function nLSLinesH(location,n,initial){  //Line structure lines horizontal oriented
	//The initial variables helps to know if we start left right or right left
	//initial is a boolean
	var x = [parseInt(location[0])];
	var y = [parseInt(location[1])];
	var xChange = 30*Math.cos(Math.PI/6);
	var yChange = 15;
	var final = n-1;
	for (var i = 0; i <= final; i++){
		x.push(x[i]+xChange);
		if (i % 2 == 0) y.push(y[i]+yChange);
		else y.push(y[i]-yChange);
	}
	if (initial == false){
		x.shift();
		y.shift();
		xLength = x.length;
		for (i = 0; i < xLength; i++){
			x[i] -= xChange;
		}
		if (n % 2 == true){
			x.push(x[x.length - 1]+xChange);
			y.push(y[y.length - 1]-yChange);
		} else {
			x.push(x[x.length - 1]+xChange);
			y.push(y[y.length - 1]+yChange);
		}
	}
	var append = "";
	console.log("X:"+x); //THESE ARE TO BE REMOVED
	console.log("MIDDLES X:"+locateMiddles(x, true)); //THESE ARE TO BE REMOVED
	console.log("Y:"+y); //THESE ARE TO BE REMOVED
	console.log("MIDDLES Y:"+locateMiddles(y, true)); //THESE ARE TO BE REMOVED
	for (var j = 0; j <= final; j += 1){
		append += "<line x1='"+x[j]+"' y1='"+y[j]+"' x2='"+x[j+1]+"' y2='"+y[j+1]+"' stroke-width='0.5' stroke='black'/>";
	}
	// console.log("x:["+x+"]"); console.log("y:["+y+"]");
	document.getElementById("drawn").innerHTML += append;
}
function nLSLinesV(location,n,initial){  //Line structure lines vertical oriented
	//The initial variables helps to know if we start down up or up down
	//initial is a boolean
	var x = [parseInt(location[0])];
	var y = [parseInt(location[1])];
	var xChange = 15; //X and Y are Changed in here! (from nLSLinesH)
	var yChange = 30*Math.cos(Math.PI/6); //X and Y are Changed in here! (from nLSLinesH)
	var final = n-1;
	for (var i = 0; i <= final; i++){
		y.push(y[i]+yChange);
		if (i % 2 == 0) x.push(x[i]+xChange);
		else x.push(x[i]-xChange);
	}
	if (initial == false){
		x.shift();
		y.shift();
		yLength = y.length;
		for (i = 0; i < yLength; i++){
			y[i] -= yChange;
		}
		if (n % 2 == true){
			x.push(x[x.length - 1]-xChange);
			y.push(y[y.length - 1]+yChange);
		} else {
			x.push(x[x.length - 1]+xChange);
			y.push(y[y.length - 1]+yChange);
		}
	}
	var append = "";
	console.log("X:"+x); //THESE ARE TO BE REMOVED
	console.log("MIDDLES X:"+locateMiddles(x, true)); //THESE ARE TO BE REMOVED
	console.log("Y:"+y); //THESE ARE TO BE REMOVED
	console.log("MIDDLES Y:"+locateMiddles(y, true)); //THESE ARE TO BE REMOVED
	for (var j = 0; j <= final; j += 1){
		append += "<line x1='"+x[j]+"' y1='"+y[j]+"' x2='"+x[j+1]+"' y2='"+y[j+1]+"' stroke-width='0.5' stroke='black'/>";
	}
	// console.log("x:["+x+"]"); console.log("y:["+y+"]");
	document.getElementById("drawn").innerHTML += append;
}
/*function recognizeLineDirection(direction){
	var array = [];
	array = direction.split(")");
	array.pop();
	for (var i=0; i < array.length; i++){
		array[i] = array[i].replace(')', '');
		array[i] = array[i].replace('(', '');
		array[i] = array[i].replace('_', '');
	}
	return array;
} *///At some points, this will not be used anymore. We switching to arrays.
//------------------------------------------------------------------------------------------------------
//AID FUNCTIONS
function locateMiddles(array,oneVar){
	var result = [];
	if (oneVar == true){ //oneVar being true means that we only account for one variable, not both x and y
		if (array.length < 2) return console.log("Error...");
		var middle;
		for (var i=0; i < array.length - 1; i++){
			middle = (array[i]+array[i+1])/2;
			result.push(middle);
		}
	} else{
		if (array.length < 4) return console.log("Error...");
		var middleX, middleY;
		for (var i=0; i < array.length - 3; i+=2){
			middleX = (array[i]+array[i+2])/2;
			middleY = (array[i+1]+array[i+3])/2;
			result.push(middleX);
			result.push(middleY);
		}
	}
	return result;
	// console.log("WORKING ON IT");
} //THIS IS USED INSIDE FUNCTIONS
function fixName(nameOfMolecule){
	var i = 1;
	var regex;
	if (nameOfMolecule.indexOf("^(") != -1){
		var superscript = nameOfMolecule.slice((nameOfMolecule.indexOf("^(")+2),(nameOfMolecule.lastIndexOf(")")));
		nameOfMolecule = nameOfMolecule.replace(superscript, "<sup>"+superscript+"</sup>");
		nameOfMolecule = nameOfMolecule.replace(/\^\(|\)(?=\(\d)|\)(?!.)/g,"");
		//nameOfMolecule = nameOfMolecule.replace(")","");
		displayMolecule(nameOfMolecule);
		for (i; i < 10; i++){
			if (nameOfMolecule.indexOf(i) < nameOfMolecule.lastIndexOf("<")) {
				// regex = new RegExp(i+"+(?=[a-z])|"+i+"+(?=<sup>)|"+i+"+(?=\d*[a-z])", "gi"); 
				// regex = new RegExp(i+"(?=[1-9]*[a-z]+|[1-9]*<su)", "gi");
				regex = new RegExp(i+"(?!\\+|\\-)", "g");
				if (nameOfMolecule.match(regex) != null){
					if (nameOfMolecule.match(regex).length > 1) {
						nameOfMolecule = nameOfMolecule.replace(regex, "<sub>"+i+"</sub>");
					} else nameOfMolecule = nameOfMolecule.replace(i, "<sub>"+i+"</sub>");
				}
			}
		}
	}
	else {
		for (i = 1; i < 10; i++){
			regex = new RegExp(i, "g"); 
			if (nameOfMolecule.match(regex) != null){
				if (nameOfMolecule.match(regex).length > 1) {
					nameOfMolecule = nameOfMolecule.replace(regex, "<sub>"+i+"</sub>");
				} else nameOfMolecule = nameOfMolecule.replace(i, "<sub>"+i+"</sub>");
			}
		}
	}
	return nameOfMolecule;
}
function moleculeMatch(nameOfMolecule){
	//this is given that we have a way to access the database without jQuery
	//we use dataOnSiteKeys
	var result;
	var test = [], moleculeFinal = nameOfMolecule;
	if (/\d\d\-$|\d\d\+$/.test(nameOfMolecule)){
		nameOfMolecule = nameOfMolecule.replace(/[1-9]\-$|[1-9]\+$/g, "");
	}
	nameOfMolecule = nameOfMolecule.replace(/\+|\-|\^\(|\^[1-9]|\+\)|[1-9](?=\+\)|\-\))|\)$/g, "");

	var regex = new RegExp(nameOfMolecule, "i");
	for (x in dataOnSiteKeys){
		if (regex.test(dataOnSiteKeys[x]) == true) {
			test.push(dataOnSiteKeys[x]);
		}
	}
	if (test.length === 1){ //if it found only one match, then it must be it
		result = test[0];
		return result;
	} else {
		for (x in test){ //if it finds a perfect match, then it must be it
			if (moleculeFinal === test[x]){
				result = test[x]; return result;
			}
		}
		for (x in test){ //now we test both lowercase and uppercase
			if (moleculeFinal.toLowerCase() === test[x].toLowerCase()){
				result = test[x]; return result;
			} else if (moleculeFinal.toUpperCase() === test[x].toUpperCase()){
				result = test[x]; return result;
			}
		}
		for (x in test){ //take either the positive or negative ion, this one is tricky I am not sure it's always true
			if (/\+/.test(moleculeFinal) && /\+/.test(test[x])){
				result = test[x]; return result;
			} else if (/-/.test(moleculeFinal) && /-/.test(test[x])){
				result = test[x]; return result;
			}
		}
	}
	test.push("TYPED:" + moleculeFinal);
	return test;
}
function arrayMax(numArray) {return Math.max.apply(null, numArray);}
//--------------------------------------------------------------------------------------------------
//This right here is going to be the main function
//This also needs to be fixed for different browsers and stuffs.
function displayMolecule(molecule) {
	/*
	Data on molecules: http://php.scripts.psu.edu/djh300/cmpsc221/p3s11-pt-data.htm
	*/
	theMolecule = molecule;
	var linksToLineStructures = "links to line structures: <a href='https://en.wikipedia.org/wiki/Skeletal_formula'>Wikipedia</a>, <a href='http://chem.libretexts.org/Core/Organic_Chemistry/Fundamentals/Structure_of_Organic_Molecules'>Chemistry libretexts</a>, and <a href='http://catalog.flatworldknowledge.com/bookhub/reader/2547?e=gob-ch12_s04'> catalog flatworldknowledge</a>.";
	var linksToResonance = "links to resonance strucutres: <a href='https://en.wikipedia.org/wiki/Resonance_(chemistry)'>Wikipedia</a>, <a href='http://www.chem.ucla.edu/~harding/tutorials/resonance/draw_res_str.html'>Chem.ucla</a>.";
	var sDChange = document.getElementById("smallDisplay");
	var bDChange = document.getElementById("bigDisplay");
	var dSChange = document.getElementById("drawingSpace");
	var height = (dSChange.offsetHeight)*(200/drawnHeight); //console.log(height);
	var units = (5/8)*actualWidth;
	var initialValueOfDS = "<svg viewbox ='0 0 "+units+" 200' id='drawn'></svg>";
	/*function carbonCompounds(molecule){
		//As of right now, this only involves C, H, O
		var base = ["meth","eth","prop","but","pent","hex","hept","oct","non","dec"]; //length 9
		var base10 = ["un","do","tri","tetra","penta","hexa","hepta","octa","nona"]; //length 8
		var length = molecule.length;
		dSChange.innerHTML = initialValueOfDS;
		switch (length){
			case "2":
		}
		sDChange.innerHTML = "SOMETHING";
		bDChange.innerHTML = "";
	}*/
	function grid(hor,nHor,shiftY,SX,DX,ver,nVer,shiftX,SY, DY,dupY,shiftDup){
		/*
		ADD THIS LATER: ,dupYs,shiftDupYsX. In case we want to duplicate the Y's (like C2N4)
		This will draw the lines needed. This requires calling inX and inY before the switch.
		Initially, we can call the inside. (as done)
		DX = {d: true, all:true, pos:[]}	//example of DX
		*/
		var inX = (units/2), inY = (height/2);
		var shift, stShift = 65;
		if (hor){
			if (nHor % 2 == 0) {shift = -47.5;} else {shift = -15;}
			if (nHor > 2) {
				if (nHor % 2 == 0) shift = shift - 65*(nHor-2)/2; else shift = shift - 65*(nHor-1)/2;
			}
			if (DX.d){
				if (DX.all) nHLinesBonds([inX+shift+SX,inY+shiftY], nHor, 2);
				else {
					var j = 1, logs = nHor;
					for (var i = 0; i < DX.pos.length; i++){
						do {
							if (DX.pos[i] > j){
								nHLinesBonds([inX+shift+SX,inY+shiftY], 1, 1); logs--; j++;
							} else if (DX.pos[i] == j){
								nHLinesBonds([inX+shift+SX,inY+shiftY], 1, 2); logs--; j++;
							}
							if (nHor % 2 == 0) {
								if (nHor = 2) shift = shift + 65*(nHor)/2;
								else if (nHor = 4) shift = shift + 65*(nHor-1)/2;
								else shift = shift + 65*(nHor-2)/2;
							}
							else {
								if (nHor = 3) shift = shift + 65*(nHor-1)/2; else shift = shift + 65*(nHor-2)/2;
							}
						} while (j !== DX.pos[i]+1);
						if (j > arrayMax(DX.pos)) { nHLinesBonds([inX+shift+SX,inY+shiftY], logs, 1); break;}
					}
				}
			}
			else nHLines([inX+shift+SX,inY+shiftY], nHor);
		}
		if (ver){
			if (nVer % 2 == 0) {shift = -47.5;} else {shift = -15;}
			if (nVer > 2) {
				if (nVer % 2 == 0) shift = shift - 65*(nVer-2)/2; else shift = shift - 65*(nVer-1)/2;
			}
			if (DY.d){
				if (DY.all) {
					if (dupY) {
						for (x in shiftDup){
							nVLinesBonds([inX+shiftX+shiftDup[x],inY+shift+SY], nVer, 2);
						}
					}
					nVLinesBonds([inX+shiftX,inY+shift+SY], nVer, 2);
				}
				else {
					var j = 1, logs = nVer;
					for (var i = 0; i < DY.pos.length; i++){
						do {
							if (DY.pos[i] > j){
								if (dupY) {
									for (x in shiftDup){
										nVLinesBonds([inX+shiftX+shiftDup[x],inY+shift+SY], 1, 1);
									}
								}
								nVLinesBonds([inX+shiftX,inY+shift+SY], 1, 1); logs--; j++;
							} else if (DY.pos[i] == j){
								if (dupY) {
									for (x in shiftDup){
										nVLinesBonds([inX+shiftX+shiftDup[x],inY+shift+SY], 1, 2);
									}
								}
								nVLinesBonds([inX+shiftX,inY+shift+SY], 1, 2); logs--; j++;
							}
							if (nVer % 2 == 0) {
								if (nVer = 2) shift = shift + 65*(nVer)/2;
								else if (nVer = 4) shift = shift + 65*(nVer-1)/2;
								else shift = shift + 65*(nVer-2)/2;
							}
							else {
								if (nVer = 3) shift = shift + 65*(nVer-1)/2; else shift = shift + 65*(nVer-2)/2;
							}
						} while (j !== DY.pos[i]+1);
						if (j > arrayMax(DY.pos)) {
							if (dupY) {
								for (x in shiftDup){
									nVLinesBonds([inX+shiftX+shiftDup[x],inY+shift+SY], logs, 1); 
								}
							}
							nVLinesBonds([inX+shiftX,inY+shift+SY], logs, 1); 
							break;
						}
					}
				}
			}
			else {
				if (dupY) {
					for (x in shiftDup){
						nVLines([inX+shiftX+shiftDup[x],inY+shift+SY], nVer);
					}
				}
				nVLines([inX+shiftX,inY+shift+SY], nVer);
			}
		}
	}
	//inX - 3 - 35, inY - 3.5, Opera, Safari
	//
	function initialize(){dSChange.innerHTML = initialValueOfDS;}
	var molec;
	function finalize(){
		molec = moleculeMatch(molecule);
		var result = fixName(molec);
		sDChange.innerHTML = result+", "+ data.onSite[molec];
	}
	// setTimeout(function(){},10);
	switch (molecule) {
		case "XX":{
			initialize();
			grid(true, 1, 0, 0, {d:false}, true, 2, -32.5, 0, {d:true, all:false, pos:[1]}, true, [65]);
			bDChange.innerHTML = "";
		}
		break;
		case "AlCl3":case "alcl3":case "ALCL3":{
			// dSChange.innerHTML = initialValueOfDS;
			initialize();
			var inX = (units/2)-47.5, inY = height/2;
			var inXEls = inX+47.5, inYEls = inY - 7;
			// grid(true, 2, 0, 0, {d:false}, true, 1, 0, -32.5, {d:false});
			nVLines([inXEls,inY-42.5], 1);
			nHLines([inX,inY], 2);
			nElements(["Cl","Al","Cl","Cl"],[inXEls-71,inYEls+2.5,inXEls-9,inYEls+2.5,inXEls+53.5,inYEls+2.5,inXEls-9,inYEls-53]);
			sixDots([inXEls-66,inYEls-5.5],"right",true);
			sixDots([inXEls+58.5,inYEls-5.5],"left",true);
			sixDots([inXEls-16.5,inYEls-53],"bottom",true);
			// sDChange.innerHTML = "AlCl3, Aluminum chloride";
			// bDChange.innerHTML = "";
			finalize();
			bDChange.innerHTML = "";
		}
		break;
		case "alcl4^(-)": case "alcl4^-": case "alcl4-": case "AlCl4^(-)": case "AlCl4^-": case "AlCl4-":{
			finalize();
			initialize();
			var inX = (units/2)-47.5, inY = height/2;
			var inXEls = inX+47.5, inYEls = inY - 7;
			nVLines([inXEls,inY-47.5], 2);
			nHLines([inX,inY], 2);
			nElements(["Cl","Al","Cl","Cl","Cl"],[inXEls-74,inYEls+2.5,inXEls-9,inYEls+2.5,inXEls+54,inYEls+2.5,inXEls-9,inYEls-59,inXEls-9,inYEls+63]);
			sixDots([inXEls-69,inYEls-5.5],"right",true);
			sixDots([inXEls+59,inYEls-5.5],"left",true);
			sixDots([inXEls-16,inYEls-59],"bottom",true);
			sixDots([inXEls-16,inYEls+64],"top",true);
			nElements(["-"],[inXEls+5,inYEls-10]);
			// sDChange.innerHTML = "AlCl4^(-), Tetrachloroaluminate";
			bDChange.innerHTML = "";
		}
		break;
		case "aGcl": case "agcL": case "Agcl": case "agCl": case "agcl": case "AgCl":{
			initialize();
			var inX = (units/2)-15, inY = height/2;
			var inXEls = inX-15, inYEls = inY - 7;
			nHLinesBonds([inX,inY], 1, 1);
			nElements(["Ag","Cl"],[inXEls-12,inYEls,inXEls+53,inYEls]);
			sixDots([inXEls+57.5,inYEls-7], "left", true);
			finalize();
			bDChange.innerHTML = "";
		}
		break;
		case "AgF":case "AgF":case "agf":{
			initialize();
			var inX = (units/2)-15, inY = height/2;
			var inXEls = inX-15, inYEls = inY - 7;
			nHLinesBonds([inX,inY], 1, 1);
			nElements(["Ag","F"],[inXEls-12,inYEls,inXEls+53,inYEls]);
			sixDots([inXEls+53.5,inYEls-7], "left", false);
			finalize();
			bDChange.innerHTML = "";
		}
		break;
		case "BF3":case "bF3":case "Bf3":case "bf3":{
			initialize();
			var inX = (units/2)-47.5, inY = height/2;
			var inXEls = inX+47.5, inYEls = inY - 7;
			nVLines([inXEls,inY-42.5], 1);
			nHLines([inX,inY], 2);
			nElements(["F","B","F","F"],[inXEls-67,inYEls,inXEls-6,inYEls,inXEls+54,inYEls,inXEls-6,inYEls-53]);
			sixDots([inXEls-64.5,inYEls-7.15],"right",false);
			sixDots([inXEls+55.5,inYEls-7.15],"left",false);
			sixDots([inXEls-12,inYEls-52],"bottom",false);
			finalize();
			bDChange.innerHTML = "";
		}
		break;
		case "Br2": case "br2": case "BR2": case "bR2":{
			initialize();
			var inX = (units/2)-15, inY = height/2;
			var inXEls = inX-15, inYEls = inY - 7;
			nHLinesBonds([inX,inY], 1, 1);
			nElements(["Br","Br"],[inXEls-6,inYEls+1.5,inXEls+49,inYEls+1.5]);
			sixDots([inXEls-2,inYEls-6], "right", true); sixDots([inXEls+16+37.5,inYEls-6], "left", true);
			finalize();
			bDChange.innerHTML = "";
		}
		break;
		case "BaS": case "Bas": case "bas": case "baS":{
			initialize();
			var inX = (units/2)-15, inY = height/2;
			var inXEls = inX-15, inYEls = inY - 7;
			nHLinesBonds([inX,inY], 1, 2);
			nElements(["S","Ba"],[inXEls,inYEls+1,inXEls+49,inYEls+1]);
			fourVDots([inXEls+0.5,inYEls-6.5]); //fourVDots([inXEls+16+34,inYEls-6.5]);
			finalize();
			bDChange.innerHTML = "";
		}
		break;
		case "BrF2^(+)": case "BrF2^+": case "BrF2+":{
			finalize();
			initialize();
			var inX = (units/2)-47.5, inY = height/2;
			var inXEls = inX+47.5, inYEls = inY - 7;
			nHLines([inX,inY-1], 2);
			nElements(["F","Br","F"],[inXEls-65,inYEls,inXEls-9,inYEls,inXEls+55,inYEls]);
			nElements(["+"],[inXEls+8,inYEls-9]);
			fourVDots([inXEls-4.5,inYEls-7.15]);
			sixDots([inXEls-64.5,inYEls-8.0],"right",false);
			sixDots([inXEls+55.5,inYEls-8.0],"left",false);
			// sDChange.innerHTML = "BrF2^(+), Bromine difluoride cation";
			bDChange.innerHTML = "";
			
		}
		break;
		case "BrF2": case "BrF2": case "BrF2":
		{
			initialize();
			var inX = (units/2)-47.5, inY = height/2;
			var inXEls = inX+47.5, inYEls = inY - 7;
			nHLines([inX,inY-1], 2);
			nElements(["F","Br","F"],[inXEls-65,inYEls,inXEls-9,inYEls,inXEls+55,inYEls]);
			sixDots([inXEls-64.5,inYEls-8.0],"right",false);
			sixDots([inXEls+55.5,inYEls-8.0],"left",false);
			twoHDots([inXEls-4.20,inYEls-7.15]);
			twoTDots([inXEls-13,inYEls+13], 30); dot([inXEls+6,inYEls+4+13]);
			// sDChange.innerHTML = "BrF2, Bromine difluoride";
			finalize();
			bDChange.innerHTML = "";
		}
		break;
		case "BrF2^(-)": case "BrF2^-": case "BrF2-":{
			finalize();
			initialize();
			var inX = (units/2)-47.5, inY = height/2;
			var inXEls = inX+47.5, inYEls = inY - 7;
			nHLines([inX,inY-1], 2);
			nElements(["F","Br","F"],[inXEls-65,inYEls,inXEls-9,inYEls,inXEls+55,inYEls]);
			nElements(["-"],[inXEls+8,inYEls-9]);
			//fourVDots([inXEls-4.5,inYEls-7.15]);
			sixDots([inXEls-64.5,inYEls-8.0],"right",false);
			sixDots([inXEls+55.5,inYEls-8.0],"left",false);
			twoHDots([inXEls-4.20,inYEls-7.15]);
			twoTDots([inXEls-13,inYEls+13], 30); twoTDots([inXEls+6,inYEls+4+13], -30);
			// sDChange.innerHTML = "BrF2^(-), Bromine difluoride anion";
			bDChange.innerHTML = "";
		}
		break;
		case "cCl4": case "Ccl4":case "ccl4": case "CCl4":{
			initialize();
			var inX = (units/2)-47.5, inY = height/2;
			var inXEls = inX+47.5, inYEls = inY - 7;
			nVLines([inXEls,inY-49.5], 2);
			nHLines([inX,inY], 2);
			nElements(["Cl","C","Cl","Cl","Cl"],[inXEls-75,inYEls,inXEls-4.5,inYEls,inXEls+54,inYEls,inXEls-10,inYEls-59,inXEls-10,inYEls+59]);
			sixDots([inXEls-69,inYEls-7.15],"right",true);
			sixDots([inXEls+59.5,inYEls-7.15],"left",true);
			sixDots([inXEls-15,inYEls-59],"bottom",true);
			sixDots([inXEls-15,inYEls+61],"top",true);
			finalize();
			bDChange.innerHTML = "";
		}
		break;
		case "methane": case "ch4": case "Ch4": case "cH4": case "CH4":{
			initialize();
			var inX = (units/2)-47.5, inY = height/2;
			var inXEls = inX+47.5, inYEls = inY - 7;
			nHLines([inX,inY], 2);
			nVLines([inXEls,inY-48.5], 2);
			nElements(["H","C","H","H","H"],[inXEls-67,inYEls,inXEls-4.5,inYEls,inXEls+54,inYEls,inXEls-4.5,inYEls-60.5,inXEls-4.5,inYEls+62.5]);
			// sDChange.innerHTML = "CH4, Methane";
			// bDChange.innerHTML = "";
			finalize();
			bDChange.innerHTML = "";
		}
		break;
		case "CH3COOH": case "ch3cooh":{
			initialize();
			var inX = (units/2)-26.3, inY = height/2;
			var inXEls = inX+26.3, inYEls = inY - 7;
			nLSLinesH([inX,inY],2,false);
			nVLinesBonds([inXEls-0.65,inY-30],1,2);
			nElements(["O","OH"], [inXEls-6.6,inY-47,inXEls+28,inY+9.5]);
			fourHDots([inXEls-13.5,inY-47]);
			fourVDots([inXEls+29.5,inY+2.75]);
			// sDChange.innerHTML = "CH3COOH, Acetic acid";
			finalize();
			bDChange.innerHTML = linksToLineStructures;
			break;
		}
		case "c2h3o2^-": case "c2h3o2^(-)": case "C2H3O2^-": case "C2H3O2^(-)": case "ch3coo-": case "CH3COO-":
		case "ch3coo^-": case "ch3coo^(-)": case "ch3COO^-": case "ch3COO^(-)": case "CH3cOO^-": case "CH3cOO^(-)": case "cH3COO^-": case "cH3COO^(-)": case "CH3COO^-":
		case "CH3COO^(-)": {
			molecule = "CH3COO^-";
			finalize();
			initialize();
			var inX = (units/2)-26.3, inY = height/2;
			var inXEls = inX+26.3, inYEls = inY - 7;
			nLSLinesH([inX,inY],2,false);
			nVLinesBonds([inXEls-0.65,inY-30],1,2);
			nElements(["O","O"], [inXEls-6.6,inY-47,inXEls+28,inY+9.5]);
			nElements(["-"], [inXEls+40,inY]);
			fourHDots([inXEls-13.5,inY-47]);
			sixDots([inXEls+29.5,inY+2.75],"left",false);
			// sDChange.innerHTML = "CH3COO^(-), Acetate ion";
			bDChange.innerHTML = linksToLineStructures;
			break;
		}
		case "CN-": case "CN^-": case "CN^(-)":{
			finalize();
			initialize();
			var inX = (units/2)-15, inY = height/2;
			var inXEls = inX-15, inYEls = inY - 7;
			nHLinesBonds([inX,inY], 1, 3);
			nElements(["N","C"],[inXEls,inYEls+1.4,inXEls+49,inYEls+1.4]);
			nElements(["-"],[inXEls+57,inYEls-8]);
			twoVDots([inXEls-4,inYEls+2]); twoVDots([inXEls+16+49,inYEls+2]);
			// sDChange.innerHTML = "CN^(-), Cyanide ion";
			bDChange.innerHTML = "";
		}
		break;
		case "CO":case "co": case "cO":{
			initialize();
			var inX = (units/2)-15, inY = height/2;
			var inXEls = inX-15, inYEls = inY - 7;
			nHLinesBonds([inX,inY], 1, 3);
			nElements(["C","O"],[inXEls,inYEls+1,inXEls+49,inYEls+1]);
			nElements(["-","+"],[inXEls+7,inYEls-9,inXEls+49+7,inYEls-9]);
			twoVDots([inXEls-4,inYEls+1.5]); twoVDots([inXEls+16+49,inYEls+1.5]);
			// sDChange.innerHTML = "CO, Carbon monoxide";
			finalize();
			bDChange.innerHTML = "";
		}
		break;
		case "CO2":case "co2": case "cO2":{
			initialize();
			var inX = (units/2)-47.5, inY = height/2;
			var inXEls = inX+47.5, inYEls = inY - 6;
			nHLinesBonds([inX,inY], 2, 2);
			fourVDots([inXEls-67,inYEls-7.15]);
			fourVDots([inXEls+55,inYEls-7.15]);
			nElements(["O","C","O"],[inXEls-67,inYEls,inXEls-5,inYEls,inXEls+54,inYEls]);
			// sDChange.innerHTML = "CO2, Carbon dioxide";
			finalize();
			bDChange.innerHTML = "";
		}
		break;
		case "CO3-2": case "cO3^-2": case "cO3^(-2)": case "CO3^-2": case "CO3^(-2)":
		case "CO32-": case "cO3^2-": case "cO3^(2-)": case "CO3^2-": case "CO3^(2-)":{
			molecule = "CO3^(2-)";
			finalize();
			initialize();
			var inX = (units/2)-47.5, inY = height/2;
			var inXEls = inX+47.5, inYEls = inY - 7;
			nHLines([inX,inY], 2); nVLinesBonds([inXEls+1,inY+15.5], 1, 2);
			nElements(["O","C","O","O"],[inXEls-67,inYEls+1,inXEls-5,inYEls+1,inXEls+54,inYEls+1,inXEls-4.5,inYEls+60.5]);
			nElements(["-","-"],[inXEls-53,inYEls-10,inXEls+67,inYEls-10]);
			fourHDots([inXEls-12.20,inYEls+61.5]);
			sixDots([inXEls-64.5,inYEls-7.15],"right",false);
			sixDots([inXEls+55.5,inYEls-7.15],"left",false);
			// sDChange.innerHTML = "CO3^(2-), Carbonate ion";
			bDChange.innerHTML = linksToResonance + "<br>" + about("resonance");
		}
		break;
		case "c2o42-": case "c2o42-": case "c2o4^2-": case "c2o4^2-": case "c2o4^(2-)": case "c2o4^(2-)":
		case "C2O42-": case "C2O42-": case "C2O4^2-": case "C2O4^2-": case "C2O4^(2-)": case "C2O4^(2-)":
		case "c2o4-2": case "c2o4-2": case "c2o4^-2": case "c2o4^-2": case "c2o4^(-2)": case "c2o4^(-2)":
		case "C2O4-2": case "C2O4-2": case "C2O4^-2": case "C2O4^-2": case "C2O4^(-2)": case "C2O4^(-2)":{
			finalize();
			initialize();
			var inX = (units/2)-15, inY = height/2;
			var inXEls = inX-15, inYEls = inY - 7;
			// nHLines([inX,inY], 1); nVLines([inXEls+5,inY-49], 1); nVLines([inXEls+54,inY-49], 1); nVLinesBonds([inXEls+5+0.25,inY+16], 1, 2); nVLinesBonds([inXEls+54+0.25,inY+16], 1, 2);
			grid(true, 1, 0, 0, {d:false}, true, 2, -32.5, 0, {d:true, all:false, pos:[2]}, true, [65]);
			nElements(["O","O"],[inXEls-8,inYEls-60,inXEls+49+8,inYEls-60]);
			nElements(["C","C"],[inXEls-8,inYEls+2.5,inXEls+49+8,inYEls+2.5]);
			nElements(["O","O"],[inXEls-8,inYEls+60,inXEls+49+8,inYEls+60]);
			nElements(["-","-"],[inXEls+2,inYEls-70,inXEls+67,inYEls-60-10]);
			sixDots([inXEls-15.5,inYEls-60+0.5], "bottom", false);sixDots([inXEls+49.5,inYEls-60+0.5], "bottom", false);
			fourHDots([inXEls-15.5,inYEls+60+1]); fourHDots([inXEls+49.5,inYEls+60+1]);
			bDChange.innerHTML = "";
		}
		break;
		case "ClO-":case "Clo-": case "clO-": case "clo-":
		case "ClO^-":case "Clo^-": case "clO^-": case "clo^-":
		case "ClO^(-)":case "Clo^(-)": case "clO^(-)": case "clo^(-)":{
			finalize();
			initialize();
			var inX = (units/2)-15, inY = height/2;
			var inXEls = inX-15, inYEls = inY - 7;
			nHLinesBonds([inX,inY], 1, 1);
			nElements(["Cl","O"],[inXEls-9,inYEls+1.5,inXEls+52,inYEls+1.5]);
			sixDots([inXEls-4.5,inYEls-6], "right", true); sixDots([inXEls+16+37,inYEls-6], "left", false);
			nElements(["-"],[inXEls+60,inYEls-8])
			// sDChange.innerHTML = "ClO^(-), Hypochlorite ion";
			// finalize();
			bDChange.innerHTML = "";
		}
		break;
		case "ClO2-":case "Clo2-": case "clO2-": case "clo2-":
		case "ClO2^-":case "Clo2^-": case "clO2^-": case "clo2^-":
		case "ClO2^(-)":case "Clo2^(-)": case "clO2^(-)": case "clo2^(-)":{
			finalize();
			initialize();
			var inX = (units/2)-47.5, inY = height/2;
			var inXEls = inX+47.5, inYEls = inY - 7;
			nHLinesBonds([inX,inY-0.5], 1, 2);
			nHLines([inXEls+17.5,inY], 1);
			nElements(["O","Cl","O"],[inXEls-67,inYEls+1,inXEls-9,inYEls+1,inXEls+54,inYEls+1]);
			fourVDots([inXEls-66.5,inYEls-6.65]); fourVDots([inXEls-4.5,inYEls-6.65]);
			sixDots([inXEls+55.5,inYEls-6.65],"left",false);
			nElements(["-"],[inXEls+67,inYEls-10]);
			// sDChange.innerHTML = "ClO2^(-), Chlorite ion";
			bDChange.innerHTML = linksToResonance + "<br>" + about("resonance");
		}
		break;
		case "ClO3-":case "Clo3-": case "clO3-": case "clo3-":
		case "ClO3^-":case "Clo3^-": case "clO3^-": case "clo3^-":
		case "ClO3^(-)":case "Clo3^(-)": case "clO3^(-)": case "clo3^(-)":{
			finalize();
			initialize();
			var inX = (units/2)-47.5, inY = height/2;
			var inXEls = inX+47.5, inYEls = inY - 7;
			nHLinesBonds([inX,inY-0.5], 1, 2);
			nHLines([inXEls+17.5,inY], 1);
			nVLinesBonds([inXEls,inY+12], 1, 2);
			nElements(["O","Cl","O","O"],[inXEls-67,inYEls+1,inXEls-9,inYEls+1,inXEls-5.5,inYEls+55,inXEls+54,inYEls+1]);
			fourVDots([inXEls-66.5,inYEls-6.65]); twoHDots([inXEls-4.5,inYEls-6.65]);
			fourHDots([inXEls-13.25,inYEls+56.5]); sixDots([inXEls+55.5,inYEls-6.65],"left",false);
			nElements(["-"],[inXEls+67,inYEls-10]);
			// sDChange.innerHTML = "ClO3^(-), Chlorate ion";
			bDChange.innerHTML = linksToResonance + "<br>" + about("resonance");
		}
		break;
		case "ClO4-":case "Clo4-": case "clO4-": case "clo4-":
		case "ClO4^-":case "Clo4^-": case "clO4^-": case "clo4^-":
		case "ClO4^(-)":case "Clo4^(-)": case "clO4^(-)": case "clo4^(-)":{
			finalize();
			initialize();
			var inX = (units/2)-47.5, inY = height/2;
			var inXEls = inX+47.5, inYEls = inY - 7;
			nHLinesBonds([inX,inY-0.5], 1, 2);
			nHLines([inXEls+17.5,inY], 1);
			nVLinesBonds([inXEls,inY-48], 2, 2);
			nElements(["O","Cl","O","O","O"],[inXEls-67,inYEls+1,inXEls-9,inYEls+1,inXEls-5.5,inYEls-59,inXEls-5.5,inYEls+60,inXEls+54,inYEls+1]);
			fourVDots([inXEls-66.5,inYEls-6.65]);
			fourHDots([inXEls-13.25,inYEls-58.5]); fourHDots([inXEls-13.25,inYEls+61.5]); 
			sixDots([inXEls+55.5,inYEls-6.65],"left",false);
			nElements(["-"],[inXEls+67,inYEls-10]);
			// sDChange.innerHTML = "ClO4^(-), Perchlorate ion";
			bDChange.innerHTML = linksToResonance + "<br>" + about("resonance");
		}
		break;
		case "cl2": case "Cl2": case "CL2": case "cL2":{
			finalize();
			initialize();
			var inX = (units/2)-15, inY = height/2;
			var inXEls = inX-15, inYEls = inY - 7;
			nHLinesBonds([inX,inY], 1, 1);
			nElements(["Cl","Cl"],[inXEls-11,inYEls+1.5,inXEls+53,inYEls+1.5]);
			sixDots([inXEls-7,inYEls-6], "right", true); sixDots([inXEls+20.5+37.5,inYEls-6], "left", true);
			// sDChange.innerHTML = "Cl2, Chlorine";
			bDChange.innerHTML = "";
		}
		break;
		case "CrO4-2": case "Cro4-2": case "crO4-2": case "cro4-2":
		case "CrO4^-2": case "Cro4^-2": case "crO4^-2": case "cro4^-2":
		case "CrO4^(-2)": case "Cro4^(-2)": case "crO4^(-2)": case "cro4^(-2)":
		case "CrO42-": case "Cro42-": case "crO42-": case "cro42-":
		case "CrO4^2-": case "Cro4^2-": case "crO4^2-": case "cro4^2-":
		case "CrO4^(2-)": case "Cro4^(2-)": case "crO4^(2-)": case "cro4^(2-)":{
			finalize();
			initialize();
			var inX = (units/2)-47.5, inY = height/2;
			var inXEls = inX+47.5, inYEls = inY - 7;
			nHLinesBonds([inX,inY-0.5], 2, 1);
			// nHLines([inXEls+17.5,inY], 1);
			nVLinesBonds([inXEls,inY-48], 2, 2);
			nElements(["O","Cr","O","O","O"],[inXEls-67,inYEls+1,inXEls-9,inYEls+1,inXEls-5.5,inYEls-59,inXEls-5.5,inYEls+60,inXEls+54,inYEls+1]);
			fourHDots([inXEls-13.25,inYEls-58.5]); fourHDots([inXEls-13.25,inYEls+61.5]); 
			sixDots([inXEls-66.5,inYEls-6.65], "right", false);sixDots([inXEls+55.5,inYEls-6.65],"left",false);
			nElements(["-","-"],[inXEls-55,inYEls-10,inXEls+67,inYEls-10]);
			bDChange.innerHTML = linksToResonance + "<br>" + about("resonance");
		}
		break;
		case "CuBR2": case "CuBr2":{
			finalize();
			initialize();
			var inX = (units/2)-47.5, inY = height/2;
			var inXEls = inX+47.5, inYEls = inY - 7;
			nHLines([inX,inY-1], 2);
			nElements(["Br","Cu","Br"],[inXEls-74,inYEls,inXEls-9,inYEls,inXEls+55,inYEls]);
			sixDots([inXEls-70,inYEls-8.0],"right",true);
			sixDots([inXEls+60.5,inYEls-8.0],"left",true);
			// sDChange.innerHTML = "CuBr2, Copper (II) bromide";
			bDChange.innerHTML = "";
		}
		break;
		case "f2": case "F2":{
			finalize();
			initialize();
			var inX = (units/2)-15, inY = height/2;
			var inXEls = inX-15, inYEls = inY - 7;
			nHLinesBonds([inX,inY], 1, 1);
			nElements(["F","F"],[inXEls,inYEls+1.5,inXEls+49,inYEls+1.5]);
			sixDots([inXEls+1,inYEls-6], "right", false); sixDots([inXEls+16+33.5,inYEls-6], "left", false);
			// sDChange.innerHTML = "F2, Fluorine";
			bDChange.innerHTML = "";
		}
		break;
		case "hbr": case "Hbr": case "hbR": case "HbR": case "hBr": case "HBr": case "hBR": case "HBR":{
			finalize();
			initialize();
			var inX = (units/2)-15, inY = height/2;
			var inXEls = inX-15, inYEls = inY - 7;
			nHLinesBonds([inX,inY], 1, 1);
			nElements(["Br","H"],[inXEls-10,inYEls+1.5,inXEls+52,inYEls+1.5]);
			sixDots([inXEls-5,inYEls-6], "right", true); 
			// sDChange.innerHTML = "HCl, Hydrobromic acid";
			bDChange.innerHTML = "";
		}
		break;
		case "HCN": case "hCN": case "HcN": case "HCn": case "hcn":{
			finalize();
			initialize();
			var inX = (units/2)-47.5, inY = height/2;
			var inXEls = inX+47.5, inYEls = inY - 7;
			nHLines([inX,inY], 1);
			nHLinesBonds([inXEls+17.5,inY], 1, 3);
			twoVDots([inXEls+70,inYEls+1.5]);
			nElements(["H","C","N"],[inXEls-67,inYEls,inXEls-6,inYEls,inXEls+54,inYEls]);
			// sDChange.innerHTML = "HCN, Hydrogen cyanide";
			bDChange.innerHTML = "";
		}
		break;
		case "HCO^(+)": case "hCO^(+)": case "HcO^(+)": case "HCo^(+)": case "hco^(+)":
		case "HCO^+": case "hCO^+": case "HcO^+": case "HCo^+": case "hco^+":
		case "HCO+": case "hCO+": case "HcO+": case "HCo+": case "hco+":{
			finalize();
			initialize();
			var inX = (units/2)-47.5, inY = height/2;
			var inXEls = inX+47.5, inYEls = inY - 7;
			nHLines([inX,inY], 1);
			nHLinesBonds([inXEls+17.5,inY], 1, 3);
			twoVDots([inXEls+70,inYEls+1.5]);
			nElements(["H","C","O"],[inXEls-67,inYEls,inXEls-6,inYEls,inXEls+54,inYEls]);
			nElements(["+"],[inXEls+54+6.5,inYEls-10]);
			//Structure 2
			nHLines([inX,inY-45], 1);
			nHLinesBonds([inXEls+17.5,inY-45], 1, 2);
			fourVDots([inXEls+56,inYEls+1.5-53.5]);
			nElements(["H","C","O"],[inXEls-67,inYEls-45,inXEls-6,inYEls-45,inXEls+54,inYEls-45]);
			nElements(["+"],[inXEls-6+10,inYEls-45-10]);
			//Structure 3
			// nHLines([inX,inY+45], 1);
			nHLinesBonds([inXEls+17.5,inY+45], 1, 2);
			twoVDots([inXEls-10,inYEls+47.5]);
			fourVDots([inXEls+56,inYEls+1.5+38]);
			nElements(["H","C","O"],[inXEls-27,inYEls+46,inXEls-6,inYEls+46,inXEls+54,inYEls+46]);
			nElements(["+"],[inXEls-30+10,inYEls+45-10]);
			// sDChange.innerHTML = "HCO^(+), Formyl cation";
			bDChange.innerHTML = about("HCO^(+)") + "<br>" +linksToResonance;
		}
		break;
		case "hCO3-": case "hcO3^-": case "hcO3^(-)": case "hCO3^-": case "hCO3^(-)":
		case "HCO3-": case "HcO3^-": case "HcO3^(-)": case "HCO3^-": case "HCO3^(-)":{
			finalize();
			initialize();
			var inX = (units/2)-47.5, inY = height/2;
			var inXEls = inX+47.5, inYEls = inY - 7;
			nHLines([inX,inY], 3);
			nVLinesBonds([inXEls+1,inY+15.5], 1, 2);
			nElements(["O","C","O","O","H"],[inXEls-65,inYEls+1,inXEls-5,inYEls+1,inXEls+60,inYEls+1,inXEls-4.5,inYEls+62.5, inXEls+118,inYEls+1]);
			nElements(["-"],[inXEls-53,inYEls-10]);
			fourHDots([inXEls-12.20,inYEls+64.5]);
			sixDots([inXEls-64.5,inYEls-7.15],"right",false);
			fourVDots([inXEls+61,inYEls-7.15]);
			// sDChange.innerHTML = "HCO3^(-), Hydrogen carbonate ion";
			bDChange.innerHTML = linksToResonance + "<br>" + about("resonance");
		}
		break;
		case "hcl": case "Hcl": case "hcL": case "HcL": case "hCl": case "HCl": case "hCL": case "HCL":{
			finalize();
			initialize();
			var inX = (units/2)-15, inY = height/2;
			var inXEls = inX-15, inYEls = inY - 7;
			nHLinesBonds([inX,inY], 1, 1);
			nElements(["Cl","H"],[inXEls-10,inYEls+1.5,inXEls+52,inYEls+1.5]);
			sixDots([inXEls-5,inYEls-6], "right", true); 
			// sDChange.innerHTML = "HCl, Hydrochloric acid";
			bDChange.innerHTML = "";
		}
		break;
		case "HClO":case "HClo": case "HclO": case "Hclo":
		case "hClO":case "hClo": case "hclO": case "hclo":{
			finalize();
			initialize();
			var inX = (units/2)-47.5, inY = height/2;
			var inXEls = inX+47.5, inYEls = inY - 7;
			nHLinesBonds([inX,inY-0.5], 2, 1);
			nElements(["Cl","O","H"],[inXEls-74,inYEls+1,inXEls-5.5,inYEls+1,inXEls+55,inYEls+1]);
			sixDots([inXEls-69.5,inYEls-6.65], "right", true); fourVDots([inXEls-5,inYEls-6.65]);
			// sDChange.innerHTML = "HClO, Hypochlorous acid";
			bDChange.innerHTML = linksToResonance + "<br>" + about("resonance");
		}
		break;
		case "HClO2":case "HClo2": case "HclO2": case "Hclo2":
		case "hClO2":case "hClo2": case "hclO2": case "hclo2":{
			finalize();
			initialize();
			var inX = (units/2)-47.5, inY = height/2;
			var inXEls = inX+47.5, inYEls = inY - 7;
			nHLinesBonds([inX,inY-0.5], 1, 2);
			nHLines([inXEls+17.5,inY], 2);
			nElements(["O","Cl","O","H"],[inXEls-67,inYEls+1,inXEls-9,inYEls+1,inXEls+60,inYEls+1,inXEls+120,inYEls+1]);
			fourVDots([inXEls-66.5,inYEls-6.65]); fourVDots([inXEls-4.5,inYEls-6.65]);
			fourVDots([inXEls+60.5,inYEls-6.65]);
			// sDChange.innerHTML = "HClO2, Chlorous acid";
			bDChange.innerHTML = linksToResonance + "<br>" + about("resonance");
		}
		break;
		case "HClO3":case "HClo3": case "HclO3": case "Hclo3":
		case "hClO3":case "hClo3": case "hclO3": case "hclo3":{
			finalize();
			initialize();
			var inX = (units/2)-47.5, inY = height/2;
			var inXEls = inX+47.5, inYEls = inY - 7;
			nHLinesBonds([inX,inY-0.5], 1, 2);
			nHLines([inXEls+17.5,inY], 2);
			nVLinesBonds([inXEls,inY+12], 1, 2);
			nElements(["O","Cl","O","O","H"],[inXEls-67,inYEls+1,inXEls-9,inYEls+1,inXEls-5.5,inYEls+55,inXEls+60,inYEls+1,inXEls+120,inYEls+1]);
			fourVDots([inXEls-66.5,inYEls-6.65]); twoHDots([inXEls-4.5,inYEls-6.65]);
			fourHDots([inXEls-13.25,inYEls+56.5]); fourVDots([inXEls+60.5,inYEls-6.65]);
			// sDChange.innerHTML = "HClO3, Chloric acid";
			bDChange.innerHTML = linksToResonance + "<br>" + about("resonance");
		}
		break;
		case "HClO4":case "HClo4": case "HclO4": case "Hclo4":
		case "hClO4":case "hClo4": case "hclO4": case "hclo4":{
			finalize();
			initialize();
			var inX = (units/2)-47.5, inY = height/2;
			var inXEls = inX+47.5, inYEls = inY - 7;
			nHLinesBonds([inX,inY-0.5], 1, 2);
			nHLines([inXEls+17.5,inY], 2);
			nVLinesBonds([inXEls,inY-48], 2, 2);
			nElements(["O","Cl","O","O","O","H"],[inXEls-67,inYEls+1,inXEls-9,inYEls+1,inXEls-5.5,inYEls-59,inXEls-5.5,inYEls+60,inXEls+60,inYEls+1,inXEls+120,inYEls+1]);
			fourVDots([inXEls-66.5,inYEls-6.65]);
			fourHDots([inXEls-13.25,inYEls-58.5]); fourHDots([inXEls-13.25,inYEls+61.5]); 
			fourVDots([inXEls+60.5,inYEls-6.65]);
			// sDChange.innerHTML = "HClO4, Perchloric acid";
			bDChange.innerHTML = linksToResonance + "<br>" + about("resonance");
		}
		break;
		case "hf": case "Hf": case "hF": case "HF":{
			finalize();
			initialize();
			var inX = (units/2)-15, inY = height/2;
			var inXEls = inX-15, inYEls = inY - 7;
			nHLinesBonds([inX,inY], 1, 1);
			nElements(["F","H"],[inXEls,inYEls+1.5,inXEls+52,inYEls+1.5]);
			sixDots([inXEls+1,inYEls-6], "right", false); 
			// sDChange.innerHTML = "HF, Hydrofluoric acid";
			bDChange.innerHTML = "";
		}
		break;
		case "HI": case "hi": case "hI": case "Hi":{
			finalize();
			initialize();
			var inX = (units/2)-15, inY = height/2;
			var inXEls = inX-15, inYEls = inY - 7;
			nHLinesBonds([inX,inY], 1, 1);
			nElements(["I","H"],[inXEls,inYEls+1.5,inXEls+52,inYEls+1.5]);
			sixDots([inXEls+1,inYEls-6], "right", false); 
			// sDChange.innerHTML = "HI, Hydroiodic acid";
			bDChange.innerHTML = "";
		}
		break;
		case "HIo": case "hio": case "hIo": case "Hio":
		case "HIO": case "hiO": case "hIO": case "HiO":{
			finalize();
			initialize();
			var inX = (units/2)-47.5, inY = height/2;
			var inXEls = inX+47.5, inYEls = inY - 7;
			nHLines([inX,inY], 2);
			nElements(["H","O","I"],[inXEls-67,inYEls+1,inXEls-6,inYEls+1,inXEls+54,inYEls+1]);
			fourVDots([inXEls-5,inYEls-6.75]); sixDots([inXEls+55,inYEls-6.75],"left",false);
			// sDChange.innerHTML = "HIO, Hypoiodous acid";
			bDChange.innerHTML = "";
		}
		break;
		case "HIo2": case "hio2": case "hIo2": case "Hio2":
		case "HIO2": case "hiO2": case "hIO2": case "HiO2":{
			finalize();
			initialize();
			var inX = (units/2)-47.5, inY = height/2;
			var inXEls = inX+47.5, inYEls = inY - 7;
			nHLines([inX,inY], 2);
			nHLinesBonds([inX+130,inY-0.5], 1, 2);
			nElements(["H","O","I","O"],[inXEls-67,inYEls+1,inXEls-6,inYEls+1,inXEls+60,inYEls+1,inXEls+124,inYEls+1]);
			fourVDots([inXEls-5,inYEls-6.75]); fourVDots([inXEls+61,inYEls-6.75]); fourVDots([inXEls+125,inYEls-6.75]);
			// sDChange.innerHTML = "HIO2, Iodous acid";
			bDChange.innerHTML = "";
		}
		break;
		case "HIo3": case "hio3": case "hIo3": case "Hio3":
		case "HIO3": case "hiO3": case "hIO3": case "HiO3":{
			finalize();
			initialize();
			var inX = (units/2)-47.5, inY = height/2;
			var inXEls = inX+47.5, inYEls = inY - 7;
			nHLines([inX,inY], 2);
			nHLinesBonds([inX+130,inY-0.5], 1, 2);
			nVLinesBonds([inX+112.75,inY+13.5], 1, 2);
			nElements(["H","O","I","O","O"],[inXEls-67,inYEls+1,inXEls-6,inYEls+1,inXEls+60,inYEls+1,inXEls+59.5,inYEls+60,inXEls+124,inYEls+1]);
			fourVDots([inXEls-5,inYEls-6.75]); twoHDots([inXEls+61,inYEls-6.75]); 
			fourHDots([inXEls+52,inYEls+60.75]); 
			fourVDots([inXEls+125,inYEls-6.75]);
			// sDChange.innerHTML = "HIO3, Iodic acid";
			bDChange.innerHTML = "";
		}
		break;
		case "HIo4": case "hio4": case "hIo4": case "Hio4":
		case "HIO4": case "hiO4": case "hIO4": case "HiO4":{
			finalize();
			initialize();
			var inX = (units/2)-47.5, inY = height/2;
			var inXEls = inX+47.5, inYEls = inY - 7;
			nHLines([inX,inY], 2);
			nHLinesBonds([inX+130,inY-0.5], 1, 2);
			nVLinesBonds([inX+112.75,inY-47.9], 2, 2);
			nElements(["H","O","I","O","O","O"],[inXEls-67,inYEls+1,inXEls-6,inYEls+1,inXEls+60,inYEls+1,inXEls+59.5,inYEls-58,inXEls+59.5,inYEls+60,inXEls+124,inYEls+1]);
			fourVDots([inXEls-5,inYEls-6.75]); 
			fourHDots([inXEls+52,inYEls-57]); fourHDots([inXEls+52,inYEls+60.75]); 
			fourVDots([inXEls+125,inYEls-6.75]);
			// sDChange.innerHTML = "HIO3, Iodic acid";
			bDChange.innerHTML = "";
		}
		break;
		case "hno2": case "hNO2": case "hnO2": case "Hno2": case "HNO2": case "HnO2": {
			finalize();
			initialize();
			var inX = (units/2)-47.5, inY = height/2;
			var inXEls = inX+47.5, inYEls = inY - 7;
			nHLinesBonds([inX,inY], 1, 2);
			nHLines([inXEls+17.5,inY], 2);
			nElements(["O","N","O","H"],[inXEls-67,inYEls+1,inXEls-6,inYEls+1,inXEls+59,inYEls+1,inXEls+120,inYEls+1]);
			fourVDots([inXEls-66.5,inYEls-6.75]); twoHDots([inXEls-5,inYEls-6.75]); fourVDots([inXEls+60,inYEls-6.75]);
			// sDChange.innerHTML = "HNO2, Nitrous acid";
			bDChange.innerHTML = linksToResonance + "<br>" + about("resonance");
		}
		break;
		case "hno3": case "hNO3": case "hnO3": case "hnO3": 
		case "Hno3": case "HNO3": case "HnO3": case "HnO3": {
			finalize();
			initialize();
			var inX = (units/2)-47.5, inY = height/2;
			var inXEls = inX+47.5, inYEls = inY - 7;
			nHLinesBonds([inX,inY], 1, 2);
			nHLines([inXEls+17.5,inY], 2);
			nVLines([inXEls-1,inY+15.5], 1);
			nElements(["O","N","O","O","H"],[inXEls-67,inYEls+1,inXEls-6,inYEls+1,inXEls-6,inYEls+62.5,inXEls+59,inYEls+1,inXEls+120,inYEls+1]);
			fourVDots([inXEls-66.5,inYEls-6.75]); sixDots([inXEls-13,inYEls+64.5],"top",false); fourVDots([inXEls+60,inYEls-6.75],"left",false);
			nElements(["-","+"],[inXEls+5,inYEls+53.5, inXEls+5,inYEls-10]);
			// sDChange.innerHTML = "HNO3, Nitric acid";
			bDChange.innerHTML = linksToResonance + "<br>" + about("resonance");
		}
		break;
		case "H2": case "h2":{
			finalize();
			initialize();
			var inX = (units/2)-15, inY = height/2;
			var inXEls = inX-15, inYEls = inY - 7;
			nHLinesBonds([inX,inY], 1, 1);
			nElements(["H","H"],[inXEls,inYEls+1,inXEls+51,inYEls+1]);
			// sDChange.innerHTML = "H2, Hydrogen";
			bDChange.innerHTML = "";
		}
		break;
		case "h2CO3": case "h2cO3": case "h2cO3": case "h2CO3": case "h2CO3":
		case "H2CO3": case "H2cO3": case "H2cO3": case "H2CO3": case "H2CO3":{
			finalize();
			initialize();
			var inX = (units/2)-47.5, inY = height/2;
			var inXEls = inX+47.5, inYEls = inY - 7;
			// nHLines([inX,inY], 3);
			nHLines([inX-65,inY], 4);
			nVLinesBonds([inXEls+1,inY+15.5], 1, 2);
			nElements(["O","C","O","O","H","H"],[inXEls-65-5,inYEls+1,inXEls-5,inYEls+1,inXEls+58.5,inYEls+1,inXEls-4.5,inYEls+62.5, inXEls+118,inYEls+1,inXEls-130,inYEls+1]);
			fourHDots([inXEls-12.20,inYEls+64.5]);
			fourVDots([inXEls-64.5-5,inYEls-7.15],"right",false);
			fourVDots([inXEls+61,inYEls-7.15]);
			// sDChange.innerHTML = "H2CO3, Carbonic acid";
			bDChange.innerHTML = linksToResonance + "<br>" + about("resonance");
		}
		break;
		case "water": case "h2O": case "H2o": case "h2o": case "H2O":{
			finalize();
			initialize();
			var inX = (units/2)-47.5, inY = height/2;
			var inXEls = inX+47.5, inYEls = inY - 6;
			nHLines([inX,inY], 2);
			fourVDots([inXEls-4.20,inYEls-7.5]);
			nElements(["H","O","H"],[inXEls-67,inYEls,inXEls-5,inYEls,inXEls+54,inYEls]);
			// sDChange.innerHTML = "H2O, Dihydrogen monoxide";
			bDChange.innerHTML = "";
		}
		break;
		case "h2S": case "H2s": case "h2s": case "H2S":{
			finalize();
			initialize();
			var inX = (units/2)-47.5, inY = height/2;
			var inXEls = inX+47.5, inYEls = inY - 6;
			nHLines([inX,inY], 2);
			fourVDots([inXEls-4.20,inYEls-7.5]);
			nElements(["H","S","H"],[inXEls-67,inYEls,inXEls-5,inYEls,inXEls+54,inYEls]);
			// sDChange.innerHTML = "H2S, Hydrosulfuric acid";
			bDChange.innerHTML = "";
		}
		break;
		case "H2SO3": case "H2So3": case "H2sO3": case "H2so3":
		case "h2SO3": case "h2So3": case "h2sO3": case "h2so3":{
			finalize();
			initialize();
			var inX = (units/2)-47.5, inY = height/2;
			var inXEls = inX+47.5, inYEls = inY - 7;
			nHLines([inX-65,inY], 4);
			nVLinesBonds([inXEls+1,inY+15.5], 1, 2);
			nElements(["O","S","O","O"],[inXEls-70,inYEls+2,inXEls-4.5,inYEls+2,inXEls-4.5,inYEls+60.5,inXEls+59,inYEls+2]);
			nElements(["H","H"],[inXEls-129,inYEls+2,inXEls+120,inYEls+2]);
			fourHDots([inXEls-12.20,inYEls+61.5]);
			fourVDots([inXEls-69.5,inYEls-6.25]);fourVDots([inXEls+60.5,inYEls-6.25]);
			twoHDots([inXEls-3.5,inYEls-6]);
			bDChange.innerHTML = linksToResonance + "<br>" + about("resonance");
		}
		break;
		case "H2SO4": case "H2So4": case "H2sO4": case "H2so4":
		case "h2SO4": case "h2So4": case "h2sO4": case "h2so4":{
			finalize();
			initialize();
			var inX = (units/2)-47.5, inY = height/2;
			var inXEls = inX+47.5, inYEls = inY - 7;
			nHLines([inX-65,inY-0.5], 4);
			nVLinesBonds([inXEls,inY-48], 2, 2);
			nElements(["O","S","O","O","O"],[inXEls-71,inYEls+2,inXEls-5,inYEls+2,inXEls-5.5,inYEls-59,inXEls-5.5,inYEls+62.5,inXEls+60,inYEls+2]);
			nElements(["H","H"],[inXEls-129,inYEls+2,inXEls+120,inYEls+2]);
			fourHDots([inXEls-13.25,inYEls-59]); fourHDots([inXEls-13.25,inYEls+63]); 
			fourVDots([inXEls-70.5,inYEls-6.25]);fourVDots([inXEls+61.5,inYEls-6.25]);
			bDChange.innerHTML = linksToResonance + "<br>" + about("resonance");
		}
		break;
		case "h3o+":case "h3o^+":case "h3o^(+)": case "H3o+":case "H3o^+":case "H3o^(+)":
		case "h3O+":case "h3O^+":case "h3O^(+)": case "H3O+":case "H3O^+":case "H3O^(+)":{
			finalize();
			initialize();
			var inX = (units/2)-47.5, inY = height/2;
			var inXEls = inX+47.5, inYEls = inY - 7;
			nHLines([inX,inY], 2);
			nVLines([inXEls-1,inY+15.5], 1);
			nElements(["H","O","H","H"],[inXEls-67,inYEls,inXEls-5.5,inYEls,inXEls+54,inYEls,inXEls-5.5,inYEls+62.5]);
			nElements(["+"],[inXEls+5,inYEls-10]);
			twoHDots([inXEls-4.7,inY-13.5]);
			// sDChange.innerHTML = "H3O^(+), Hydronium ion";
			bDChange.innerHTML = "";
		}
		break;
		case "i2": case "I2":{
			finalize();
			initialize();
			var inX = (units/2)-15, inY = height/2;
			var inXEls = inX-15, inYEls = inY - 7;
			nHLinesBonds([inX,inY], 1, 1);
			nElements(["I","I"],[inXEls,inYEls+1.5,inXEls+49,inYEls+1.5]);
			sixDots([inXEls+1,inYEls-6], "right", false); sixDots([inXEls+16+33.5,inYEls-6], "left", false);
			// sDChange.innerHTML = "I2, Iodine";
			bDChange.innerHTML = "";
		}
		break;
		case "nh3": case "Nh3": case "nH3": case "NH3":{
			finalize();
			initialize();
			var inX = (units/2)-47.5, inY = height/2;
			var inXEls = inX+47.5, inYEls = inY - 7;
			nHLines([inX,inY], 2);
			nVLines([inXEls-1,inY+15.5], 1);
			nElements(["H","N","H","H"],[inXEls-67,inYEls,inXEls-5.5,inYEls,inXEls+54,inYEls,inXEls-5.5,inYEls+62.5]);
			twoHDots([inXEls-4.7,inY-13.5]);
			// sDChange.innerHTML = "NH3, Ammonia";
			bDChange.innerHTML = "";
		}
		break;
		case "nh4+": case "NH4+": case "nh4^": case "nh4^(+)": case "nh4^+": case "nh4^(+)": case "nH4^+": case "nH4^(+1)": case "nH4^+":
		case "nH4^(+)": case "Nh4^+1": case "Nh4^(+)": case "Nh4^+": case "Nh4^(+)": case "NH4^+1": case "NH4^(+1)": case "NH4^+":
		case "NH4^(+)":{
			finalize();
			initialize();
			var inX = (units/2)-47.5, inY = height/2;
			var inXEls = inX+47.5, inYEls = inY - 7;
			nHLines([inX,inY], 2);
			nVLines([inXEls-1,inY-48.5], 2);
			nElements(["H","N","H","H","H"],[inXEls-67,inYEls,inXEls-5,inYEls,inXEls+54,inYEls,inXEls-5,inYEls-60.5,inXEls-5,inYEls+62.5]);
			element("+",[inXEls+2,inYEls-10]);
			// sDChange.innerHTML = "NH4^(+), Ammonium ion";
			bDChange.innerHTML = "";
				}
		break;
		case "NO": case "no":{
			finalize();
			initialize();
			var inX = (units/2)-15, inY = height/2;
			var inXEls = inX-15, inYEls = inY - 7;
			nHLinesBonds([inX,inY], 1, 2);
			nElements(["N","O"],[inXEls,inYEls+1,inXEls+49,inYEls+1]);
			twoHDots([inXEls+0.5,inYEls-6.5]); dot([inXEls-6.5,inYEls+6.5]);
			fourVDots([inXEls+16+34,inYEls-6.5]);
			// sDChange.innerHTML = "NO, Nitrogen monoxide";
			bDChange.innerHTML = "";
		}
		break;
		case "no2": case "NO2": case "nO2": {
			finalize();
			initialize();
			var inX = (units/2)-47.5, inY = height/2;
			var inXEls = inX+47.5, inYEls = inY - 7;
			nHLinesBonds([inX,inY], 1, 2);
			nHLines([inXEls+17.5,inY], 1);
			nElements(["O","N","O"],[inXEls-67,inYEls+2,inXEls-6,inYEls+2,inXEls+54,inYEls+2]);
			twoHDots([inXEls-5,inYEls-6.15]);
			fourVDots([inXEls-65.5,inYEls-6.15]);
			fourVDots([inXEls+55.5,inYEls-6.15]); dot([inXEls+70.5,inYEls+7]);
			// sDChange.innerHTML = "NO2^(-), Nitrite ion";
			bDChange.innerHTML = linksToResonance + "<br>" + about("resonance");
		}
		break;
		case "no2-": case "NO2-": case "No2^-": case "No2^(-)": case "nO2^-": case "nO2^(-)": case "no2^-": case "no2^(-)": case "NO2^-":
		case "NO2^(-)":{
			finalize();
			initialize();
			var inX = (units/2)-47.5, inY = height/2;
			var inXEls = inX+47.5, inYEls = inY - 7;
			nHLinesBonds([inX,inY], 1, 2);
			nHLines([inXEls+17.5,inY], 1);
			nElements(["O","N","O"],[inXEls-67,inYEls+2,inXEls-6,inYEls+2,inXEls+54,inYEls+2]);
			twoHDots([inXEls-5,inYEls-6.15]);
			fourVDots([inXEls-65.5,inYEls-6.15]);
			sixDots([inXEls+55.5,inYEls-6.15],"left",false);
			nElements(["-"],[inXEls+67,inYEls-10]);
			// sDChange.innerHTML = "NO2^(-), Nitrite ion";
			bDChange.innerHTML = linksToResonance + "<br>" + about("resonance");
		}
		break;
		case "no3-": case "NO3-": case "nO3^-": case "nO3^(-)": case "no3^-": case "NO3^-": case "no3^(-)":
		case "NO3^(-)":{
			finalize();
			initialize();
			var inX = (units/2)-47.5, inY = height/2;
			var inXEls = inX+47.5, inYEls = inY - 7;
			nHLinesBonds([inX,inY], 1, 2);
			nHLines([inXEls+17.5,inY], 1);
			nVLines([inXEls-1,inY+15.5], 1);
			nElements(["O","N","O","O"],[inXEls-67,inYEls+2,inXEls-6,inYEls+2,inXEls+54,inYEls+2,inXEls-6,inYEls+62.5]);
			fourVDots([inXEls-65.5,inYEls-6.15]);
			sixDots([inXEls+55.5,inYEls-6.15],"left",false);
			sixDots([inXEls-13,inYEls+64.5],"top",false);
			nElements(["-","-","+"],[inXEls+67,inYEls-8,inXEls+5,inYEls+53.5, inXEls+2,inYEls-8]);
			// sDChange.innerHTML = "NO3^(-), Nitrate ion";
			bDChange.innerHTML = linksToResonance + "<br>" + about("resonance");
		}
		break;
		case "n2": case "N2":{
			finalize();
			initialize();
			var inX = (units/2)-15, inY = height/2;
			var inXEls = inX-15, inYEls = inY - 7;
			nHLinesBonds([inX,inY-1], 1, 3);
			nElements(["N","N"],[inXEls,inYEls+1,inXEls+49,inYEls+1]);
			twoVDots([inXEls-4,inYEls+1.5]); twoVDots([inXEls+16+47,inYEls+1.5]);
			// sDChange.innerHTML = "N2, Nitrogen";
			bDChange.innerHTML = "";
		}
		break;
		case "n2h2": case "N2h2":
		case "n2H2": case "N2H2":{
			finalize();
			initialize();
			var inX = (units/2)-15, inY = height/2;
			var inXEls = inX-15, inYEls = inY - 7;
			nHLinesBonds([inX,inY-1], 1, 2);
			nHLines([inX-65,inY-1], 1);
			nHLines([inX+65,inY-1], 1);
			nElements(["H","N","N","H"],[inXEls-70,inYEls+1,inXEls-8,inYEls+1,inXEls+57.5,inYEls+1,inXEls+119,inYEls+1]);
			twoHDots([inXEls-7,inYEls-5]); twoHDots([inXEls+58.75,inYEls-5]);
			// sDChange.innerHTML = "N2, Nitrogen";
			bDChange.innerHTML = "";
		}
		break;
		case "N2H4":case "n2h4":case "n2H4":case "N2h4":{
			finalize();
			initialize();
			var inX = (units/2)-15, inY = height/2;
			var inXEls = inX-15, inYEls = inY - 7;
			nHLines([inX,inY], 1);
			nVLines([inXEls+5,inY-49], 2);
			nVLines([inXEls+54,inY-49], 2);
			nElements(["H","H"],[inXEls,inYEls-60,inXEls+49,inYEls-60]);
			nElements(["N","N"],[inXEls,inYEls+1,inXEls+49,inYEls+1]);
			nElements(["H","H"],[inXEls,inYEls+60,inXEls+49,inYEls+60]);
			twoVDots([inXEls-4,inYEls+1.5]); twoVDots([inXEls+16+47,inYEls+1.5]);
			bDChange.innerHTML = "";
		}
		break;
		case "n2o": case "N2o":
		case "n2O": case "N2O":{
			finalize();
			initialize();
			var inX = (units/2)-15, inY = height/2;
			var inXEls = inX-15, inYEls = inY - 7;
			nHLinesBonds([inX,inY-1], 1, 3);
			nHLines([inX,inY-1], 2);
			nElements(["N","N","O"],[inXEls-4,inYEls+1,inXEls+56.5,inYEls+1,inXEls+117,inYEls+1]);
			nElements(["+","-"],[inXEls+65,inYEls-9,inXEls+128,inYEls-9]);
			twoVDots([inXEls-10.5,inYEls+1.5]); sixDots([inXEls+118,inYEls-7], "left", false);
			// sDChange.innerHTML = "N2, Nitrogen";
			bDChange.innerHTML = "";
		}
		break;
		case "n2o4": case "N2o4":
		case "n2O4": case "N2O4":{
			finalize();
			initialize();
			var inX = (units/2)-15, inY = height/2;
			var inXEls = inX-15, inYEls = inY - 7;
			nHLines([inX,inY], 1);
			nVLines([inXEls+5,inY-49], 1);
			nVLines([inXEls+54,inY-49], 1);
			nVLinesBonds([inXEls+5+0.25,inY+16], 1, 2);
			nVLinesBonds([inXEls+54+0.25,inY+16], 1, 2);
			nElements(["O","O"],[inXEls,inYEls-60,inXEls+49,inYEls-60]);
			nElements(["N","N"],[inXEls,inYEls+1,inXEls+49,inYEls+1]);
			nElements(["O","O"],[inXEls,inYEls+60,inXEls+49,inYEls+60]);
			nElements(["+","+"],[inXEls+10,inYEls+1-10,inXEls+49+10,inYEls+1-10]);
			nElements(["-","-"],[inXEls+10,inYEls-60-10,inXEls+49+10,inYEls-60-10]);
			sixDots([inXEls-7.5,inYEls-60+0.5], "bottom", false);sixDots([inXEls+49-7.5,inYEls-60+0.5], "bottom", false);
			fourHDots([inXEls-7.5,inYEls+60+1]); fourHDots([inXEls+49-7.5,inYEls+60+1]);
			bDChange.innerHTML = "";
		}
		break;
		case "NaCl": {
			finalize();
			initialize();
			var inX = (units/2)-15, inY = height/2;
			var inXEls = inX-15, inYEls = inY - 7;
			nHLinesBonds([inX,inY], 1, 1);
			nElements(["Na","Cl"],[inXEls-13,inYEls+1.5,inXEls+53,inYEls+1.5]);
			sixDots([inXEls+21+37.5,inYEls-6], "left", true);
			// sDChange.innerHTML = "Cl2, Chlorine";
			bDChange.innerHTML = "";
		}
		break;
		case "NaCrO4": case "NaCro4": case "NacrO4": case "Nacro4": case "NACRO4":
		case "NaCrO4": case "NaCro4": case "NacrO4": case "Nacro4":{
			finalize();
			initialize();
			var inX = (units/2)-47.5, inY = height/2;
			var inXEls = inX+47.5, inYEls = inY - 7;
			nHLines([inX,inY-0.5], 2);
			nHLines([inX-65,inY-0.5], 4);
			nVLinesBonds([inXEls,inY-48], 2, 2);
			nElements(["O","Cr","O","O","O"],[inXEls-67-4,inYEls+1,inXEls-9,inYEls+1,inXEls-5.5,inYEls-59,inXEls-5.5,inYEls+60,inXEls+60,inYEls+1]);
			nElements(["Na","Na"],[inXEls-142.5,inYEls+1,inXEls+123,inYEls+1]);
			fourHDots([inXEls-13.25,inYEls-59]); fourHDots([inXEls-13.25,inYEls+61.5]); 
			fourVDots([inXEls-70.5,inYEls-6.65]);fourVDots([inXEls+61.5,inYEls-6.65]);
			bDChange.innerHTML = "";
		}
		break;
		case "OF2":case "Of2": case "oF2": case "of2": {
			finalize();
			initialize();
			var inX = (units/2)-47.5, inY = height/2;
			var inXEls = inX+47.5, inYEls = inY - 6;
			nHLinesBonds([inX,inY], 2, 1);
			sixDots([inXEls-67,inYEls-7.15], "right", false);
			sixDots([inXEls+55,inYEls-7.15], "left", false);
			nElements(["F","O","F"],[inXEls-67,inYEls+1,inXEls-5,inYEls+1,inXEls+54,inYEls+1]);
			fourVDots([inXEls-4,inYEls-7]);
			bDChange.innerHTML = "";
		}
		break;
		case "oh-": case "OH-": case "oH-": case "Oh-": 
		case "oh^-": case "oh^(-)": case "oH^-": case "oH^(-)": case "Oh^-": case "Oh^(-)": case "OH^-":
		case "OH^(-)":{
			finalize();
			initialize();
			var inX = (units/2)-15, inY = height/2;
			var inXEls = inX-15, inYEls = inY - 7;
			nHLinesBonds([inX,inY], 1, 1);
			nElements(["O","H"],[inXEls,inYEls+2,inXEls+49,inYEls+2]);
			nElements(["-"],[inXEls+9,inYEls-7]);
			sixDots([inXEls+1,inYEls-5.5],"right", false);
			// sDChange.innerHTML = "OH^(-), Hydroxide";
			bDChange.innerHTML = "";
		}
		break;
		case "o2": case "O2":{
			finalize();
			initialize();
			var inX = (units/2)-15, inY = height/2;
			var inXEls = inX-15, inYEls = inY - 7;
			nHLinesBonds([inX,inY], 1, 2);
			nElements(["O","O"],[inXEls,inYEls+1,inXEls+49,inYEls+1]);
			fourVDots([inXEls+0.5,inYEls-6.5]); fourVDots([inXEls+16+34,inYEls-6.5]);
			// sDChange.innerHTML = "O2, Oxygen";
			bDChange.innerHTML = "";
		}
		break;
		case "PBr3":{
			finalize();
			initialize();
			var inX = (units/2)-47.5, inY = height/2;
			var inXEls = inX+47.5, inYEls = inY - 7;
			nHLines([inX,inY], 2);
			nVLines([inXEls,inY-48.5], 1);
			nElements(["Br","P","Br","Br"],[inXEls-74,inYEls+1,inXEls-4,inYEls+1,inXEls-8,inYEls-60.5,inXEls+55,inYEls+1]);
			sixDots([inXEls-70,inYEls-6.5],"right",true);
			sixDots([inXEls+60.5,inYEls-6.5],"left",true);
			sixDots([inXEls-15,inYEls-60],"bottom",true);
			twoHDots([inXEls-3.5,inYEls+19.5]);
			// sDChange.innerHTML = "PO3^(3-), Phosphite ion";
			bDChange.innerHTML = "";
		}
		break;
		case "PO3-3": case "pO3-3": case "po3-3": case "PO33-": case "pO33-": case "po33-":
		case "pO3^-3": case "pO3^(-3)": case "PO3^-3": case "PO3^(-3)": 
		case "pO3^3-": case "pO3^(3-)": case "PO3^3-": case "PO3^(3-)":{
			finalize();
			initialize();
			var inX = (units/2)-47.5, inY = height/2;
			var inXEls = inX+47.5, inYEls = inY - 7;
			nHLines([inX,inY], 2);
			nVLines([inXEls,inY-48.5], 1);
			nElements(["O","P","O","O"],[inXEls-65,inYEls+1,inXEls-4,inYEls+1,inXEls+54,inYEls+1,inXEls-4,inYEls-60.5]);
			sixDots([inXEls-64.5,inYEls-7.15],"right",false);
			sixDots([inXEls+55.5,inYEls-7.15],"left",false);
			sixDots([inXEls-12.5,inYEls-59.15],"bottom",false);
			nElements(["-","-","-"],[inXEls-53,inYEls-10,inXEls+67,inYEls-10,inXEls+7,inYEls-70]);
			twoHDots([inXEls-3.5,inYEls+16.15]);
			// sDChange.innerHTML = "PO3^(3-), Phosphite ion";
			bDChange.innerHTML = "";
		}
		break;
		case "PO4-3": case "pO4-3": case "po4-3":case "pO4^-3": case "pO4^(-3)": case "PO4^-3": case "PO4^(-3)":
		case "PO43-": case "pO43-": case "po43-":case "pO4^3-": case "pO4^(3-)": case "PO4^3-": case "PO4^(3-)":{
			finalize();
			initialize();
			var inX = (units/2)-47.5, inY = height/2;
			var inXEls = inX+47.5, inYEls = inY - 7;
			nHLines([inX,inY], 2);
			nVLines([inXEls,inY-48.5], 1);
			nVLinesBonds([inXEls+1,inY+15.5], 1, 2);
			nElements(["O","P","O","O","O"],[inXEls-65,inYEls+1,inXEls-4,inYEls+1,inXEls+54,inYEls+1,inXEls-5,inYEls-58.5,inXEls-4,inYEls+62.5]);
			sixDots([inXEls-64.5,inYEls-7.15],"right",false);
			sixDots([inXEls+55.5,inYEls-7.15],"left",false);
			sixDots([inXEls-12.5,inYEls-59.15],"bottom",false);
			nElements(["-","-","-"],[inXEls-53,inYEls-10,inXEls+67,inYEls-10,inXEls+7,inYEls-70]);
			fourHDots([inXEls-12.5,inYEls+62.15]);
			// sDChange.innerHTML = "PO4^(3-), Phosphate ion";
			bDChange.innerHTML = "";
		}
		break;
		case "P2O7-4": case "P2o7-4": case "p2O7-4": case "p2o7-4":
		case "P2O7^-4": case "P2o7^-4": case "p2O7^-4": case "p2o7^-4":
		case "P2O7^(-4)": case "P2o7^(-4)": case "p2O7^(-4)": case "p2o7^(-4)":
		case "P2O74-": case "P2o74-": case "p2O74-": case "p2o74-":
		case "P2O7^4-": case "P2o7^4-": case "p2O7^4-": case "p2o7^4-":
		case "P2O7^(4-)": case "P2o7^(4-)": case "p2O7^(4-)": case "p2o7^(4-)": {
			finalize();
			initialize();
			var inX = (units/2)-47.5, inY = height/2;
			var inXEls = inX+47.5, inYEls = inY - 6;
			nHLines([inX-65,inY], 4);
			nVLines([inX-17.25,inY-49], 1); nVLines([inX+112.75,inY-49], 1);
			nVLinesBonds([inX-18,inY+16], 1, 2); nVLinesBonds([inX+112.75,inY+16], 1, 2);
			nElements(["O","P","O","P","O"],[inXEls-134,inYEls+1.5,inXEls-69.5,inYEls+1.5,inXEls-5,inYEls+1.5,inXEls+60,inYEls+1.5,inXEls+122,inYEls+1.5]);
			nElements(["O","O","O","O"],[inXEls-69.5,inYEls-60.5,inXEls+60,inYEls-60.5,inXEls-69.5,inYEls+60.5,inXEls+60,inYEls+60.5]);
			nElements(["-","-","-","-"],[inXEls-134+11,inYEls+1.5-10,inXEls-69.5+11,inYEls-60.5-10,inXEls+60+11,inYEls-60.5-10,inXEls+122+11,inYEls+1.5-10]);
			sixDots([inXEls-77.5,inYEls-60.5], "bottom", false); sixDots([inXEls+53,inYEls-60.5], "bottom", false);
			fourVDots([inXEls-4.20,inYEls-6.75]);
			sixDots([inXEls-133.5,inYEls-6.75], "right", false); sixDots([inXEls+123,inYEls-6.75], "left", false);
			fourHDots([inXEls-77.5,inYEls+61.5]); fourHDots([inXEls+53,inYEls+61.5]);
			bDChange.innerHTML = "";2
		}
		break;
		case "SCN^(-)": case "sCN^(-)": case "ScN^(-)": case "scN^(-)":
		case "SCN^-": case "sCN^-": case "ScN^-": case "scN^-":
		case "SCN-": case "sCN-": case "ScN-": case "scN-":{
			finalize();
			initialize();
			var inX = (units/2)-47.5, inY = height/2;
			var inXEls = inX+47.5, inYEls = inY - 7;
			var adjust = 35;
			nHLinesBonds([inX,inY-adjust], 1, 1);
			nHLinesBonds([inXEls+17.5,inY-adjust], 1, 3);
			sixDots([inXEls-66,inYEls-5-adjust], "right", false);
			twoVDots([inXEls+69,inYEls+3-adjust]);
			nElements(["S","C","N"],[inXEls-67,inYEls-adjust+1,inXEls-6,inYEls-adjust+1,inXEls+54,inYEls-adjust+1]);
			nElements(["-"],[inXEls-67+10,inYEls-adjust+1-10]);
			//structure 2
			nHLinesBonds([inX,inY+adjust], 1, 2);
			nHLinesBonds([inXEls+17.5,inY+adjust], 1, 2);
			fourVDots([inXEls-66,inYEls-5.6+adjust]);
			fourVDots([inXEls+55,inYEls-5.6+adjust]);
			nElements(["S","C","N"],[inXEls-67,inYEls+adjust+1,inXEls-6,inYEls+adjust+1,inXEls+54,inYEls+adjust+1]);
			nElements(["-"],[inXEls+54+10,inYEls+adjust+1-10]);
			// sDChange.innerHTML = "SCN^(-), Thiocyanate ion";
			bDChange.innerHTML = "";
		}
		break;
		case "sCl2": case "scl2": case "SCl2":{
			finalize();
			initialize();
			var inX = (units/2)-47.5, inY = height/2;
			var inXEls = inX+47.5, inYEls = inY - 7;
			nHLines([inX,inY], 2);
			fourVDots([inXEls-4.20,inYEls-7.15]);
			nElements(["Cl","S","Cl"],[inXEls-71,inYEls,inXEls-6,inYEls,inXEls+54,inYEls]);
			sixDots([inXEls-64.5,inYEls-7.15],"right",true);
			sixDots([inXEls+61.5,inYEls-7.15],"left",true);
			// sDChange.innerHTML = "SCl2, Sulfur dichloride";
			bDChange.innerHTML = "";
		}
		break;
		case "SO2":case "so2": case "sO2":{
			finalize();
			initialize();
			var inX = (units/2)-47.5, inY = height/2;
			var inXEls = inX+47.5, inYEls = inY - 6;
			nHLinesBonds([inX,inY], 2, 2);
			fourVDots([inXEls-67,inYEls-7.15]);
			fourVDots([inXEls+55,inYEls-7.15]);
			nElements(["O","S","O"],[inXEls-67,inYEls+1,inXEls-5,inYEls+1,inXEls+54,inYEls+1]);
			twoHDots([inXEls-4,inYEls-7]);
			// sDChange.innerHTML = "SO2, Sulfur dioxide";
			bDChange.innerHTML = "";
		}
		break;
		case "SO3-2": case "So3-2": case "sO3-2": case "so3-2":
		case "SO3^-2": case "So3^-2": case "sO3^-2": case "so3^-2":
		case "SO3^(-2)": case "So3^(-2)": case "sO3^(-2)": case "so3^(-2)":
		case "SO32-": case "So32-": case "sO32-": case "so32-":
		case "SO3^2-": case "So3^2-": case "sO3^2-": case "so3^2-":
		case "SO3^(2-)": case "So3^(2-)": case "sO3^(2-)": case "so3^(2-)":{
			finalize();
			initialize();
			var inX = (units/2)-47.5, inY = height/2;
			var inXEls = inX+47.5, inYEls = inY - 7;
			nHLines([inX,inY], 2);
			nVLinesBonds([inXEls+1,inY+15.5], 1, 2);
			nElements(["O","S","O","O"],[inXEls-67,inYEls+1,inXEls-4.5,inYEls+1,inXEls+54,inYEls+1,inXEls-4.5,inYEls+60.5]);
			nElements(["-","-"],[inXEls-53,inYEls-10,inXEls+67,inYEls-10]);
			fourHDots([inXEls-12.20,inYEls+61.5]);
			sixDots([inXEls-64.5,inYEls-7.15],"right",false);
			sixDots([inXEls+55.5,inYEls-7.15],"left",false);
			twoHDots([inXEls-3.5,inYEls-6]);
			// sDChange.innerHTML = "SO3^(2-), Sulfite ion";
			bDChange.innerHTML = linksToResonance + "<br>" + about("resonance");
		}
		break;
		case "SO4-2": case "So4-2": case "sO4-2": case "so4-2":
		case "SO4^-2": case "So4^-2": case "sO4^-2": case "so4^-2":
		case "SO4^(-2)": case "So4^(-2)": case "sO4^(-2)": case "so4^(-2)":
		case "SO42-": case "So42-": case "sO42-": case "so42-":
		case "SO4^2-": case "So4^2-": case "sO4^2-": case "so4^2-":
		case "SO4^(2-)": case "So4^(2-)": case "sO4^(2-)": case "so4^(2-)":{
			finalize();
			initialize();
			var inX = (units/2)-47.5, inY = height/2;
			var inXEls = inX+47.5, inYEls = inY - 7;
			nHLinesBonds([inX,inY-0.5], 2, 1);
			// nHLines([inXEls+17.5,inY], 1);
			nVLinesBonds([inXEls,inY-48], 2, 2);
			nElements(["O","S","O","O","O"],[inXEls-67,inYEls+1,inXEls-5,inYEls+1,inXEls-5.5,inYEls-59,inXEls-5.5,inYEls+60,inXEls+54,inYEls+1]);
			fourHDots([inXEls-13.25,inYEls-58.5]); fourHDots([inXEls-13.25,inYEls+61.5]); 
			sixDots([inXEls-66.5,inYEls-6.65], "right", false);sixDots([inXEls+55.5,inYEls-6.65],"left",false);
			nElements(["-","-"],[inXEls-55,inYEls-10,inXEls+67,inYEls-10]);
			bDChange.innerHTML = linksToResonance + "<br>" + about("resonance");
		}
		break;
		case "s2o42-": case "s2o42-": case "S2O42-": case "S2O42-":
		case "s2o4^2-": case "s2o4^2-": case "S2O4^2-": case "S2O4^2-":
		case "s2o4^(2-)": case "s2o4^(2-)": case "S2O4^(2-)": case "S2O4^(2-)":
		case "s2o4-2": case "s2o4-2": case "S2O4-2": case "S2O4-2":
		case "s2o4^-2": case "s2o4^-2": case "S2O4^-2": case "S2O4^-2":
		case "s2o4^(-2)": case "s2o4^(-2)": case "S2O4^(-2)": case "S2O4^(-2)":{
			finalize();
			initialize();
			var inX = (units/2)-15, inY = height/2;
			var inXEls = inX-15, inYEls = inY - 7;
			nHLines([inX,inY], 1);
			nVLines([inXEls+5,inY-49], 1);
			nVLines([inXEls+54,inY-49], 1);
			nVLinesBonds([inXEls+5+0.25,inY+16], 1, 2);
			nVLinesBonds([inXEls+54+0.25,inY+16], 1, 2);
			nElements(["O","O"],[inXEls,inYEls-60,inXEls+49,inYEls-60]);
			nElements(["S","S"],[inXEls,inYEls+2,inXEls+49,inYEls+2]);
			nElements(["O","O"],[inXEls,inYEls+60,inXEls+49,inYEls+60]);
			nElements(["-","-"],[inXEls+10,inYEls-60-10,inXEls+49+10,inYEls-60-10]);
			twoVDots([inXEls-6,inYEls+2]); twoVDots([inXEls+64,inYEls+2])
			sixDots([inXEls-7.5,inYEls-60+0.5], "bottom", false);sixDots([inXEls+49-7.5,inYEls-60+0.5], "bottom", false);
			fourHDots([inXEls-7.5,inYEls+60+1]); fourHDots([inXEls+49-7.5,inYEls+60+1]);
			bDChange.innerHTML = "";
		}
		break;
		case "SiO2":case "Sio2":{
			finalize();
			initialize();
			var inX = (units/2)-47.5, inY = height/2;
			var inXEls = inX+47.5, inYEls = inY - 6;
			nHLinesBonds([inX,inY], 2, 2);
			nElements(["O","Si","O"],[inXEls-67,inYEls+1,inXEls-9,inYEls+1,inXEls+54,inYEls+1]);
			fourVDots([inXEls-67,inYEls-7.15]); fourVDots([inXEls+55,inYEls-7.15]);
			bDChange.innerHTML = "";
		}
		break;
		case "xef2": case "Xef2": case "XeF2": case "XEF2":{
			finalize();
			initialize();
			var inX = (units/2)-47.5, inY = height/2;
			var inXEls = inX+47.5, inYEls = inY - 7;
			nHLines([inX,inY], 2);
			nElements(["F","Xe","F"],[inXEls-65,inYEls+2,inXEls-9.5,inYEls+2,inXEls+54.5,inYEls+2]);
			twoHDots([inXEls-4,inYEls-6]);
			sixDots([inXEls-64.5,inYEls-6],"right",false);sixDots([inXEls+55.5,inYEls-6],"left",false);
			twoTDots([inXEls-14,inYEls+16], 30); twoTDots([inXEls+6,inYEls+4+16], -30);
			bDChange.innerHTML = "";
		}
		break;
		case "xeF3+": case "xeF3^+":case "xeF3^(+)":case "xef3+": case "xef3^+":case "xef3^(+)":case "Xef3+": case "Xef3^+":case "Xef3^(+)":case "XeF3+":case "XeF3^+":
		case "XeF3^(+)":{
			finalize();
			initialize();
			var inX = (units/2)-47.5, inY = height/2;
			var inXEls = inX+47.5, inYEls = inY - 7;
			nVLines([inXEls,inY-42.5], 1);
			nHLines([inX,inY], 2);
			nElements(["F","Xe","F","F"],[inXEls-67,inYEls,inXEls-10,inYEls,inXEls+54,inYEls,inXEls-6,inYEls-53]);
			sixDots([inXEls-64.5,inYEls-7.15],"right",false);
			sixDots([inXEls+55.5,inYEls-7.15],"left",false);
			sixDots([inXEls-12,inYEls-52],"bottom",false);
			twoTDots([inXEls-13,inYEls+13], 30); twoTDots([inXEls+6,inYEls+4+13], -30);
			nElements(["+"],[inXEls+5,inYEls-10]);
			//sDChange.innerHTML = "XeF3^(+), Xenon trifluoride ion";
			bDChange.innerHTML = "";
		}
		break;
		case "xeo3": case "XEO3": case "Xeo3": case "XeO3":{
			finalize();
			initialize();
			var inX = (units/2)-47.5, inY = height/2;
			var inXEls = inX+47.5, inYEls = inY - 7;
			nVLinesBonds([inXEls,inY-42.5], 1, 2);
			nHLinesBonds([inX,inY], 2, 2);
			nElements(["O","Xe","O","O"],[inXEls-67,inYEls,inXEls-10,inYEls,inXEls+54,inYEls,inXEls-6,inYEls-53]);
			fourVDots([inXEls-65.5,inYEls-7.15],"right");
			fourVDots([inXEls+55.5,inYEls-7.15],"left");
			fourHDots([inXEls-13,inYEls-52],"bottom");
			twoHDots([inXEls-4.0,inYEls+18.15]);
			// nElements(["+"],[inXEls+5,inYEls-10]);
			// sDChange.innerHTML = "XeO3, Xenon trioxide";
			bDChange.innerHTML = "";
		}
		break;
		case "ZnBr2": case "znBr2": case "Znbr2": case "znbr2": case "ZNBR2":{
			finalize();
			initialize();
			var inX = (units/2)-47.5, inY = height/2;
			var inXEls = inX+47.5, inYEls = inY - 7;
			nHLines([inX,inY], 2);
			nElements(["Br","Zn","Br"],[inXEls-75,inYEls+2,inXEls-9.5,inYEls+2,inXEls+54.5,inYEls+2]);
			sixDots([inXEls-70,inYEls-6],"right",true);sixDots([inXEls+60.5,inYEls-6],"left",true);
			bDChange.innerHTML = "";
		}
		break;
		case "ZnCl2": case "znCl2": case "Zncl2": case "zncl2": case "ZNCL2":{
			finalize();
			initialize();
			var inX = (units/2)-47.5, inY = height/2;
			var inXEls = inX+47.5, inYEls = inY - 7;
			nHLines([inX,inY], 2);
			nElements(["Cl","Zn","Cl"],[inXEls-75,inYEls+2,inXEls-9.5,inYEls+2,inXEls+54.5,inYEls+2]);
			sixDots([inXEls-70,inYEls-6],"right",true);sixDots([inXEls+60.5,inYEls-6],"left",true);
			bDChange.innerHTML = "";
		}
		break;
		case "":
		case " ":
			dSChange.innerHTML = "";
			sDChange.innerHTML = "";
			bDChange.innerHTML = "";
			theMolecule = "";
		break;
		default:{
			//initialValueOfDS = "<svg viewbox ='0 0 500 200' id='drawn'></svg>"
			dSChange.innerHTML = "<div style='position: relative; font-size: 1.5rem; text-align: centered; top: 3.4rem; max-width: 80%; margin: 0 auto;'> <span style='font-size: 2rem; color:rgba(255,0,0,0.8);'>"+molecule+"</span> is not saved in our library.<br><br>Please make sure you have followed the guidelines for syntax, or submit this molecule at the bottom of this page so that we can add it.<br><br>Much thanks. :)</div>";
			sDChange.innerHTML = "<span style='color:rgba(150,0,0,1); text-decoration: line-through;'>"+molecule+"</span>";
			bDChange.innerHTML = "";
		}
		break;
	}
	
	if (window.mobilecheck()){
		instruction();
	}
	document.getElementById("enterMolecule").value = "";
	var actualHeight = document.getElementById("smallDisplay").offsetWidth;
	document.getElementById("smallDisplay").style.height = actualHeight;
}

//----------------------------------------------------------------------------------------------------
//The following function will give a brief description of what the molecule is!

function about(molecule){
	var result = "";
	switch (molecule){
		case "CH4":
			result = "";
		break;
		case "CH3COOH":
			result = "";
		break;
		case "CH3COO^(-)":
			result = "";
		break;
		case "HCO^(+)":
			result = "Formyl cation has three resonance structures, which are shown above.";
		break;
		case "H2O":
			result = "";
		break;
		case "N2":
			result = "";
		break;
		case "NH3":
			result = "";
		break;
		case "NH4^(+)":
			result = "";
		break;
		case "NO2^(-)":
			result = "";
		break;
		case "NO3^(-)":
			result = "";
		break;
		case "OH^(-)":
			result = "";
		break;
		case "PO4^(3-)":
			result = "";
		break;
		case "SCl2":
			result = "";
		break;
		case "XeF2":
			result = "";
		break;
		case "XeF3^(+)":
			result = "";
		break;
		case "XeO3":
			result = "";
		break;
		// The following are other stuffs
		case "resonance":
			result = "This structure involves resonance, which happens by switching the double bonds in O to a different O and by fixing the formal charges.";
		break;
		default:
			result = "No facts about "+molecule.toUpperCase()+" yet.";
		break;
	}
	return result;
}

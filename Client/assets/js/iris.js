var server = "http://127.0.0.1:8080/v2";

/*
AUTHENTICATION
THX https://www.w3schools.com/js/js_cookies.asp
*/
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
/*
//AUTHENTICATION
*/
var userLang = navigator.language || navigator.userLanguage;
/*
SPEECH
THX https://speechlogger.appspot.com/developers/
*/
navigator.mediaDevices.getUserMedia({audio: true, video: false});

var listening = false;

if (!('webkitSpeechRecognition' in window)) {
} else {
	var recognition = new webkitSpeechRecognition();
	recognition.continuous = true;
	recognition.interimResults = true;
	recognition.lang = userLang; 
	//recognition.maxAlternatives = 1;
}

recognition.onstart = function() {
	document.querySelector(".send-message-voice svg").setAttribute("fill", "#888888");
	listening = true;
};

recognition.onend = function() {
	document.querySelector(".send-message-voice svg").setAttribute ("fill", "#282828");
	listening = false;
};

recognition.onresult = function(event) {
	if (typeof(event.results) === 'undefined') {
		recognition.stop();
		return;
	}
	for (var i = event.resultIndex; i < event.results.length; ++i) {	  
		if (event.results[i].isFinal) {
			document.querySelector("#inputMessage").value = event.results[i][0].transcript;
			message(document.querySelector("#inputMessage"));
		} else {
			document.querySelector("#inputMessage").value = event.results[i][0].transcript;
		} 
	}
};
document.querySelector(".send-message-voice").addEventListener("click", function(event) {
	if(listening==true){
		recognition.stop();
	} else {
		recognition.start();
	}
});
recognition.start();
/*
//SPEECH
*/
/*
SAY
*/
function say(msg){
	var speech = new SpeechSynthesisUtterance(msg);
	//var voices = speechSynthesis.getVoices();
	speech.lang = userLang;
	speech.pitch = 1;
	speech.rate = 0.8;
	//speech.voice = voices[16];
	speech.voiceURI = 'native';
	speech.volume = 1;
	speechSynthesis.speak(speech);
}
/*
//SAY
*/
function GET(url, callback) {
	if(typeof callback=="function"){
		var ajax = new XMLHttpRequest();
		ajax.open("GET", encodeURI(url), true);
		ajax.send();
		ajax.onreadystatechange = function() {
			if (ajax.readyState == 4 && ajax.status == 200) {
				var data = ajax.responseText;
				callback(data);
			}
		}
		return;
	} else {
		return "usage GET(url, callback)";
	}
}
function getRandomInt(min, max) {
	var min = Math.ceil(min);
	var max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
}
function message(msg){
	returnMsg("user", msg.value);
	getMessage(msg.value);
	msg.value = "";
}
function getMessage(msg){
	GET(server+"/"+uuid+"/"+userLang+"/"+msg, function(response){
		var response = JSON.parse(response);
		returnMsg("server", 	response["data"]);
		console.log(response["data"]);
		setCookie("uuid", 		response["uuid"]);
		uuid = response["uuid"];
	});
}
function returnMsg(who, msg){
	var messageHTML = document.createElement("div");
	messageHTML.setAttribute("class", "chat chat-from-"+who);
	document.querySelector(".conversation").append(messageHTML);
	messageHTML.textContent = msg;
	if(who!="user"){
		say(msg);
	}
	messageHTML.scrollIntoView();
}
document.querySelector("#inputMessage").onkeydown = function(key){
	if(key.key=="Enter"){
		if(document.querySelector("#inputMessage").value.trim()!=""){
			message(document.querySelector("#inputMessage"));
		} else {
			document.querySelector("#inputMessage").value = "";
		}
	}
}

var uuid = getCookie("uuid");
if(uuid==""){
	uuid = 0;
}
getMessage("LOGIN");

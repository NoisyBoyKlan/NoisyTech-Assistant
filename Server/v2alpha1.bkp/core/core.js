//THX https://stackoverflow.com/questions/1144783/how-to-replace-all-occurrences-of-a-string-in-javascript
String.prototype.replaceAll = function(search, replacement) {
	return this.replace(new RegExp(search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), 'g'), replacement);
};
/////THX

String.prototype.multisplit = function(delimiters_array){
	var string = this;
	var include = {};
	if(arguments[1]){
		include = arguments[1];
	}
	for(var i in delimiters_array){
		for(var ii in include){
			if(delimiters_array[i].indexOf(include[ii])==-1){
				string = string.replaceAll(delimiters_array[i], delimiters_array[0]);
			} else {
				string = string.replaceAll(delimiters_array[i], delimiters_array[i]+delimiters_array[0]);
			}
		}
	}
	return string.split(delimiters_array[0]);
}

Array.prototype.removeStringsFromArray = function(){
	var array = this;
	var remove = {};
	if(arguments[0]){
		remove = arguments[0];
	}
	remove[remove.length] = "";
	for(var i=array.length-1;i>-1;i--){
		array[i] = array[i].trim();
		for(var ii in remove){
			if(array[i]==remove[ii]){
				array.splice(i, 1);
			}
		}
	}
	return array;
}

isAlpha = function(ch){
	return typeof ch === "string" && ch.length === 1 && (ch >= "a" && ch <= "z" || ch >= "A" && ch <= "Z");
}

String.prototype.retouchWords = function(language){
	var string = new Function(language.functions.retouchWords.arguments, language.functions.retouchWords.body)(this);
	for(var replaceTo in language.replaceSomeWords){
		for(var replaceFromList in language.replaceSomeWords[replaceTo]){
			var replaceFrom = language.replaceSomeWords[replaceTo][replaceFromList];
			if(string==replaceFrom){
				return replaceTo;
			}
		}
	}
	return string;
}

String.prototype.generateResponse = function(language){
	var message = ((this.toLowerCase()).multisplit(language.questionSplit, {0:"?"})).removeStringsFromArray({0:"?"});
	for(var questions=0;questions<message.length;questions++){
		message[questions] = message[questions].split(" ");
		for(var words=0;words<message[questions].length;words++){
			message[questions][words] = message[questions][words].retouchWords(language);
		}
		message[questions] = message[questions].join(" ");
	}
	var message_remaining_string = new Array();
	var message_interprect = new Array();
	for(var messageId=0;messageId<message.length;messageId++){
		message_remaining_string[messageId] = message[messageId];
		message_interprect[messageId] = new Array();
		for(var replaceTo in language.detectCases){
			for(var replaceFromList in language.detectCases[replaceTo]){
				var replaceFrom = language.detectCases[replaceTo][replaceFromList];
				if(message_remaining_string[messageId].indexOf(replaceFrom)>-1){
					if(message_remaining_string[messageId].indexOf(replaceFrom)>0){
						message_interprect[messageId][message_interprect[messageId].length] = {
							"original_string": message_remaining_string[messageId].substring(0, message_remaining_string[messageId].indexOf(replaceFrom)),
							"replaced_string": "undefined",
							"original_string_pos": message[messageId].indexOf(replaceFrom),
						};
						message_remaining_string[messageId] = (message_remaining_string[messageId].replace(message_remaining_string[messageId].substring(0, message_remaining_string[messageId].indexOf(replaceFrom)), "")).trim();
						message_interprect[messageId][message_interprect[messageId].length] = {
							"original_string": replaceFrom,
							"replaced_string": replaceTo,
							"original_string_pos": message[messageId].indexOf(replaceFrom),
						};
						message_remaining_string[messageId] = (message_remaining_string[messageId].replace(replaceFrom, "")).trim();
					} else {
						message_interprect[messageId][message_interprect[messageId].length] = {
							"original_string": replaceFrom,
							"replaced_string": replaceTo,
							"original_string_pos": message[messageId].indexOf(replaceFrom),
						};
						message_remaining_string[messageId] = (message_remaining_string[messageId].replace(replaceFrom, "")).trim();
					}
					break;
				}
			}
		}
		console.log(message_remaining_string[messageId].length);
		if(message_remaining_string[messageId].length>0){
			message_interprect[messageId][message_interprect[messageId].length] = {
				"original_string": message_remaining_string[messageId],
				"replaced_string": "undefined",
				"original_string_pos": message[messageId].indexOf(message_remaining_string[messageId]),
			};
		}
	}
	console.log(message_interprect);
	return message_interprect;
	//return message;
}

module.exports = function(userInfo, language, message, callback) {
	var language;
	try {
		language = require("./languages/"+language+".js");
	} catch (exception) {
		language = require("./languages/pt-BR.json");
	}
	
	
	
	userInfo["data"] = message.generateResponse(language);;
	callback(userInfo);
}
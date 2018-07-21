function uuidv4() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
		return v.toString(16);
	});
}
function guid() {
	function s4() {
		return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
	}
	return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}
function registerUser(clientip, callback){
	var userUUID = uuidv4();
	database[userUUID] = {"userVars":{},"history":{}};
	console.log("["+clientip+"] Usuário cadastrado ("+userUUID+").");
	return callback({"uuid": userUUID});
}
function loginUser(uuid, clientip, callback){
	if(uuid==0){
		registerUser(clientip, callback);
	} else {
		if(typeof database[uuid]=="undefined"){
			return registerUser(clientip, callback);
		} else {
			return callback({"uuid": uuid});
		}
	}
}
function messageUser(uuid, clientip, language, message, callback){
	var messageId = Object.keys(database[uuid]["history"]).length;
	var date = new Date();
	database[uuid]["history"][messageId] = {
		date: 	date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear()+", "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds(),
		ip: 	clientip,
		lang: 	language,
		msg: 	message,
	};
	return callback();
}

module.exports = function(req, res, uuid, language, message, callback){
	var clientip = (req.headers['x-forwarded-for'] || "").split(',').pop() || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;
	loginUser(uuid, clientip, function(data){
		var userCredentials = data;
		messageUser(userCredentials.uuid, clientip, language, message, function(){
			require("../core/core.js")(userCredentials, language, message, callback);
		});
	});
}
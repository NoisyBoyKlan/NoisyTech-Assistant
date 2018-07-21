var http = require('http');
var fs = require('fs');
global.database = JSON.parse(fs.readFileSync('./database/database.iris', 'utf8'));
function updateData(){
	fs.writeFile('./database/database.iris', JSON.stringify(database), {spaces:4}, function(err){
		if(err){
			console.log(err);
		} else {
			var date = new Date();
			console.log("["+date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear()+", "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()+"] Banco de dados atualizado com sucesso.");
		}
	});
}
setInterval(function(){
	updateData();
}, 10000);updateData();

http.createServer(function (req, res) {
	var requestUrl = req.url.split("/");
	requestUrl.shift();
	//	apiVersion/uuid/language/message
	//	v2/MINHAUUIDSECRETA/pt-BR/Oláaaa
	for(var i in requestUrl){
		if(i>3){
			requestUrl[3] = ""+requestUrl[3]+"/"+requestUrl[i];
		}
	}
	requestUrl.splice(4);
	if(typeof requestUrl[3]=="undefined"){
		require("./etc/html.js")(req, res);
	} else {
		if(requestUrl[0]!="v2"){
			require("./etc/html.js")(req, res);
		} else {
			require("./auth/auth.js")(req, res, decodeURI(requestUrl[1]), decodeURI(requestUrl[2]), decodeURI(requestUrl[3]), function(userInfo){
				res.writeHead(200, {
					'content-type':'json/application',
					'Access-Control-Allow-Origin':'*',
				});
				res.end(JSON.stringify(userInfo));
			});
		}
	}
}).listen(8080);
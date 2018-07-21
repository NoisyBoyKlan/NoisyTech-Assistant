module.exports = function(req, res){
	res.writeHead(200, {
		'content-type':'text/plain'
	});
	res.end("Iris em breve.\n\n/v2/uuid/language/message\n\nby Hiperesp");
}
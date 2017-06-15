exports.index = function(req,res){
	res.render('../app/index.html', {title: 'API Gateway Dashboard', session: true});
}
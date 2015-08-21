var mongoose = require('mongoose');
var Traveller = mongoose.model('Traveller');
var Guide = mongoose.model('Guide');
var Review = mongoose.model('Review');
// var Xgo = mongoose.model('Xgo');
module.exports =(function(){
return {
	show:function(req, res){
		Guide.find({}, function(err, results){
			if (err){
				console.log(err);
			}else {
				res.json(results);
			}
		})
	},
	add:function(req, res){
		var new_guide = new Guide({email: req.body.email, username: req.body.username, password: req.body.password, area:req.body.area});
			new_guide.save(function(err, results){
			if(err){
				console.log("ERROR");
			}else{

				res.json(results);
			}
		})
	},
	showone:function(req,res){
		// console.log("showone");
		// console.log(req.params.id);
		// Guide.findOne({_id:req.params.id}).populate('reviews').exec(function(err, guide){

		// 	console.log('inshowone');
		// 	console.log(guide);
		// 	res.json(guide);
		// })
		Guide.findOne({_id:req.params.id}, function(err, guide){
			if(err){
				console.log(err);
			}else {
				// con sole.log(guide);
				res.json(guide);
			}
		});

	},
	searchGuides:function(req,res){
		// console.log(req.body);
	Guide.find(req.body, function(err, result){
		if(err){
				console.log(err);
			}else {
				// console.log(guide);
				res.json(result);
			}
		});
	},
	login: function(req, res){
		// console.log(req.body);
	Guide.find(req.body, function(err, result){
			if(err){
				console.log(err);
			}else {
				// console.log(result);
				res.json(result);
			}
		})
	},
addAvailabilities: function(req,res){
	console.log("server", req.body);
	console.log("idr", req.params.id);
	// Guide.findById(req.params.id, function(err, info) {
    // if (err) return res.send("contact create error: " + err);

    Guide.update({_id: req.params.id}, {$push: {"availabilities": req.body}}, function(err, info) {
      if (err) return res.send("contact addMsg error: " + err);
      // console.log('The number of updated documents was %d', numAffected);
      // console.log('The raw response from Mongo was ', rawResponse);
      console.log("response", info);
      // res.send(info);

    });
Guide.findOne({_id: req.params.id}, function(err, results){
console.log("results", results.availabilities);
res.json(results.availabilities);
})

}



}
})();

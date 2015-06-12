var express = require('express'),
    app = express(),
    morgan = require('morgan'),
    db = require('./models'),
    methodOverride = require('method-override'),
    bodyParser = require('body-parser'),
    request = require('request');

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(morgan('tiny'));
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended:true}));

//root
app.get("/", function(req, res){
	res.redirect("/scores")
})
//index
app.get("/scores", function(req, res) {
	db.Score.find({}, function(err, scores){
		if(err){
			res.render('errors/404')
		}
		else {
			res.render("scores/index", {scores:scores});
		}
	})
});

//new
app.get("/scores/new", function(req, res){
	res.render('scores/new')
})

//create
app.post("/scores", function(req, res){
	db.Score.create(req.body.score, function(err){
		if(err){
			res.render('errors/500')
		}
		else{
			res.redirect('/scores');
		}
	})
});


//randomsong
app.get("/scores/randomsong", function(req, res){
	var url = "https://itunes.apple.com/lookup?id=" + "376116617";
	request(url, function(error, response, body){
		if(error){
			res.render('errors/500')
		}
		else if(!error && response.status===200){
			songs = JSON.parse(body);
			res.render('scores/randomsong');
		}
	})
})

//show
app.get('/scores/:id', function(req, res){
	db.Score.findById(req.params.id, function(err, score){
		if(err){
			res.render('errors/500')
		}
		else{
			res.render('scores/show', {score:score});
		}
	})
});

//edit
app.get("/scores/:id/edit", function(req, res){
	db.Score.findById(req.params.id, function(err, score){
		if(err){
			res.render('errors/500')
		}
		else{
			res.render('scores/edit', {score:score})
		}
	})
});

//update
app.put("/scores/:id", function(req, res){
	db.Score.findByIdAndUpdate(req.params.id, req.body.score, function(err, scores){
		if(err){
			res.render('errors/500')
		}
		else{
			res.redirect('/scores', {scores: scores})
		}
	})
});

//destroy
app.delete("/scores/:id", function(req, res){
	db.Score.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.render('errors/500');
		}
		else{
			res.redirect('/scores');
		}
	})
});




app.listen(3000, function() {
  console.log("You started the serever on port 3000, well done!");
});
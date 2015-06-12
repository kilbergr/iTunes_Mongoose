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

//create
app.post("/scores", function(req, res){
	db.Score.create(req.body.score, function(err){
		if(err){
			res.render('errors/500')
		}
		else{
			res.redirect('scores/index');
		}
	})
});

//new
app.get("/scores/new", function(req, res){
	res.render('scores/new')
})

//randomsong
//app.get("/scores/")

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
			res.redirect('scores/index', {scores, scores})
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
			res/redirect('scores/index');
		}
	})
});



app.listen(3000, function() {
  console.log("You started the serever on port 3000, well done!");
});
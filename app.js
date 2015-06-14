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

//choose a random song
var songIds = ["995535015", "966411602", "823593456", "956689796", "943946671",
                 "982388023", "907242704", "201281527", "656801339", "910038357",
                 "250038575", "878000348",  "794095205",  "1645339",  "400835962",
                 "325618", "191924084",  "376116617",  "169003415",  "51958108",
                 "76532142", "192688540", "684811768", "344799464", "217633921",
                 "192811017", "258404365", "71068886", "640047583", "517438248" ];

//choose random element
var playGuess = function(){
	return Math.floor(Math.random()*songIds.length);
	};
// var play = function(song){
// 	var audio = document.getElementById("audio_id");
// 	audio.src="song.previewURL";
// 	audio.oncanplay = function() {
// 		console.log("audio can play");
//   	audio.play();
//    }
// }

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
app.get("/randomsong", function(req, res){
	var randSong = playGuess();
	var url = "https://itunes.apple.com/lookup?id=" + songIds[randSong];
	request(url, function(error, response, body){
		if(error){
			res.render('errors/500')
		}
		else if(!error && response.statusCode ===200){
			song = JSON.parse(body).results[0];
			res.render('scores/randomsong');
		}
		else{
			res.send(response.statusCode + "");
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
			//res.json(score);
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
	db.Score.findByIdAndUpdate(req.params.id, req.body.score, function(err){
		if(err){
			res.render('errors/500')
		}
		else{
			res.redirect('/scores')
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
  console.log("You started the server on port 3000, well done!");
});
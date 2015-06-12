$(function() {
var wins = 0;
var loses = 0;
  var songIds = ["995535015", "966411602", "823593456", "956689796", "943946671", "900672609",
                 "982388023", "907242704", "201281527", "684545030", "656801339", "910038357", "499875050",
                 "250038575", "878000348", "493341471", "794095205", "189219134", "192678292",  "1645339", "400835962",
                 "325618", "191924084",  "376116617", "401164378", "169003415",  "51958108", "703590286",
                 "76532142", "192688540", "684811768", "540020920", "344799464", "217633921",
                 "192811017", "907242703", "258404365", "71068886", "640047583", "517438248" ];

var playGuess = function(){
	//choose random element
	var randSong = Math.floor(Math.random()*songIds.length);
	var data;
	//ajax lookup by random song ID
		$.ajax({
		   url: "https://itunes.apple.com/lookup?id=" + songIds[randSong],
		   jsonp: "callback",
		   dataType: "jsonp"
		   //function to get song from the looked up id
		}).done(function(songInfo) {
			//play song
			data = songInfo.results[0];
				$("#audio_id").attr("src", data.previewUrl);
				$("#audio_id").on("canplay", function() {
  			$("#audio_id")[0].play();
				});

			//enter guess and check match song of to guess
			$("input").off("keypress");
			$("input").keypress(function(e){
				if(e.which === 13){
					e.preventDefault();
					var guess = this.value;
						if(guess===data.trackName || guess === data.artistName || guess === data.collectionName || guess=== data.collectionCensoredName || guess===data.trackCensoredName){
							wins++;
	     					});
						}
						else {
							loses++;
						}
					}
				});
		});	
	}
	playGuess();
		$("button").on("click", function(){
			playGuess();
		})
});
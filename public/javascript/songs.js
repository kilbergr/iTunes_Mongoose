$(function() {
	var wins = 0;
	var loses = 0;

	var play = function(songInfo) {
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
					};
				}
				else {
					loses++;
				}
			})
		};
});
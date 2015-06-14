$(function() {
  var wins = 0, 
  losses = 0;
  var playIt = function(){
  	$("#audio_id").on("canplay", function(){
  		$("#audio_id")[0].play();
 	 		})
		}

	var guess = function(){
		$("#guess").on("click", function(event){
			event.preventDefault();
			var guess = $("input");
			var album = new RegExp($("#albumName")[0].innerHTML);
			var artist = new RegExp($("#artistName")[0].innerHTML);
			var track = new RegExp($("#songName")[0].innerHTML);
			console.dir(guess);
			//if(guess.search(track) !== -1);{
		//		console.log("yes");
			//}
			
			// if(guess === album || guess === artist  || guess === track){
			// 	wins++;
			// }
			// else {
			// 	losses++;
			// }
			// console.log("wins: " + wins+ "; losses: " + losses);
		})
	}
		playIt();
		guess();

});



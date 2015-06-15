$(function() {
  var wins = 0, 
  losses = 0;

	var identify = function(){
		$("#userID").on('submit', function(event){
			event.preventDefault();
			var user = $("#userID")[0][0].value;
			if(user){
				$("#songID").css("visibility", "visible");
				$("#audio_id")[0].play();
			}
			else{
				alert("Please enter your name");
	 		}
		})
	}
	var guess = function(){
		$("#songID").on("submit", function(event){
			//event.preventDefault();
			var date = new Date();
			var triumphDate = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear().toString().substr(2,2);
			var guess = $("input.songinput")[0].value;
			var album = $("#albumName")[0].innerHTML;
			var artist = $("#artistName")[0].innerHTML;
			var track = $("#songName")[0].innerHTML;
			$("#addname").val($("#userID")[0][0].value);

			if(guess === album || guess === artist  || guess === track){
				wins++;
				
				$("#addscore").val(1);
				//$("#adddate").val(triumphDate);
				$("#correct").css("visibility", "visible");
				$("#win").css("display", "inline");
				$("#incorrect").css("visibility", "hidden");
				$("#loss").css("display", "none");
				$("#board").css({
					"background-image": "url(http://media.giphy.com/media/10Y3CxSnTI2kFO/giphy.gif)", 
					"background-attachment": "fixed",
					"background-size": "30%"
				});
				$("th").css("color", "white");
				$("h2").css("color", "white");
				$("td").css("color", "white");
			}
			else {
				losses++;
				$("#addscore").val(0);

			//$("#adddate").val(triumphDate);
				$("#incorrect").css("visibility", "visible");
				$("#loss").css("display", "inline");
				$("#correct").css("visibility", "hidden");
				$("#win").css("display", "none");
				$("#board").css({
					"background-image": "url(http://rogerbourland.com/wp-content/uploads/2012/08/arthurschatz1.jpg)", 
					"background-attachment": "fixed",
					"background-size": "30%" 
				});		
				$("th").css("color", "white");
				$("h2").css("color", "white");		
				$("td").css("color", "white");	
			}
			$("#wins").html(wins);
			$("#losses").html(losses);
			$("#solution").css("visibility", "visible");
			addScore();
		})
	}
	var addScore = function(){
		console.log($("#userinput")[0]);
	}

	// var resetIt = function(){
	// 	$("#reset").on("click", function{

	// 	})
	// }

		identify();
		guess();

		//resetIt();

});



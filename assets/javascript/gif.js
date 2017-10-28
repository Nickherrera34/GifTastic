$(document).ready(function(){
	// console.log("ready");
//initial button array
var addReactions = ["Happy","Sad","Angry","Confused","Laughing","Bored","Sleepy","Excited","Creepy","Stunned", "Okay", "Shrug", "Spooky", "Speachless", "OMG"];

function renderButtons(){
		$("#gifButtons").empty();

	for (i = 0; i < addReactions.length; i++){
		var a = $("<button>");
		a.attr("data-reaction", addReactions[i]);
		a.text(addReactions[i]);
		$("#gifButtons").prepend(a);
    // console.log(a.attr("data-reaction"));
	}
}

 renderButtons();

 $("#searchButton").on("click", function(event) {
        event.preventDefault();     
        var newReaction = $("#searchQuery").val().trim();        
        addReactions.push(newReaction);               
        renderButtons();
  });

      

$("button").on("click", function(event) {
      
      var reaction = $(this).attr("data-reaction");
      // console.log(reaction);
      console.log(this);

    //need to change out variable once I can get it to pull correctly
      var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + reaction + "&api_key=Al3YVaFhJ3uHwjQcLmF5sg8QaCk6wVl1&limit=10";
      // console.log(queryURL);

      $.ajax({
          url: queryURL,
          method: "GET"
        })
        
        .done(function(response) {
          
          var results = response.data;

       
          for (var i = 0; i < results.length; i++) {
            
           
            if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
           
              var gifDiv = $("<div class='item'>");
              var rating = results[i].rating; 
              // console.log(rating);          
              var p = $("<p>").text("Rating: " + rating);
              var reactionImage = $("<img>");
         
              reactionImage.attr("src", results[i].images.fixed_height.url);
              // console.log(reactionImage);
   
              gifDiv.append(p);
              gifDiv.append(reactionImage);
              
              $("#gifContent").prepend(gifDiv);
            }
          }
        });
    });
})
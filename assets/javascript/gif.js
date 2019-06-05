// Initial variable for gif array
var topics = ["Sloths", "Owls", "Fish"];

function animalName(){
    
    var animal = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=7J35IqOqnxdgS8ZFTzJaQurODtJJTYJG&limit=10";

    $.ajax({
        url:queryURL,
        method: "GET"
    })
    .then(function(response){
        var results = response.data;
        $("#animalGifs").empty();
        for (var i=0; i < results.length; i++){
            if (results[i].rating !=="r"){

                var gifDiv = $("<div>");
                    gifDiv.addClass("clickable");

                var rating = results[i].rating;

                var p = $("<p>").text("Rating: " + rating);
                
                var animalImage = $("<img>");
                
                animalImage.attr("src", results[i].images.fixed_height.url);
                
                // give attributes for still and animated
                
                
                gifDiv.append(p);
                gifDiv.append(animalImage);
                $("#animalGifs").prepend(gifDiv);
            }
        }
    });    
};
// Initial variable for gif array
var topics = ["Sloths", "Owls", "Fish"];

function renderButtons() {
    //clears all buttons to stop from having repeated buttons
    $("#animalButtons").empty();
    //for loop that goes through "topics" array and makes each index a button
    for (i = 0; i < topics.length; i++){
        var gifButton = $("<button>");
          // Adding a class of gif to our button
          gifButton.addClass("gif");
          // Adding a data-attribute
          gifButton.attr("data-name", topics[i]);
          // Providing the initial button text
          gifButton.text(topics[i]);
          // Adding the button to the HTML
          $("#animalButtons").append(gifButton);
    }
};

// Calling the renderButtons function to display the intial buttons
renderButtons();

function animalName(){
    $("button").on("click", function (event){
        event.preventDefault();

        var animal = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=9hiva0MxBroQdI1A23eUS7o6xT2Inyty&limit=10";


        $.ajax({
            url: queryURL,
            method: "GET"
        })
        .then(function(response){
            console.log(queryURL);
            console.log(response);
            var results = response.data;
            console.log(results);
            $("#animalGifs").empty();
            for (var i=0; i < results.length; i++){

                    var gifDiv = $("<div>");
                        gifDiv.addClass("clickable");

                    var rating = results[i].rating;

                    var p = $("<p>").text("Rating: " + rating);
                    
                    var animalImage = $("<img>");
                    
                    animalImage.attr("src", results[i].images.fixed_height_still.url);
                    
                    //gives attribute for still 
                    animalImage.attr("data-still", results[i].images.fixed_height_still.url);

                    //gives attribute for animated
                    animalImage.attr("data-animate", results[i].images.fixed_height.url);

                    //sets the data state
                    animalImage.attr("data-state", "still");

                    //gives the gif a class
                    animalImage.attr("class", "clickable");
                    
                    //Appends both p and img to the div
                    gifDiv.append(p);
                    gifDiv.append(animalImage);

                    // Prependng the gifDiv to the index within the animalGifs div
                    $("#animalGifs").append(gifDiv);
            }
        })
    })
};

$(document).on("click", ".clickable", function() {

    //pulls the data-state
    var state = $(this).attr("data-state");

    
    if (state === "still") {
        //switches to the animated image
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } 
      
    else {
        //switches to the still image
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }

});


// creates a new button when the button is clicked
$("#addAnimal").on("click", function(event) {
    event.preventDefault();
    // Get input info
    var newGif = $("#animalInput").val().trim();


    // adds the new gif to the original array
    topics.push(newGif);

    // pulls back to render buttons from earlier
    renderButtons();

  });

$(document).on("click", animalName);


//currently, some functionality is missing.
//the AJAX call, once completed, will pull the information and then insert the still image onto the page.
//once displayed, the image will be clickable to begin the animated image.
//should the image be clicked on again, the animated image will be switched out for the still image to pause the gif.

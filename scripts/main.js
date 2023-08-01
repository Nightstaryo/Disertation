$(document).ready(function() {

    initMap();
    loadData();
    initweather();
    //function to load the data from the Json and display username and tweet in the Tweets div
    function loadData() {
        //Get the twitter data
        $.getJSON("data/kf6013_assignment_data.json", function(data) {
            console.log("Data loaded correctly");
            console.log("There are " + data.statuses.length + "Twitter statuses within the dataset");
            $("main").prepend("<p>There are " + data.statuses.length + " Twitter statuses withinthe dataset</p>")
			//create an array ready to hold each entry thats going to be displayed
            var items = [];

            //iterate over each key and return the value 
            $.each(data.statuses, function(key, val) {
                //Select only the tweets that contain #climatechange and #NetZero
                if (val.text.toLowerCase().includes("#climatechange") || val.text.toLowerCase().includes("#netZero")) {

                    //Add Each value to a description list to display the username followed by the text 
                    items.push("<dt>" + val.user.name + "</dt>");
                    items.push("<dd>" + val.text + "</dd>");
                }
            });

            // Join the dl to the Div id tweets created in the index.html to display the username and then the text
            $("<dl/>", {
                "class": "tweet-list",
                html: items.join("")
            }).appendTo("#tweets");
            initMap();


        }).fail(function() {

            console.log("An error has occurred.");

        });
    }
    //Initialize the map
    function initMap() {
        const directionsService = new google.maps.DirectionsService();
        const directionsRenderer = new google.maps.DirectionsRenderer();
		var delayBetweenRequests = 1000;
        //set the starting centre point
        let myLatlng = new google.maps.LatLng(54.97699490413064, -1.6076117350609478);
        let mapOptions = {
            center: myLatlng,
            zoom: 5,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            streetViewControl: true,
            overviewMapControl: false,
            rotateControl: false,
            scaleControl: false,

        };

        //assign the map to the div created in index.html
        let map = new google.maps.Map(document.getElementById("map-area"),
            mapOptions);
        directionsRenderer.setMap(map);
        let customControlDiv = document.createElement('div');
        customControlDiv.id = "customControlDiv";
        map.controls[google.maps.ControlPosition.TOP_RIGHT].push(customControlDiv);
		var delayBetweenIterations = 100;
        //Get the data
        $.getJSON("data/kf6013_assignment_data.json", function(data) {
            //iterate over each key and return the value 
            $.each(data.statuses, function(key, val) {
                //Select only the tweets that contain #climatechange and #NetZero
                if (val.text.toLowerCase().includes("#climatechange") || val.text.toLowerCase().includes("#netzero")) {
                    //check if the tweet has a geo location attatched, with the json provided no tweet has it attatched 
                   
				if(val.geo!==null){
				 var username = val.user.name;
				var tweet = val.text;
				 var latitude = val.geo.location;
				var longitude = val.geo.location;
				processTweets(username, tweet, map, latitude, longitude,directionsService,directionsRenderer);
						
				}
                    //if the tweet has a location push the username tweet and location to the tweets array to display on map 
                    if (val.user.location != "") {
						console.log("This is a limit tester");
					 var username = val.user.name;
						var tweet = val.text;
						var tweetLocation = val.user.location;
						var geocoder = new google.maps.Geocoder();
						setTimeout(function() {
                        geocoder.geocode({
                            address: tweetLocation
                        }, function(results, status) {
                            if (status === google.maps.GeocoderStatus.OK && results.length > 0) {
                                var location = results[0].geometry.location;
                                var latitude = location.lat();
                                var longitude = location.lng();
								processTweets(username, tweet, map, latitude, longitude,directionsService,directionsRenderer);
								
							
		} else {
                                console.log("Geocoding failed for the place name:", tweetLocation, status);
							
								
                            }
							});
					},delayBetweenIterations);
                    }
                }
            });
            
        }).fail(function() {

            console.log("An error has occurred.");

        });




    }

    function initweather() {

        $.getJSON("http://api.geonames.org/weatherJSON?north=4.973&south=0&east=-1.614&west=0&username=jamesfishleigh", function(result) {

            var myObj = result.weatherObservations[1];
			document.getElementById("location").innerHTML ="Living Planet HQ, Newcastle Upon Tyne";
			console.log(myObj);
            $("#clouds").text(myObj.clouds);
            $("#humidity").text(myObj.humidity);
            $("#windspeed").text(myObj.windSpeed);
            $("#temperature").text(myObj.temperature);
			$("#datetime").text(myObj.datetime);
			$("#weatherCondition").text(myObj.weatherCondition);

            $.each(result.weatherObservations, function(key, myObj) {
                console.log(myObj);
            });

        })
    }
	function convertPlaceName(tweetLocation,callback){
		
		
	}
	function processTweets(username,tweet,map,latitude,longitude,directionsService,directionsRenderer){
			 var tweetLocation =new google.maps.LatLng(latitude, longitude)
						let myLatlng=new google.maps.LatLng(54.97699490413064, -1.6076117350609478);
						let Latlng = new google.maps.LatLng(latitude, longitude);
                           let marker = new google.maps.Marker({
                                    position: Latlng,
                                    map: map,
                                    title: username,
                                });
                                //set icon based on Hashtags
								
                                if (tweet.toLowerCase().includes("#climatechange") && tweet.toLowerCase().includes("#netzero")) {
                                    marker.setIcon("images/combined.png");

                                } else if (tweet.toLowerCase().includes("#climatechange")) {
                                    marker.setIcon("images/climatechange.png");
                                } else if (tweet.toLowerCase().includes("#netzero")) {
                                    marker.setIcon("images/netzero.png");
                                }

                                //set infor marker content 
                                const content =
                                    '<div id=content>' +
                                    '<h2>' + username + '</h2>' +
                                    '<p>' + tweet + '</p>' +
                                    '</div>';

                                const infowindow = new google.maps.InfoWindow({
                                    content: content,
                                    ariaLabel: username,
                                });
                                //hover over marker to see info marker
                                google.maps.event.addListener(marker, 'mouseover', function() {

                                    infowindow.open({
                                        anchor: marker,
                                        map,


                                    });
                                }); //when mouse moves away close info marker 

                                google.maps.event.addListener(marker, 'mouseout', function() {

                                    infowindow.close()
                                });
                                google.maps.event.addListener(marker, 'click', function() {
                                    //dislpay weather
                                    //Convert Lat and Lon to north west east and south, using 1 for a larger range so that all markers return a temp
                                    var north = latitude + 1;
                                    var south = latitude - 1;
                                    var east = longitude + 1;
                                    var west = longitude - 1;
                                    //Pass to Weather and return humidity, clouds, wind speedn and temp
                                    $.getJSON("http://api.geonames.org/weatherJSON?north=" + north + "&south=" + south + "&east=" + east + "&west=" + west + "&username=jamesfishleigh", function(result) {
                                        console.log(result);
                                        var myObj = result.weatherObservations[0];
										document.getElementById("location").innerHTML = tweetLocation;
                                        $("#clouds").text(myObj.clouds);
                                        $("#humidity").text(myObj.humidity);
                                        $("#windspeed").text(myObj.windSpeed);
                                        $("#temperature").text(myObj.temperature);

                                        $.each(result.weatherObservations, function(key, myObj) {
                                            console.log(myObj);
                                        });

                                    })
                                    //directions

                                    calculateAndDisplayRoute(directionsService, directionsRenderer, myLatlng, tweetLocation);

                                    //directions end
                                });
		
		
		
		
	}
    function calculateAndDisplayRoute(directionsService, directionsRenderer, origin, destination) {
        directionsService
            .route({
                origin: origin,
                destination: destination,

                travelMode: google.maps.TravelMode.DRIVING,
            })
            .then((response) => {
                directionsRenderer.setDirections(response);
                const distance = response.routes[0].legs[0].distance.text;
                const duration = response.routes[0].legs[0].duration.text;
                console.log(distance);
                document.getElementById("distance").innerHTML = distance;
                document.getElementById("duration").innerHTML = duration;
				
            })
            .catch((e) => window.alert("Directions request failed due to no route found " + status));
    }



});
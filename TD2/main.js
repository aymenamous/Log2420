
$(document).ready(function(){
	
	$(".nav").css("margin-top",$(".menu-horizontal").height()+10);
	$("#carte").load("carteStations.html");
	$("#liste").load("listeStations.html");
	
});

function activateAutoComplete(){
	$.getJSON( "https://secure.bixi.com/data/stations.json", function(data) {
		var stationName = [];
		$.each( data["stations"], function(key,val ) {
		stationName.push(val["s"]);
		
		});
		$("#tags" ).autocomplete({
				source: stationName
			});
	});
	
};

/*function loadCOntent(file,divId){
	
	
	xhttp.open("GET", file, true);
	xhttp.send();
	}
*/
function initMap() {
	var map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: -34.397, lng: 150.644},
		zoom: 15
	});
	var infoWindow = new google.maps.InfoWindow({map: map});
	
	// Try HTML5 geolocation.
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
				lat: position.coords.latitude,
				lng: position.coords.longitude
			};
			
            infoWindow.setPosition(pos);
            infoWindow.setContent('Vous &ecirctes ici');
            map.setCenter(pos);
			}, function() {
            handleLocationError(true, infoWindow, map.getCenter());
		});
	} else {
	// Browser doesn't support Geolocation
	handleLocationError(false, infoWindow, map.getCenter());
	}
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
infoWindow.setPosition(pos);
infoWindow.setContent(browserHasGeolocation ?
'Error: The Geolocation service failed.' :
'Error: Your browser doesn\'t support geolocation.');
}
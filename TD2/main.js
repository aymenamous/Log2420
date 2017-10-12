
$(document).ready(function(){
	
	$(".nav").css("margin-top",$(".menu-horizontal").height()+10);
	$("#carte").load("carteStations.html");
	$("#liste").load("listeStations.html");
	
	
});

var map;
var marker;
function activerAutoComplete(){
	$.getJSON( "https://secure.bixi.com/data/stations.json", function(data) {
		var stationName = [];
		$.each( data["stations"], function(key,val ) {
			stationName.push(val["s"]);
			
		});
		$("#tags" ).autocomplete({
			source: stationName,
			select: function(event, ui){
				$("#stationChoisie").text(ui["item"]["value"]);
				
				
				var pos = {lat: 0, lng: 0};
				$.each( data["stations"], function(key,val ) {
					if (val["s"] == ui["item"]["value"] ){
						pos["lat"] = val["la"];
						pos["lng"] = val["lo"];
						$("#idStation").text(val["n"]);
						$("#idStation").addClass("colonneCircle");
						$("#velosDispo").text(val["ba"]);
						remplirEtatStation("#bloque",val["b"]);
						$("#bornesDispo").text(val["da"]);
						remplirEtatStation("#suspendue",val["su"]);
						$("#velosIndispo").text(val["bx"]);
						remplirEtatStation("#horsService",val["m"]);
						$("#borneIndispo").text(val["dx"]);
					}
					
				});
				if (marker != null){
					marker.setMap(null);
				}
				marker = new google.maps.Marker({
					position: pos,
					map: map,
				});
			}
		});
	});
	
	
};

function remplirEtatStation(colonne,valeur){
	if (valeur == false){
		$(colonne).text("Non");
	}
	else{
		$(colonne).text("Oui");
	}
}

/*function loadCOntent(file,divId){
	
	
	xhttp.open("GET", file, true);
	xhttp.send();
	}
*/
function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
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
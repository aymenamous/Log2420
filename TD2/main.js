
$(document).ready(function(){
	
	$(".nav").css("margin-top",$(".menu-horizontal").height()+10);
	$("#carte").load("carteStations.html");
	$("#liste").load("listeStations.html");
	
	
});

var map;
var marker;
var stations;
var stationName = [];

function getData(callback) {
	if (stations) {
		callback(stations, stationName);
		return;
	}

	function getState(station) {
		if (station.b) { return "bloqu&eacute"; }
		if (station.su) { return "suspendu"; }
		if (station.m) { return "hors service"; }
		return "active";
	};

	$.getJSON( "https://secure.bixi.com/data/stations.json", function(data) {
		stations = data["stations"];
		$.each( stations, function(key,val ) {
			stationName.push(val["s"]);
			val.state = getState(val);
		});

		callback(stations, stationName);
	});
};

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

function showTable() {

	getData(function(stations, stationName) {
		console.log(stations);
		var data = stations.map(function(station) {
			return [
				station.id,
				station.s,
				station.ba,
				station.da,
				station.state,
			];
		});
		$('#caracteristique').DataTable({
            data: data,
            columns: [
                {
                    title: "ID"
                }, {
                    title: "Nom"
                }, {
                    title: "V&eacutelos disponibles"
                }, {
                    title: "Bornes disponibles"
                }, {
                    title: "&Eacutetat"
                }
            ],
			language: {
			    "sProcessing":     "Traitement en cours...",
			    "sSearch":         "Rechercher&nbsp;:",
			    "sLengthMenu":     "Afficher _MENU_ &eacute;l&eacute;ments",
			    "sInfo":           "Affichage de l'&eacute;l&eacute;ment _START_ &agrave; _END_ sur _TOTAL_ &eacute;l&eacute;ments",
			    "sInfoEmpty":      "Affichage de l'&eacute;l&eacute;ment 0 &agrave; 0 sur 0 &eacute;l&eacute;ment",
			    "sInfoFiltered":   "(filtr&eacute; de _MAX_ &eacute;l&eacute;ments au total)",
			    "sInfoPostFix":    "",
			    "sLoadingRecords": "Chargement en cours...",
			    "sZeroRecords":    "Aucun &eacute;l&eacute;ment &agrave; afficher",
			    "sEmptyTable":     "Aucune donn&eacute;e disponible dans le tableau",
			    "oPaginate": {
			        "sFirst":      "Premier",
			        "sPrevious":   "Pr&eacute;c&eacute;dent",
			        "sNext":       "Suivant",
			        "sLast":       "Dernier"
			    },
			    "oAria": {
			        "sSortAscending":  ": activer pour trier la colonne par ordre croissant",
			        "sSortDescending": ": activer pour trier la colonne par ordre d&eacute;croissant"
			    }
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
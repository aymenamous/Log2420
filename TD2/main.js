//Variables gloables
var map; //Carte de la ville
var marker; //Marker qui sera mis sur la carte
var stations; //Les stations 
var stationName = []; //Les noms des stations

//Initialisation de la page
$(document).ready(function(){
	//Positionnement des onglet en dessous du menu horizontal
	$(".nav").css("margin-top",$(".menu-horizontal").height()+10);
	//Chargement du contenu des deux onglets 
	$("#carte").load("carteStations.html");
	$("#liste").load("listeStations.html");
	//Redirection à la même page en cliquant sur accueil ou vélo de Montréal
	document.getElementsByName('redirect')[0].href = window.location.pathname;
	document.getElementsByName('redirect')[1].href = window.location.pathname;
	
	
});

//Autocomplete de la barre de recherche
//affiche les proposition selon ce qui écrit et remplit le tableau état de la station de vélos
function activerAutoComplete(){
	$.getJSON( "https://secure.bixi.com/data/stations.json", function(data) {
		var stationName = [];
		//Mettre dans stationName tous les noms de stations
		$.each( data["stations"], function(key,val ) {
			stationName.push(val["s"]);
			
		});
		//Fonctin d'autocomplete
		$("#tags" ).autocomplete({
			//les propositions
			source: stationName,
			//Fonction quand on choisit un élément des propositions : remplit le tableau et affiche le nom de la station sélectionnée
			select: function(event, ui){
				//Afficher le nom de la station sélectionée
				$("#stationChoisie").text(ui["item"]["value"]);
				//Initialisation de la position du marker
				var pos = {lat: 0, lng: 0};
				//Parcours des données de la station
				$.each( data["stations"], function(key,val ) {
					//Si le nom correspond au nom de la station sélectionnée
					if (val["s"] == ui["item"]["value"] ){
						//Définition de la position
						pos["lat"] = val["la"];
						pos["lng"] = val["lo"];
						//Remplir le tableau
						$("#idStation").text(val["n"]);
						$("#velosDispo").text(val["ba"]);
						remplirEtatStation("#bloque",val["b"]);
						$("#bornesDispo").text(val["da"]);
						remplirEtatStation("#suspendue",val["su"]);
						$("#velosIndispo").text(val["bx"]);
						remplirEtatStation("#horsService",val["m"]);
						$("#borneIndispo").text(val["dx"]);
						//ajouter classe pour les éléments du talbeau
						$("#idStation").addClass("circledValue");
						$("#bloque").addClass("circledValue");
						$("#suspendue").addClass("circledValue");
						$("#horsService").addClass("circledValue");
						$("#velosDispo").addClass("circledValue");
						$("#bornesDispo").addClass("circledValue");
						$("#velosIndispo").addClass("circledValue");
						$("#borneIndispo").addClass("circledValue");
						//Définition de la couleur selon le résultat de la colonne
						couleurColonne("#bloque");
						couleurColonne("#suspendue");
						couleurColonne("#horsService");
						couleurColonne("#velosDispo");
						couleurColonne("#bornesDispo");
					}
				});
				//Si il y a déjà un marker, on le réinitialise
				if (marker != null){
					marker.setMap(null);
				}
				//Instantiation du marker
				marker = new google.maps.Marker({
					position: pos,
					map: map,
				});
			}
		});
	});
};

//Fonction qui attribue la couleur du background des colonnes
function couleurColonne(colonne){
	//Si la valeur = Non ou = 0 , attribution de la couleur verte
	if ($(colonne).text() == "Non" || $(colonne).text()!="0"){
		$(colonne).css("background-color","#33bb7a");
	}
	//Sinon attribution de la couleur rouge
	else{
		$(colonne).css("background-color","#ee644c");	
	}
}

//Fonction qui traduit false en Non et true en Oui
function remplirEtatStation(colonne,valeur){
	if (valeur == false){
		$(colonne).text("Non");
	}
	else{
		$(colonne).text("Oui");
	}
}

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



//Fonction d'initialisation de la carte
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
//Fonction qui gère la géolocalisation
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
	infoWindow.setPosition(pos);
	infoWindow.setContent(browserHasGeolocation ?
	'Error: The Geolocation service failed.' :
	'Error: Your browser doesn\'t support geolocation.');
}
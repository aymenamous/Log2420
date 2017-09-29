
$(document).ready(function(){
	
	$(".nav").css("margin-top",$(".menu-horizontal").height()+10);
	loadCOntent("carteStations.html","carte");
	loadCOntent("listeStations.html","liste");
	
});

function loadCOntent(file,divId){
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			document.getElementById(divId).innerHTML = this.responseText;
		}
	};
	
	xhttp.open("GET", file, true);
	xhttp.send();
}
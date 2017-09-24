

$(document).ready(function(){
	//Spécification de la hauteur de l'icone du site web pour donner une bonne forme au menu horizontal
	$(".logo-icon").height($(".menu-btn").parent().height()-14);
	var i;
	//Pour chaque boutton du menu horizontal, la largeur (width) du menu deroulant est la même
	for (i=0;i<$(".deroulant").length;i++){
		$(".deroulant").eq(i).width($(".menu-btn").eq(i).parent().width());
	}
	//Permet de coller le menu vertical et le menu horizontal
	$(".menu-vertical").css("top",$(".menu-horizontal").height());
	//En cliquant sur l'icone du menu => ouvrir/fermer menu vertical avec un effet de translation horizontal
    $(".menu-icon").click(function(){
		
        $(".menu-vertical").animate({width: 'toggle'},250);
		
	});
	
	
});

//Charge le contenu de la page en cliquant sur General ou Reaction
function chargerPage(obj) {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			document.getElementById("content").innerHTML = this.responseText;
		}
	};
	//Ouvrir le contenu correspondant au boutton cliqué
	xhttp.open("GET", "fs_"+$(obj).html().toLowerCase()+".php", true);
	xhttp.send();
	//Bien placement le contenu en dessous du menu horizontal
	$("#content").css("margin-top",$(".menu-horizontal").height()+10);
	//Placer le footer en bas de la page
	$("footer").css("position","relative");
	
}


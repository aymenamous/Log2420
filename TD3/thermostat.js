/* Extrait les valeurs produites dans la page Web et par le simulateur
 * et déclanche l'affichage des valeurs dans la page
*/


/*Code jquery qui affiche un glisseur dans le conteneur ayant
 *l'identifiant #thermostat, qui initalise sa position et ses valeurs
 *par défaut et qui affiche la valeur sélectionnée dans un conteneur
 *ayant l'identifiant #valeurThermostat
 *
 *Pour démarrer le chauffage, il faut cliquer le curseur de défilement
 */
/*********************Ne pas modifier***********************/
 $(document).ready(function() {
 
  $("#thermostat").slider(
  {
    orientation: 'vertical',
    max: 40 ,
    value:20,
    min: -10 ,
	classes: {
    "ui-slider": "highlight"
  },
    step: 1

  });
  $("#thermostat").slider().slider("pips", {
        step:10,
		rest: "label",
		last:false
    });
  $("#thermostat").slider({
    change: function(event, ui) {
      $("#tdValeurThermostat").text( ui.value );
    }
  });
  //("#jqxProgressBar6").jqxProgressBar({showText: true, template: "danger", width: 50, height: 100, value: 50, orientation: 'vertical', });
  
  $( ".cadre" ).jqxProgressBar({
	showText: true,
	orientation: 'vertical',
	template: "danger",
    height: 320,
    width: 40,
	value:56,
	layout: 'reverse',
	renderText: function (text, value)
                {
				//need to get max thermometre value with observer
					if (value >55){
						return "<span style='font-size:200%; color:white;'>" + value*50/100 + "</span>";
					}
					return "<span style='font-size:200%; color:black;'>" + value*50/100 + "</span>";
				}
    });
  
});
/*********************Ne pas modifier***********************/

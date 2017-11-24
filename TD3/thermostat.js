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
  
  
  $( ".cadre" ).progressbar({
	orientation: 'vertical',
      max:100,
      value: 50
    });
  
});
/*********************Ne pas modifier***********************/

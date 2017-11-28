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
 $(function() {
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
  $( ".cadre" ).jqxProgressBar({
              showText: true,
              orientation: 'vertical',
              template: "danger",
              height: 250,
              width: 40,
              value: Math.round(temperatureInterieure),
              layout: 'reverse',
              renderText: function (text, value)
                {
                  //need to get max thermometre value with observer
                    if (value >55){
                      return "<span style='font-size:200%; color:white;'>" + value+ "</span>";
                    }
                    return "<span style='font-size:200%; color:black;'>" +value+ "</span>";
                  }
              });

/*********************Ne pas modifier***********************/
/* On actualise les valeurs du thermomètre et de la console avec l'objet Observable */
    function chrono(newInteriorTemperatureVal, newChauffageVal) {
       $( ".cadre" ).jqxProgressBar({
              value: Math.round(newInteriorTemperatureVal),
              });
        // Chauffage
        $('#chauffage').html(newChauffageVal ? 'Actif' : 'Inactif');
        $('#chauffage').css('background-color', newChauffageVal ? '#FF0000' : 'white');
        $('#chauffage').css('color', newChauffageVal ? 'white' : 'black');
    }
    const Observable = {
    observers:[] ,
    lastId: -1 ,
    addObserver: function(observer) {
      this.observers.push({callback:observer, id: ++this.lastId})
    } ,
    removeObserver: function(observer) {
      var index = this.observers.indexOf(observer)
      if(~index) {
        this.observers.splice(index,1)
      }
    } ,
    notifyObserver: function() {
      this.observers.forEach(obs => obs.callback(temperatureInterieure, chauffage));
    } 
  }
  const Observer = Observable.addObserver(chrono);
  setInterval(() => {
        ticTac();
        Observable.notifyObserver();
    }, intervalleTemps);
});
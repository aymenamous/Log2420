let chambre = new Chambre();

getChauffage = (chauffage) => {
  let varChauffage = document.getElementById("chauffage");
  if (chauffage) {
    varChauffage.innerHTML = "Actif";
    varChauffage.className = "actif";
  } else {
    varChauffage.innerHTML = "Inactif";
    varChauffage.className = "inactif";
  }
}

evolutionThermometre = (min, max, exterieur, interieur )=>{
  let percentage = ((interieur - min) / (max - min)) * 100;
  let bar = document.getElementById("barre");
  bar.style.height = percentage + "%";
  document.getElementById("tdValeurThermostat").innerHTML = Math.round(interieur);
  document.getElementById("TempExt").innerHTML = exterieur;
}
updateThermometre = () =>{
  evolutionThermometre(chambre.thermometreMin, chambre.thermometreMax, chambre.temperatureExterieure,chambre.temperatureInterieure);
}
thermostat = () => {getChauffage(chambre.chauffage);}

chambre.addObserver(updateThermometre);
chambre.addObserver(thermostat);
chambre.notifyObservers();

(chrono = () => {
  setInterval(() => {
    chambre.notifyObservers();
  }, 1000)
})();
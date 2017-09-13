


$(document).ready(function(){
    $(".menu-icon").click(function(){
        $(".menu-vertical").animate({width: 'toggle'},250);
		
    });
});

function loadDoc() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("content").innerHTML = this.responseText;
    }
  };
  xhttp.open("GET", "fs_general.php", true);
  xhttp.send();
}


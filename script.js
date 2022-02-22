moment.locale('de-ch');
var data = [];
function getgames(){
	
var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function() {
  if(this.readyState === 4) {
    console.log(this.responseText);
	data = JSON.parse(this.responseText);
	listallgames();
  }
});

xhr.open("GET", "https://atvkv.ch/wp-json/handballplugin/v1/shv-api?typ=Spiele&teamid=alle");

xhr.send();
}

function listallgames(){
	if(document.getElementById("nextgames-container").length > 0){
		document.getElementById("nextgames").remove
	}
	var output = "<button id='selectgames'  onClick='selectgames()'>Select Games</button><br><ul id='nextgames'>";
	for(i = 0; i < 20; i++){
		var spiel = data[i];
		var spiel_string = JSON.stringify(spiel);
	output+= "<li><input type='checkbox' name='spiel' value="+i+">"+ moment(spiel.gameDateTime).format("Do MMM YY")+" - "+spiel.leagueShort+" - "+spiel.teamAName+" vs. "+ spiel.teamBName+"</li>"
	}
	output+="</ul>"
	document.getElementById("nextgames-container").innerHTML = output;
}

function selectgames(){
var array = []
var nextgames = document.getElementById("nextgames");
var checkboxes = nextgames.querySelectorAll('input[type=checkbox]:checked')
var output = "";
for (var i = 0; i < checkboxes.length; i++) {
var spieldata = data[checkboxes[i].value]
  array.push(spieldata);
var isheimspielrunde = document.getElementById("isheimspielrunde");
	console.log(spieldata.gameDateTime);
if (isheimspielrunde.checked == true){
    output+= '<div class="spiel">'+
			'<div class="uhrzeit">'+moment(spieldata.gameDateTime).format("hh:mm")+'</div>'+
			'<div class="paarung">'+spieldata.leagueShort+' vs. '+spieldata.teamBName+'</div>'+
		'</div>';
  }else{
	  output+= '<div class="spiel">'+
			'<div class="uhrzeit">'+moment(spieldata.gameDateTime).format("hh:mm")+'</div>'+
			'<div class="paarung">'+spieldata.teamAName+' vs.<br>'+spieldata.teamBName+'</div>'+
		'</div>';
  }

}	
	console.log(array);
	console.log(output);
	document.getElementById("spiele-container").innerHTML = output;
}
function setconstants(){
	
	document.getElementById("datum").innerHTML = document.getElementById("datum_input").value;
	document.getElementById("monat").innerHTML = document.getElementById("monat_input").value;
	document.getElementById("titel").innerHTML = document.getElementById("titel_input").value;
	document.getElementById("ort").innerHTML = "@"+document.getElementById("ort_input").value
	
}
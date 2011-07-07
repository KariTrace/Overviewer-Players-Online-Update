var playerMarkers = null;
var warpMarkers = [];
var PlayerNames = null;
var PlayerCount = 0;

function deletePlayerMarkers() {
  if (playerMarkers) {
    for (i in playerMarkers) {
      playerMarkers[i].setMap(null);
    }
    playerMarkers = null;
    PlayerNames = null;
    PlayerCount = 0;
  }
}

setInterval(loadPlayerMarkers, 1000 * 15);
setTimeout(loadPlayerMarkers, 1000);

function preparePlayerMarker(marker,item) {
	var c = "<div class=\"infoWindow\" style='width: 300px'><img src='player.php?"+item.msg+"'/><h1>"+item.msg+"</h1></div>";
	var infowindow = new google.maps.InfoWindow({content: c});
	google.maps.event.addListener(marker, 'click', function() {
		infowindow.open(overviewer.map,marker);
	});
}

function loadPlayerMarkers() {
	$.getJSON('markers.json', function(data) {
        deletePlayerMarkers();
        playerMarkers = [];

  var PlayerNames = [];
		var PlayerCount = 0;
  var iconHeight  = 18;
  var iconWidth   = 18;

		for (i in data) {
			var item = data[i];
			if(item.id != 4) continue;
			var converted = overviewer.util.fromWorldToLatLng(item.x, item.y, item.z);
			var marker =  new google.maps.Marker({
				position: converted,
				map: overviewer.map,
				title: item.msg,
				icon: 'player.php?'+item.msg,
				visible: true,
				zIndex: 999
			});
			playerMarkers.push(marker);
			preparePlayerMarker(marker,item);

   PlayerNames.push("&nbsp;<a href=\"javascript:overviewer.map.panTo(overviewer.util.fromWorldToLatLng("+item.x+","+item.y+","+item.z+"));\"><img src=\"http://cerato.writhem.com/player-avatar.php?player=" + item.msg + "&usage=list\" border=\"0\" height=" + iconHeight + " width=" + iconWidth + " alt=" + item.msg + "  /></a>&nbsp;<a href=\"javascript:overviewer.map.panTo(overviewer.util.fromWorldToLatLng("+item.x+","+item.y+","+item.z+"));\" class=\"playerListItem\">" + item.msg + "</a><br /> ");
			PlayerCount++;
		}
		$("#playerListOnline").empty();

		if(PlayerCount == 0)
		{
			$("#playerListOnline").html('&nbsp;<a href="javascript:map.panTo(fromWorldToLatLng(47,64,-32));"><img src="./home-list.png" border="0" /></a>&nbsp;No Players Online');
		}
		else if(PlayerCount == 1)
		{
			PlayerNames.sort();
			$("#playerListOnline").html('&nbsp;<a href="javascript:map.panTo(fromWorldToLatLng(47,64,-32));"><img src="./home-list.png" border="0" /></a>&nbsp;<font color="black">' + PlayerCount + '</font> Player Online:<br /><br />' + PlayerNames.join(" "));
		}
		else
		{
			PlayerNames.sort();
			
			$("#playerListOnline").html('&nbsp;<a href="javascript:map.panTo(fromWorldToLatLng(47,64,-32));"><img src="./home-list.png" border="0" height="' + iconHeight + '" width="' + iconWidth + '" alt="Players Online" /></a>&nbsp;<font class="playerListNumberOnline">' + PlayerCount + ' Online:</font><br />' + PlayerNames.join(" "));
		}
	});
}
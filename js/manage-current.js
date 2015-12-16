var currentPlaylistId = "";
var currentPlaylistDuration = 0.0;
var currentPlaylistTracks = [];

//$('#current-pl').attr('src', getCurrentPlaylistEmbedURL());

function SetCurrentPlaylistId(playlistId){
	currentPlaylistId = playlistId;
};

function AddResultToCurrent(resultURI) {
	var params = resultURI.split(":");
	var uris = {uris: []};
	if (params[1] == "tracks"){
		uris.uris.push(resultURI);
		SpotifyWebApi.addTracksToPlaylist(userid, currentPlaylistId, uris);
	}else{
		if(params[1] == "album"){

			SpotifyWebApi.getAlbumTracks(params[2], albumTracksCallback);
		}
	}
};

function AddResultsToCurrent(trackURIs){
	if(trackURIs == null || trackURIs.length < 1){
		alert(trackURIs+" passed to AddResultsToCurrent(trackURIs)");
		return;
	}
	var chunkedTrackURIs = [];
	while (trackURIs.length){
		chunkedTrackURIs.push(trackURIs.splice(0,100));
	}
	for(i in chunkedTrackURIs){
		var uris = {"uris": chunkedTrackURIs[i]};
		SpotifyWebApi.addTracksToPlaylist(userid, currentPlaylistId, uris);
	}
};

function getCurrentPlaylistEmbedURL() {
	return "https://embed.spotify.com/?uri=spotify:user:"+userid+":playlist:"+currentPlaylistId;
}

function refreshCurrentPlaylist() {
	var options = {offset: 0};
	var hasNext = SpotifyWebApi.getPlaylistTracks(userid, currentPlaylistId, options, rcpCallback);

	while (hasNext){
		options.offset += 100;
		hasNext = SpotifyWebApi.getPlaylistTracks(userid, currentPlaylistId, options, rcpCallback);
	}

	currentPlaylistDuration = GetPlaylistDuration(currentPlaylistTracks);
	DisplayCurrentDuration();
	// Reload the current-pl iframe
	$('#current-pl').attr( 'src', function ( i, val ) { return val; });
};

function rcpCallback(error, success) {
	if(success){
		currentPlaylistTracks.concat(success.response.items);
		currentPlaylistDuration += GetPlaylistDuration(currentPlaylistTracks);
		return success.response.next != null;
	}else if(error){
		alert(error);
	}
};

function albumTracksCallback(error, success){
	if(success){
		var tracks = success.response.items;
		var uris = {"uris": []}
		for(var t in tracks){
			uris.uris.push
		}
	}else if(error){
		alert(error);
	}
};

function GetPlaylistDuration(playlistTracks) {
	var duration = 0.0;

	for (var i in playlistTracks) {
		duration += playlistTracks[i].track.duration_ms / 1000;
	}

	return duration;
};

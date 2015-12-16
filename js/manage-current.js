var currentPlaylistId = "";
var currentPlaylistDuration = 0.0;
var currentPlaylistTracks = [];

//$('#current-pl').attr('src', getCurrentPlaylistEmbedURL());
// to test
//var tcurrentPlaylistId = "6Df19VKaShrdWrAnHinwVO";
//var tuserid = "qlmhuge";

function SetCurrentPlaylistId(playlistId){
	currentPlaylistId = playlistId;
};

function AddResultToCurrent(resultURI) {
	var params = resultURI.split(":");
	var uris = {uris: []};
	if (params[1] == "tracks"){
		uris.uris.push(resultURI);
		spotifyApi.addTracksToPlaylist(userid, currentPlaylistId, uris);
	}else{
		if(params[1] == "album"){

			spotifyApi.getAlbumTracks(params[2])
			.then(albumTracksCallback(data)
			, function(err) {
				console.error(err);
			});
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
		spotifyApi.addTracksToPlaylist(userid, currentPlaylistId, uris);
	}
	refreshCurrentPlaylist();
};

function getCurrentPlaylistEmbedURL() {
	return "https://embed.spotify.com/?uri=spotify:user:"+userid+":playlist:"+currentPlaylistId;
}

function refreshCurrentPlaylist() {
	console.log('refreshCurrentPlaylist called');
	// to test

	var options = {offset: 0};
	//var hasNext = spotifyApi.getPlaylistTracks(tuserid, tcurrentPlaylistId, options)
	var hasNext = spotifyApi.getPlaylistTracks(userid, currentPlaylistId, options)
	.then(function(data) {
		console.log('getPlaylistTracks called and data returned');
		currentPlaylistTracks.concat(data.items);
		console.log(currentPlaylistTracks.length);
		currentPlaylistDuration += GetPlaylistDuration(currentPlaylistTracks);
		return data.next != null;
}
	, function(err) {
		console.error(err);
	});

	/*while (hasNext){
		options.offset += 100;
		//hasNext = spotifyApi.getPlaylistTracks(tuserid, tcurrentPlaylistId, options)
		hasNext = spotifyApi.getPlaylistTracks(userid, currentPlaylistId, options)
		.then(function(data) {
		currentPlaylistTracks.concat(data.items);
		console.log(currentPlaylistTracks.length);
		currentPlaylistDuration += GetPlaylistDuration(currentPlaylistTracks);
		return data.next != null;
}
		, function(err) {
			console.error(err);
		});
	}*/

	currentPlaylistDuration = GetPlaylistDuration(currentPlaylistTracks);
	DisplayCurrentDuration();
	// Reload the current-pl iframe
	$('#current-pl').attr( 'src', getCurrentPlaylistEmbedURL());
};

/*function rcpCallback(data) {
		currentPlaylistTracks.concat(data.response.items);
		currentPlaylistDuration += GetPlaylistDuration(currentPlaylistTracks);
		return data.response.next != null;
};

function albumTracksCallback(data){
		var tracks = data.response.items;
		var uris = {"uris": []}
		for(var t in tracks){
			uris.uris.push
		}
};*/

function GetPlaylistDuration(playlistTracks) {
	var duration = 0.0;

	if(playlistTracks.length > 0){
	for (var i in playlistTracks) {
		duration += playlistTracks[i].track.duration_ms / 1000;
	}
	}
	return duration;
};

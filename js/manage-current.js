var currentPlaylistId;
var currentPlaylistDuration = 0.0;
var currentPlaylistTracks = [];

//$('#current-pl').attr('src', getCurrentPlaylistEmbedURL());
// to test
//var tcurrentPlaylistId = "6Df19VKaShrdWrAnHinwVO";
//var tuserid = "qlmhuge";

function SetCurrentPlaylistId(playlistId){
	console.log('SetCurrentPlaylistId: '+playlistId);
	currentPlaylistId = playlistId;
};

function AddResultToCurrent(resultURI, choice, useridother) {
	//var params = resultURI.split(":");
	var uris = [];
	var getalbumid = resultURI.split(":");
	var getplaylistid = resultURI.split(":");

	if (choice == "Tracks"){

		uris.push(resultURI);
		spotifyApi.addTracksToPlaylist(userid, currentPlaylistId, uris);
		refreshCurrentPlaylist();

	}else{
		if(choice == "Albums"){

			
			spotifyApi.getAlbumTracks(getalbumid[2])
				.then(function(data) {
				console.log(data);
				console.log("album id is " + getalbumid[2]);
				var length = data.total;
				console.log("length is" + length)
				var index;
				for(index=0;index<length;index++)
				{
					uris.push(data.items[index].uri);
				}
				spotifyApi.addTracksToPlaylist(userid, currentPlaylistId, uris);

				}, function(err) {
				console.error(err);
			});
		}
		else{
				spotifyApi.getPlaylistTracks(useridother, getplaylistid[4])
				.then(function(data) {
				console.log(data);
				console.log("playlist id is " + getplaylistid[2]);
				var length = data.total;
				console.log("length is" + length);
				if(length>100)
					length=100;
				var index;
				for(index=0;index<length;index++)
				{
					if(data.items[index].track.uri)
					{
						uris.push(data.items[index].track.uri);
					}

					else
						uris.push(data.items[index].track.uri);
				}
				spotifyApi.addTracksToPlaylist(userid, currentPlaylistId, uris);

				}, function(err) {
				console.error(err);
			});

		}
	}
};

// function AddResultsToCurrent(trackURIs){
// 	if(trackURIs == null || trackURIs.length < 1){
// 		alert(trackURIs+" passed to AddResultsToCurrent(trackURIs)");
// 		return;
// 	}
// 	var chunkedTrackURIs = [];
// 	while (trackURIs.length){
// 		chunkedTrackURIs.push(trackURIs.splice(0,100));
// 	}
// 	for(i in chunkedTrackURIs){
// 		var uris = {"uris": chunkedTrackURIs[i]};
// 		spotifyApi.addTracksToPlaylist(userid, currentPlaylistId, uris);
// 	}
// 	refreshCurrentPlaylist();
// };

function getCurrentPlaylistEmbedURL() {
	return "https://embed.spotify.com/?uri=spotify:user:"+userid+":playlist:"+currentPlaylistId;
}

function refreshCurrentPlaylistFirstTime(user, playlist) {
	console.log('refreshCurrentPlaylist called');
	// to test

	var options = {offset: 0};
	var hasNext = spotifyApi.getPlaylistTracks(user, playlist, options)
	.then(function(data) {
			console.log('getPlaylistTracks called and data returned');
			currentPlaylistTracks.concat(data.items);
			console.log(currentPlaylistTracks.length);
			currentPlaylistDuration += GetPlaylistDuration(currentPlaylistTracks);
			hasNext = (data.next != null);
	}
	, function(err) {
		console.error(err);
		hasNext = false;
	});
	//alert('hasNxt: '+hasNext);

	/*while (hasNext){
		options.offset += 100;
		hasNext = spotifyApi.getPlaylistTracks(user, playlist, options)
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
	//for(n in hasNext)
		console.log('hasNext[]: '+hasNext);

	currentPlaylistDuration = GetPlaylistDuration(currentPlaylistTracks);
	DisplayCurrentDuration();
	// Reload the current-pl iframe
	$('#current-pl').attr( 'src', getCurrentPlaylistEmbedURL());
};

function refreshCurrentPlaylist() {
	console.log('refreshCurrentPlaylist called');
	// to test

	var options = {offset: 0};
	//var hasNext = spotifyApi.getPlaylistTracks(user, playlist, options)
	var hasNext = spotifyApi.getPlaylistTracks(userid, currentPlaylistId, options)
	.then(function(data) {
			console.log('getPlaylistTracks called and data returned');
			currentPlaylistTracks.concat(data.items);
			console.log(currentPlaylistTracks.length);
			currentPlaylistDuration += GetPlaylistDuration(currentPlaylistTracks);
			return (data.next != null);
	}
	, function(err) {
		console.error(err);
	});
	//alert('hasNxt: '+hasNext);

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

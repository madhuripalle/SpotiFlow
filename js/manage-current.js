var currentPlaylistId = "";
var currentPlaylistDuration = 0.0;
var currentPlaylistTracks = [];


function SetCurrentPlaylistId(playlistId){
	currentPlaylistId = playlistId;
};

function AddResultToCurrent(resultId, resultType) {

}

function refreshCurrentPlaylist() {
	var options = {offset: 0};
	var hasNext = SpotifyWebApi.getPlaylistTracks(userid, currentPlaylistId, options, rcpCallback);

	while (hasNext){
		options.offset += 100;
		hasNext = SpotifyWebApi.getPlaylistTracks(userid, currentPlaylistId, options, rcpCallback);
	}
};

function rcpCallback(data) {
	currentPlaylistTracks.concat(data.response.items);
	currentPlaylistDuration += GetPlaylistDuration(currentPlaylistTracks);
	return data.response.next != null;
};

function GetPlaylistDuration(playlistTracks) {
	var duration = 0.0;

	for (var i in playlistTracks) {
		duration += playlistTracks[i].track.duration_ms / 1000;
	}

	return duration;
};

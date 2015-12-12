// Requires mergesort.js
// on Create Playlist

// Array of track profiles for a given playlist
//var trackProfiles = [];
//var currentIdx = 0;

//param playlistTracks - jQuery array - returned from get-a-playlists-tracks endpoint response.items
var Bactrian = function(playlistTracks, durationSecs, durationAttrs) {
	//var trackAnalysisData = [];

	// Iterate thru tracks and request analysis data for each
	// add data to new field in each track
	for (var idx in playlistTracks){
		//currentIdx = idx;
		//^nvm define callback inside this loop

		var addTrackProfile = function(data) {
			playlistTracks[idx].track['audio_summary'] = data.response.track.audio_summary;
		};

		EchoNestWebApi.getTrackProfile (api_key, 
									   playlistTracks[idx].track.id,
									   addTrackProfile
									   );
		
		// if necessary, store original playlist idx in track object
		playlistTracks[idx].track['idx'] = idx; //+1?


	}
};
/*
var addTrackProfile = function (data) {

};*/

var Ambient = function(playlistTracks, durationSecs, durationAttrs) {};

var TruncatePlaylist = function(playlistTracks, durationSecs, durationAttrs) {
	var sortTracks = playlistTracks;

}


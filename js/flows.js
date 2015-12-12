// Requires mergesort.js

var TruncatePlaylist = function(playlistTracks, durationSecs, durationAttrs) {
	var sortTracks = playlistTracks;
	merge_sort(sortTracks, durationAttrs);
	
	var sortDuration = 0;
	while (sortTracks.length > 0 && (durationSecs - sortDuration) >= 90) {
		sortDuration += sortTracks.pop().track.duration_ms / 1000;
	}

	// remaining elements of sortTracks are to be removed from playlistTracks

}

var GetPlaylistDuration = function(playlistTracks) {
	var duration = 0.0;

	for (var i in playlistTracks) {
		duration += playlistTracks[i].track.duration_ms / 1000;
	}

	return duration;
}


/**
 * Designer Flows
 */
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


/**
 * Custom Flows
 */

var Descending = function(playlistTracks, flowAttrs, durationSecs, durationAttrs) {
	for (var idx in playlistTracks){
		var addTrackProfile = function(data) {
			playlistTracks[idx].track['audio_summary'] = data.response.track.audio_summary;
		};

		EchoNestWebApi.getTrackProfile (api_key, 
									   playlistTracks[idx].track.id,
									   addTrackProfile
									   );
		
		playlistTracks[idx].track['idx'] = idx;
	}

	TruncatePlaylist(playlistTracks, durationSecs, durationAttrs);
	merge_sort(playlistTracks, flowAttrs);
	playlistTracks.reverse();

	// Send new order to reorder tracks in playlist endpoint
}

var Ascending = function(playlistTracks, flowAttrs, durationSecs, durationAttrs) {
	for (var idx in playlistTracks){
		var addTrackProfile = function(data) {
			playlistTracks[idx].track['audio_summary'] = data.response.track.audio_summary;
		};

		EchoNestWebApi.getTrackProfile (api_key, 
									   playlistTracks[idx].track.id,
									   addTrackProfile
									   );
		
		playlistTracks[idx].track['idx'] = idx;
	}

	TruncatePlaylist(playlistTracks, durationSecs, durationAttrs);
	merge_sort(playlistTracks, flowAttrs);

	// Send new order to reorder tracks in playlist endpoint
}
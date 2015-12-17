// Requires mergesort.js

var TruncatePlaylist = function(playlistTracks, durationSecs, durationAttrs) {
	var sortTracks = playlistTracks;
	merge_sort(sortTracks, durationAttrs);
	
	var sortDuration = 0;
	while (sortTracks.length > 0 && (durationSecs - sortDuration) >= 90) {
		sortDuration += sortTracks.pop().track.duration_ms / 1000;
	}

	// remaining elements of sortTracks are to be removed from playlistTracks
	var uris = {uris: []}
	for (t = 0; t < playlistTracks.length; t++){
		uris.uris.push(playlistTracks[t].track.uri);
	}
	spotifyApi.removeTracksFromPlaylist(userid, currentPlaylistId, uris);
	return sortTracks;
};

// Insertion sort reorders the actual spotify playlist
var ReorderPlaylist = function(playlistTracksWithIdx){
	for(var new_idx = 0; idx <  playlistTracksWithIdx.length; new_idx++){
		var idx = playlistTracksWithIdx[new_idx].track.idx;
		if(idx > new_idx) {
			spotifyApi.reorderTracksInPlaylist(userid, currentPlaylistId, idx, new_idx, rtipCallback);
		}
	}
	console.log('ReorderPlaylist finished.');
};

var rtipCallback = function(e,s){
	if(e){
		alert(e);
	}
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
	for (var idx = 0; idx < playlistTracks.length; idx++){
		//currentIdx = idx;
		//^nvm define callback = 0;side this loop

		var addTrackProfile = function(data) {
			playlistTracks[idx].track['audio_summary'] = data.response.songs[0].audio_summary;
		};

		callTrackAnalysis (playlistTracks[idx].track.id,
						   addTrackProfile
						   );
		
		// if necessary, store original playlist idx in idx <  track object
		playlistTracks[idx].track['idx'] = idx; //+1?


	}
};

var Ambient = function(playlistTracks, durationSecs, durationAttrs) {};


/**
 * Custom Flows
 */

var Descending = function(playlistTracks, flowAttrs, durationSecs, durationAttrs) {
	for (var idx = 0; idx < playlistTracks.length; idx++){
		var addTrackProfile = function(data) {
			playlistTracks[idx].track['audio_summary'] = data.response.songs[0].audio_summary;
		};

		callTrackAnalysis (playlistTracks[idx].track.id,
						   addTrackProfile
						   );

		playlistTracks[idx].track['idx'] = idx;
	}

	playlistTracks = TruncatePlaylist(playlistTracks, durationSecs, durationAttrs);
	merge_sort(playlistTracks, flowAttrs);
	playlistTracks.reverse();

	// Send new order to reorder tracks in playlist endpoint
};

var Ascending = function(playlistTracks, flowAttrs, durationSecs, durationAttrs) {
	for (var idx = 0; idx < playlistTracks.length; idx++){
		var addTrackProfile = function(data) {
			playlistTracks[idx].track['audio_summary'] = data.response.songs[0].audio_summary;
		};

		callTrackAnalysis (playlistTracks[idx].track.id,
						   addTrackProfile
						   );
		
		playlistTracks[idx].track['idx'] = idx;
	}

	playlistTracks = TruncatePlaylist(playlistTracks, durationSecs, durationAttrs);
	merge_sort(playlistTracks, flowAttrs);

	// Send new order to reorder tracks in playlist endpoint
};

var Dromedary = function(playlistTracks, flowAttrs, durationSecs, durationAttrs){
	for (var idx = 0; idx < playlistTracks.length; idx++){
		var addTrackProfile = function(data) {
			playlistTracks[idx].track['audio_summary'] = data.response.songs[0].audio_summary;
		};

		callTrackAnalysis (playlistTracks[idx].track.id,
						   addTrackProfile
						   );
		
		playlistTracks[idx].track['idx'] = idx;
	}

	playlistTracks = TruncatePlaylist(playlistTracks, durationSecs, durationAttrs);

	merge_sort(playlistTracks, flowAttrs);

	//Assume the duration for a track is 300 seconds.
	var tracksPlaylist = Math.floor(durationSecs/300);
	var tracksAll = playlistTracks.length;
	var interval = Math.floor(tracksAll/tracksPlaylist);
	interval = Math.floor(interval/2)*2;

	if(tracksPlaylist<2){
		//If it only allow one song, we don't create a playlist.
		alert("The set duration is to short to form a playlist!");
		return;
	}//~~~~~~~~~~
	else{
		var output_ = generateDromedary(playlistTracks, interval, tracksPlaylist);
		return output_;

	}

};

var BrianTest = function(playlistTracks, flowAttrs, durationSecs, durationAttrs){
	for (var idx = 0; idx <  playlistTracks.length; idx++){
		var addTrackProfile = function(data) {
			playlistTracks[idx].track['audio_summary'] = data.response.songs[0].audio_summary;
		};

		callTrackAnalysis (playlistTracks[idx].track.id,
						   addTrackProfile
						   );
		
		playlistTracks[idx].track['idx'] = idx;
	}

	playlistTracks = TruncatePlaylist(playlistTracks, durationSecs, durationAttrs);

	merge_sort(playlistTracks, flowAttrs);

	//Assume the duration for a track is 300 seconds.
	var tracksPlaylist = Math.floor(durationSecs/300);
	var tracksAll = playlistTracks.length;
	var interval = Math.floor(tracksAll/tracksPlaylist);
	interval = Math.floor(interval/2)*2;

	if(tracksPlaylist<=6){
		alert("The set duration is to short to form a playlist!");
		return;
	}
	else{
		var even = [];
		var odd = [];

		//divide the sorted array based on even and odd index.
		for (var i=0;i<playlistTracks.length;i++){
		    if ((i+2)%2==0) {
		        even.push(playlistTracks[i]);
		    }
		    else {
		        odd.push(playlistTracks[i]);
		    }
		}

		//Seperate the playlistTracks to form two dromedary and then merge them.
		var output1 = generateDromedary(even,interval, Math.floor(tracksPlaylist/2));
		var output2 = generateDromedary(odd, interval, Math.floor(tracksPlaylist/2));

		for(var i = 0; i < output2.length; i++){
			output1.push(output2[i]);
		}

		var output_ = output1;
		return output_;


	}

};

var generateDromedary = function(playlist, interval, tracksPlaylist){
	var evenplaylistTracks = [];
	var oddplaylistTracks = [];

	//divide the sorted array based on even and odd index.
	for (var i=0;i<playlistTracks.length;i++){
	    if ((i+2)%2==0) {
	        evenplaylistTracks.push(playlistTracks[i]);
	    }
	    else {
	        oddplaylistTracks.push(playlistTracks[i]);
	    }
	}
	//make the track with the maximum score set first in the array.
	oddplaylistTracks=oddplaylistTracks.reverse();

	//The generated playlist.
	var output= [];
	var tracksHalfPlaylist = Math.floor(tracksPlaylist/2);
	for (var i=0; i<= Math.floor(tracksHalfPlaylist/2); i++){
		output[i] = evenplaylistTracks[i*interval/2];
	}
	for (var i = Math.floor(tracksHalfPlaylist/2)+1; i< tracksHalfPlaylist; i++){
		output[i] = evenplaylistTracks[Math.floor(tracksHalfPlaylist/2)*interval/2 + (i-Math.floor(tracksHalfPlaylist/2))*interval*2];
	}
	for (var i = tracksHalfPlaylist; i< Math.floor(tracksHalfPlaylist*3/2); i++){
		output[i] = oddplaylistTracks[(i-tracksHalfPlaylist)*interval*2];
	}
	for (var i = Math.floor(tracksHalfPlaylist*3/2); i< tracksHalfPlaylist*2; i++){
		output[i] = oddplaylistTracks[(Math.floor(tracksHalfPlaylist*3/2)-1-tracksHalfPlaylist)*interval*2+(i-(Math.floor(tracksHalfPlaylist*3/2)-1))*interval/2];
	}

	return output;
};

/*function merge_sort_api(playlistTracks){
	msort_api(array, 0, array.length)
}*/
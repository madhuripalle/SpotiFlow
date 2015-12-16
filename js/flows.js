// Requires mergesort.js

var TruncatePlaylist = function(playlistTracks, durationSecs, durationAttrs) {
	var sortTracks = playlistTracks;
	merge_sort(sortTracks, durationAttrs);
	
	var sortDuration = 0;
	while (sortTracks.length > 0 && (durationSecs - sortDuration) >= 90) {
		sortDuration += sortTracks.pop().track.duration_ms / 1000;
	}

	// remaining elements of sortTracks are to be removed from playlistTracks

};

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
			playlistTracks[idx].track['audio_summary'] = data.response.songs[0].audio_summary;
		};

		callTrackAnalysis (playlistTracks[idx].track.id,
						   addTrackProfile
						   );
		
		// if necessary, store original playlist idx in track object
		playlistTracks[idx].track['idx'] = idx; //+1?


	}
};

var Ambient = function(playlistTracks, durationSecs, durationAttrs) {};


/**
 * Custom Flows
 */

var Descending = function(playlistTracks, flowAttrs, durationSecs, durationAttrs) {
	for (var idx in playlistTracks){
		var addTrackProfile = function(data) {
			playlistTracks[idx].track['audio_summary'] = data.response.songs[0].audio_summary;
		};

		callTrackAnalysis (playlistTracks[idx].track.id,
						   addTrackProfile
						   );

		playlistTracks[idx].track['idx'] = idx;
	}

	TruncatePlaylist(playlistTracks, durationSecs, durationAttrs);
	merge_sort(playlistTracks, flowAttrs);
	playlistTracks.reverse();

	// Send new order to reorder tracks in playlist endpoint
};

var Ascending = function(playlistTracks, flowAttrs, durationSecs, durationAttrs) {
	for (var idx in playlistTracks){
		var addTrackProfile = function(data) {
			playlistTracks[idx].track['audio_summary'] = data.response.songs[0].audio_summary;
		};

		callTrackAnalysis (playlistTracks[idx].track.id,
						   addTrackProfile
						   );
		
		playlistTracks[idx].track['idx'] = idx;
	}

	TruncatePlaylist(playlistTracks, durationSecs, durationAttrs);
	merge_sort(playlistTracks, flowAttrs);

	// Send new order to reorder tracks in playlist endpoint
};

var Dromedary = function(playlistTracks, flowAttrs, durationSecs, durationAttrs){
	for (var idx in playlistTracks){
		var addTrackProfile = function(data) {
			playlistTracks[idx].track['audio_summary'] = data.response.songs[0].audio_summary;
		};

		callTrackAnalysis (playlistTracks[idx].track.id,
						   addTrackProfile
						   );
		
		playlistTracks[idx].track['idx'] = idx;
	}

	TruncatePlaylist(playlistTracks, durationSecs, durationAttrs);

	//Compute the score and merge sort the process.
	/*var attrArray = [];
	if (flowAttrs.length == 1){
		//the name of the selected attribute.
		var flowAttr1 = flowAttrs[0];
		for (var idx in playlistTracks){
			//I hope track[flowAttr1] is the value of the selected attribute. 
			attrArray[idx] = playlistTracks[idx].track[flowAttr1];
		}
	}
	else if(flowAttrs.length == 2){
		var flowAttr1 = flowAttrs[0];
		var flowAttr2 = flowAttrs[1];
		for (var idx in playlistTracks){
			//I hope track[flowAttr1] is the value of the selected attribute. 
			attrArray[idx] = 0.5*playlistTracks[idx].track[flowAttr1] + 0.5*playlistTracks[idx].track[flowAttr2];
		}
	}
	else {
		var flowAttr1 = flowAttrs[0];
		var flowAttr2 = flowAttrs[1];
		var flowAttr3 = flowAttrs[2];
		for (var idx in playlistTracks){
			//I hope track[flowAttr1] is the value of the selected attribute. 
			attrArray[idx] = 0.33*playlistTracks[idx].track[flowAttr1] + 0.33*playlistTracks[idx].track[flowAttr2] + 0.33*playlistTracks[idx].track[flowAttr3];
		}
	}

	//Not sure what WeighAttr does. You can edit this!
	for (var idx in playlistTracks){
		playlistTracks[idx].track['score']=attrArray[idx];
	}
	//Sort the array. Sorry I do not undertand the usage of the merge_sort you write. 
	merge_sort(playlistTracks,score);*/
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
	for (var idx in playlistTracks){
		var addTrackProfile = function(data) {
			playlistTracks[idx].track['audio_summary'] = data.response.songs[0].audio_summary;
		};

		callTrackAnalysis (playlistTracks[idx].track.id,
						   addTrackProfile
						   );
		
		playlistTracks[idx].track['idx'] = idx;
	}

	TruncatePlaylist(playlistTracks, durationSecs, durationAttrs);

	//Compute the score and merge sort the process.
	/*var attrArray = [];
	if (flowAttrs.length == 1){
		//the name of the selected attribute.
		var flowAttr1 = flowAttrs[0];
		for (var idx in playlistTracks){
			//I hope track[flowAttr1] is the value of the selected attribute. 
			attrArray[idx] = playlistTracks[idx].track[flowAttr1];
		}
	}
	else if(flowAttrs.length == 2){
		var flowAttr1 = flowAttrs[0];
		var flowAttr2 = flowAttrs[1];
		for (var idx in playlistTracks){
			//I hope track[flowAttr1] is the value of the selected attribute. 
			attrArray[idx] = 0.5*playlistTracks[idx].track[flowAttr1] + 0.5*playlistTracks[idx].track[flowAttr2];
		}
	}
	else {
		var flowAttr1 = flowAttrs[0];
		var flowAttr2 = flowAttrs[1];
		var flowAttr3 = flowAttrs[2];
		for (var idx in playlistTracks){
			//I hope track[flowAttr1] is the value of the selected attribute. 
			attrArray[idx] = 0.33*playlistTracks[idx].track[flowAttr1] + 0.33*playlistTracks[idx].track[flowAttr2] + 0.33*playlistTracks[idx].track[flowAttr3];
		}
	}

	//Not sure what WeighAttr does. You can edit this!
	for (var idx in playlistTracks){
		playlistTracks[idx].track['score']=attrArray[idx];
	}
	//Sort the array. Sorry I do not undertand the usage of the merge_sort you write. 
	merge_sort(playlistTracks,score);*/
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
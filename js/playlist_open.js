var userid;
var currentPlaylistId;

$("#openPlaylist").on('click',function(){
	// var link = "https://play.spotify.com/user/spotify/playlist/59ZbFPES4DQwEjBpWHzrtC";
	var link = "https://play.spotify.com/" + userid + "/" + "spotify/playlist/" + currentPlaylistId;
	window.open(link, '_blank');
});
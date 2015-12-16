var currentbrowsetab = "Browse Playlists";
var subtabplaylist = "Browse";
var subtabalbum = "Browse";
var subtabtrack = "Browse";
var playlist_input;
var album_input;
var track_input;
var ClientID = '130113b2e9fb4c0496d9b11fd8df30da';
var clientSecret = '618fa9ab84974efba033811399a6ebd6';
var Base_URI = 'file:///Users/madhuripalle/Documents/SpotiFlow/index.html';
var echoapikey = "CMEE0GLDSZ09UMTDR";
var currentpage;
var spotifyApi = new SpotifyWebApi();

var userid;
var i,j,k;

$('.playlists a').on('shown.bs.tab', function(event){
	subtabplaylist = $(event.target).text(); 
});

$('.albums a').on('shown.bs.tab', function(event){
	subtabalbum = $(event.target).text(); 
});	

$('.tracks a').on('shown.bs.tab', function(event){
	subtabtrack = $(event.target).text(); 
});	

$('.nav-stacked a').on('shown.bs.tab', function(event){
	currentbrowsetab = $(event.target).text(); 
});

$("[id=prevstep]").click(function(){
	console.log("currentpage is " + currentpage);
	if(currentpage=="SelectOptions")
	{	
		RemoveCarosuel();
		$("[id=prevstep]").attr('disabled', true);
		$("[id=nextstep]").attr('disabled', false);
	}
});

$("[id=nextstep]").click(function(){
	console.log("currentpage is " + currentpage);
	if(currentpage=="SelectOptions")
	{	
		alert("sorry, next page not available yet!");
		callSampleTrackAnalysis("spotify:track:0eGsygTp906u18L0Oimnem");
	}
	if(currentpage=="SearchResults")
	{
		RemoveSearchResults();
		$("[id=prevstep]").attr('disabled', false);
		$("[id=nextstep]").attr('disabled', false);
	}
});

function unhideme (divid) {
	var item = document.getElementById(divid);
	if (item) {
// console.log("unhideme: " + divid);
item.style.display='block';
}
}

function hideme (divid) {
	var item = document.getElementById(divid);
	if (item) {
// console.log("hideme: " + divid);
item.style.display='none';
}
}

function initiateLoginModal() {
	console.log("initiateLoginModal called");
	/* if any authentication is required, this is the place to call the api */
}

function removeLandingPage() {
	hideme("landingpageid");
	unhideme("aboutid");
}

function RemoveCarosuel() {
	console.log("RemoveCarosuel called");
	hideme("aboutid");
	unhideme("navbarid");
	unhideme("searchid");
	unhideme("footerid");
	unhideme("SearchResults");
	hideme("SelectionOptions");
	currentpage="SearchResults";
	callGetSelfData();
}

function CheckTabActivity() {
console.log(currentbrowsetab);
if(currentbrowsetab=="Browse Playlists") {
	playlist_input = document.getElementById("playlist_text").value;
	console.log(subtabplaylist);
	if(subtabplaylist=="Featured") {
		//call API for featured playlists
		console.log("Featured playlist list will be shown");
		callFeaturedPlaylists();
	}
	else if(subtabplaylist=="Browse") {
		//call API for public playlist content
		console.log("Browsing for " + playlist_input);
		callBrowsePlaylists(playlist_input);
	}
	else if(subtabplaylist=="My Playlists") {
		callMyPlaylists(userid);
	}
	else {
		console.log("error in playlist call");
	}
}

else if(currentbrowsetab=="Browse Albums") {
	album_input = document.getElementById("album_text").value;
	console.log(subtabalbum);
	if(subtabalbum=="Featured") {
		//call API for featured playlists
		console.log("Featured albums list will be shown");
		callFeaturedAlbums();
	}
	else if(subtabalbum=="Browse") {
		//call API for public playlist content
		console.log("Browsing for " + album_input);
		callBrowseAlbums(album_input);
	}
	else if(subtabalbum=="My Albums") {
		callMyAlbums(userid);
	}
	else {
		console.log("error in album call");
	}
}

else if(currentbrowsetab=="Browse Tracks") {
	track_input = document.getElementById("track_text").value;
	console.log(subtabalbum);
	if(subtabtrack=="Featured") {
	//call API for featured playlists
	console.log("Featured tracks list will be shown");
	callFeaturedTracks();
	}
	else if(subtabtrack=="Browse") {
		//call API for public playlist content
		console.log("Browsing for " + track_input);
		callBrowseTracks(track_input);
	}
	else if(subtabtrack=="My Tracks") {
		console.log("Personal Content for " + track_input);
		callMyTracks(userid);
	}
	else {
		console.log("error in track call");
	}
}

else {
	console.log("Error choosing tabs");
}

}

function RemoveSearchResults() {
	hideme("SearchResults");
	unhideme("SelectionOptions");
	currentpage="SelectOptions";
	UnloadSpinners();
}


function callSampleTrackAnalysis(trackid)
{

	$.ajax({
		type:     "GET",
		url:      "http://developer.echonest.com/api/v4/song/profile?api_key=" + echoapikey + "&track_id=" + trackid + "&bucket=id:spotify&bucket=audio_summary",
		dataType: "json",
		success: function(data){
			console.log(data);
			if(data.response.songs)
			{
				var energy = data.response.songs[0].audio_summary.energy;
				var acousticness = data.response.songs[0].audio_summary.acousticness;
				var danceability = data.response.songs[0].audio_summary.danceability
				var instrumentalness = data.response.songs[0].audio_summary.instrumentalness;
				var liveness = data.response.songs[0].audio_summary.liveness;
				var speechiness = data.response.songs[0].audio_summary.speechiness;
				var valence = data.response.songs[0].audio_summary.valence;
				console.log("Energy: " + energy);
				console.log("Acousticness: " + acousticness);
				console.log("Danceability: " + danceability);
				console.log("Instrumentalness: " + instrumentalness);
				console.log("Liveness: " + liveness);
				console.log("Speechiness: " + speechiness);
				console.log("Valence: " + valence );
			}
		}
	});
}

function callTrackAnalysis(trackid, callback)
{
	$.ajax({
		type:     "GET",
		url:      "http://developer.echonest.com/api/v4/song/profile?api_key=" + echoapikey + "&track_id=" + trackid + "&bucket=id:spotify&bucket=audio_summary",
		dataType: "json",
		success: callback(data)
	});
}

function callGetSelfData() {
	spotifyApi.setAccessToken('BQAODxc57XelqZdfgtmPX7XBUF-WkSi8iXLCXjyRFlm2DDkYVzIypU-GUHQW-QKmu8tbVednX1eq2bCQ8koOkjnmhgnIb19pCBYogi6cTkNs3ofyhwGgwB2G2Bf7dt9rmJkb_mSRORVCdod0qge67lr7Qds-6xbfITEl1xII8tNSwvi2j4A9uWYYj8lCEY_L2MiaMx9vV2Vc-Z4tOvEO0fMqfsqihlP3ILPaaBEAKCqDuY8VAxiHPgthiOZCoUipW4pmkOicU9TbE6UVa-wkjead2zczu8zHqFcU4nGMQlZsCthe3w9DJe_f2jR0Vg0');
	//spotifyApi.setAccessToken(accestoken);
	spotifyApi.getMe()
  .then(function(data) {
    console.log(data);
    userid = data.id;
    var userprofilepicOnNav = data.images[0].url;
    var usernameOnNav = data.display_name;
    var nodepic = document.getElementById("img");
    var nodename = document.getElementById("user_name");
    nodepic.src = userprofilepicOnNav;
    nodename.innerHTML = usernameOnNav;

  }, function(err) {
    console.error(err);
  });
}

function callFeaturedPlaylists()
{
	// get albums by a certain artist
spotifyApi.getFeaturedPlaylists({limit: 10})
  .then(function(data) {
    console.log(data);
  }, function(err) {
    console.error(err);
  });
}

function callBrowsePlaylists(SearchString) {
	spotifyApi.searchPlaylists(SearchString, {limit: 10})
  .then(function(data) {
    console.log(data);
  }, function(err) {
    console.error(err);
  });
}

function callMyPlaylists(userid) {
	spotifyApi.getUserPlaylists(userid ,{limit: 10})
  .then(function(data) {
    console.log(data);
  }, function(err) {
    console.error(err);
  });
}

function callBrowseAlbums(SearchString) {
	spotifyApi.searchAlbums(SearchString, {limit: 10})
  .then(function(data) {
    console.log(data);
  }, function(err) {
    console.error(err);
  });
}

function callMyAlbums(userid)
{
	spotifyApi.getMySavedAlbums()
  .then(function(data) {
    console.log(data);
  }, function(err) {
    console.error(err);
  });
}

function callFeaturedAlbums()
{
	spotifyApi.getNewReleases({limit: 10})
  .then(function(data) {
    console.log(data);
  }, function(err) {
    console.error(err);
  });
}

function callBrowseTracks(SearchString)
{
	spotifyApi.searchTracks(SearchString, {limit: 10})
  .then(function(data) {
    console.log(data);
    var track1url = "https://embed.spotify.com/?uri=";
    for(i=1;i<=10;i++)
    {
    	var node = document.getElementById("i" + i);
    	if(data.tracks.items[i-1])
    	{
    		node.src = track1url + data.tracks.items[i-1].uri;
    	}
    }
  }, function(err) {
    console.error(err);
  });
}

function callMyTracks(userid)
{
spotifyApi.getMySavedTracks()
  .then(function(data) {
    console.log(data);
     var track2url = "https://embed.spotify.com/?uri=";
    for(i=1;i<=10;i++)
    {
    	var node = document.getElementById("i" + i);
    	if(data.tracks.items[i-1])
    	{
    		node.src = track1url + data.tracks.items[i-1].uri;
    	}
    }
  }, function(err) {
    console.error(err);
  });
}


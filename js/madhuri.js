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
var node;
var Offset = 0;
var lastSearchString = null;
var lastSearchBrowseTab = null;
var lastSearchSubTab = null;

var ids = {};
var trackidstemp = [];
var text="";

var userid;
var i,j,k;

var playlistName = document.getElementById('playlistName');

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

$("#prevstep").click(function(){
	console.log("currentpage is " + currentpage);
	if(currentpage=="SelectOptions")
	{	
		RemoveCarosuel();
		$("#prevstep").prop('disabled', true);
		$("#nextstep").prop('disabled', false);
	}
	SetIFrameSize();
});

$("#nextstep").click(function(){
	console.log("currentpage is " + currentpage);
	if(currentpage=="SelectOptions")
	{	
		$('gotospotify-modal').modal('show');
		callSampleTrackAnalysis("spotify:track:0eGsygTp906u18L0Oimnem");
	}
	if(currentpage=="SearchResults")
	{
		RemoveSearchResults();
		$("#prevstep").prop('disabled', false);
		$("#nextstep").prop('disabled', false);
	}
	SetIFrameSize();
});

$("#openPlaylist").on('click',function(){
	// var link = "https://play.spotify.com/user/spotify/playlist/59ZbFPES4DQwEjBpWHzrtC";
	var link = "https://play.spotify.com/user/" + userid + "/" + "playlist/" + currentPlaylistId;
	window.open(link, '_blank');
});

function processAdd(elementid)
{
	
	var choice = elementid;
	var res = currentbrowsetab.split(" ");
	var val = res[1];

	for(i=1;i<=10;i++)
	{
		if(i==choice)
		{
			var trackuritemp = trackidstemp[i-1];
			ids[trackuritemp] = val;
		}
	}
		console.log(ids);
}


function printtemptracks()
{
	
	console.log("calling print temp tracks");
	var index;
	for	(index = 0; index < trackidstemp.length; index++) {
    	console.log(trackidstemp[index]);
    }
}

function unhideme (divid) {
	var item = document.getElementById(divid);
	if (item) {
		// console.log("unhideme: " + divid);
		item.style.display='block';
	}
	SetIFrameSize();
}

function hideme (divid) {
	var item = document.getElementById(divid);
	if (item) {
		// console.log("hideme: " + divid);
		item.style.display='none';
	}
	SetIFrameSize();
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

function clearfields() {
	document.getElementById("playlist_text").value = "";
    document.getElementById("album_text").value = "";
    document.getElementById("track_text").value = "";
}

function callPrevResults() {
	Offset = Offset - 10;
	if(Offset < 0) {
		Offset = 0;
	}
	callOffsetResults();
	SetIFrameSize();
}

function callNextResults() {
	Offset = Offset + 10;
	callOffsetResults();
	SetIFrameSize();
}

function callOffsetResults() {
	LoadSpinners(10);
	trackidstemp = [];
	console.log(lastSearchBrowseTab);
	console.log(lastSearchSubTab);
	if(lastSearchBrowseTab=="Browse Playlists") {
		if(lastSearchSubTab=="Featured") {
			//call API for featured playlists
			console.log("Featured playlist list will be shown");
			callFeaturedPlaylists();
		}
		else if(subtabplaylist=="Browse") {
			//call API for public playlist content
			console.log("Browsing for " + lastSearchString);
			callBrowsePlaylists(lastSearchString);
		}
		else if(subtabplaylist=="My Playlists") {
			callMyPlaylists(userid);
		}
		else {
			console.log("error in playlist call");
		}
	}
	else if(lastSearchBrowseTab=="Browse Albums") {
		if(lastSearchSubTab=="Featured") {
			//call API for featured playlists
			console.log("Featured albums list will be shown");
			callFeaturedAlbums();
		}
		else if(lastSearchSubTab=="Browse") {
			//call API for public playlist content
			console.log("Browsing for " + lastSearchString);
			callBrowseAlbums(lastSearchString);
		}
		else if(lastSearchSubTab=="My Albums") {
			callMyAlbums(userid);
		}
		else {
			console.log("error in album call");
		}
	}
	else if(lastSearchBrowseTab=="Browse Tracks") {
		if(lastSearchSubTab=="Featured") {
			//call API for featured playlists
			console.log("Featured tracks list will be shown");
			callFeaturedTracks();
		}
		else if(lastSearchSubTab=="Browse") {
			//call API for public playlist content
			console.log("Browsing for " + lastSearchString);
			callBrowseTracks(lastSearchString);
		}
		else if(lastSearchSubTab=="My Tracks") {
			console.log("Personal Content for " + lastSearchString);
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

function CheckTabActivity() {

	hideme("ShowWelcomeText");
	hideme("NoResultsFound");
	trackidstemp = [];

	console.log(currentbrowsetab);
	lastSearchBrowseTab = currentbrowsetab;
	Offset = 0;
	if(currentbrowsetab=="Browse Playlists") {
		playlist_input = document.getElementById("playlist_text").value;
		lastSearchString = playlist_input;
		lastSearchSubTab = subtabplaylist;
		console.log(subtabplaylist);
		if(subtabplaylist=="Featured") {
//call API for featured playlists
			console.log("Featured playlist list will be shown");
			callFeaturedPlaylists();
		}
		else if(subtabplaylist=="Browse") {
		//call API for public playlist content
			console.log("Browsing for " + playlist_input);
			if(playlist_input=="") {
				$('#pleaseEnterInput-modal').modal('show');
			}
			else {
			callBrowsePlaylists(playlist_input);
			}
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
		lastSearchString = album_input;
		lastSearchSubTab = subtabalbum;
		console.log(subtabalbum);
		if(subtabalbum=="Featured") {
		//call API for featured playlists
			console.log("Featured albums list will be shown");
			callFeaturedAlbums();
		}
		else if(subtabalbum=="Browse") {
		//call API for public playlist content
			console.log("Browsing for " + album_input);
			if(album_input=="") {
				$('#pleaseEnterInput-modal').modal('show');
			}
			else {
			callBrowseAlbums(album_input);
		}
		}
		else if(subtabalbum=="My Albums") {
			/*callMyAlbums(userid);*/
			$('#FeatureNotAvailable-Modal').modal('show');
		}
		else {
			console.log("error in album call");
		}
	}
	else if(currentbrowsetab=="Browse Tracks") {
		track_input = document.getElementById("track_text").value;
		lastSearchString = track_input;
		lastSearchSubTab = subtabtrack;
		console.log(subtabtrack);
		if(subtabtrack=="Featured") {
			//call API for featured playlists
			console.log("Featured tracks list will be shown");
			callFeaturedTracks();
		}
		else if(subtabtrack=="Browse") {
			//call API for public playlist content
			console.log("Browsing for " + track_input);
			if(track_input=="") {
				$('#pleaseEnterInput-modal').modal('show');
			}
			else {
			callBrowseTracks(track_input);
		}
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
	$('#nextstep').prop('disabled', false);
}

function RemoveSearchResults() {
	hideme("ShowWelcomeText");
	hideme("NoResultsFound");
	hideme("SearchResults");
	unhideme("SelectionOptions");
	currentpage="SelectOptions";
	UnloadSpinners();
	SetIFrameSize();
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


	//spotifyApi.setAccessToken('BQAuONUxH_ECqUrusWVcKotYwwZG_F_y3jRBcokgMkaw4qlwfKER4g2QdroMWxXjZ7EZil3ZZqrwwIgueOYud_2iyUfjEJ19Pqgi0t30Ziu_wopdDdtXoXrr0ThY8r6FEhpztPgWymPlBPLC86_uP3qfbXMwqLRXIdH20r6_NhWbMXbjzwnMKgWopeikad-H-IvIc_srbqqrql2RS7fGid_-7LDs9nYViqCAJlwtHoU62P4KPNFN7HlLKgF-LThapKyZEEAS9DzhjsaAgaCDAwlbqACs8N8x-aOr5JiGyJKX4Yorph_2pVgZs-_gzGk');

	
	//localhost access_token
	spotifyApi.setAccessToken(access_token);



	spotifyApi.getMe()
	.then(function(data) {
		//console.log(data);
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

/*

function playlist1(user_id,playlistName)
{
	RemoveCarosuel();
	spotifyApi.createPlaylist(user_id,{name : playlistName})
	.then(function(data) {
		console.log(data);
		}, function(err) {
		console.error(err);
	});
}

 */

function callFeaturedPlaylists()
{
	// get albums by a certain artist
	spotifyApi.getFeaturedPlaylists({limit: 10, offset: Offset})
	.then(function(data) {
		
		console.log(data);
		if(data.playlists.items[0]) {
		populateItems(data.playlists.items, false);
		updateNavigation(data.playlists);
	}
		else {
			unhideme("NoResultsFound");
		}
	}, function(err) {
		console.error(err);
	});
}

function callBrowsePlaylists(SearchString) {
	spotifyApi.searchPlaylists(SearchString, {limit: 10, offset: Offset})
	.then(function(data) {
		
		console.log(data);
		if(data.playlists.items[0]) {
		
		populateItems(data.playlists.items, false);
		updateNavigation(data.playlists);
	}
	else {
			unhideme("NoResultsFound");
		}
	}, function(err) {
		console.error(err);
	});
}

function callMyPlaylists(userid) {
	spotifyApi.getUserPlaylists(userid ,{limit: 10, offset: Offset})
	.then(function(data) {
		console.log(data);
		if(data.items[0]) {
		populateItems(data.items, false);
		updateNavigation(data);
	}
	else {
			unhideme("NoResultsFound");
		}
	}, function(err) {
		console.error(err);
	});
}

function callBrowseAlbums(SearchString) {
	spotifyApi.searchAlbums(SearchString, {limit: 10, offset: Offset})
	.then(function(data) {

		console.log(data);
		if(data.albums.items[0])
		{
		populateItems(data.albums.items, false);
		updateNavigation(data.albums);
	}
	else {
			unhideme("NoResultsFound");
		}
	}, function(err) {
		console.error(err);
	});
}

function callMyAlbums(userid)
{
	spotifyApi.getMySavedAlbums(userid, {limit: 10, offset: Offset})
	.then(function(data) {
		console.log(data);
		if(data.albums.items[0])
		{
		populateItems(data.albums.items, false);
		updateNavigation(data.albums);
	}
	else {
			unhideme("NoResultsFound");
		}
	}, function(err) {
		console.error(err);
	});
}

function callFeaturedAlbums()
{
	spotifyApi.getNewReleases({limit: 10, offset: Offset})
	.then(function(data) {
		console.log(data);
		if(data.albums.items[0]) {
		populateItems(data.albums.items, false);
		updateNavigation(data.albums);
		SetIFrameSize();
	}
	else {
			unhideme("NoResultsFound");
			SetIFrameSize();
		}
	}, function(err) {
		console.error(err);
	});
}

function callBrowseTracks(SearchString)
{
	spotifyApi.searchTracks(SearchString, {limit: 10, offset: Offset})
	.then(function(data) {
		console.log(data);
		if(data.tracks.items[0])
		{
		populateItems(data.tracks.items, false);
		updateNavigation(data.tracks);
	}
	else {
			unhideme("NoResultsFound");
		}
	}, function(err) {
		console.error(err);
	});
}

function callMyTracks(userid)
{
	spotifyApi.getMySavedTracks({limit: 10, offset: Offset})
	.then(function(data) {
		console.log(data);
		if(data.items[0]) {
		populateItems(data.items, true);
		updateNavigation(data);
	}
	else {
			unhideme("NoResultsFound");
		}
	}, function(err) {
		console.error(err);
		unhideme("NoResultsFound");
	});
}

function populateItems(items, useTrackUri) 
{
	unhideme("showResults");
	clearfields();
	var embedurl = "https://embed.spotify.com/?uri=";
	for(i=1;i<=10;i++)
	{
		divid = "i" + i;
		node = document.getElementById(divid);
		if(items[i-1]) {
			if(useTrackUri) {
				node.src = embedurl + items[i-1].track.uri;
				var temp = items[i-1].track.uri;
				trackidstemp[i-1] = temp;
				unhideme(divid);
			} 
			else {
				node.src = embedurl + items[i-1].uri;
				var temp = items[i-1].uri;
				trackidstemp[i-1] = temp;
				unhideme(divid);
			}
		} else {
			hideme(divid);
		}
	}
	printtemptracks();
}

function updateNavigation(data) 
{
	console.log("called updateNavigation");
	console.log(data);

	if(data.previous) {
		console.log("in prev loop true");
		$("[id=prevresults]").removeClass('disabled').addClass('active');
	} else {
		console.log("in prev loop false");
		$("[id=prevresults]").removeClass('active').addClass('disabled');
	}

	if(data.next) {
		console.log("in next loop true");
		$("[id=nextresults]").removeClass('disabled').addClass('active');
	} else {
		console.log("in next loop false");
		$("[id=nextresults]").removeClass('active').addClass('disabled');
	}
}

var currentbrowsetab = "Browse Playlists";
var subtabplaylist = "Browse";
var subtabalbum = "Browse";
var subtabtrack = "Browse";
var playlist_input;
var album_input;
var track_input;
var clientID = '1337825ad7664e8a8c044edd1c64d050';
var clientSecret = '618fa9ab84974efba033811399a6ebd6'

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

function spotLogin() {
	console.log("helloooo")
	console.log("spotLogin called");
	/* if any authentication is required, this is the place to call the api */
	$.ajax({
		'url': 'https://accounts.spotify.com/authorize?client_id=' + clientID +
              '&redirect_uri=' + 'https://localhost:8000' +
              '&response_type=code',
    'type': 'GET',
    'dataType': 'jsonp',
    'cache':true,
    'success': function(result){
        console.log(result);
        
        }

	});

          }  /* redirected uri needs to change */

      

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
		}
		else if(subtabplaylist=="My Playlists") {
			console.log("Personal Content for " + playlist_input);
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
		}
		else if(subtabalbum=="Browse") {
			//call API for public playlist content
			console.log("Browsing for " + album_input);
		}
		else if(subtabalbum=="My Albums") {
			console.log("Personal Content for " + album_input);
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
		}
		else if(subtabtrack=="Browse") {
			//call API for public playlist content
			console.log("Browsing for " + track_input);
		}
		else if(subtabtrack=="My Tracks") {
			console.log("Personal Content for " + track_input);
		}
		else {
			console.log("error in track call");
		}
	}
	else
		console.log("Error choosing tabs");

}

function RemoveSearchResults() {
	console.log("calling next step");
	hideme("SearchResults");
	unhideme("SelectionOptions");
}


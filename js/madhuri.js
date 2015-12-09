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
}

function callBP() {
	unhideme("BrowsePlaylists");
	hideme("BrowseAlbums");
	hideme("BrowseTracks");
}

function callBA() {
	hideme("BrowsePlaylists");
	unhideme("BrowseAlbums");
	hideme("BrowseTracks");
}

function callBT() {
	hideme("BrowsePlaylists");
	hideme("BrowseAlbums");
	unhideme("BrowseTracks");
}

function callPB() {
	hideme("SearchPM");
	hideme("SearchPF");
	unhideme("SearchPB");
}

function callPF() {
	hideme("SearchPM");
	unhideme("SearchPF");
	hideme("SearchPB");
}

function callPM() {
	unhideme("SearchPM");
	hideme("SearchPF");
	hideme("SearchPB");
}
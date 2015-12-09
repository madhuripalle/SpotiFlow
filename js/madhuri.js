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
	unhideme("navbarid");
	unhideme("aboutid");
	unhideme("footerid");
}
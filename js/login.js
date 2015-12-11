// var clientID = '1337825ad7664e8a8c044edd1c64d050';
// var clientSecret = '618fa9ab84974efba033811399a6ebd6';


// function spotLogin() {
// 	console.log("helloooo")
// 	console.log("spotLogin called");
// 	/* if any authentication is required, this is the place to call the api */
// 	var url = 'https://accounts.spotify.com/authorize?client_id=' + clientID +
//               '&redirect_uri=' + 'http://localhost:8080/crap' +
//               '&response_type=code';

//     console.log(url);
// 	$.ajax({
// 		'url': url,
//     	'type': 'GET',
//     	'dataType': 'json',
//     	'cache':true,
//     	'success': function(result){
//         	console.log(result);        
//     	}
// 	});

// }  /* redirected uri needs to change */ 


// var elem = document.getElementById('btn-login');

// elem.addEventListener('click', spotLogin);


var stateKey = 'spotify_auth_state';
/**
 * Obtains parameters from the hash of the URL
 * @return Object
 */
function getHashParams() {
  var hashParams = {};
  var e, r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
  while ( e = r.exec(q)) {
     hashParams[e[1]] = decodeURIComponent(e[2]);
  }
  return hashParams;
}
/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
function generateRandomString(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

var params = getHashParams();
var access_token = params.access_token,
    state = params.state,
    storedState = localStorage.getItem(stateKey);
if (access_token && (state == null || state !== storedState)) {
  alert('There was an error during the authentication');
} else {
  localStorage.removeItem(stateKey);

  if (access_token) {
	removeLandingPage();
  }

  document.getElementById('btn-login').addEventListener('click', function() {
    var client_id = '1337825ad7664e8a8c044edd1c64d050'; // Your client id
    var redirect_uri = 'http://localhost:8080/'; // Your redirect uri
    var state = generateRandomString(16);
    localStorage.setItem(stateKey, state);
    var scope = 'user-read-private user-read-email';
    var url = 'https://accounts.spotify.com/authorize';
    url += '?response_type=token';
    url += '&client_id=' + encodeURIComponent(client_id);
    url += '&scope=' + encodeURIComponent(scope);
    url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
    url += '&state=' + encodeURIComponent(state);
    window.location = url;
  }, false);
}
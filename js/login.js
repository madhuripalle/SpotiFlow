var stateKey = 'spotify_auth_state';
/**
 * Obtains parameters from the hash of the URL
 * @return Object
 */
var user_name, img, user_id;


function getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    while (e = r.exec(q)) {
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
    window.location.href = "/";
} else {

    localStorage.removeItem(stateKey);

    if (access_token) {
        removeLandingPage();
        localStorage.setItem('access_token', access_token);
        $.ajax({

            url: 'https://api.spotify.com/v1/me',
            headers: {
                'Authorization': 'Bearer ' + access_token
            },
            success: function(response) {
                //console.log(response)
                user_name = response.display_name;
                img = response.images[0].url;
                user_id = response.id;
                //console.log(user_id)
                document.getElementById('user_name').innerHTML = user_name;
                document.getElementById('img').src = img;
            }
        });
    } else {
        localStorage.removeItem('access_token');
    }

    document.getElementById('btn-login').addEventListener('click', function() {
        var client_id = '1337825ad7664e8a8c044edd1c64d050'; // Your client id
        var redirect_uri = 'http://localhost:8080/'; // Your redirect uri
        //var redirect_uri = 'file:///Users/rishina/Desktop/SpotiFlow/index.html';
        var state = generateRandomString(16);
        localStorage.setItem(stateKey, state);
        var scope = 'user-read-private user-read-email playlist-read-collaborative playlist-read-private user-read-private playlist-modify-public playlist-modify-private streaming user-library-read user-library-modify user-follow-modify user-follow-read'; //change scopes finally
        var url = 'https://accounts.spotify.com/authorize';
        url += '?response_type=token';
        url += '&client_id=' + encodeURIComponent(client_id);
        url += '&scope=' + encodeURIComponent(scope);
        url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
        url += '&state=' + encodeURIComponent(state);
        window.location = url;
    }, false);
}

function logout() {
    unhideme("landingpageid");
    hideme("navbarid");
    hideme("searchid");
    hideme("footerid");
    localStorage.removeItem('access_token');
}

var elementLogout = document.getElementById('logout');

elementLogout.addEventListener('click', logout);

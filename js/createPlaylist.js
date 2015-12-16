$(document).ready(function() {
    // lets get started

    // creation of playlist

    var playlistName;

    //console.log(user_id);


    function createlist() {
        RemoveCarosuel();
        console.log('creating')

        //calling playlist creation function

        playlist();
        SetIFrameSize();
    }

    var elementC = document.getElementById('btn-create');

    elementC.addEventListener('click', createlist);

    function playlist() {

        playlistName = document.getElementById('playlistName').value;

        console.log('Creating Awesome Playlist with Name: ', playlistName);

        $.ajax('https://api.spotify.com/v1/users/' + user_id + '/playlists', {
            method: 'POST',
            data: JSON.stringify({
                'name': playlistName,
                'public': true
            }),
            dataType: 'json',
            headers: {
                'Authorization': 'Bearer ' + access_token,
                'Content-Type': 'application/json'
            },
            success: function(response) {
                console.log(response);
                
            },
            error: function(err) {
                console.log('Error', err);
            }
        });
    }
});
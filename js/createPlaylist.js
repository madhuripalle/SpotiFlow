// lets get started

// creation of playlist

var playlistName = document.getElementById('playlistName');

//console.log(user_id);


function createlist() {
    RemoveCarosuel();
    console.log('creating')


    $.ajax({

        url: 'https://api.spotify.com/v1/users/' + user_id + '/playlists',
        type: "POST",
        headers: {
            'Authorization': 'Bearer ' + access_token,
            'Content-Type': 'application/json'
        },

        //data: {
       //     'name': playlistName
       // },

        success: function(response) {
            console.log(response)
                //console.log('created playlist')
        }
    });
}

var elementC = document.getElementById('btn-create');

elementC.addEventListener('click', createlist);
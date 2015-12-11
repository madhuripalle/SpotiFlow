//$(document).ready( function () {

//var setIFrameHeight = function () {
function setIFrameWidth () {
    var width = Math.min($('#sidebar').width(), 640);
    $('#current-pl').attr('width', width);
};

setIFrameWidth();

// Reset iframe height after window resize
$(window).resize(setIFrameWidth);  

// Need a var for the created playlist (object and/or URI)

//});

//Section of the https://play.spotify.com/user/playlistURI page to embed
//<section id="pf-playlist-view" class="pf-playlist-view col-lg-9 col-md-8 col-sm-8 col-xs-6" data-bind="scrollCache: activeURI">
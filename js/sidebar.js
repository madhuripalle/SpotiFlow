//var setIFrameHeight = function () {
function setIFrameWidth () {
    var width = Math.min($('#sidebar').width(), 640);
    $('#current-pl').attr('width', width);
};

$('#carouselbtn').click(setIFrameWidth);


// Reset iframe height after window resize
$(window).resize(setIFrameWidth);  

// Need a var for the created playlist (object and/or URI)

function SetIFrameWidth () {
    console.log("setIFrameWidth called");
    var width = Math.min($('#sidebar').width(), 640);
    $('#current-pl').attr('width', width);
};

$('#carouselbtn').click(function(e) {
    SetIFrameWidth();
    // To test
    LoadSpinners(4);
});

// Reset iframe height after window resize
$(window).resize(SetIFrameWidth);  

// Need a var for the created playlist (object and/or URI)

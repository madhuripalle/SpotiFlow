// Reset iframe height after window resize
$(window).resize(SetIFrameSize);

/*$('#carouselbtn').click(function(e) {
    SetIFrameSize();
    // To test
    //LoadSpinners(4);
});*/

function SetIFrameSize () {
    console.log("setIFrameSize called");
    // Set sidebar and current-pl width
    var containerRightMargin = ($('div.container:last').outerWidth(true)-$('div.container:last').width()) / 3;
    $('#sidebar').css('margin-right', containerRightMargin+'px');
    $('#sidebar').css('width', '33.3333333%');
    var sidebarWidth = $('#sidebar').width()-containerRightMargin;
    $('#sidebar').css('width', sidebarWidth+'px');
    var width = Math.min($('#sidebar').width(), 640);
    $('#current-pl').attr('width', width);

    // Set sidebar and current-pl height
    var activePage = $('.background-choice').filter(function() {
        return $(this).css('display') === 'block';
    });
    var sidebarHeight = activePage.height() - $('#prevstep').parent().outerHeight(true);
    $('#sidebar').css('height', sidebarHeight);
    var height = Math.min($('#sidebar').height()-$('#sidebar').find('h3').outerHeight(true)-$('#sidebar').find('p').outerHeight(true), 720);
    $('#current-pl').attr('height', height);
};

function DisplayCurrentDuration() {
    $('#sidebar').find('p').text('<strong>Duration: </strong>'+SecondsToTime(Math.floor(currentPlaylistDuration)));
};

function SecondsToTime(seconds) {
    var s = seconds;
    var h = Math.floor(s/3600); //Get whole hours
    s -= h*3600;
    var m = Math.floor(s/60); //Get remaining minutes
    s -= m*60;
    return h+":"+(m < 10 ? '0'+m : m)+":"+(s < 10 ? '0'+s : s); //zero padding on minutes and seconds
};

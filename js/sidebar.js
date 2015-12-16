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
    var sidebarHeight1 = $(window).height() - $('#navbarid').outerHeight(true) - $('.step-nav').outerHeight(true) - $('#footerid').outerHeight(true);
    var sidebarHeight2 = activePage.height() - $('.step-nav').outerHeight(true);
    var sidebarHeight = Math.min(sidebarHeight1, sidebarHeight2);
    $('#sidebar').css('height', sidebarHeight+'px');
    var height = Math.min(sidebarHeight-$('#sidebar').find('h3').outerHeight(true)-$('#sidebar').find('p').outerHeight(true), 720);
    $('#current-pl').attr('height', height+'px');
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

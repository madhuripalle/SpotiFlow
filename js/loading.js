/*
 *  Show loading div with spinner (spin.min.js)
 */


function LoadSpinners () {
    console.log("loadSpinners called");
    $('.loading').show();
    var opts = {
        lines: 7 // The number of lines to draw
        , length: 2 // The length of each line
        , width: 2 // The line thickness
        , radius: 5 // The radius of the inner circle
        , scale: 1 // Scales overall size of the spinner
        , corners: 1 // Corner roundness (0..1)
        , color: '#000' // #rgb or #rrggbb or array of colors
        , opacity: 0.25 // Opacity of the lines
        , rotate: 0 // The rotation offset
        , direction: 1 // 1: clockwise, -1: counterclockwise
        , speed: 0.7 // Rounds per second
        , trail: 42 // Afterglow percentage
        , fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
        , zIndex: 2e9//2e9 // The z-index (defaults to 2000000000)
        , className: 'spinner' // The CSS class to assign to the spinner
        , top: '50%' // Top position relative to parent
        , left: '50%' // Left position relative to parent
        , shadow: false // Whether to render a shadow
        , hwaccel: false // Whether to use hardware acceleration
        , position: 'absolute' // Element positioning
    };
    var targets = document.getElementsByClassName('loading');
    var spinners = [];
    var i = 0;
    for (i = 0; i < targets.length; i++) {
        var temp = new Spinner(opts).spin();
        targets[i].appendChild(temp.el);
        spinners.push(temp); //throwing an error

        // this may fail if we receive less than ten results
        // or if doesn't gether targets in order
        var idNum = i+1;
        $('#i'+idNum).data('spinner-id', i);
        $('#i'+idNum).load(function () {
            spinners[$(this).data('spinner-id')].stop();
            $(this).parent().find('.loading').hide();
        });
    }
    

    // breaks it currenty.
    
    $('.pager').click(function () {
        var i = 0;
        for (i = 0; i < spinners.length; i++){
            var idNum = i+1;
            spinners[i].stop();
            $('#i'+idNum).parent().find('.loading').hide();
        }
    });
};

// on result iframe load, remove spinner

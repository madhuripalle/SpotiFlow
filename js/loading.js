    /*
     *  Show loading div with spinner (spin.min.js)
     */
    var loadSpinners = function () {
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
            , zIndex: 2//2e9 // The z-index (defaults to 2000000000)
            , className: 'spinner' // The CSS class to assign to the spinner
            , top: '50%' // Top position relative to parent
            , left: '50%' // Left position relative to parent
            , shadow: false // Whether to render a shadow
            , hwaccel: false // Whether to use hardware acceleration
            , position: 'absolute' // Element positioning
        };
        var targets = document.getElementsByClass('loading');
        var spinners = [];
        for (var i in targets) {
            spinners.add(new Spinner(opts).spin(targets[i]));
        }
        //var spinner = new Spinner(opts).spin(target);
        // Add individual iframe.load( hide the child .loading element )
    });

    // on result iframe load, remove spinner

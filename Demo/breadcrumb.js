jQuery(document).ready(function() {

    breadCrumb();

});

function breadCrumb() {
    // get current location
    var $location = $(location).attr('href');

    // array existing protocols
    var $beginPath = [ 'http://', 'https://'];

    // loop breadcrumb
    for (var i = 0; i < $beginPath.length; i++) {
        if ( $location.startsWith($beginPath[i]) ) {
            $path = $location.replace($beginPath[i], '');

            // = http://
            var $basePath = $path.substr(0, $path.indexOf('/') );

            // = http://domain
            BASEPATH = $beginPath[i] + $basePath + '/';

            // GET BASEPATH (for your demo, you'll probably use an other way for your Application)
            getBasePath();

            // = foo/foo2/foo3 ...
            $routingArray = $path.split('/');

            // Loop each slug
            for (var i = 0; i < $routingArray.length; i++) {
                if ( i > 0 ) {
                    if ( i == 1 ) {
                        // http://domain/foo ...
                        var $url = BASEPATH + $routingArray[i];
                    }

                    if ( i > 1 ) {
                        $url = $urlNext + '/' + $routingArray[i];
                    }

                    // for next loop
                    var $urlNext = $url;

                    // if not location
                    if ( $location != $url && $location != $url + '/') {
                        $('.path_url').append(" > <a class='route"+i+"'>"+ $routingArray[i] +"</a>");
                        var $link = $('.route'+i).attr('href', $url);
                        // just for style ;)
                        styleLink($link);
                    }

                    // if $location
                    if ( $location == $url || $location == $url + '/') {
                        var $last = $('.path_url span');

                        // Verify if is the last (for the last '/' in your url ;) )
                        if ( $last.length < 1 ) {
                            $('.path_url').append(" > <span class='current-location'>"+ $routingArray[i] +"</span>");
                        }
                    }
                }
            }
        }
    }
}

function styleLink($link) {
    $link.addClass('pasted-item');
}

function getBasePath() {
    $('.path_url a:first-child').attr('href', BASEPATH);
    $('.nav li').each(function() {
        var $href = $(this).find('a').attr('href');

        // check your url
        // console.log(BASEPATH + $href);
        var t = $(this).find('a').attr('href', BASEPATH + $href);
    })
}

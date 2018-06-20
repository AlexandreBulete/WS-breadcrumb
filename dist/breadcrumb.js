jQuery(document).ready(function() {

    breadCrumb();

});

function breadCrumb() {
    // get current location
    var $location = $(location).attr('href');

    // array begin url existing
    var $beginPath = [ 'http://', 'https://', 'http://www.', 'https://www.' ];

    // loop breadcrumb
    for (var i = 0; i < $beginPath.length; i++) {
        if ( $location.startsWith($beginPath[i]) ) {
            $path = $location.replace($beginPath[i], '');

            // = http://
            var $basePath = $path.substr(0, $path.indexOf('/') );

            // = http://domain
            BASEPATH = $beginPath[i] + $basePath + '/';

            // = foo/foo2/foo3
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
                    if ( $location != $url ) {
                        $('.path_url').append(" > <a class='route"+i+"'>"+ $routingArray[i] +"</a>");
                        var $link = $('.route'+i).attr('href', $url);
                        // just for style ;)
                        styleLink($link);
                    }

                    // if $location
                    if ( $location == $url ) {
                        $('.path_url').append(" > <span class=''>"+ $routingArray[i] +"</span>");
                    }

                }

            }

        }
    }
}

function styleLink($link) {
    $link.addClass('pasted-item');
}

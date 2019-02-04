WS_BreadCrumb();

function WS_BreadCrumb() {
    // get current location
    let PATH = location.href;
    // array existing protocols
    let protocol = [ 'http://', 'https://'];

    let app = document.getElementById('WS-breadcrumb');

    // loop breadcrumb
    for (var i = 0; i < protocol.length; i++) {
        if ( PATH.startsWith(protocol[i]) ) {
            let domain = PATH.replace(protocol[i], '');

            // = http://
            let basePath = domain.substr(0, domain.indexOf('/') );

            // = http://domain
            BASEPATH = protocol[i] + basePath + '/';

            // GET BASEPATH (for the demo, you'll probably use an other way for your Application)
            getBasePath();

            // get correct url from the navbar ;)
            getNavbarLinks(PATH);

            // = foo/foo2/foo3 ...
            routes = domain.split('/');

            // remove querystring
            if ( routes[routes.length-1].startsWith('?') || routes[routes.length-1].startsWith('#') || routes[routes.length-1].startsWith('') ) {
                routes.splice(routes.length-1);
            }

            // Loop each slug
            for (var i = 0; i < routes.length; i++) {
                if ( i > 0 ) {
                    if ( i == 1 ) {
                        // http://domain/foo ...
                        var url = BASEPATH + routes[i];
                    }

                    if ( i > 1 ) {
                        url = urlNext + '/' + routes[i];
                    }

                    // for next loop
                    var urlNext = url;

                    // if not location
                    if ( PATH != url && PATH != url + '/' && i < routes.length-1) {
                        newLink = document.createElement('a');
                        newLink.setAttribute('class', 'route'+i);
                        newLink.innerHTML = routes[i];
                        
                        app.querySelector('.path_url').innerHTML += ' > ';
                        app.querySelector('.path_url').appendChild(newLink);
                        app.querySelector('.route'+i).setAttribute('href', url);
                        let link = app.querySelector('.route'+i);

                        // just for style ;)
                        styleLink(link);
                    }

                    // if PATH
                    if ( i === routes.length-1 ) {
                        let last = document.querySelector('.path_url span');

                        // Verify if is the last (for the last '/' in your url ;) )
                        if ( !last ) {
                            let last = document.createElement('span');
                            last.setAttribute('class', 'current-location');
                            last.innerHTML = routes[i];
                            app.querySelector('.path_url').innerHTML += ' > ';
                            app.querySelector('.path_url').appendChild(last);
                        }
                    }
                }
            }
        }
    }
}

function styleLink(link) {
    link.className += ' past-item';
}

function getBasePath() {
    document.getElementsByClassName('.path_url a:first-child').href=BASEPATH;    

    document.querySelectorAll('.nav li').forEach(function(elem) {
        if ( elem.querySelector('a') ) {
            let href = elem.querySelector('a').href;
            elem.querySelector('a').setAttribute('href', BASEPATH+href);
        }
    });
}

function getNavbarLinks(PATH) {
    let prev = null;
    let list = document.querySelectorAll('.nav li');
    list.forEach(function(elem) {
        if ( elem.querySelector('a') ) {
            elem = elem.querySelector('a');
            
            let slug = elem.getAttribute('data-slug');
            
            elem.setAttribute('href', PATH+slug);
            if ( prev != null ) {
                elem.setAttribute('href', prev+'/'+slug);
            }
            prev = elem.getAttribute('href');
        }
    })
}

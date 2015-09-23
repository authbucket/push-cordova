//
// AuthBucket
//
(function(hello) {
    hello.init({
        authbucket: {
            name: 'AuthBucket',
            base: 'http://oauth2-symfony-bundle.authbucket.com/api/oauth2/',
            oauth: {
                version: 2,
                auth: 'http://oauth2-symfony-bundle.authbucket.com/api/oauth2/authorize',
                grant: 'http://oauth2-symfony-bundle.authbucket.com/api/oauth2/token',
            },
            refresh: true,
            scope: {
                basic: '',
            },
            scope_delim: ' ',
            get: {
                'me': 'debug',
            },
        },
    });
})(hello);

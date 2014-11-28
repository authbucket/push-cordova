angular.module('starter', ['starter.controllers'])

.config(function($stateProvider, $routeProvider) {

    //Ionic uses AngularUI Router which uses the concept of states
    //Learn more here: https://github.com/angular-ui/ui-router
    //  Set up the various states which the app can be in.
    //Each state's controller can be found in controllers.js
    $routeProvider

    //setup an abstract state for the tabs directive
        .when('tab', {
        url: "/tab",
        abstract: true,
        templateUrl: "templates/tabs.html",
    })

    //Each tab has its own nav history stack:
    .state('tab.login', {
            url: '/login',
            views: {
                'tab-login': {
                    templateUrl: 'templates/logfile/login.html',
                    controller: 'loginCtrl'
                }
            }
        })
        .state('tab.logout', {
            url: '/logout',
            views: {
                'tab-logout': {
                    templateUrl: 'templates/logfile/logout.html',
                    controller: 'logoutCtrl'
                }
            }
        })
        .state('tab.register', {
            url: '/register',
            views: {
                'tab-register': {
                    templateUrl: 'templates/registerfile/register.html',
                    controller: 'registerCtrl'
                }
            }
        })
        .state('tab.unregister', {
            url: '/unregister',
            views: {
                'tab-unregister': {
                    templateUrl: 'templates/registerfile/unregister.html',
                    controller: 'unregisterCtrl'
                }
            }
        })
        .state('tab.channel', {
            url: '/channel',
            views: {
                'tab-channel': {
                    templateUrl: 'templates/channel/channel.html',
                    controller: 'channelCtrl'
                }
            }
        })
        .state('tab.debug', {
            url: '/debug',
            views: {
                'tab-debug': {
                    templateUrl: 'templates/debug/debug.html',
                    controller: 'debugCtrl'
                }
            }
        });

    //if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/login');

});
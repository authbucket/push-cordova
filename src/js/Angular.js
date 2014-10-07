angular.module('starter', ['push-cordova', 'starter.controllers'])

.run(function($push-cordovaPlatform) {
    $push-cordovaPlatform.ready(function() {
        //Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        //for form inputs)
        if(window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if(window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})

.config(function($stateProvider, $urlRouterProvider) {

    //Ionic uses AngularUI Router which uses the concept of states
    //Learn more here: https://github.com/angular-ui/ui-router
    //  Set up the various states which the app can be in.
    //Each state's controller can be found in controllers.js
    $stateProvider

    //setup an abstract state for the tabs directive
    .state('template', {
        templateUrl: "templates/template.html"
        controller: 'starter.controller'
    })

    //if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/template');

});

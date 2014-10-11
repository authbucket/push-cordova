var PushNotification = function() {};


// Call this to register for push notifications. Content of [options] depends on whether we are working with APNS (iOS) or GCM (Android)
PushNotification.prototype.register = function(successCallback, errorCallback, options) {
    if (errorCallback === null) {
        errorCallback = function() {};
    }

    if (typeof errorCallback != "function") {
        console.log("PushNotification.register failure: failure parameter not a function");
        return;
    }

    if (typeof successCallback != "function") {
        console.log("PushNotification.register failure: success callback parameter must be a function");
        return;
    }

    cordova.exec(successCallback, errorCallback, "PushPlugin", "register", [options]);
};

// Call this to unregister for push notifications
PushNotification.prototype.unregister = function(successCallback, errorCallback) {
    if (errorCallback === null) {
        errorCallback = function() {};
    }

    if (typeof errorCallback != "function") {
        console.log("PushNotification.unregister failure: failure parameter not a function");
        return;
    }

    if (typeof successCallback != "function") {
        console.log("PushNotification.unregister failure: success callback parameter must be a function");
        return;
    }

    cordova.exec(successCallback, errorCallback, "PushPlugin", "unregister", []);
};


// Call this to set the application icon badge
PushNotification.prototype.setApplicationIconBadgeNumber = function(successCallback, badge) {
    if (errorCallback === null) {
        errorCallback = function() {};
    }

    if (typeof errorCallback != "function") {
        console.log("PushNotification.setApplicationIconBadgeNumber failure: failure parameter not a function");
        return;
    }

    if (typeof successCallback != "function") {
        console.log("PushNotification.setApplicationIconBadgeNumber failure: success callback parameter must be a function");
        return;
    }

    cordova.exec(successCallback, successCallback, "PushPlugin", "setApplicationIconBadgeNumber", [{
        badge: badge
    }]);
};

//-------------------------------------------------------------------

if (!window.plugins) {
    window.plugins = {};
}
if (!window.plugins.pushNotification) {
    window.plugins.pushNotification = new PushNotification();
}
var pushNotification;

function onDeviceReady() {
    $("#app-status-ul").append('<li>deviceready event received</li>');

    document.addEventListener("backbutton", function(e) {
        $("#app-status-ul").append('<li>backbutton event received</li>');

        if ($("#home").length > 0) {
            // call this to get a new token each time. don't call it to reuse existing token.
            //pushNotification.unregister(successHandler, errorHandler);
            e.preventDefault();
            navigator.app.exitApp();
        } else {
            navigator.app.backHistory();
        }
    }, false);

    try {
        pushNotification = window.plugins.pushNotification;
        $("#app-status-ul").append('<li>registering ' + device.platform + '</li>');
        if (device.platform == 'android' || device.platform == 'Android' ||
            device.platform == 'amazon-fireos') {
            pushNotification.register(successHandler, errorHandler, {
                "senderID": "405221447351",
                "ecb": "onNotification"
            }); // required!
        } else {
            pushNotification.register(tokenHandler, errorHandler, {
                "badge": "true",
                "sound": "true",
                "alert": "true",
                "ecb": "onNotificationAPN"
            }); // required!
        }
    } catch (err) {
        txt = "There was an error on this page.\n\n";
        txt += "Error description: " + err.message + "\n\n";
        alert(txt);
    }
}

// handle APNS notifications for iOS
function onNotificationAPN(e) {
    if (e.alert) {
        $("#app-status-ul").append('<li>MESSAGE -> MSG: ' + e.alert + '</li>');
        // showing an alert also requires the org.apache.cordova.dialogs plugin
        navigator.notification.alert(e.alert);
    }

    if (e.sound) {
        // playing a sound also requires the org.apache.cordova.media plugin
        var snd = new Media(e.sound);
        snd.play();
    }

    if (e.badge) {
        pushNotification.setApplicationIconBadgeNumber(successHandler, e.badge);
    }
}

// handle GCM notifications for Android
function onNotification(e) {
    $("#app-status-ul").append('<li>EVENT -> RECEIVED:' + e.event + '</li>');

    switch (e.event) {
        case 'registered':
            if (e.regid.length > 0) {
                $("#app-status-ul").append('<li>REGISTERED -> REGID:' + e.regid + "</li>");
                // Your GCM push server needs to know the regID before it can push to this device
                // here is where you might want to send it the regID for later use.
                console.log("regID = " + e.regid);
                // Register the device token to push-php.authbucket.com
                $.ajax({
                    url: "http://push-php.authbucket.com/api/v1.0/push/register",
                    type: "POST",
                    headers: {
                        'Authorization': 'Bearer 18cdaa6481c0d5f323351ea1029fc065',
                    },
                    data: {
                        'device_token': e.regid,
                        'service_id': '78b67c04bfd60ddfc8c90895d36e1e05',
                    },
                });
            }
            break;

        case 'message':
            // if this flag is set, this notification happened while we were in the foreground.
            // you might want to play a sound to get the user's attention, throw up a dialog, etc.
            if (e.foreground) {
                $("#app-status-ul").append('<li>--INLINE NOTIFICATION--' + '</li>');

                // on Android soundname is outside the payload. 
                // On Amazon FireOS all custom attributes are contained within payload
                var soundfile = e.soundname || e.payload.sound;
                // if the notification contains a soundname, play it.
                // playing a sound also requires the org.apache.cordova.media plugin
                var my_media = new Media("/android_asset/www/" + soundfile);

                my_media.play();
            } else { // otherwise we were launched because the user touched a notification in the notification tray.
                if (e.coldstart)
                    $("#app-status-ul").append('<li>--COLDSTART NOTIFICATION--' + '</li>');
                else
                    $("#app-status-ul").append('<li>--BACKGROUND NOTIFICATION--' + '</li>');
            }

            $("#app-status-ul").append('<li>MESSAGE -> MSG: ' + e.payload.alert + '</li>');
            break;

        case 'error':
            $("#app-status-ul").append('<li>ERROR -> MSG:' + e.msg + '</li>');
            break;

        default:
            $("#app-status-ul").append('<li>EVENT -> Unknown, an event was received and we do not know what it is</li>');
            break;
    }
}

function tokenHandler(result) {
    $("#app-status-ul").append('<li>REGISTERED -> REGID:' + result + "</li>");
    // Your iOS push server needs to know the token before it can push to this device
    // here is where you might want to send it the token for later use.
    console.log("regID = " + result);
    // Register the device token to push-php.authbucket.com
    $.ajax({
        url: "http://push-php.authbucket.com/api/v1.0/push/register",
        type: "POST",
        headers: {
            'Authorization': 'Bearer 18cdaa6481c0d5f323351ea1029fc065',
        },
        data: {
            'device_token': result,
            'service_id': 'f2ee1d163e9c9b633efca95fb9733f35',
        },
    });
}

function successHandler(result) {
    $("#app-status-ul").append('<li>success:' + result + '</li>');
}

function errorHandler(error) {
    $("#app-status-ul").append('<li>error:' + error + '</li>');
}

document.addEventListener('deviceready', onDeviceReady, true);
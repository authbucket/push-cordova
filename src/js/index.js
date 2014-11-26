function onDeviceReady() {
    $("#debug").prepend('<li>deviceready event received</li>');

    try {
        pushNotification = window.plugins.pushNotification;
        $("#debug").prepend('<li>registering ' + device.platform + '</li>');
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
        $("#debug").prepend('<li>MESSAGE -> MSG: ' + e.alert + '</li>');
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
    $("#debug").prepend('<li>EVENT -> RECEIVED:' + e.event + '</li>');

    switch (e.event) {
        case 'registered':
            if (e.regid.length > 0) {
                $("#debug").prepend('<li>REGISTERED -> REGID:' + e.regid + "</li>");
                // Your GCM push server needs to know the regID before it can push to this device
                // here is where you might want to send it the regID for later use.
                console.log("regID = " + e.regid);
                // Register the device token to push-symfony-bundle.authbucket.com
                $.ajax({
                    url: "http://push-symfony-bundle.authbucket.com/api/v1.0/push/register",
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
                $("#debug").prepend('<li>--INLINE NOTIFICATION--' + '</li>');

                // on Android soundname is outside the payload. 
                // On Amazon FireOS all custom attributes are contained within payload
                var soundfile = e.soundname || e.payload.sound;
                // if the notification contains a soundname, play it.
                // playing a sound also requires the org.apache.cordova.media plugin
                var my_media = new Media("/android_asset/www/" + soundfile);

                my_media.play();
            } else { // otherwise we were launched because the user touched a notification in the notification tray.
                if (e.coldstart)
                    $("#debug").prepend('<li>--COLDSTART NOTIFICATION--' + '</li>');
                else
                    $("#debug").prepend('<li>--BACKGROUND NOTIFICATION--' + '</li>');
            }

            $("#debug").prepend('<li>MESSAGE -> MSG: ' + e.payload.alert + '</li>');
            break;

        case 'error':
            $("#debug").prepend('<li>ERROR -> MSG:' + e.msg + '</li>');
            break;

        default:
            $("#debug").prepend('<li>EVENT -> Unknown, an event was received and we do not know what it is</li>');
            break;
    }
}

function tokenHandler(result) {
    $("#debug").prepend('<li>REGISTERED -> REGID:' + result + "</li>");
    // Your iOS push server needs to know the token before it can push to this device
    // here is where you might want to send it the token for later use.
    console.log("regID = " + result);
    // Register the device token to push-symfony-bundle.authbucket.com
    $.ajax({
        url: "http://push-symfony-bundle.authbucket.com/api/v1.0/push/register",
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
    $("#debug").prepend('<li>success:' + result + '</li>');
}

function errorHandler(error) {
    $("#debug").prepend('<li>error:' + error + '</li>');
}

document.addEventListener('deviceready', onDeviceReady, true);

// Handle login button.
hello.init({
    authbucket: '6b44c21ef7bc8ca7380bb5b8276b3f97',
}, {
    redirect_uri: 'http://localhost',
});
hello.on('auth.login', function(auth) {
    $("#debug").prepend('<li>' + auth.authResponse.access_token + '</li>');

    $.ajax({
        url: "http://oauth2-symfony-bundle.authbucket.com/api/v1.0/oauth2/debug",
        type: "GET",
        headers: {
            'Authorization': 'Bearer ' + auth.authResponse.access_token,
        },
    }).done(function(json) {
        $("#debug").prepend('<li>' + json.username + '</li>');
    });
});
$(document).on('click', '#login', function() {
    hello('authbucket').login();
});

// Handle logout button.
$(document).on('click', '#logout', function() {
    hello('authbucket').logout();
    $.get('http://oauth2-symfony-bundle.authbucket.com/oauth2/authorize/logout');
    $("#debug").prepend('<li>logout successfully</li>');
});

// Handle scope button debug.
['demoscope1', 'demoscope2', 'demoscope3', 'demoscope4'].forEach(function(element, index, array) {
    $(document).on('click', '#' + element, function() {
        if ($('#' + element).hasClass('active')) {
            $("#debug").prepend('<li>' + element + ' active</li>');
        } else {
            $("#debug").prepend('<li>' + element + ' deactive</li>');
        }
    });
});
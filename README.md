AuthBucket\\PushCordova
=======================

[![Build
Status](https://travis-ci.org/authbucket/push-cordova.svg?branch=master)](https://travis-ci.org/authbucket/push-cordova)

The target of this demo is to cooperate with [AuthBucket\Bundle\PushBundle](http://push-symfony-bundle.authbucket.com/) for push notification functionality.

For initialization:

    $ npm install
    $ bower install
    $ grunt

For adding platforms:

    $ cordova platform add ios
    $ cordova platform add android

For execute demo on real devices:

    $ cordova run ios
    $ cordova run android

For Cleanup environment:

    $ grunt clean

For sending out anonymous broadcast message to this demo:

    $ CLIENT_ID="6b44c21ef7bc8ca7380bb5b8276b3f97"
    $ CLIENT_SECRET="54fe25c871b3ee81d037b6b22bed84b2"
    $ ALERT="hello"
    $ curl -X POST \
        -u $CLIENT_ID:$CLIENT_SECRET \
        -d "grant_type=client_credentials" \
        http://oauth2-symfony-bundle.authbucket.com/api/v1.0/oauth2/token 
    $ TOKEN=__REPLACE_WITH_ACCESS_TOKEN_RETURN__
    $ curl -X POST \
        -H "Authorization: Bearer $TOKEN" \
        -d "alert=$ALERT" \
        http://push-symfony-bundle.authbucket.com/api/v1.0/push/send

For sending out named message with specific scope:

    $ CLIENT_ID="6b44c21ef7bc8ca7380bb5b8276b3f97"
    $ CLIENT_SECRET="54fe25c871b3ee81d037b6b22bed84b2"
    $ USERNAME="demousername1"
    $ PASSWORD="demopassword1"
    $ SCOPE="demoscope1 demoscope2"
    $ ALERT="hello"
    $ curl -X POST \
        -u $CLIENT_ID:$CLIENT_SECRET \
        -d "grant_type=password&username=$USERNAME&password=$PASSWORD&scope=$SCOPE" \
        http://oauth2-symfony-bundle.authbucket.com/api/v1.0/oauth2/token
    $ TOKEN=__REPLACE_WITH_ACCESS_TOKEN_RETURN__
    $ curl -X POST \
        -H "Authorization: Bearer $TOKEN" \
        -d "alert=$ALERT" \
        http://push-symfony-bundle.authbucket.com/api/v1.0/push/send

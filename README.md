AuthBucket\\PushCordova
=======================

[![Build
Status](https://travis-ci.org/authbucket/push-cordova.svg?branch=master)](https://travis-ci.org/authbucket/push-cordova)

The target of this demo is to cooperate with
[AuthBucket](http://push-symfony-bundle.authbucket.com/) for push
notification functionality.

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

    $ ./bin/broadcast.sh

For sending out named message with specific scope:

    $ ./bin/named.sh

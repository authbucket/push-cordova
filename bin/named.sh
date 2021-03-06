#!/bin/bash

CLIENT_ID="6b44c21ef7bc8ca7380bb5b8276b3f97"
CLIENT_SECRET="54fe25c871b3ee81d037b6b22bed84b2"
ALERT="$0"

USERNAME="demousername1"
PASSWORD="demopassword1"
SCOPE="demoscope1 demoscope2"

TOKEN_RESPONSE=`curl -X POST -u $CLIENT_ID:$CLIENT_SECRET -d "grant_type=password&username=$USERNAME&password=$PASSWORD&scope=$SCOPE" http://oauth2-symfony-bundle.authbucket.com/api/v1.0/oauth2/token`
echo $TOKEN_RESPONSE | python -m json.tool

TOKEN=`echo $TOKEN_RESPONSE | sed 's/.*"access_token":"\([a-zA-Z0-9]*\)",.*/\1/g'`
echo $TOKEN

SEND_RESPONSE=`curl -X POST -H "Authorization: Bearer $TOKEN" -d "alert=$ALERT" http://push-symfony-bundle.authbucket.com/api/v1.0/push/send`
echo $SEND_RESPONSE | python -m json.tool

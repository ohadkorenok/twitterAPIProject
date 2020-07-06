from __future__ import unicode_literals
import tweepy

consumer_key = "JsSXoTPMgv8zusKfbOMGRCivI"
consumer_secret = "7D7qa5oJxhMcAkWeNFqRLP9WkRp9uQHgjvJJwMlApm4XpG9MWK"

access_token = "1229403032472997889-zC4NCHPXdxzj97kgkVppri3GbP8tDv"
access_token_secret = "q3wnbyfj5Jtsm4UnWLFEzppJ881xzjmZVuH5fiAEYDIiK"


def create_api():
    auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
    auth.set_access_token(access_token, access_token_secret)
    api = tweepy.API(auth, wait_on_rate_limit=True, wait_on_rate_limit_notify=True)
    try:
        api.verify_credentials()
        print "api created"
    except Exception as e:
        print e
    return api

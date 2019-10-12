from TwitterSearch import *

twit=[]

try:
    tso = TwitterSearchOrder() # create a TwitterSearchOrder object
    tso.set_keywords(['Microsoft','Surface','opinion']) # let's define all words we would like to have a look for
    tso.set_language('en') # we want to see German tweets only
    tso.set_include_entities(False) # and don't give us all those entity information

    # it's about time to create a TwitterSearch object with our secret tokens
    ts = TwitterSearch(
        consumer_key = 'jVkAzh69Bs2wIbCAL0zghR53m',
        consumer_secret = 'fw5R61lnuYbuN7rS1ECeion8CISoNNuwRiybwdwgMb0Ps3DVnv',
        access_token = '1182649652581036032-kp2JP2CH1cMcmaCfScLjzQSjwl0xWe',
        access_token_secret = 'xNXaDKwr5Bh2D3x1YiA5ww02SaJ62pZjvQEEJWvEz1tIc')

     # this is where the fun actually starts :)
    for tweet in ts.search_tweets_iterable(tso):
        print( '@%s tweeted: %s' % ( tweet['user']['screen_name'], tweet['text'] ) )
        twit.append(tweet)
        
except TwitterSearchException as e: # take care of all those ugly errors if there are some
    print(e)

#twit is the list of the output from the api
print(twit[0])

print(len(twit))

#0. For each country
#1. BERT
#2. Automated K means - clustering
#3. Top 3 cluster representatives
#4. Return


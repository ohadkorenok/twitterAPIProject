import tweepy
import logging
from config import create_api
import time
import boto3

stream_name = "KinesisTestProject"
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger()


def follow_followers(api):
    i=0
    logger.info("Retrieving and following followers")
    for tweet in tweepy.Cursor(api.search, q= "COVID", result_type = "recent").items(100):
        # kinesis_client.put_record(StreamName="KinesisTestProject",Data =tweet.text,PartitionKey=str(i))
        print tweet.text


def main():
    api = create_api()
    follow_followers(api)
    # while True:
    #     follow_followers(api)
    #     logger.info("Waiting...")
    #     time.sleep(60)

if __name__ == "__main__":
    main()
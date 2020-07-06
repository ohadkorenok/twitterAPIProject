import boto3


stream_name = "KinesisTestProject"
kinesis_client = boto3.client('kinesis', 'us-east-2')
shard_iterator = kinesis_client.get_shard_iterator(StreamName=stream_name, ShardId='0',ShardIteratorType='LATEST')
my_shard_iterator = shard_iterator['ShardIterator']
record_response = kinesis_client.get_records(ShardIterator=my_shard_iterator,
                                              Limit=2)
ohad = "ohad"
export default (): {} => {
  if (!process.env.AWS_ACCESS_KEY_ID) {
    throw new Error('AWS_ACCESS_KEY_ID is not defined');
  }
  if (!process.env.AWS_SECRET_ACCESS_KEY) {
    throw new Error('AWS_SECRET_ACCESS_KEY is not defined');
  }
  if (!process.env.AWS_REGION) {
    throw new Error('AWS_REGION is not defined');
  }
  if (!process.env.PRODUCER_URL) {
    throw new Error('PRODUCER_URL is not defined');
  }

  return {
    aws: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      accessKeySecret: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
      sqs: {
        queueUrl: process.env.PRODUCER_URL,
      },
    },
  };
};

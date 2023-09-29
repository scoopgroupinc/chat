export default (): {} => {
  if (!process.env.SERVICE_BUS_QUEUE_CONNECTION_STRING) {
    throw new Error('SERVICE_BUS_QUEUE_CONNECTION_STRING is not defined');
  }

  if (!process.env.SERVICE_BUS_QUEUE_NAMESPACE) {
    throw new Error('SERVICE_BUS_QUEUE_NAMESPACE is not defined');
  }

  return {
    azure: {
      serviceBusQueue: {
        namespace: process.env.SERVICE_BUS_QUEUE_NAMESPACE,
        connectionString: process.env.SERVICE_BUS_QUEUE_CONNECTION_STRING,
      },
    },
  };
};

import { Queue } from "bullmq";
import { QueueEnum } from "./constants";
import redisOptions from "../../config/redis-config";
import logger from "../../config/logger-config";

const EnrollemQueue = new Queue(QueueEnum.Enrolled, {
  connection: redisOptions,
});

const PaymentQueue = new Queue(QueueEnum.PaymentSuccess, {
  connection: redisOptions,
});

const queues = {
  [QueueEnum.Enrolled]: EnrollemQueue,
  [QueueEnum.PaymentSuccess]: PaymentQueue,
};

const queueFactory = (queueName: QueueEnum): Queue => {
  const queue = queues[queueName];

  if (!queue) {
    logger.error(`${queueName} Not Available in registry`)
    throw new Error("Queue not available");
  }

  return queue;
};

export default queueFactory;

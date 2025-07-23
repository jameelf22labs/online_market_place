import { Queue } from "bullmq";
import { QueueEnum } from "./constants";
import redisOptions from "../../config/redis-config";

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
    throw new Error("Queue not available");
  }

  return queue;
};

export default queueFactory;

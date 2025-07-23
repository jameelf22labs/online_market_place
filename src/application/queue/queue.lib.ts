import queueFactory from "./queues";
import { Queue } from "bullmq";
import { JobEnum, QueueEnum } from "./constants";

const QueueLib = {
  enQueue: <T>(jobName: JobEnum, queueName: QueueEnum, payload: T) => {
    const queue: Queue = queueFactory(queueName);
    queue.add(jobName, JSON.stringify(payload));
  },
};

export default QueueLib;

import queueFactory from "./queues";
import { Queue } from "bullmq";
import { JobEnum, QueueEnum } from "./constants";
import logger from "../../config/logger-config";

const QueueLib = {
  enQueue: <T>(jobName: JobEnum, queueName: QueueEnum, payload: T) => {
    logger.info(`${jobName} is push to queue :: ${queueName} `);

    const queue: Queue = queueFactory(queueName);
    queue.add(jobName, JSON.stringify(payload));
  },
};

export default QueueLib;

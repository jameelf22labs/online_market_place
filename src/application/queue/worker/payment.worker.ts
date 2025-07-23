import createEmailService from "../../lib/email";
import redisOptions from "../../../config/redis-config";
import { Job, Worker } from "bullmq";
import { QueueEnum } from "../constants";
import { EmailProvider } from "../../lib/email/constant";

interface PaymentJobData {
  user: {
    email: string;
    name: string;
  };
}

const paymentWorker = new Worker<PaymentJobData>(
  QueueEnum.PaymentSuccess,
  async (job: Job<PaymentJobData>) => {
    try {
      const { user } = job.data;
      const sendEmail = createEmailService(EmailProvider.NodeMailer);
      await sendEmail({
        to: [user.email],
        subject: "Payment Successful",
        html: `<p>Hello ${user.name},</p><p>You have been successfully Payment!</p>`,
      });
    } catch (error) {
      throw error;
    }
  },
  {
    concurrency: 5,
    connection: redisOptions,
  }
);

export default paymentWorker;

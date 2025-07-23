import { Job, Worker } from "bullmq";
import { QueueEnum } from "../constants";
import createEmailService from "../../lib/email";
import { EmailProvider } from "../../lib/email/constant";
import redisOptions from "../../../config/redis-config";

interface EnrollmentJobData {
  user: {
    email: string;
    name: string;
  };
}

const enrollmentWorker = new Worker<EnrollmentJobData>(
  QueueEnum.Enrolled,
  async (job: Job<EnrollmentJobData>) => {
    try {
      const { user } = job.data;
      const sendEmail = createEmailService(EmailProvider.NodeMailer);
      await sendEmail({
        to: [user.email],
        subject: "Enrollment Successful",
        html: `<p>Hello ${user.name},</p><p>You have been successfully enrolled!</p>`,
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

export default enrollmentWorker;

import cron, { TaskContext } from "node-cron";
import Enrollments from "../database/models/Enrollments.model";
import { EnrollmentsStatusEnum } from "../database/enums/enrollement.status.enum";
import { Op } from "@sequelize/core";
import logger from "../../config/logger-config";

const enrollementCompleteCron = () => {
  const EVERY_MONTH_DAY_ONE_12_AM = "0 0 1 * *";
  cron.schedule(EVERY_MONTH_DAY_ONE_12_AM, async (ctx: TaskContext) => {
    logger.info(
      `Enrollement Cron Job Running  ${ctx.triggeredAt.toISOString()}`
    );
    try {
      const THIRTY_DAYS_AGO = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
      const [count] = await Enrollments.update(
        { status: EnrollmentsStatusEnum.Complete },
        {
          where: {
            status: EnrollmentsStatusEnum.InProgress,
            updatedAt: { [Op.lte]: THIRTY_DAYS_AGO },
          },
        }
      );
      logger.info(` Last 30 days enrollemnet ${count} completed`);
    } catch (error) {
      logger.error("Enrollment Cron Error", error);
    }
  });
};

export default enrollementCompleteCron;

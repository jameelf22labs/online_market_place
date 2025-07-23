import { EnrollmentsStatusEnum } from "../enums/enrollement.status.enum";
import Enrollments from "../models/Enrollments.model";

const EnrollmentQueryHelper = {
  isUserEnrolledInCourse: (
    userId: string,
    courseId: string
  ): Promise<boolean> => {
    return Enrollments.findOne({ where: { userId, courseId } }).then(
      (enrollemnts) => {
        if (enrollemnts) {
          return enrollemnts.status === EnrollmentsStatusEnum.Complete;
        }

        return false;
      }
    );
  },

  updateStatus: (
    status: EnrollmentsStatusEnum,
    userId: string,
    courseId: string,
  ): Promise<[affectedCount: number]> => {
    return Enrollments.update({ status }, { where: { userId, courseId } });
  },
};

export default EnrollmentQueryHelper;

import Enrollments from "../models/Enrollments.model";

const EnrollmentQueryHelper = {
  isUserEnrolledInCourse: (userId: string, courseId: string) : Promise<boolean> => {
    return Enrollments.findOne({ where: { userId, courseId } }).then(
      (enrollemnts) => {
        if (enrollemnts) {
          return true;
        }

        return false;
      }
    );
  },
};

export default EnrollmentQueryHelper;

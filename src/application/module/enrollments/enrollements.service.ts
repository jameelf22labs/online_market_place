import { v4 } from "uuid";
import { CreateEnrollmentDto, PaymentDetailsDto } from "../../common/dto";
import { EnrollmentQueryHelper } from "../../database/helpers";
import Enrollments from "../../database/models/Enrollments.model";
import { BadRequestError } from "../../errors";
import { EnrollmentsStatusEnum } from "../../database/enums/enrollement.status.enum";
import Payments from "../../database/models/Payment.model";
import { PaymentStatusEnum } from "../../database/enums/payment.status.enum";

const EnrollementService = {
  enrollCourse: async (enrollment: CreateEnrollmentDto) => {
    const isUserEnrolledInCourse =
      await EnrollmentQueryHelper.isUserEnrolledInCourse(
        enrollment.userId,
        enrollment.courseId
      );

    if (isUserEnrolledInCourse) {
      throw new BadRequestError("Hey you already enroll this course");
    }

    const createdEnrollment = await Enrollments.create({
      id: v4(),
      status: EnrollmentsStatusEnum.InProgress,
      userId: enrollment.userId,
      courseId: enrollment.courseId,
    });

    return {
      id: createdEnrollment.id,
    };
  },

  cancelEnroll: async (enrollment: CreateEnrollmentDto) => {
    const isUserEnrolledInCourse =
      await EnrollmentQueryHelper.isUserEnrolledInCourse(
        enrollment.userId,
        enrollment.courseId
      );

    if (!isUserEnrolledInCourse) {
      throw new BadRequestError("Hey you not enroll this course");
    }

    await Enrollments.destroy({
      where: { userId: enrollment.userId, courseId: enrollment.courseId },
    });
  },

  processPayment: async (paymentDetails: PaymentDetailsDto) => {
    const payment = await Payments.create({
      ...paymentDetails,
      id: v4(),
      status: PaymentStatusEnum.Complete,
    });

    await EnrollmentQueryHelper.updateStatus(
      EnrollmentsStatusEnum.Complete,
      paymentDetails.userId,
      paymentDetails.courseId
    );

    return {
      id: payment.id,
      enrolleStatus: EnrollmentsStatusEnum.Complete,
    };
  },
};

export default EnrollementService;

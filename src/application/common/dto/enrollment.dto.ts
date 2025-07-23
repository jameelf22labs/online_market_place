import { PaymentMethodEnum } from "../../database/enums/payment.status.enum";

export interface CreateEnrollmentDto {
  courseId: string;
  userId: string;
}

export interface CancelEnrollmentDto {
  courseId: string;
  userId: string;
}

export interface PaymentDetailsDto {
  amount: number;
  paymentMethod: PaymentMethodEnum;
  cardNumber?: string;
  cardName?: string;
  address?: string;
  state?: string;
  country?: string;
  postalCode?: number;
  courseId: string;
  userId: string;
}

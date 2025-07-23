import nodemailer from "nodemailer";
import envConfig from "../../../../config/env-config";
import { EmailOptions } from "../types";

const nodeMailerProvider = async ({
  to,
  subject,
  html,
  text,
}: EmailOptions) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: envConfig.Email.User,
      pass: envConfig.Email.Password,
    },
  });

  try {
    const info = await transporter.sendMail({
      from: envConfig.Email.User,
      to,
      subject,
      html,
      text,
    });

    return info;
  } catch (error) {
    throw error;
  }
};

export default nodeMailerProvider;
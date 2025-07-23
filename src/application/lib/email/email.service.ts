import { EmailProvider } from "./constant";
import nodeMailerProvider from "./provider/nodemailer.provider";
import { EmailOptions } from "./types";

const createEmailService = (providerName: EmailProvider) => {
  const providers: Record<string, Function> = {
    [EmailProvider.NodeMailer]: nodeMailerProvider,
  };

  const provider = providers[providerName];

  if (!provider) {
    throw new Error("Given Provider not our service");
  }

  return async (options: EmailOptions) => provider(options);
};

export default createEmailService;

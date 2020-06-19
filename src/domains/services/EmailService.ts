import { EmailRequestContent, EmailClientResponse } from "../types/Email";
import { onError } from "../../infra/lib/utils/onError";
import { ExternalEmailProviderError } from "../../infra/http/responses/Error";
import { SendgridMailerStrategy } from "./mailer/adapters/SendgridMailer";
import { SendEmailWithStrategy } from "./mailer/MailerClient";

const MailerStrategy = SendEmailWithStrategy(SendgridMailerStrategy);

export const sendEmailWithClient = (
  emailRequest: EmailRequestContent
): Promise<EmailClientResponse> =>
  onError(ExternalEmailProviderError, () => MailerStrategy(emailRequest));

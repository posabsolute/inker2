import {
  EmailRequestContent,
  EmailClientResponse,
  Mailer,
} from "../types/Email";
import { onError } from "../../infra/lib/utils/onError";
import { ExternalEmailProviderError } from "../../infra/http/responses/Error";
import { SendgridMailer } from "./mailer/adapters/SendgridMailer";
import { setStrategy } from "../../infra/lib/utils/setStrategy";

var sendEmail = <Mailer>setStrategy(SendgridMailer);

export const sendEmailWithClient = (
  emailRequest: EmailRequestContent
): Promise<EmailClientResponse> =>
  onError(ExternalEmailProviderError, () => sendEmail(emailRequest));

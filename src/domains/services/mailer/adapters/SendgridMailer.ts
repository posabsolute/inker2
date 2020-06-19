import Sendgrid from "@sendgrid/mail";
import {
  Mailer,
  EmailRequestContent,
  EmailClientResponse,
  EmailClientResponseStatus,
} from "../../../types/Email";
import { logger } from "../../../../infra/lib/logger";
import { HttpError, badRequest } from "../../../../infra/http/responses/Error";

const parseResponse = (sendGridResp) => ({
  status: EmailClientResponseStatus.success,
  statusCode: 200,
  message: sendGridResp.message,
});

export const SendgridMailer = async (
  emailRequest: EmailRequestContent
): Promise<EmailClientResponse> => {
  return Sendgrid.send(emailRequest)
    .then((mailerResp) => parseResponse(mailerResp))
    .catch((err) => {
      logger.error(err);
      throw badRequest(err.message);
    });
};

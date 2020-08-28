import Sendgrid, { MailDataRequired } from "@sendgrid/mail";
import {
  Mailer,
  EmailRequestContent,
  EmailClientResponse,
  EmailClientResponseStatus,
} from "../../../types/Email";
import { logger } from "../../../../infra/lib/logger";
import { HttpError, badRequest } from "../../../../infra/http/responses/Error";
import env from "../../../../env";

export type SenGridRequest = {
  to: string;
  from: string;
  subject: string;
  content: Array<{ type: string; value: string }>;
};

Sendgrid.setApiKey(env.emailServiceApiKey);

const parseResponse = (sendGridResp) => ({
  status: EmailClientResponseStatus.success,
  statusCode: 200,
  message: sendGridResp.message,
});

const setRequestForSengrid = (
  emailRequest: EmailRequestContent
): unknown => {
  const { to, from, subject, text, html } = emailRequest;
  const request = {
    to,
    from,
    subject,
    content: [],
  };
  if (text) {
    request.content.push({
      type: "text/plain",
      value: text,
    });
  }
  if (html) {
    request.content.push({
      type: "text/html",
      value: html,
    });
  }
  console.log(emailRequest)
  return request;
};

export const SendgridMailer = async (
  emailRequest: EmailRequestContent
): Promise<EmailClientResponse> => {
  const request = setRequestForSengrid(emailRequest);
  return Sendgrid.send(emailRequest)
    .then((mailerResp) => parseResponse(mailerResp))
    .catch((err) => {
      logger.error(err);
      throw badRequest(err.response.body);
    });
};

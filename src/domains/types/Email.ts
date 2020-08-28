import { Template } from "./Template";

export type EmailRequestContent = {
  to: string;
  from: string;
  subject: string;
  text: string;
  html: Template;
  data: object;
  template: string | undefined;
};

export enum EmailClientResponseStatus {
  success = "success",
  error = "error",
}

export type EmailClientResponse = {
  status: EmailClientResponseStatus;
  statusCode: number;
  message: string;
};

export type Mailer = (emailRequest: EmailRequestContent) => Promise<EmailClientResponse>;

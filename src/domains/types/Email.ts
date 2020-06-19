export type EmailRequestContent = {
  to: string;
  from: string;
  subject: string;
  text: string;
  html: string;
  data: object;
};

export enum EmailClientResponseStatus {
  success,
  error,
}

export type EmailClientResponse = {
  status: EmailClientResponseStatus;
  statusCode: number;
  message: string;
};

export type Mailer = (emailRequest: EmailRequestContent) => Promise<EmailClientResponse>;

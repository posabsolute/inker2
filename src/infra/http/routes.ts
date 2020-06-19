import express from "express";
import { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";

import { renderTemplate } from "../../domains/services/TemplateService";
import { sendEmailWithClient } from "../../domains/services/EmailService";

export const routes = express.Router();

routes.use(bodyParser.urlencoded({ extended: true }));
routes.use(bodyParser.json());

const getTemplates = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const {
    params: { id: templateName },
    body: templateVariables,
  } = req;
  res.send(renderTemplate(templateName, templateVariables));
};

const sendEmail = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { body: EmailRequestContent } = req;
  sendEmailWithClient(EmailRequestContent)
    .then((emailClientResponse) => res.json(emailClientResponse))
    .catch(next);
};

const sendSMS = (req: Request, res: Response): void => {};

routes.post("/api/templates/:id", getTemplates);
routes.post("/api/send/email", sendEmail);
routes.post("/api/send/sms", sendSMS);

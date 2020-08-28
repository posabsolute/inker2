import express from "express";
import { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";

import { renderInternalTemplate } from "../../domains/services/TemplateService";
import { sendEmailWithClient } from "../../domains/services/EmailService";
import { TemplateType } from "../../domains/types/Template";

export const routes = express.Router();

routes.use(bodyParser.urlencoded({ extended: true }));
routes.use(bodyParser.json());

const getTemplates = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const {
    params: { id: templateName, type: type },
    body: templateVariables,
  } = req;
  const templateType = TemplateType[type];
  res.send(renderInternalTemplate(templateName, templateVariables, templateType));
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


routes.post("/api/templates/:id", getTemplates);
routes.post("/api/send/email", sendEmail);
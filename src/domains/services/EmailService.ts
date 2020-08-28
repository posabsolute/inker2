import { pipe } from "fp-ts/lib/pipeable";
import {
  EmailRequestContent,
  EmailClientResponse,
  Mailer,
} from "../types/Email";
import { TemplateType, Template } from "../types/Template";
import { onError } from "../../infra/lib/utils/onError";
import { ExternalEmailProviderError } from "../../infra/http/responses/Error";
import { SendgridMailer } from "./mailer/adapters/SendgridMailer";
import { setStrategy } from "../../infra/lib/utils/setStrategy";
import {
  renderInternalTemplate,
  renderProvidedTemplate,
} from "./TemplateService";

const send = <Mailer>setStrategy(SendgridMailer);

const renderTemplate = (template, type, data, content) : Template =>
  template
    ? renderInternalTemplate(template, data, type)
    : renderProvidedTemplate(content, data);

export const compileTemplates = (
  emailRequest: EmailRequestContent
): EmailRequestContent => {
  const { html, text, template, data } = emailRequest;
  return {
    ...emailRequest,
    html: renderTemplate(template, TemplateType.html, data, html),
    text: renderTemplate(template, TemplateType.text, data, text)
  };
};

const sendEmailWithCompiledTemplate = (emailRequest: EmailRequestContent) =>
  pipe(emailRequest, compileTemplates, send);

export const sendEmailWithClient = (
  emailRequest: EmailRequestContent
): Promise<EmailClientResponse> =>
  onError(ExternalEmailProviderError, () =>
    sendEmailWithCompiledTemplate(emailRequest)
  );

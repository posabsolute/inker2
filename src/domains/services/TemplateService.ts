import { getTemplateFS } from "../repository/TemplatesRepository";
import { compileTemplateFromClient } from "./templateParser/TemplateParserClient";
import { compileTemplateNunjuckStrategy } from "./templateParser/adapters/NunjuckParser";
import { Template } from "../types/Template";
import { onError } from "../../infra/lib/utils/onError";
import { CompileTemplateError } from "../../infra/http/responses/Error";

var compileTemplateStrategy = compileTemplateFromClient(
  compileTemplateNunjuckStrategy
);

export const renderTemplate = (templateName: string, data: object): Template =>
  onError(CompileTemplateError, () => {
    const templateContent = getTemplateFS(templateName);
    return compileTemplateStrategy(templateContent, data);
  });

export const renderProvidedTemplate = (
  templateContent: Template,
  data: object
): Template =>
  onError(CompileTemplateError, () => {
    compileTemplateStrategy(templateContent, data);
  });

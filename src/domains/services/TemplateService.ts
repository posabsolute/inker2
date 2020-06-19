import { getTemplateFS } from "../repository/TemplatesRepository";
import { compileTemplateFromClient } from "./templateParser/TemplateParserClient";
import { compileTemplateWithNunjuck } from "./templateParser/adapters/NunjuckParser";
import { Template } from "../types/Template";
import { onError } from "../../infra/lib/utils/onError";
import { CompileTemplateError } from "../../infra/http/responses/Error";
import { setStrategy } from "../../infra/lib/utils/setStrategy";
import { TemplateCompiler } from "../types/Template";

var compileTemplate = <TemplateCompiler>setStrategy(compileTemplateWithNunjuck);

export const renderTemplate = (templateName: string, data: object): Template =>
  onError(CompileTemplateError, () => {
    const templateContent = getTemplateFS(templateName);
    return compileTemplate(templateContent, data);
  });

export const renderProvidedTemplate = (
  templateContent: Template,
  data: object
): Template =>
  onError(CompileTemplateError, () => {
    compileTemplate(templateContent, data);
  });

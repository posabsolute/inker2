import { getTemplateFS } from "../repository/TemplatesRepository";
import { NunjuckCompiler } from "./templateParser/adapters/NunjuckParser";
import { Template, TemplateType } from "../types/Template";
import { onError } from "../../infra/lib/utils/onError";
import { CompileTemplateError } from "../../infra/http/responses/Error";
import { setStrategy } from "../../infra/lib/utils/setStrategy";
import { TemplateCompiler } from "../types/Template";

var compileTemplate = <TemplateCompiler>setStrategy(NunjuckCompiler);

export const renderInternalTemplate = (templateName: string, data: object, type: TemplateType): Template =>
  onError(CompileTemplateError, () => {
    const templateContent = getTemplateFS(templateName, type);
    return compileTemplate(templateContent, data);
  });

export const renderProvidedTemplate = (
  templateContent: Template,
  data: object
): Template =>
  onError(CompileTemplateError, () =>
    compileTemplate(templateContent, data));


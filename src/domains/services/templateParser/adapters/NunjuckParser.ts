import nunjucks from "vm-nunjucks";
import { Template, TemplateCompiler } from "../../../types/Template";

export const NunjuckCompiler: TemplateCompiler = (
  template: Template,
  data: object
): Template => {
  const env = nunjucks.configure({ autoescape: false });
  return env.renderString(template, data);
};

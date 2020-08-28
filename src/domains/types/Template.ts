import * as t from "io-ts";

interface TemplateBrand {
  readonly Template: unique symbol
}

const Template = t.brand(
  t.string,
  (n): n is t.Branded<string, TemplateBrand> => n.length > 0,
  'Template'
);

export type TemplateCompiler = (template: Template, data: Object) => Template;

export type Template = t.TypeOf<typeof Template>

export enum TemplateType {
  text = "text",
  html = "html"
};

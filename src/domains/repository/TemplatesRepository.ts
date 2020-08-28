import fs from "fs";
import path from "path";

import { Template, TemplateType } from "../types/Template";
import { TemplateNotFound } from "../../infra/http/responses/Error";
import { onUndefined } from "../../infra/lib/utils/onUndefined";
import { logger } from "../../infra/lib/logger";

export const templates = {};

export const bootFStemplates = () => {
  const directoryPath = path.join(__dirname, "templates");

  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      logger.warn(`Unable to scan template dir: ${err}`);
      return;
    }
    files.forEach((file) => {
      fs.readFile(`${directoryPath}/${file}`, "utf8", (err, data) => {
        if (err) {
          logger.warn(`Unable to load template: ${err}`);
          return;
        }
        templates[file] = <Template>data;
      });
    });
  });
};

export const getTemplateFS = (templateName: string, type: TemplateType): Template =>
  onUndefined(TemplateNotFound, () => templates[`${templateName}.${type}`]);

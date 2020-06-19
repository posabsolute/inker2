import express, { Request, Response, NextFunction } from "express";
import morgan from "morgan";
import monitor from "express-status-monitor";
import compression from "compression";
import { routes } from "./infra/http/routes";
import { HttpError } from "./infra/http/responses/Error";
import { bootFStemplates } from "./domains/repository/TemplatesRepository"

const app = express();

const port = process.env.PORT || 8080;

bootFStemplates();
app.use(compression());
app.use(morgan("tiny"));
app.use(monitor());

app.use("/", routes);

app.use((error: HttpError, req: Request, res : Response, next: NextFunction) => {
  res.status(error.httpCode || 500).json({ message: error.message });
});

app.listen(port);

console.log(`Server started on port ${port}`);

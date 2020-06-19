import SendgridMailer from "@sendgrid/mail";
import { Mailer, EmailRequestContent, EmailClientResponse, EmailClientResponseStatus } from "../../../types/Email";
import { logger } from "../../../../infra/lib/logger";
import { HttpError } from "../../../../infra/http/responses/Error";

const parseResponse = (sendGridResp) => ({
    status: EmailClientResponseStatus.success,
    statusCode: 200,
    message: "yes"
});

export const SendgridMailerStrategy = async (emailRequest: EmailRequestContent) : Promise<EmailClientResponse> => {
    return SendgridMailer.send(emailRequest)
        .then(mailerResp => parseResponse(mailerResp))
        .catch(err => {
            logger.error(err)
            const error: HttpError = {
                httpCode: 400,
                message: err.message
            }
            throw error;
        })
};

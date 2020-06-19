export type HttpError = {
    httpCode: number,
    message:  String
}

export const TemplateNotFound: HttpError = {
    httpCode: 404,
    message: "template not found"
};

export const CompileTemplateError: HttpError = {
    httpCode: 500,
    message: "Compile Template Error"
};

export const ExternalEmailProviderError: HttpError = {
    httpCode: 400,
    message: "External Email Provider Error"
};

export const badRequest = (message) : HttpError => ({
    httpCode: 400,
    message: message
});







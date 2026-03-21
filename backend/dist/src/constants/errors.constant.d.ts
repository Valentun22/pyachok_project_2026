export declare const ERRORS: {
    readonly NOT_FOUND: {
        readonly message: "Not found";
        readonly statusCode: 404;
    };
    readonly NO_AUTHORIZATION_HEADER: {
        readonly message: "Authorization required";
        readonly statusCode: 401;
    };
    readonly INVALID_AUTH_FORMAT: {
        readonly message: "Invalid Authorization format";
        readonly statusCode: 401;
    };
    readonly INVALID_TOKEN: {
        readonly message: "Invalid or expired token";
        readonly statusCode: 401;
    };
    readonly ACTION_TOKEN_REQUIRED: {
        readonly message: "Action token is required";
        readonly statusCode: 400;
    };
    readonly EMAIL_ALREADY_IN_USE: {
        readonly message: "Email is already in use";
        readonly statusCode: 409;
    };
    readonly INVALID_CREDENTIALS: {
        readonly message: "Invalid credentials";
        readonly statusCode: 401;
    };
    readonly INVALID_ID: {
        readonly message: "Invalid ID format";
        readonly statusCode: 400;
    };
    readonly EMPTY_BODY: {
        readonly message: "Request body cannot be empty";
        readonly statusCode: 400;
    };
    readonly VALIDATION_ERROR: {
        readonly message: "Validation failed";
        readonly statusCode: 400;
    };
    readonly UNKNOWN_EMAIL_TYPE: {
        readonly message: "Unknown email type";
        readonly statusCode: 500;
    };
    readonly EMAIL_SEND_FAILED: (err: Error) => {
        message: string;
        statusCode: number;
    };
    readonly INVALID_TOKEN_TYPE: {
        readonly message: "Invalid token type";
        readonly statusCode: 500;
    };
    readonly USER_NOT_FOUND_AFTER_AUTH: {
        readonly message: "Unexpected error: user not found after authentication";
        readonly statusCode: 500;
    };
    readonly PASSWORD_REUSE_FORBIDDEN: {
        readonly message: "You cannot set the old password";
        readonly statusCode: 400;
    };
    readonly DEFAULT: {
        readonly message: "Something went wrong";
        readonly statusCode: 500;
    };
    readonly EMAIL_ALREADY_VERIFIED: {
        readonly message: "Email is already verified";
        readonly statusCode: 409;
    };
    readonly USER_NOT_VERIFIED: {
        readonly message: "User must be verified to perform this action";
        readonly statusCode: 403;
    };
    readonly NO_FILE_UPLOADED: {
        readonly message: "No file uploaded";
        readonly statusCode: 400;
    };
};

export interface IError {
    message: string;
    statusCode: number;
    additionalInfo: {
        errors: {
            [key: string]: string[];
        };
    };
}
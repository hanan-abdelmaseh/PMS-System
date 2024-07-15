import { HttpHeaders } from "@angular/common/http";
import { IError } from "./iError.model";

export interface IErrorResponse{
    headers?: HttpHeaders;
    error: IError;
    message?: string;
    name?: string;
    ok?: boolean;
    status?: number;
    statusText?: string;
    url?: string;
}
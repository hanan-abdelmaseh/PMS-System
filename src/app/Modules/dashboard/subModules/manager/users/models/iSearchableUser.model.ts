import { IPage } from "src/app/core";

export interface ISearchableUser extends IPage{
    userName?: string;
    email?:string;
    country?:string;
    groups?:any
}
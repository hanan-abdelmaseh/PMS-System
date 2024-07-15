import { IPage } from "src/app/core";

export interface ISearchableTask extends IPage{
    title?: string;
    status?:string;
}
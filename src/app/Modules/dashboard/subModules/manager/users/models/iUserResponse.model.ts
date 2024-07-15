import { IPage } from "src/app/core";
import { IUserModel } from "./iUser.model";




export interface IUserResponse extends IPage{
    data: IUserModel[];
}
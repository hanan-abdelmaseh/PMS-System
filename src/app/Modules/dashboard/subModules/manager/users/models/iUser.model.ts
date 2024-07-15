import { IGroup } from "./IGroup.model";


export interface IUserModel{
    id: number,
    userName: string,
    email:string,
    country: string,
    phoneNumber:string,
    imagePath:string,
    isActivated:boolean,
    creationDate: Date,
    modificationDate: Date,
    group:IGroup
}

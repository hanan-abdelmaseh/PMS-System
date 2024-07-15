import { IPage } from "src/app/core";
import { IProject,  } from "./iProject.model";

export interface IProjectResponse extends IPage{
    data: IProject[];
}
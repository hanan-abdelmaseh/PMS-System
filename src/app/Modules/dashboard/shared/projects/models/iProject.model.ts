import { IManager } from "../../../subModules/manager/models/iManager.model";
import { ITask } from "../../tasks/models";

export interface IProject {
    id?: number;
    title: string;
    description: string,
    creationDate?: Date,
    modificationDate?: Date;
    manager?: IManager;
    task?: ITask[];
}
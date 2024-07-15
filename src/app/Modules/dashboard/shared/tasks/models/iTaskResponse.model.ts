import { IPage } from "src/app/core";
import { ITask } from "./iTask.model";


export interface ITaskResponse extends IPage{
    data: ITask[];
}
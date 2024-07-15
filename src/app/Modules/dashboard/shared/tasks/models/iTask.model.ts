import { IEmployee } from "../../../subModules/employee/model/iEmployee.model";
import { IProject } from "../../projects/models";

export interface ITask {
    id: number,
    title: string,
    status: string,
    description: string, 
    creationDate: Date,
    modificationDate: Date,
    employee?: IEmployee,
    project?: IProject
}

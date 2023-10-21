import { createContext, useContext } from "react";
import { TaskListProp } from "../../interfaces/task";

export const ApplicationTaskContext = createContext<TaskListProp | undefined>(undefined);

export function useTaskContext(){
    const tasks: TaskListProp | undefined = useContext(ApplicationTaskContext);
    if(tasks === undefined){
        throw new Error("UseTaskContext need to be used with initiliaze a value in context wrapper provider.");
    }

    return tasks;
}
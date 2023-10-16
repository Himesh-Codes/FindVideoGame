import { createContext, useContext } from "react";
import { Task } from "../../interfaces/task";

export const ApplicationTaskContext = createContext<Task[] | undefined>(undefined);

export function useTaskContext(){
    const tasks: Task[] | undefined = useContext(ApplicationTaskContext);
    if(tasks === undefined){
        throw new Error("UseTaskContext need to be used with initiliaze a value in context wrapper provider.");
    }

    return tasks;
}
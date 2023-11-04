import { FormEvent } from "react";
import { TaskActions } from "./taskActionProps";

export interface TaskState {
    task: string;
    setTask: React.Dispatch<React.SetStateAction<string>>;
    addTasks: (event: FormEvent<Element>) => void;
}

export interface Task {
    id: string;
    taskName: string;
    isDone?: boolean;
}

export interface TaskListProp{
    tasksState: Task[];
    dispatchTask: React.Dispatch<TaskActions>;
}
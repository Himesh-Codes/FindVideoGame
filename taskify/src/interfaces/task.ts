import { FormEvent } from "react";

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
    tasks?: Task[];
    pushStacks: React.Dispatch<React.SetStateAction<Task[]>>;
}
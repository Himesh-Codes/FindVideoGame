import { FormEvent } from "react";

export interface TaskState {
    task: string;
    setTask: React.Dispatch<React.SetStateAction<string>>;
    addTasks: (event: FormEvent<HTMLFormElement>) => void;
}

export interface Task {
    id: string;
    taskName: string;
    isDone: boolean;
}
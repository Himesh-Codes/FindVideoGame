import "../App.css";
import { Task, TaskListProp } from "../interfaces/task";
import {useTaskContext } from "./context/ApplicationContext";

export default function TaskList(tasksList: TaskListProp) : React.JSX.Element{
    // custom hook for check the context
    const tasks: Task[] = useTaskContext();
    const tasksListDom: JSX.Element[] = tasks.map(task => <li key={task.id}>{task.taskName}</li>);

    return(
        <ul className="taskList">
            {tasksListDom}
        </ul>
    );

}
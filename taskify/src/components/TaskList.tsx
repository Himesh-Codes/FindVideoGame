import "../App.css";
import { TaskListProp } from "../interfaces/task";
import TaskCard from "./TaskCard";
import { useTaskContext } from "./context/ApplicationContext";

export default function TaskList() : React.JSX.Element{
   // custom hook for check the context, here we added tasklist in context level
    const taskList: TaskListProp = useTaskContext();

    const tasksListDom: JSX.Element[] = taskList.tasksState.map(task => <TaskCard  key={task.id} {...task}/>);

    return(
        <ul className="taskList">
            {tasksListDom}
        </ul>
    );

}

import { GrEdit } from 'react-icons/gr';
import { RiDeleteBin5Line } from 'react-icons/ri'
import { Task, TaskListProp } from '../interfaces/task';
import { useTaskContext } from './context/ApplicationContext';
import { useEffect, useState } from 'react';

export default function TaskCard(task: Task): JSX.Element{
    // custom hook usage for edit and delete
    const taskList: TaskListProp = useTaskContext();
    // this will set true since the useEffect constructor works on the component mounts to DOM
    const [isNewTask, setBackNewTask] = useState<boolean>(true);

    useEffect(()=>{
        // The code that runs on that effect
        if (isNewTask !== false) {
            setBackNewTask(false);
        }
        // optional return function
    }, [taskList]); // The dependency array optional, in which trigger statement added

    useEffect(()=>{
        setBackNewTask(true);
        // optional return function
    }, []);


    return (
        <div className={`taskCard ${isNewTask ? 'newTaskCard' : ''}`}>
            <span className='taskName'>{task.taskName}</span><span className='taskIcon'><GrEdit /></span> <span className='taskIcon' onClick={()=>handleDelete(taskList, task.id)}><RiDeleteBin5Line /></span>
        </div>
    );
}

function handleDelete(taskList: TaskListProp, taskId: string){
    taskList.pushStacks(taskList.tasks.filter((task)=> task.id != taskId));
}
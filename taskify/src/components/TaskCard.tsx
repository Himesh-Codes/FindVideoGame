
import { GrEdit } from 'react-icons/gr';
import { MdOutlineDownloadDone } from 'react-icons/md';
import { RiDeleteBin5Line } from 'react-icons/ri'
import { Task, TaskListProp } from '../interfaces/task';
import { useTaskContext } from './context/ApplicationContext';
import { useEffect, useRef, useState } from 'react';

export default function TaskCard(task: Task): JSX.Element{
    // custom hook usage for edit and delete
    const taskList: TaskListProp = useTaskContext();
    // this will set true since the useEffect constructor works on the component mounts to DOM
    const [isNewTask, setBackNewTask] = useState<boolean>(true);

    // check the edit is on or not
    const [isEdit, setIsEdit] = useState<boolean>(false);
     // keep the content of edited task, contains the intial value as task value
    const [editContent, setEditContent] = useState<string>(task.taskName);

    // edit field focus-in
    const focusInput = useRef<HTMLInputElement>(null);

    //effect hook listen to the edit flag and responds
    useEffect(()=>{
        // focus in input ref
        focusInput.current?.focus();
    }, [isEdit]);

    useEffect(()=>{
        // The code that runs on that effect
        if (isNewTask !== false) {
            setBackNewTask(false);
        }
        // optional return function
    }, [taskList]); // The dependency array optional, in which trigger statement added

    // component mount time running hook
    useEffect(()=>{
        setBackNewTask(true);
        // optional return function
    }, []);


    return (
        <form className={`taskCard ${isNewTask ? 'newTaskCard' : ''}`} onSubmit={(event)=>updateTask(event, taskList, task.id, editContent, setIsEdit)}>
                {
                    task.isDone ? (
                        <>
                            <s className='taskName'>{task.taskName}</s>
                            <span className='taskIcon'  onClick={()=>handleDone(taskList, task.id, setIsEdit)}><MdOutlineDownloadDone /></span>
                        </>
                        
                    ) : (
                          isEdit ? (
                                <>
                                    <input ref={focusInput} className='taskNameEdit' type="text" value={editContent} onChange={(event)=> setEditContent(event.target.value)}/>
                                    <span className='taskIcon' onClick={()=>handleEdit(isEdit, setIsEdit)}><GrEdit /></span>
                                    <span className='taskIcon' onClick={()=>handleDelete(taskList, task.id)}><RiDeleteBin5Line /></span>
                                    <span className='taskIcon'  onClick={()=>handleDone(taskList, task.id, setIsEdit)}><MdOutlineDownloadDone /></span>
                                </>
                            ):(
                                <>
                                    <span className='taskName'>{task.taskName}</span>
                                    <span className='taskIcon' onClick={()=>handleEdit(isEdit, setIsEdit)}><GrEdit /></span>
                                    <span className='taskIcon' onClick={()=>handleDelete(taskList, task.id)}><RiDeleteBin5Line /></span>
                                    <span className='taskIcon'  onClick={()=>handleDone(taskList, task.id, setIsEdit)}><MdOutlineDownloadDone /></span>
                                </>
                            )
                    )
                }

        </form>
    );
}

function handleDelete(taskList: TaskListProp, taskId: string){
    taskList.pushStacks(taskList.tasks.filter((task)=> task.id != taskId));
}

function handleDone(taskList: TaskListProp, taskId: string, setIsEdit : React.Dispatch<React.SetStateAction<boolean>>){
    taskList.pushStacks(taskList.tasks.map(task => (task.id === taskId)? { id:task.id, taskName: task.taskName, isDone: !task.isDone} : task));
    setIsEdit(false);
}

function handleEdit(isEdit: boolean, setIsEdit : React.Dispatch<React.SetStateAction<boolean>>){
     setIsEdit(!isEdit);
}

function updateTask(event: React.FormEvent<HTMLFormElement>, taskList: TaskListProp, taskId: string, editContent: string, setIsEdit : React.Dispatch<React.SetStateAction<boolean>>){
    // prevent the page refresh
    event.preventDefault();
    taskList.pushStacks(taskList.tasks.map(task => (task.id === taskId)? { id:task.id, taskName: editContent, isDone: task.isDone} : task));
    // edit functionality UI swapped
    setIsEdit(false);
}
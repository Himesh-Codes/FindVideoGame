import {useRef } from "react";
import { TaskState } from "../interfaces/task";
import "../App.css";

export default function InputField(inputProps: TaskState): React.JSX.Element{
    const inputFieldActive = useRef<HTMLInputElement>(null);

    return(
        <form className="formContainer" onSubmit={(event)=> HandleSubmit(inputProps, event, inputFieldActive)}>
            <div className="addTask">
                <input ref={inputFieldActive} type="text" placeholder="Enter the task" value={inputProps.task} onChange={(event)=> inputProps.setTask(event.target.value)} className="inputField"/>
                <button className="addTaskBtn" type="submit">ADD</button>
            </div>
        </form>
    );
}

function HandleSubmit(inputProps: TaskState, event: React.FormEvent, inputFieldActive: React.RefObject<HTMLInputElement>){
    inputProps.addTasks(event);
    inputFieldActive.current?.blur();
}
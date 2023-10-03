import { TaskState } from "../interfaces/task";
import "./field.css";

export default function InputField(inputProps: TaskState): JSX.Element{
    return(
        <div className="formContainer">
            <form className="addTask" onSubmit={(event)=>inputProps.addTasks(event)}>
                <input type="text" placeholder="Enter the task" value={inputProps.task} onChange={(event)=> InputOnchange(event, inputProps.setTask)} className="inputField"/>
                <button className="addTaskBtn" type="submit">ADD</button>
            </form>
        </div>
    );
}

function InputOnchange(event: React.ChangeEvent<HTMLInputElement>, setTask: React.Dispatch<React.SetStateAction<string>>){
    setTask(event.target.value)
}
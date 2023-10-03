import { useState } from 'react';
import './App.css'
import InputField from './components/InputField';
import { Task, TaskState } from './interfaces/task';

export default function App(): JSX.Element{
  const [task, setTask] = useState<string>("");
  const [tasks, pushStacks] = useState<Task[]>([]);

  let inputProps: TaskState = {task: task, setTask: setTask, addTasks: addTasks};

  return (
    <div className="App">
        <span className="heading">Taskify</span>
        <InputField {...inputProps}/>
    </div>
  );
}

function addTasks(event: React.FormEvent<HTMLFormElement>) {
  // prevent the page refresh
  event.preventDefault();
  console.log("Llalalalal");
}

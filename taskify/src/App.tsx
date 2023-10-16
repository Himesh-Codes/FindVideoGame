import { useState } from 'react';
import './App.css'
import InputField from './components/InputField';
import TaskList from './components/TaskList';
import { Task, TaskState, TaskListProp} from './interfaces/task';
import { ApplicationTaskContext } from './components/context/ApplicationContext';

export default function App(): JSX.Element{
  const [task, setTask] = useState<string>("");
  const [tasks, pushStacks] = useState<Task[]>([]);

  const addTasks = (event: React.FormEvent) => {
    // prevent the page refresh
    event.preventDefault();
    if (task) {
      pushStacks([...tasks, {id: `${Date.now().toString()}-${task}`,taskName:task}]);
      // empty the input after add
      setTask("");
    }
  };

  console.log(tasks);

  let inputProps: TaskState = {task: task, setTask: setTask, addTasks: addTasks};
  let tasksList: TaskListProp = {pushStacks};

  return (
    <div className="App">
        <span className="heading">Taskify</span>
        <ApplicationTaskContext.Provider value={tasks}>
          <InputField {...inputProps}/> 
          <TaskList {...tasksList}/>
        </ApplicationTaskContext.Provider>
    </div>
  );

}


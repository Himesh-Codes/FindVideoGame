import { useState } from 'react';
import './App.css'
import InputField from './components/InputField';
import TaskList from './components/TaskList';
import { Task, TaskListProp, TaskState } from './interfaces/task';
import { ApplicationTaskContext } from './components/context/ApplicationContext';

export default function App(): JSX.Element{
  const [task, setTask] = useState<string>("");
  const [tasks, pushStacks] = useState<Task[]>([]);
  let recentTaskUid = "";

  const addTasks = (event: React.FormEvent) => {
    // prevent the page refresh
    event.preventDefault();
    if (task) {
      recentTaskUid = `${Date.now().toString()}-${task}`;
      pushStacks([...tasks, {id: `${recentTaskUid}`,taskName:task}]);
      // empty the input after add
      setTask("");
    }
  };

  let inputProps: TaskState = {task: task, setTask: setTask, addTasks: addTasks};
  const tasksList: TaskListProp = {tasks, pushStacks};
  
  return (
    <div className="App">
        <span className="heading">Taskify</span>
          <InputField {...inputProps}/> 
          <ApplicationTaskContext.Provider value={tasksList}>
            <TaskList/>
        </ApplicationTaskContext.Provider>
    </div>
  );

}


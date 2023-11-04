import { useReducer, useState } from 'react';
import './App.css'
import InputField from './components/InputField';
import TaskList from './components/TaskList';
import { TaskListProp, TaskState } from './interfaces/task';
import { ApplicationTaskContext } from './components/context/ApplicationContext';
import { taskReducer } from './components/reducer/taskReducer';
import { AddTasksProp, TaskActions } from './interfaces/taskActionProps';

export default function App(): JSX.Element{
  const [tasksState, dispatchTask] = useReducer(taskReducer, []);

  const [task, setTask] = useState<string>("");
  let recentTaskUid = "";

  const addTasks = (event: React.FormEvent) => {
    // prevent the page refresh
    event.preventDefault();
   
    if (task) {
      recentTaskUid = `${Date.now().toString()}-${task}`;

       //useReducer dispatch usage replacing state
      const addProp: AddTasksProp = {
          recentTaskUid,
          taskName: task
      }
      const actionProp: TaskActions = {
          type: 'add',
          action: addProp
      }
      dispatchTask(actionProp);
      // empty the input after add
      setTask("");
    }
  };

  let inputProps: TaskState = {task: task, setTask: setTask, addTasks: addTasks};
  const tasksList: TaskListProp = {tasksState, dispatchTask};
  
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


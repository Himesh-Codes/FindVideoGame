import { Task } from "../../interfaces/task";
import { AddTasksProp, CompleteTasksProp, DeleteTasksProp, EditTasksProp, TaskActions } from "../../interfaces/taskActionProps";

// can give any name to reducer function
// this function make copy of state and according to type of action will do some operation of copy state and return it
export function taskReducer(tasksState: Task[], action: TaskActions){
    // decouple the dependency with action, destructuring assignment statement. It is used to extract the type property from the action
    const {type} = action;
    switch (type) {
        case 'add':
            // To push data in useReducer based array state in React, you can use the spread syntax. 
            // The spread syntax (...) will unpack the existing elements of the state array into a new array where you can add other elements.
            return [...tasksState, {id: `${(action.action as AddTasksProp).recentTaskUid}`,taskName:(action.action as AddTasksProp).taskName}];

        case 'edit':
            // use map in taskState and return data after update the corresponding matching properties
            return tasksState.map(task => (task.id === (action.action as EditTasksProp).taskId)? { id:task.id, taskName: (action.action as EditTasksProp).editContent, isDone: task.isDone} : task)

        case 'delete':
             // use filter in taskState and return data
            return tasksState.filter((task)=>task.id != (action.action as DeleteTasksProp).taskId);

        case 'complete':
               // use map in taskState and return data after update the corresponding matching properties with done negation to do and undo
            return tasksState.map((task) => (task.id === (action.action as CompleteTasksProp).taskId) ? { id:task.id, taskName: task.taskName, isDone: !task.isDone} : task)
    
        default:
            break;
    }

    return tasksState;
}
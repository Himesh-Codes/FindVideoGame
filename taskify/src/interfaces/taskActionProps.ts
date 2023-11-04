export interface DeleteTasksProp {
    taskId: string;
}

export interface CompleteTasksProp {
    taskId: string;
}

export interface EditTasksProp {
    taskId: string;
    editContent: string;
}

export interface AddTasksProp{
    recentTaskUid: string;
    taskName: string;
}

export interface TaskActions {
    type: 'add' | 'delete' | 'complete' | 'edit';
    action: DeleteTasksProp | AddTasksProp;
}
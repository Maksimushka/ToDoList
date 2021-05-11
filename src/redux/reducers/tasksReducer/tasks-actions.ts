import {TaskPriority, TaskStatus, TaskType} from '../../../api/tasksAPI';
import {
    AddTodolistActionType,
    RemoveTodolistActionType,
    SetTodoListsActionType
} from '../todoListReducer/todolist-actions';
import {RequestStatusType} from '../appReducer/app-reducer';

// TYPES
export enum tasksActionTypes {
    fetchUpdateTask = 'TASKS/FETCH_UPDATE_TASK',
    fetchRemoveTask = 'TASKS/FETCH_REMOVE_TASK',
    fetchAddTask = 'TASKS/FETCH_ADD_TASK',
    getTasks = 'TASKS/GET_TASKS',

    removeTask = 'TASKS/REMOVE_TASK',
    addTask = 'TASKS/ADD_TASK',
    updateTask = 'TASKS/UPDATE_TASK',
    setTaskObjectStatus = 'TASKS/SET_TASK_OBJECT_STATUS',
    setTasks = 'TASKS/SET_TASKS',
}

export type TasksReducerActionsType = RemoveTaskActionType | AddTaskActionType
    | UpdateTaskAType | AddTodolistActionType | RemoveTodolistActionType
    | SetTodoListsActionType | SetTasksActionType | SetTaskObjectStatusActionType

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type UpdateTaskAType = ReturnType<typeof updateTaskAC>
export type SetTasksActionType = ReturnType<typeof setTasksAC>
export type SetTaskObjectStatusActionType = ReturnType<typeof setTaskObjectStatusAC>

export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatus
    priority?: TaskPriority
    startDate?: string
    deadline?: string
}

// ACTION CREATORS
export const fetchRemoveTask = (todoId: string, taskId: string) => ({
    type: tasksActionTypes.fetchRemoveTask, payload: {taskId, todoId,}
} as const)
export const fetchAddTask = (todoId: string, title: string) => ({
    type: tasksActionTypes.fetchAddTask, payload: {todoId, title}
} as const)
export const fetchUpdateTask = (todoId: string, taskId: string, model: UpdateDomainTaskModelType) => ({
    type: tasksActionTypes.fetchUpdateTask, payload: {taskId, todoId, model}
} as const)
export const getTasks = (todoId: string) => ({
    type: tasksActionTypes.getTasks, payload: {todoId}
} as const)

export const removeTaskAC = (todoID: string, id: string,) => ({
    type: tasksActionTypes.removeTask, id, todoID
} as const)
export const addTaskAC = (task: TaskType) => ({
    type: tasksActionTypes.addTask, task
} as const)
export const updateTaskAC = (todoId: string, id: string, model: UpdateDomainTaskModelType) => ({
    type: tasksActionTypes.updateTask, todoId, id, model
} as const)
export const setTasksAC = (todoId: string, tasks: TaskType[]) => ({
    type: tasksActionTypes.setTasks, todoId, tasks
} as const)
export const setTaskObjectStatusAC = (todoId: string, taskId: string, status: RequestStatusType) => ({
    type: tasksActionTypes.setTaskObjectStatus, todoId, status, taskId
} as const)
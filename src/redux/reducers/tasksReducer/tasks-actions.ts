import {TaskPriority, TaskStatus, TaskType} from '../../../api/tasksAPI';
import {
    AddTodolistActionType,
    RemoveTodolistActionType,
    SetTodoListsActionType
} from '../todoListReducer/todolist-actions';
import {RequestStatusType} from '../app-reducer';

// TYPES
export type TasksActionsType = RemoveTaskActionType | AddTaskActionType
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
export const removeTaskAC = (todoID: string, id: string,) => ({
    type: 'REMOVE_TASK', id, todoID
} as const)
export const addTaskAC = (task: TaskType) => ({
    type: 'ADD_TASK', task
} as const)
export const updateTaskAC = (todoId: string, id: string, model: UpdateDomainTaskModelType) => ({
    type: 'UPDATE_TASK', todoId, id, model
} as const)
export const setTasksAC = (todoId: string, tasks: TaskType[]) => ({
    type: 'SET_TASKS', todoId, tasks
} as const)
export const setTaskObjectStatusAC = (todoId: string, taskId: string, status: RequestStatusType) => ({
    type: 'SET_TASK_OBJECT_STATUS', todoId, status, taskId
} as const)
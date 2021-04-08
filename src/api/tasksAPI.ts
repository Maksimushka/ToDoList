import axios from 'axios';

const setting = {
    withCredentials: true,
    headers: {
        'API-KEY': '0c7f7a4d-ffbe-4143-a04f-3a08c1c80984'
    }
}

type ResponseType<D = {}> = {
    resultCode: number
    messages: string[]
    data: D
}

export type TaskType = {
    description: string
    title: string
    status: TaskStatus
    priority: TaskPriority
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
type UpdateTaskModelType = {
    description: string
    title: string
    status: number
    priority: number
    startDate: string
    deadline: string
}

export enum TaskStatus {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}
export enum TaskPriority {
    Low,
    Middle,
    Hi,
    Urgently,
    Later
}

type GetTasksType = {
    items: TaskType[]
    totalCount: number
    error: null
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/todo-lists',
    ...setting
})

export const tasksAPI = {
    getTasks(todoId: string) {
        return instance.get<GetTasksType>(`${todoId}/tasks`)
    },
    createTask(todoId: string, title: string) {
        return instance.post<ResponseType<{ item: TaskType }>>(`${todoId}/tasks`, {title})
    },
    updateTask(todoId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put<ResponseType<{ item: TaskType }>>(`${todoId}/tasks/${taskId}`, {...model})
    },
    deleteTask(todoId: string, taskId: string) {
        return instance.delete<ResponseType>(`${todoId}/tasks/${taskId}`)
    }
}


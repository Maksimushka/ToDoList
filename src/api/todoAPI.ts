import axios from 'axios';

type ResponseType<D = {}> = {
    resultCode: number
    messages: string[],
    data: D
}

export type TodoListType = {
    title: string
    id: string
    order: number
    addedDate: string
}

const setting = {
    withCredentials: true,
    headers: {
        'API-KEY': '0c7f7a4d-ffbe-4143-a04f-3a08c1c80984'
    }
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    ...setting
})

export const todoListAPI = {
    updateTodoList (todoId: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todoId}`, {title})
    },
    deleteTodoList (todoId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todoId}`)
    },
    createTodoList (title: string) {
        return instance.post<ResponseType<{item: TodoListType}>>('todo-lists', {title})
    },
    getTodoLists () {
        return instance.get<Array<TodoListType>>('todo-lists')
    }
}
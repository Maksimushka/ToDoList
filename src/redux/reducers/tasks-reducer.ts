import {TasksStateType} from '../../App';
import {v1} from 'uuid';
import {AddTodolistActionType, RemoveTodolistActionType, todolistId1, todolistId2} from './todolists-reducer';

type RemoveTaskActionType = {
    type: "REMOVE_TASK"
    id: string
    todoID: string
}
type AddTaskActionType = {
    type: "ADD_TASK"
    todoID: string
    title: string
}
type ChangeTaskTitleActionType = {
    type: "CHANGE_TASK_TITLE"
    todoID: string
    id: string
    title: string
}
type ChangeTaskStatusActionType = {
    type: "CHANGE_TASK_STATUS"
    todoID: string
    id: string
    isDone: boolean
}
type ActionsType = RemoveTaskActionType | AddTaskActionType | ChangeTaskTitleActionType
    | ChangeTaskStatusActionType | AddTodolistActionType | RemoveTodolistActionType

const initialState: TasksStateType = {
    [todolistId1]: [
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "React", isDone: false},
        {id: v1(), title: "Vue", isDone: true},
    ],
    [todolistId2]: [
        {id: v1(), title: "Milk", isDone: true},
        {id: v1(), title: "React Book", isDone: true}
    ]
}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    let copyState = {...state}
    switch (action.type) {
        case 'ADD_TASK': {
            let newTask = {id: v1(), title: action.title, isDone: false}
            let tasks = copyState[action.todoID]
            copyState[action.todoID] = [newTask, ...tasks]
            return copyState
        }
        case 'REMOVE_TASK': {
            let removedTasks = copyState[action.todoID].filter( t => t.id !== action.id)
            copyState[action.todoID] = removedTasks
            return copyState
        }
        case 'CHANGE_TASK_TITLE': {
            let tasks = copyState[action.todoID]
            let task = tasks.find( t => t.id === action.id)
            task!.title = action.title
            copyState[action.todoID] = [...tasks]
            return copyState
        }
        case 'CHANGE_TASK_STATUS': {
            let todolistTasks = copyState[action.todoID]
            let task = todolistTasks.find( t => t.id === action.id)
            task!.isDone = action.isDone
            copyState[action.todoID] = [...todolistTasks]
            return copyState
        }
        case 'ADD_TODOLIST': {
            copyState[action.todoId] = []
            return copyState
        }
        case 'REMOVE_TODOLIST': {
            delete copyState[action.id]
            return copyState
        }
        default: {
            return state
        }


    }
}

export const removeTaskAC = (id: string, todoID: string): RemoveTaskActionType => {
    return {
        type: 'REMOVE_TASK',
        id: id,
        todoID: todoID
    }
}
export const addTaskAC = (title: string, todoID: string): AddTaskActionType => {
    return {
        type: 'ADD_TASK',
        title: title,
        todoID: todoID
    }
}
export const changeTaskTitleAC = (title: string, id: string, todoID: string): ChangeTaskTitleActionType => {
    return {
        type: 'CHANGE_TASK_TITLE',
        id: id,
        todoID: todoID,
        title: title
    }
}
export const changeTaskStatusAC = (id: string, isDone: boolean, todoID: string): ChangeTaskStatusActionType => {
    return {
        type: 'CHANGE_TASK_STATUS',
        id: id,
        todoID: todoID,
        isDone: isDone
    }
}
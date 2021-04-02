import {v1} from 'uuid';
import {
    AddTaskActionType,
    ChangeTaskStatusActionType,
    ChangeTaskTitleActionType,
    RemoveTaskActionType
} from './tasks-actions';
import {AddTodolistActionType, RemoveTodolistActionType} from '../todoListReducer/todolist-actions';
import {TaskPriority, TaskStatus, TaskType} from '../../../api/tasksAPI';

type ActionsType = RemoveTaskActionType | AddTaskActionType | ChangeTaskTitleActionType
    | ChangeTaskStatusActionType | AddTodolistActionType | RemoveTodolistActionType

export type TasksStateType = {
    [key: string]: TaskType[]
}

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    let copyState = {...state}
    switch (action.type) {
        case 'ADD_TASK': {
            let newTask = {id: v1(), title: action.title, status: TaskStatus.New, addedDate: '',
                order: 0, deadline: '', priority: TaskPriority.Low, description: '', startDate: '', todoListId: action.todoID }
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
            task!.status = action.status
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
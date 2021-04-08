import {v1} from 'uuid';
import {
    AddTaskActionType,
    ChangeTaskStatusActionType,
    ChangeTaskTitleActionType,
    RemoveTaskActionType, SetTasksStatusActionType
} from './tasks-actions';
import {
    AddTodolistActionType,
    RemoveTodolistActionType,
    SetTodoListsActionType
} from '../todoListReducer/todolist-actions';
import {TaskPriority, TaskStatus, TaskType} from '../../../api/tasksAPI';

type ActionsType = RemoveTaskActionType | AddTaskActionType | ChangeTaskTitleActionType
    | ChangeTaskStatusActionType | AddTodolistActionType | RemoveTodolistActionType
    | SetTodoListsActionType | SetTasksStatusActionType

export type TasksStateType = {
    [key: string]: TaskType[]
}

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    let copyState = {...state}
    switch (action.type) {
        case 'SET_TASKS': {
            copyState[action.todoId] = action.tasks
            return copyState
        }
        case 'ADD_TASK': {
            let tasks = copyState[action.task.todoListId]
            copyState[action.task.todoListId] = [action.task, ...tasks]
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
        case 'SET_TODOLISTS': {
            action.todoLists.forEach(el => {
                copyState[el.id] = []
            })
            return copyState
        }
        default: {
            return state
        }
    }
}
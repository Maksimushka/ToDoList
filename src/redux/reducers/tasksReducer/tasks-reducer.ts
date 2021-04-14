import {TaskType} from '../../../api/tasksAPI';
import {TasksActionsType} from './tasks-actions';

export type TasksStateType = {
    [key: string]: TaskType[]
}

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: TasksActionsType): TasksStateType => {
    let copyState = {...state}
    switch (action.type) {
        case 'SET_TASKS': {
            copyState[action.todoId] = action.tasks
            return copyState
        }
        case 'ADD_TASK': {
            return {
                ...state,
                [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]
            }
        }
        case 'REMOVE_TASK': {
            return {
                ...state,
                [action.todoID]: state[action.todoID].filter( t => t.id !== action.id)
            }
        }

        case 'UPDATE_TASK': {
            return {
                ...state,
                [action.todoId]: state[action.todoId]
                    .map(el => el.id === action.id ? {...el, ...action.model} : el)
            }
        }
        case 'ADD_TODOLIST': {
            return {...state, [action.todoList.id]: []}
        }
        case 'REMOVE_TODOLIST': {
            let copyState = {...state}
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
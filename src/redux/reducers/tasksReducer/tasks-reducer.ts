import {TaskType} from '../../../api/tasksAPI';
import {tasksActionTypes, TasksReducerActionsType} from './tasks-actions';
import {RequestStatusType} from '../appReducer/app-reducer';
import {todoListsActionTypes} from '../todoListReducer/todolist-actions';

export type ObjectStatusType = TaskType & {
    objectStatus: RequestStatusType
}

export type TasksStateType = {
    [key: string]: ObjectStatusType[]
}

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: TasksReducerActionsType): TasksStateType => {
    let copyState = {...state}
    switch (action.type) {
        case tasksActionTypes.setTasks: {
            copyState[action.todoId] = action.tasks.map(el => ({...el, objectStatus: 'idle'}))
            return copyState
        }
        case tasksActionTypes.addTask: {
            return {
                ...state,
                [action.task.todoListId]: [{...action.task, objectStatus: 'idle'}, ...state[action.task.todoListId]]
            }
        }
        case tasksActionTypes.removeTask: {
            return {
                ...state,
                [action.todoID]: state[action.todoID].filter( t => t.id !== action.id)
            }
        }
        case tasksActionTypes.updateTask: {
            return {
                ...state,
                [action.todoId]: state[action.todoId]
                    .map(el => el.id === action.id ? {...el, ...action.model} : el)
            }
        }
        case todoListsActionTypes.addTodolist: {
            return {...state, [action.todoList.id]: []}
        }
        case todoListsActionTypes.removeTodolist: {
            let copyState = {...state}
            delete copyState[action.id]
            return copyState
        }
        case todoListsActionTypes.setTodoLists: {
            action.todoLists.forEach(el => {
                copyState[el.id] = []
            })
            return copyState
        }
        case tasksActionTypes.setTaskObjectStatus: {
            return {
                ...state,
                [action.todoId]: state[action.todoId].map(el => {
                    return el.id === action.taskId ? {...el, objectStatus: action.status} : el
                })
            }
        }
        default: {
            return state
        }
    }
}
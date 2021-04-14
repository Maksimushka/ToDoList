import {TodoListsActionsType} from './todolist-actions';
import {TodoListType} from '../../../api/todoAPI';
import {RequestStatusType} from '../app-reducer';

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodoListBllType = TodoListType & {
    filter: FilterValuesType
    objectStatus: RequestStatusType
}

const initialState: TodoListBllType[] = []

export const todoListsReducer = (state: TodoListBllType[] = initialState, action: TodoListsActionsType): TodoListBllType[] => {
    switch (action.type) {
        case 'REMOVE_TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }
        case 'ADD_TODOLIST': {
            return [{...action.todoList,  filter: 'all', objectStatus: 'idle'}, ...state,]
        }
        case 'Change_TODOLIST_TITLE': {
            return state.map(el => (el.id === action.id) ? {...el, title: action.title} : el)
        }
        case 'CHANGE_TODOLIST_FILTER': {
            return state.map(el => (el.id === action.id) ? {...el, filter: action.filter} : el)
        }
        case 'SET_TODOLISTS': {
            return action.todoLists.map( el => ({...el, filter: 'all', objectStatus: 'idle'}) )
        }
        case 'SET_TODOLIST_OBJECT_STATUS': {
            return state.map(el => el.id === action.todoId ? {...el, objectStatus: action.status} : el)
        }
        default:
            return state
    }
}
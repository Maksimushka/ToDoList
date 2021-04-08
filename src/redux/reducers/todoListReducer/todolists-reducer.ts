import {
    AddTodolistActionType,
    ChangeTodolistFilterActionType,
    ChangeTodolistTitleActionType,
    RemoveTodolistActionType, SetTodoListsActionType
} from './todolist-actions';
import {TodoListType} from '../../../api/todoAPI';

type ActionsType = RemoveTodolistActionType | AddTodolistActionType |
    ChangeTodolistFilterActionType | ChangeTodolistTitleActionType | SetTodoListsActionType

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodoListBllType = TodoListType & {
    filter: FilterValuesType
}

const initialState: TodoListBllType[] = []

export const todoListsReducer = (state: TodoListBllType[] = initialState, action: ActionsType): TodoListBllType[] => {
    switch (action.type) {
        case 'REMOVE_TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }
        case 'ADD_TODOLIST': {
            return [{
                id: action.todoId,
                title: action.title,
                filter: 'all',
                addedDate: '',
                order: 0
            }, ...state,]
        }
        case 'Change_TODOLIST_TITLE': {
            let todolist = state.find(tl => tl.id === action.id)
            todolist!.title = action.title
            return [...state]
        }
        case 'CHANGE_TODOLIST_FILTER': {
            let todolist = state.find(tl => tl.id === action.id)
            todolist!.filter = action.filter
            return [...state]
        }
        case 'SET_TODOLISTS': {
            return action.todoLists.map(el => ({
                ...el,
                filter: 'all'
            }))
        }
        default:
            return state
    }
}
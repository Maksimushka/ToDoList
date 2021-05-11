import {todoListsActionTypes, TodoListsReducerActionsType} from './todolist-actions';
import {TodoListType} from '../../../api/todoAPI';
import {RequestStatusType} from '../appReducer/app-reducer';

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodoListBllType = TodoListType & {
    filter: FilterValuesType
    objectStatus: RequestStatusType
}

const initialState: TodoListBllType[] = []

export const todoListsReducer = (state: TodoListBllType[] = initialState, action: TodoListsReducerActionsType): TodoListBllType[] => {
    switch (action.type) {
        case todoListsActionTypes.removeTodolist: {
            return state.filter(tl => tl.id !== action.id)
        }
        case todoListsActionTypes.addTodolist: {
            return [{...action.todoList,  filter: 'all', objectStatus: 'idle'}, ...state,]
        }
        case todoListsActionTypes.changeTodolistTitle: {
            return state.map(el => (el.id === action.id) ? {...el, title: action.title} : el)
        }
        case todoListsActionTypes.changeTodolistFilter: {
            return state.map(el => (el.id === action.id) ? {...el, filter: action.filter} : el)
        }
        case todoListsActionTypes.setTodoLists: {
            return action.todoLists.map( el => ({...el, filter: 'all', objectStatus: 'idle'}) )
        }
        case todoListsActionTypes.setTodoListObjectStatus: {
            return state.map(el => el.id === action.todoId ? {...el, objectStatus: action.status} : el)
        }
        default:
            return state
    }
}
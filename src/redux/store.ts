import {combineReducers, createStore} from 'redux';
import {tasksReducer} from '../state/tasks-reducer';
import {todoListsReducer} from '../state/todolists-reducer';

const reducers = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListsReducer
})

export const store = createStore(reducers)

export type RootStoreType = ReturnType<typeof reducers>
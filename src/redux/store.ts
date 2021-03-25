import {combineReducers, createStore} from 'redux';
import {tasksReducer} from './reducers/tasks-reducer';
import {todoListsReducer} from './reducers/todolists-reducer';

const reducers = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListsReducer
})

export const store = createStore(reducers)

export type RootStoreType = ReturnType<typeof reducers>
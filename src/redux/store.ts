import {combineReducers, createStore} from 'redux';
import {tasksReducer} from './reducers/tasksReducer/tasks-reducer';
import {todoListsReducer} from './reducers/todoListReducer/todolists-reducer';

const reducers = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListsReducer
})

export const store = createStore(reducers)

export type RootStoreType = ReturnType<typeof reducers>
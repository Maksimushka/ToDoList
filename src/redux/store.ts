import {applyMiddleware, combineReducers, createStore} from 'redux';
import {tasksReducer} from './reducers/tasksReducer/tasks-reducer';
import {todoListsReducer} from './reducers/todoListReducer/todolists-reducer';
import thunk from 'redux-thunk';

const reducers = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListsReducer
})

export const store = createStore(reducers, applyMiddleware(thunk))

export type RootStoreType = ReturnType<typeof reducers>
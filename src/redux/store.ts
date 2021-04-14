import {applyMiddleware, combineReducers, createStore} from 'redux';
import {tasksReducer} from './reducers/tasksReducer/tasks-reducer';
import {todoListsReducer} from './reducers/todoListReducer/todolists-reducer';
import thunk from 'redux-thunk';
import {appReducer} from './reducers/app-reducer';

const reducers = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListsReducer,
    app: appReducer
})

export const store = createStore(reducers, applyMiddleware(thunk))

export type RootStoreType = ReturnType<typeof reducers>
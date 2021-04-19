import {applyMiddleware, combineReducers, createStore} from 'redux';
import {tasksReducer} from './reducers/tasksReducer/tasks-reducer';
import {todoListsReducer} from './reducers/todoListReducer/todolists-reducer';
import thunk from 'redux-thunk';
import {appReducer} from './reducers/appReducer/app-reducer';
import {authReducer} from './reducers/authReducer/auth-reducer';

const reducers = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListsReducer,
    app: appReducer,
    auth: authReducer
})

export const store = createStore(reducers, applyMiddleware(thunk))

export type RootStoreType = ReturnType<typeof reducers>
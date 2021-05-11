import {applyMiddleware, combineReducers, createStore} from 'redux';
import {tasksReducer} from './reducers/tasksReducer/tasks-reducer';
import {todoListsReducer} from './reducers/todoListReducer/todolists-reducer';
import {appReducer} from './reducers/appReducer/app-reducer';
import {authReducer} from './reducers/authReducer/auth-reducer';
import createSagaMiddleware from 'redux-saga'
import {rootSaga} from './rootSaga';

const reducers = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListsReducer,
    app: appReducer,
    auth: authReducer
})

const sagaMiddleware = createSagaMiddleware()

export const store = createStore(reducers, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(rootSaga)

export type RootStoreType = ReturnType<typeof reducers>
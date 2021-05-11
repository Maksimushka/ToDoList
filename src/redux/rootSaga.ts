import { all } from "redux-saga/effects";
import {watchInitializeApp} from './sagas/app-sagas';
import {watchSetLogin, watchSetLogOut} from './sagas/auth-sagas';
import {watchAddTodoList, watchDeleteTodoList, watchGetTodoLists, watchUpdateTodoList} from './sagas/todoList-sagas';
import {watchAddTask, watchGetTasks, watchRemoveTask, watchUpdateTask} from './sagas/tasks-sagas';

export function* rootSaga(): Generator {
    yield all([
        watchInitializeApp(),
        watchSetLogOut(),
        watchSetLogin(),
        watchGetTodoLists(),
        watchDeleteTodoList(),
        watchAddTodoList(),
        watchUpdateTodoList(),
        watchUpdateTask(),
        watchAddTask(),
        watchRemoveTask(),
        watchGetTasks()
    ])
}
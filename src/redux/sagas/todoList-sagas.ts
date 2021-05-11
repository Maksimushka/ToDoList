import {setLoadingStatusAC} from '../reducers/appReducer/app-actions';
import {todoListAPI} from '../../api/todoAPI';
import {
    addTodolistAC, changeTodolistTitleAC,
    removeTodolistAC,
    setTodoListObjectStatusAC,
    setTodoListsAC,
    todoListsActionTypes
} from '../reducers/todoListReducer/todolist-actions';
import {call, put, takeEvery} from 'redux-saga/effects';
import {ActionType} from '../../utils/types';

export function* getTodoListsWorker() {
    yield put(setLoadingStatusAC('loading'))
    try {
        let {data} = yield call(todoListAPI.getTodoLists)
        yield put(setTodoListsAC(data))
        yield put(setLoadingStatusAC('succeeded'))
    } catch (e) {
        // handleServerNetworkError(e, dispatch)
    }
}
export function* deleteTodoListWorker({payload}: ActionType<string>) {
    yield put(setLoadingStatusAC('loading'))
    yield put(setTodoListObjectStatusAC(payload, 'loading'))
    try {
        let {data} = yield call(todoListAPI.deleteTodoList, payload)
        if (data.resultCode === 0) {
            yield put(removeTodolistAC(payload))
            yield put(setLoadingStatusAC('succeeded'))
            yield put(setTodoListObjectStatusAC(payload, 'succeeded'))
        } else {
            // handleServerAppError(data, dispatch)
        }
    } catch (e) {
        alert(e)
    }
}
export function* addTodoListWorker({payload}: ActionType<string>) {
    yield put(setLoadingStatusAC('loading'))
    try {
        let {data} = yield call(todoListAPI.createTodoList, payload)
        if (data.resultCode === 0) {
            yield put(addTodolistAC(data.data.item))
            yield put(setLoadingStatusAC('succeeded'))
        } else {
            // handleServerAppError(data, dispatch)
        }
    } catch (e) {
        alert(e)
    }
}
export function* updateTodoListWorker({payload}: ActionType<{todoId: string, title: string}>) {
    const {title, todoId} = payload
    yield put(setLoadingStatusAC('loading'))
    yield put(setTodoListObjectStatusAC(todoId, 'loading'))
    try {
        let {data} = yield call(todoListAPI.updateTodoList, todoId, title)
        if (data.resultCode === 0) {
            yield put(changeTodolistTitleAC(todoId, title))
            yield put(setLoadingStatusAC('succeeded'))
            yield put(setTodoListObjectStatusAC(todoId, 'succeeded'))
        } else {
            // handleServerAppError(data, dispatch)
        }
    } catch (e) {
        alert(e)
    }
}

export function* watchGetTodoLists() {
    yield takeEvery(todoListsActionTypes.getTodoLists, getTodoListsWorker)
}
export function* watchDeleteTodoList() {
    yield takeEvery(todoListsActionTypes.fetchRemoveTodolist, deleteTodoListWorker)
}
export function* watchAddTodoList() {
    yield takeEvery(todoListsActionTypes.fetchAddTodolist, addTodoListWorker)
}
export function* watchUpdateTodoList() {
    yield takeEvery(todoListsActionTypes.fetchUpdateTodolist, updateTodoListWorker)
}
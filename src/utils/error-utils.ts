import {ResponseType} from '../api/todoAPI'
import {
    appActionsType,
    setErrorAC,
    setLoadingStatusAC,
} from '../redux/reducers/appReducer/app-actions';
import {put, takeEvery} from 'redux-saga/effects';
import {ActionType} from './types';

// generic function
export function* handleServerAppError<T>({payload}: ActionType<{data: ResponseType<T>}>) {
    const {data} = payload
    if (data.messages.length) {
        yield put(setErrorAC(data.messages[0]))
    } else {
        yield put(setErrorAC('Some error occurred'))
    }
    yield put(setLoadingStatusAC('failed'))
}

export function* handleServerNetworkError({payload}: ActionType<{error: string}>) {
    const {error} = payload
    yield put(setErrorAC(error))
    yield put(setLoadingStatusAC('failed'))
}

export function* watchHandleServerNetworkError() {
    yield takeEvery(appActionsType.getNetworkError, handleServerNetworkError)
}
export function* watchHandleServerAppError() {
    yield takeEvery(appActionsType.getAppError, handleServerAppError)
}

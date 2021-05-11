import {authAPI, LoginParamsType} from '../../api/todoAPI';
import {setLoadingStatusAC} from '../reducers/appReducer/app-actions';
import {authActionsType, setIsLoggedAC} from '../reducers/authReducer/auth-actions';
import {call, put, takeEvery} from 'redux-saga/effects';
import {ActionType} from '../../utils/types';

export function* setLoginWorker({payload}: ActionType<LoginParamsType>) {
    yield put(setLoadingStatusAC('loading'))
    try {
        let {data} = yield call(authAPI.login, payload)
        if (data.resultCode === 0) {
            yield put(setIsLoggedAC(true))
            yield put(setLoadingStatusAC('succeeded'))
        } else {
            // handleServerAppError(data, dispatch)
        }
    } catch (e) {
        alert(e)
    }
}
export function* setLogOutWorker() {
    yield put(setLoadingStatusAC('loading'))
    try {
        let {data} = yield call(authAPI.logOut)
        if (data.resultCode === 0) {
            yield put(setIsLoggedAC(false))
            yield put(setLoadingStatusAC('succeeded'))
        } else {
            // handleServerAppError(data, dispatch)
        }
    } catch (e) {
        alert(e)
    }
}

export function* watchSetLogOut() {
    yield takeEvery(authActionsType.logOut, setLogOutWorker)
}
export function* watchSetLogin() {
    yield takeEvery(authActionsType.login, setLoginWorker)
}
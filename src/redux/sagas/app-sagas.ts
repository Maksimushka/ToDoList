import { put, takeEvery, call } from 'redux-saga/effects'
import {authAPI} from '../../api/todoAPI';
import {setIsLoggedAC} from '../reducers/authReducer/auth-actions';
import {appActionsType, setIsInitializedAC} from '../reducers/appReducer/app-actions';

export function* initializeAppWorker() {
    const {data} = yield call(authAPI.me)
    yield put(setIsInitializedAC(true))
    if (data.resultCode === 0) {
        yield put(setIsLoggedAC(true))
    } else {
        // handleServerAppError(data, dispatch)
    }
}

export function* watchInitializeApp() {
    yield takeEvery(appActionsType.initializeApp, initializeAppWorker)
}
import { all } from "redux-saga/effects";
import {watchInitializeApp} from './sagas/app-sagas';
import {watchSetLogin, watchSetLogOut} from './sagas/auth-sagas';

export function* rootSaga(): Generator {
    yield all([
        watchInitializeApp(),
        watchSetLogOut(),
        watchSetLogin()
    ])
}
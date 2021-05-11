import { all } from "redux-saga/effects";
import {watchInitializeApp} from './sagas/app-sagas';

export function* rootSaga(): Generator {
    yield all([
        watchInitializeApp()
    ])
}
import {RequestStatusType} from './app-reducer';
import {Dispatch} from 'redux';
import {authAPI} from '../../../api/todoAPI';
import {setIsLoggedAC} from '../authReducer/auth-actions';
import {handleServerAppError} from '../../../utils/error-utils';

export enum appActionsType {
    setLoadingStatus = 'APP/SET_LOADING_STATUS',
    setError = 'APP/SET_ERROR',
    setIsInitialized = 'APP/SET_IS_INITIALIZED'
}

export type AppReducerActionsType = SetLoadingStatusAType | SetErrorAType | SetIsInitializedAType

export type SetErrorAType = ReturnType<typeof setErrorAC>
export type SetLoadingStatusAType = ReturnType<typeof setLoadingStatusAC>
export type SetIsInitializedAType = ReturnType<typeof setIsInitializedAC>

export const setLoadingStatusAC = (status: RequestStatusType) => ({
    type: appActionsType.setLoadingStatus,
    status
} as const)
export const setErrorAC = (error: string | null) => ({
    type: appActionsType.setError,
    error
} as const)
export const setIsInitializedAC = (value: boolean) => ({
    type: appActionsType.setIsInitialized,
    value
} as const)

export const initializeAppTC = () => async (dispatch: Dispatch) => {
    let {data} = await authAPI.me()
    dispatch(setIsInitializedAC(true))
    if (data.resultCode === 0) {
        dispatch(setIsLoggedAC(true))
    } else {
        handleServerAppError(data, dispatch)
    }
}
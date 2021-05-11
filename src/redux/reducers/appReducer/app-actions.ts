import {RequestStatusType} from './app-reducer';

export enum appActionsType {
    setLoadingStatus = 'APP/SET_LOADING_STATUS',
    setError = 'APP/SET_ERROR',
    initializeApp = 'APP/INITIALIZE_APP',
    setIsInitialized = 'APP/SET_IS_INITIALIZED'
}

export type AppReducerActionsType = SetLoadingStatusAType | SetErrorAType | SetIsInitializedAType | initializeAppType

export type SetErrorAType = ReturnType<typeof setErrorAC>
export type SetLoadingStatusAType = ReturnType<typeof setLoadingStatusAC>
export type SetIsInitializedAType = ReturnType<typeof setIsInitializedAC>
export type initializeAppType = ReturnType<typeof initializeApp>

export const initializeApp = () => ({type: appActionsType.initializeApp} as const)
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
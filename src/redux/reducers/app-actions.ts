import {RequestStatusType} from './app-reducer';

export enum appActionsType {
    setLoadingStatus = 'APP/SET_LOADING_STATUS',
    setError = 'APP/SET_ERROR'
}

export type AppReducerActionsType = SetLoadingStatusACType | SetErrorACType

export type SetErrorACType = ReturnType<typeof setErrorAC>
export type SetLoadingStatusACType = ReturnType<typeof setLoadingStatusAC>

export const setLoadingStatusAC = (status: RequestStatusType) => ({
    type: appActionsType.setLoadingStatus,
    status
} as const)
export const setErrorAC = (error: string | null) => ({
    type: appActionsType.setError,
    error
} as const)
import {appActionsType, AppReducerActionsType} from './app-actions';

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
const initialState = {
    status: 'loading' as RequestStatusType,
    error: null as null | string
}

export type AppReducerStateType = typeof initialState

export const appReducer = (state: AppReducerStateType = initialState, action: AppReducerActionsType): AppReducerStateType => {
    switch (action.type) {
        case appActionsType.setLoadingStatus: {
            return { ...state, status: action.status }
        }
        case appActionsType.setError: {
            return { ...state, error: action.error }
        }
        default:
            return state
    }
}
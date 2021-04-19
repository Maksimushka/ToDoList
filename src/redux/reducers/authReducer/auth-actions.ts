import {authAPI, LoginParamsType} from '../../../api/todoAPI';
import {Dispatch} from 'redux';
import {setLoadingStatusAC} from '../appReducer/app-actions';
import {handleServerAppError, handleServerNetworkError} from '../../../utils/error-utils';

// TYPES
export enum authActionsType {
    setIsLogged = 'AUTH/SET_LOADING_STATUS',
}
export type authReducerActionsType = SetIsLoggedAType
export type SetIsLoggedAType = ReturnType<typeof setIsLoggedAC>

// ACTION CREATORS
export const setIsLoggedAC = (value: boolean) => ({
    type: authActionsType.setIsLogged,
    value
} as const)

// THUNK CREATORS
export const setLoginTC = (values: LoginParamsType) => async (dispatch: Dispatch) => {
    dispatch(setLoadingStatusAC('loading'))
    try {
        let {data} = await authAPI.login(values)
        if (data.resultCode === 0) {
            dispatch(setIsLoggedAC(true))
            dispatch(setLoadingStatusAC('succeeded'))
        } else {
            handleServerAppError(data, dispatch)
        }
    } catch (e) {
        handleServerNetworkError(e, dispatch)
    }
}
export const setLogOutTC = () => async (dispatch: Dispatch) => {
    dispatch(setLoadingStatusAC('loading'))
    try {
        let {data} = await authAPI.logOut()
        if (data.resultCode === 0) {
            dispatch(setIsLoggedAC(false))
            dispatch(setLoadingStatusAC('succeeded'))
        } else {
            handleServerAppError(data, dispatch)
        }
    } catch (e) {
        handleServerNetworkError(e, dispatch)
    }
}
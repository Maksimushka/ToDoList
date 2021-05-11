// TYPES
import {LoginParamsType} from '../../../api/todoAPI';

export enum authActionsType {
    setIsLogged = 'AUTH/SET_LOADING_STATUS',
    login = 'AUTH/LOGIN',
    logOut = 'AUTH/LOGOUT',
}
export type authReducerActionsType = SetIsLoggedAType | logOutAType | loginAType
export type SetIsLoggedAType = ReturnType<typeof setIsLoggedAC>
export type logOutAType = ReturnType<typeof logOut>
export type loginAType = ReturnType<typeof login>

// ACTION CREATORS
export const login = (payload: LoginParamsType) => ({
    type: authActionsType.login, payload
} as const)
export const logOut = () => ({type: authActionsType.logOut} as const)
export const setIsLoggedAC = (value: boolean) => ({
    type: authActionsType.setIsLogged,
    value
} as const)
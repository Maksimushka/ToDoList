import {authActionsType, authReducerActionsType} from './auth-actions';

const initialState = {
    isLogged: false
}

export type authReducerStateType = typeof initialState

export const authReducer = (state: authReducerStateType = initialState, action: authReducerActionsType): authReducerStateType => {
    switch (action.type) {
        case authActionsType.setIsLogged: {
            return {...state, isLogged: action.value}
        }
        default:
            return state
    }
}
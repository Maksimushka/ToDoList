import {Dispatch} from 'redux';
import {addTodolistAC, removeTodolistAC, setTodoListAC} from './todolist-actions';
import {todoListAPI} from '../../../api/todoAPI';

export const getTodoListsTC = () => async (dispatch: Dispatch) => {
    let {data} = await todoListAPI.getTodoLists()
    // @ts-ignore
    dispatch(setTodoListAC(data))
}

export const deleteTodoListsTC = (todoId: string) => (dispatch: Dispatch) => {
    todoListAPI.deleteTodoList(todoId)
    dispatch(removeTodolistAC(todoId))
}

export const addTodoListsTC = (title: string) => (dispatch: Dispatch) => {
    todoListAPI.createTodoList(title)
    dispatch(addTodolistAC(title))
}

export const updateTodoListsTC = (todoId: string, title: string) => (dispatch: Dispatch) => {
    todoListAPI.updateTodoList(todoId, title)
    dispatch(addTodolistAC(title))
}
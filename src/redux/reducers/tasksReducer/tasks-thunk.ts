import {Dispatch} from 'redux';
import {tasksAPI} from '../../../api/tasksAPI';
import {
    addTaskAC,
    removeTaskAC,
    setTaskObjectStatusAC,
    setTasksAC,
    UpdateDomainTaskModelType,
    updateTaskAC
} from './tasks-actions';
import {RootStoreType} from '../../store';
import {setLoadingStatusAC} from '../app-actions';
import {setTodoListObjectStatusAC} from '../todoListReducer/todolist-actions';
import {handleServerAppError, handleServerNetworkError} from '../../../utils/error-utils';

export const getTasksTC = (todoId: string) => async (dispatch: Dispatch) => {
    dispatch(setLoadingStatusAC('loading'))
    dispatch(setTodoListObjectStatusAC(todoId, 'loading'))
    try {
        let {data} = await tasksAPI.getTasks(todoId)
        dispatch(setTasksAC(todoId, data.items))
        dispatch(setLoadingStatusAC('succeeded'))
        dispatch(setTodoListObjectStatusAC(todoId, 'succeeded'))
    } catch (e) {
        handleServerNetworkError(e, dispatch)
    }
}
export const updateTaskTC = (todoId: string, taskId: string, model: UpdateDomainTaskModelType) =>
    async (dispatch: Dispatch, getState: () => RootStoreType) => {
        const allTasks = getState().tasks[todoId]
        const task = allTasks.find(el => el.id === taskId);
        if (!task) {
            console.warn('Task not found!')
            return
        }

        const apiModel = {
            description: task.description,
            title: task.title,
            status: task.status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
            ...model
        }
        dispatch(setLoadingStatusAC('loading'))
        dispatch(setTaskObjectStatusAC(todoId, taskId, 'loading'))
        try {
            let {data} = await tasksAPI.updateTask(todoId, taskId, apiModel)
            if (data.resultCode === 0) {
                dispatch(updateTaskAC(todoId, taskId, apiModel))
                dispatch(setLoadingStatusAC('succeeded'))
                dispatch(setTaskObjectStatusAC(todoId, taskId, 'succeeded'))
            } else {
                handleServerAppError(data, dispatch)
                dispatch(setTaskObjectStatusAC(todoId, taskId, 'failed'))
            }
        } catch (e) {
            handleServerNetworkError(e, dispatch)
        }
    }
export const deleteTaskTC = (todoId: string, taskId: string) => async (dispatch: Dispatch) => {
    dispatch(setLoadingStatusAC('loading'))
    dispatch(setTaskObjectStatusAC(todoId, taskId, 'loading'))
    try {
        let {data} = await tasksAPI.deleteTask(todoId, taskId)
        if (data.resultCode === 0) {
            dispatch(removeTaskAC(todoId, taskId))
            dispatch(setLoadingStatusAC('succeeded'))
            dispatch(setTaskObjectStatusAC(todoId, taskId, 'succeeded'))
        } else {
            handleServerAppError(data, dispatch)
            dispatch(setTaskObjectStatusAC(todoId, taskId, 'failed'))
        }
    } catch (e) {
        handleServerNetworkError(e, dispatch)
    }
}
export const addTaskTC = (todoId: string, title: string) => async (dispatch: Dispatch) => {
    dispatch(setTodoListObjectStatusAC(todoId, 'loading'))
    dispatch(setLoadingStatusAC('loading'))
    try {
        let {data} = await tasksAPI.createTask(todoId, title)
        if (data.resultCode === 0) {
            dispatch(addTaskAC(data.data.item))
            dispatch(setLoadingStatusAC('succeeded'))
        } else {
            handleServerAppError(data, dispatch)
        }
        dispatch(setTodoListObjectStatusAC(todoId, 'succeeded'))
    } catch (e) {
        handleServerNetworkError(e, dispatch)
    }

}
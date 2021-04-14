import {Dispatch} from 'redux';
import {tasksAPI} from '../../../api/tasksAPI';
import {addTaskAC, removeTaskAC, setTasksAC, UpdateDomainTaskModelType, updateTaskAC} from './tasks-actions';
import {RootStoreType} from '../../store';
import {setErrorAC, setLoadingStatusAC} from '../app-actions';
import {setTodoListObjectStatusAC} from '../todoListReducer/todolist-actions';

export const getTasksTC = (todoId: string) => async (dispatch: Dispatch) => {
    dispatch(setLoadingStatusAC('loading'))
    let {data} = await tasksAPI.getTasks(todoId)
    dispatch(setTasksAC(todoId, data.items))
    dispatch(setLoadingStatusAC('succeeded'))
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
        try {
            let {data} = await tasksAPI.updateTask(todoId, taskId, apiModel)
            console.log(data)
            debugger
            if (data.resultCode === 0) {
                dispatch(updateTaskAC(todoId, taskId, apiModel))
                dispatch(setLoadingStatusAC('succeeded'))
            } else {
                if (data.messages.length) {
                    dispatch(setErrorAC(data.messages[0]))
                } else {
                    dispatch(setErrorAC('Some error occurred'))
                }
                dispatch(setLoadingStatusAC('failed'))
            }
        } catch (e) {
            dispatch(setErrorAC(e.message))
            dispatch(setLoadingStatusAC('failed'))
        }

    }
export const deleteTaskTC = (todoId: string, taskId: string) => async (dispatch: Dispatch) => {
    dispatch(setLoadingStatusAC('loading'))
    await tasksAPI.deleteTask(todoId, taskId)
    dispatch(removeTaskAC(todoId, taskId))
    dispatch(setLoadingStatusAC('succeeded'))
}
export const addTaskTC = (todoId: string, title: string) => async (dispatch: Dispatch) => {
    dispatch(setTodoListObjectStatusAC(todoId, 'loading'))
    dispatch(setLoadingStatusAC('loading'))
    let {data} = await tasksAPI.createTask(todoId, title)
    if (data.resultCode === 0) {
        dispatch(addTaskAC(data.data.item))
        dispatch(setLoadingStatusAC('succeeded'))
    } else {
        if (data.messages.length) {
            dispatch(setErrorAC(data.messages[0]))
        } else {
            dispatch(setErrorAC('Some error occurred'))
        }
        dispatch(setLoadingStatusAC('failed'))
    }
    dispatch(setTodoListObjectStatusAC(todoId, 'succeeded'))
}
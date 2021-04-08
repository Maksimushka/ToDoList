import {Dispatch} from 'redux';
import {tasksAPI, TaskStatus} from '../../../api/tasksAPI';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, setTasksAC} from './tasks-actions';
import {RootStoreType} from '../../store';

export const getTasksTC = (todoId: string) => async (dispatch: Dispatch) => {
    let {data} = await tasksAPI.getTasks(todoId)
    dispatch(setTasksAC(todoId, data.items))
}
export const updateTaskStatusTC = (todoId: string, taskId: string, status: TaskStatus) =>
    (dispatch: Dispatch, getState: () => RootStoreType) => {
    const allTasks = getState().tasks[todoId]
    const task = allTasks.find(el => el.id === taskId)

    if (task) {
        tasksAPI.updateTask(todoId, taskId, {
            description: task.description,
            title: task.title,
            status: status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline
        }).then(() => {
            dispatch(changeTaskStatusAC(todoId, taskId, status))
        })
    }
}
export const updateTaskTitleTC = (todoId: string, taskId: string, title: string) =>
    (dispatch: Dispatch, getState: () => RootStoreType) => {
    const allTasks = getState().tasks[todoId]
    const task = allTasks.find(el => el.id === taskId)

    if (task) {
        tasksAPI.updateTask(todoId, taskId, {
            description: task.description,
            title: title,
            status: task.status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline
        }).then(() => {
            dispatch(changeTaskTitleAC(todoId, taskId, title))
        })
    }

}
export const deleteTaskTC = (todoId: string, taskId: string) => (dispatch: Dispatch) => {
    tasksAPI.deleteTask(todoId, taskId).then(() => {
        dispatch(removeTaskAC(todoId, taskId))
    })
}
export const addTaskTC = (todoId: string, title: string) => (dispatch: Dispatch) => {
    tasksAPI.createTask(todoId, title).then((resp) => {
        dispatch(addTaskAC(resp.data.data.item))
    })
}
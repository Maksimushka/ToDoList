import {
    addTaskAC,
    removeTaskAC,
    setTaskObjectStatusAC, setTasksAC,
    tasksActionTypes,
    UpdateDomainTaskModelType,
    updateTaskAC
} from '../reducers/tasksReducer/tasks-actions';
import {RootStoreType} from '../store';
import {setLoadingStatusAC} from '../reducers/appReducer/app-actions';
import {tasksAPI} from '../../api/tasksAPI';
import {ActionType} from '../../utils/types';
import {call, put, select, takeEvery} from 'redux-saga/effects';
import {ObjectStatusType} from '../reducers/tasksReducer/tasks-reducer';
import {setTodoListObjectStatusAC} from '../reducers/todoListReducer/todolist-actions';

export function* updateTaskWorker({payload}: ActionType<{todoId: string, taskId: string, model: UpdateDomainTaskModelType}>) {
    const {todoId, taskId, model} = payload
    const getTasks = (state: RootStoreType): ObjectStatusType[] => state.tasks[todoId]
    const allTasks = yield select(getTasks)
    const task = allTasks.find((el: { id: string; }) => el.id === taskId);
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

    yield put(setLoadingStatusAC('loading'))
    yield put(setTaskObjectStatusAC(todoId, taskId, 'loading'))
    try {
        let {data} = yield call(tasksAPI.updateTask, todoId, taskId, apiModel)
        if (data.resultCode === 0) {
            yield put(updateTaskAC(todoId, taskId, apiModel))
            yield put(setLoadingStatusAC('succeeded'))
            yield put(setTaskObjectStatusAC(todoId, taskId, 'succeeded'))
        } else {
            // handleServerAppError(data, dispatch)
            yield put(setTaskObjectStatusAC(todoId, taskId, 'failed'))
        }
    } catch (e) {
        alert(e)
    }
}
export function* removeTaskWorker({payload}: ActionType<{todoId: string, taskId: string}>) {
    const {todoId, taskId} = payload
    yield put(setLoadingStatusAC('loading'))
    yield put(setTaskObjectStatusAC(todoId, taskId, 'loading'))
    try {
        let {data} = yield call(tasksAPI.deleteTask, todoId, taskId)
        if (data.resultCode === 0) {
            yield put(removeTaskAC(todoId, taskId))
            yield put(setLoadingStatusAC('succeeded'))
            yield put(setTaskObjectStatusAC(todoId, taskId, 'succeeded'))
        } else {
            // handleServerAppError(data, dispatch)
            yield put(setTaskObjectStatusAC(todoId, taskId, 'failed'))
        }
    } catch (e) {
        alert(e)
    }
}
export function* addTaskWorker({payload}: ActionType<{todoId: string, title: string}>) {
    const {todoId, title} = payload
    yield put(setTodoListObjectStatusAC(todoId, 'loading'))
    yield put(setLoadingStatusAC('loading'))
    try {
        let {data} = yield call(tasksAPI.createTask, todoId, title)
        if (data.resultCode === 0) {
            yield put(addTaskAC(data.data.item))
            yield put(setLoadingStatusAC('succeeded'))
        } else {
            // handleServerAppError(data, dispatch)
        }
        yield put(setTodoListObjectStatusAC(todoId, 'succeeded'))
    } catch (e) {
        alert(e)
    }
}
export function* getTasksWorker({payload}: ActionType<{todoId: string}>) {
    const {todoId} = payload
    yield put(setLoadingStatusAC('loading'))
    yield put(setTodoListObjectStatusAC(todoId, 'loading'))
    try {
        let {data} = yield call(tasksAPI.getTasks, todoId)
        yield put(setTasksAC(todoId, data.items))
        yield put(setLoadingStatusAC('succeeded'))
        yield put(setTodoListObjectStatusAC(todoId, 'succeeded'))
    } catch (e) {
        alert(e)
    }
}

export function* watchUpdateTask() {
    yield takeEvery(tasksActionTypes.fetchUpdateTask, updateTaskWorker)
}
export function* watchAddTask() {
    yield takeEvery(tasksActionTypes.fetchAddTask, addTaskWorker)
}
export function* watchRemoveTask() {
    yield takeEvery(tasksActionTypes.fetchRemoveTask, removeTaskWorker)
}
export function* watchGetTasks() {
    yield takeEvery(tasksActionTypes.getTasks, getTasksWorker)
}
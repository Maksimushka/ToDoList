import React, {useEffect, useState} from 'react'
import {tasksAPI} from '../api/tasksAPI';

export default {
    title: 'API'
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoId ='04b9801a-4602-41b1-a623-72efda145ba7'
        tasksAPI.getTasks(todoId)
            .then(resp => setState(resp.data))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoId ='04b9801a-4602-41b1-a623-72efda145ba7'
        tasksAPI.createTask(todoId, 'React-thunk')
            .then(resp => setState(resp.data))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoId = '04b9801a-4602-41b1-a623-72efda145ba7'
        const taskId = '722adc85-19f9-4ab2-929a-8c5769096142'
        tasksAPI.deleteTask(todoId, taskId)
            .then(resp => setState(resp.data))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
// export const UpdateTaskTitle = () => {
//     const [state, setState] = useState<any>(null)
//     useEffect(() => {
//         const todoId = '04b9801a-4602-41b1-a623-72efda145ba7'
//         const taskId = '244782da-6fda-4f7f-9595-ca3a0e1985c3'
//         tasksAPI.updateTask(todoId, taskId, 'React-redux')
//             .then(resp => setState(resp.data))
//     }, [])
//
//     return <div> {JSON.stringify(state)}</div>
// }
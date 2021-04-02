import React, {useEffect, useState} from 'react'
import {todoListAPI} from '../api/todoAPI';

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todoListAPI.getTodoLists()
           .then((resp) => setState(resp.data))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todoListAPI.createTodoList('React')
            .then(resp => setState(resp.data))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'ab649249-d250-497f-ae24-28719a654dcf';
        todoListAPI.deleteTodoList(todolistId)
            .then(resp => setState(resp.data))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'c815dbcd-ed89-4c88-97be-651d5137bfdd';
        todoListAPI.updateTodoList(todolistId, 'Redux-saga')
            .then(resp => setState(resp.data))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

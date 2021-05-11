import React, {useCallback, useEffect} from 'react';
import s from './Todolist.module.css'
import {AddItemForm} from '../AddItemForm/AddItemForm';
import EditableSpan from '../EditableSpan/EditableSpan';
import {Button, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {TaskStatus} from '../../api/tasksAPI';
import {FilterValuesType} from '../../redux/reducers/todoListReducer/todolists-reducer';
import {useDispatch} from 'react-redux';
import {
    changeTodolistFilterAC,
    fetchRemoveTodoList,
    UpdateTodoList
} from '../../redux/reducers/todoListReducer/todolist-actions';
import Tasks from './Tasks/Tasks';
import {RequestStatusType} from '../../redux/reducers/appReducer/app-reducer';
import {ObjectStatusType} from '../../redux/reducers/tasksReducer/tasks-reducer';
import {fetchAddTask, getTasks} from '../../redux/reducers/tasksReducer/tasks-actions';

type PropsType = {
    objectStatus: RequestStatusType
    title: string
    id: string
    tasks: ObjectStatusType[]
    filter: FilterValuesType
}

export const TodoList = React.memo((props: PropsType) => {
    const {tasks, title, id, filter, objectStatus} = props

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getTasks(id))
    }, [dispatch, id])

    const addTask = useCallback((title: string, todolistId: string) => {
        dispatch(fetchAddTask(todolistId, title))
    }, [dispatch])
    const removeTodoList = useCallback((id: string) => {
        dispatch(fetchRemoveTodoList(id))
    }, [dispatch])
    const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => {
        dispatch(changeTodolistFilterAC(todolistId, value))
    }, [dispatch])
    const changeTodolistTitle = useCallback((title: string, todoId: string) => {
        dispatch(UpdateTodoList({todoId, title}))
    }, [dispatch])

    const onChangeFilter = useCallback((filter: FilterValuesType) => {
        changeFilter(filter, id)
    }, [changeFilter, id])
    const addTaskHandler = useCallback((title: string) => {
        addTask(title, id)
    }, [addTask, id])
    const changeTodolistTitleHandler = useCallback((title: string) => {
        changeTodolistTitle(title, id)
    }, [changeTodolistTitle, id])

    let tasksForTodolist = tasks;
    if (filter === 'active') {
        tasksForTodolist = tasks.filter(t => t.status === TaskStatus.New);
    }
    if (filter === 'completed') {
        tasksForTodolist = tasks.filter(t => t.status === TaskStatus.Completed);
    }

    return (
        <div>
            <h3 className={s.typeTasks}>
                <EditableSpan disabled={objectStatus === 'loading'} onChange={changeTodolistTitleHandler} value={title}/>
                <IconButton disabled={objectStatus === 'loading'} onClick={ () => removeTodoList(id) }>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm disabled={objectStatus === 'loading'} addItem={addTaskHandler}/>
            <div className={s.tasks}>
                <Tasks todoId={id} tasks={tasksForTodolist}/>
            </div>
            <div className={s.filter}>
                <Button variant={filter === 'all' ? 'outlined' : 'text'}
                        onClick={() => onChangeFilter('all')}>All</Button>
                <Button variant={filter === 'active' ? 'outlined' : 'text'}
                        color={'primary'}
                        onClick={() => onChangeFilter('active')}>Active</Button>
                <Button variant={filter === 'completed' ? 'outlined' : 'text'}
                        color={'secondary'}
                        onClick={() => onChangeFilter('completed')}>Completed</Button>
            </div>
        </div>
    )
})




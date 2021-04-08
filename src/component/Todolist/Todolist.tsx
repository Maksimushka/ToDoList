import React, {useCallback, useEffect} from 'react';
import s from './Todolist.module.css'
import {AddItemForm} from './AddItemForm';
import EditableSpan from '../EditableSpan/EditableSpan';
import {Button, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {Task} from '../Task/Task';
import {TaskStatus, TaskType} from '../../api/tasksAPI';
import {FilterValuesType} from '../../redux/reducers/todoListReducer/todolists-reducer';
import {getTasksTC} from '../../redux/reducers/tasksReducer/tasks-thunk';
import {useDispatch} from 'react-redux';

type PropsType = {
    title: string
    id: string
    tasks: TaskType[]
    removeTask: (id: string, todolistID: string) => void
    removeTodoList: (id: string) => void
    changeFilter: (value: FilterValuesType, todolistID: string) => void
    addTask: (title: string, todolistID: string) => void
    changeStatus: (taskId: string, status: TaskStatus, todolistID: string) => void
    filter: FilterValuesType
    changeTodolistTitle: (title: string, todolistID: string) => void
    changeTaskTitle: (title: string, taskId: string, todolistID: string) => void
}

export const TodoList = React.memo((props: PropsType) => {
    const {
        tasks, title, id, addTask, removeTodoList,
        changeStatus, changeFilter , changeTaskTitle,
        changeTodolistTitle, filter, removeTask
    } = props
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getTasksTC(id))
    }, [])

    const onAllClickHandler = useCallback(() => changeFilter("all", id), [changeFilter, id])
    const onActiveClickHandler = useCallback(() => changeFilter("active", id), [changeFilter, id])
    const onCompletedClickHandler = useCallback(() => changeFilter("completed", id), [changeFilter, id])
    const onRemoveTodolist = () => removeTodoList(id)
    const addTaskHandler = useCallback((title: string) => {
        addTask(title, id)
        }, [addTask, id])
    const changeTodolistTitleHandler = useCallback((title: string) => {
        changeTodolistTitle(title, id)
    }, [changeTodolistTitle, id])


    let tasksForTodolist = tasks;
    if (filter === "active") {
        tasksForTodolist = tasks.filter(t => t.status === TaskStatus.New);
    }
    if (filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.status === TaskStatus.Completed);
    }

    return (
    <div>
        <h3 className={s.typeTasks}>
            <span className={s.spanTitle}>
                <EditableSpan onChange={ changeTodolistTitleHandler } value={ title } />
            </span>
            <IconButton onClick={ onRemoveTodolist } >
                <Delete />
            </IconButton>
        </h3>
        <AddItemForm addItem={ addTaskHandler }/>
        <div className={s.tasks}>
            { tasksForTodolist.map((task: TaskType) => {
                return <Task
                    taskId={task.id}
                    title={task.title}
                    status={task.status}
                    todoId={id}
                    changeTaskTitle={changeTaskTitle}
                    changeStatus={changeStatus}
                    removeTask={removeTask}
                    key={task.id}/>
            }) }
        </div>
        <div className={s.filter}>
            <Button variant={filter === "all" ? "outlined" : "text"}
                    onClick={ onAllClickHandler }>All</Button>
            <Button variant={filter === "active" ? "outlined" : "text"}
                    color={'primary'}
                    onClick={ onActiveClickHandler }>Active</Button>
            <Button variant={filter === "completed" ? "outlined" : "text"}
                    color={'secondary'}
                    onClick={ onCompletedClickHandler }>Completed</Button>
        </div>
    </div>
    )
})




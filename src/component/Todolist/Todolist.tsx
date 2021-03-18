import React, {ChangeEvent, useCallback} from 'react';
import {FilterValuesType} from "../../App";
import s from "./Todolist.module.css"
import {AddItemForm} from "./AddItemForm";
import EditableSpan from "../EditableSpan/EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import {Task} from '../Task/Task';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type PropsType = {
    title: string
    id: string
    tasks: Array<TaskType>
    removeTask: (id: string, todolistID: string) => void
    removeTodoList: (id: string) => void
    changeFilter: (value: FilterValuesType, todolistID: string) => void
    addTask: (title: string, todolistID: string) => void
    changeStatus: (taskId: string, isDone: boolean, todolistID: string) => void
    filter: FilterValuesType
    changeTodolistTitle: (title: string, todolistID: string) => void
    changeTaskTitle: (title: string, taskId: string, todolistID: string) => void
}

export const TodoList = React.memo(({
                                        tasks, title, id, addTask, removeTodoList,
                                        changeStatus, changeFilter , changeTaskTitle,
                                        changeTodolistTitle, filter, removeTask
                                    }: PropsType) => {
    console.log('TodoList rendering')

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
        tasksForTodolist = tasks.filter(t => !t.isDone);
    }
    if (filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.isDone);
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
                    isDone={task.isDone}
                    title={task.title}
                    taskId={task.id}
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




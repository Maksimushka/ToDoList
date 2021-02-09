import React, {ChangeEvent} from 'react';
import {FilterValuesType} from "../../App";
import s from "./Todolist.module.css"
import {AddItemForm} from "./AddItemForm";

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
}

export function TodoList(props: PropsType) {

    const onAllClickHandler = () => { props.changeFilter("all", props.id) }
    const onActiveClickHandler = () => { props.changeFilter("active", props.id) }
    const onCompletedClickHandler = () => { props.changeFilter("completed", props.id) }
    const onRemoveTodolist = () => { props.removeTodoList(props.id) }

    return (
    <div className={s.todolist}>
        <h3 className={s.typeTasks}>
            {props.title}
            <button onClick={ onRemoveTodolist } className={s.todolistDelete}>x</button>
        </h3>
        <AddItemForm addTask={ props.addTask } id={ props.id } />
        <div className={s.tasks}>
            { props.tasks.map((task: TaskType) => {
                    const onRemoveHandler = () => { props.removeTask(task.id, props.id) }
                    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeStatus(task.id, e.currentTarget.checked, props.id)
                    }
                    return (
                        <div key={task.id} className={ task.isDone ? s.taskDone : s.task}>
                            <input className={s.checkbox}
                                   type="checkbox"
                                   onChange={ onChangeStatusHandler }
                                   checked={ task.isDone }/>
                            <span className={s.title}>{task.title}</span>
                            <button className={s.taskButton} onClick={ onRemoveHandler }>x</button>
                        </div>
                    )
                }) }
        </div>
        <div className={s.filter}>
            <button className={props.filter === "all" ? s.activeFilter : s.filterElement} onClick={ onAllClickHandler }>All</button>
            <button className={props.filter === "active" ? s.activeFilter : s.filterElement} onClick={ onActiveClickHandler }>Active</button>
            <button className={props.filter === "completed" ? s.activeFilter : s.filterElement} onClick={ onCompletedClickHandler }>Completed</button>
        </div>
    </div>
    )
}


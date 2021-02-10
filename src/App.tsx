import React, {useState} from 'react';
import s from './App.module.css';

import {v1} from 'uuid';
import {TaskType, TodoList} from "./component/Todolist/Todolist";
import {AddItemForm} from "./component/Todolist/AddItemForm";

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TaskStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    const todolistID1 = v1()
    const todolistID2 = v1()

    const [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: "What to learn", filter: "all"},
        {id: todolistID2, title: "What to buy", filter: "all"},
    ])

    const [tasks, setTasks] = useState<TaskStateType>({
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "Bread", isDone: false},
            {id: v1(), title: "Milk", isDone: false},
            {id: v1(), title: "Meat", isDone: false},
            {id: v1(), title: "Vodka", isDone: true},
        ],
    });

    function removeTask(id: string, todolistID: string) {
        let filteredTasks = tasks[todolistID].filter(t => t.id !== id);
        if (filteredTasks) {
            tasks[todolistID] = filteredTasks
            setTasks({...tasks})
        }
    }
    function addTask(title: string, todolistID: string) {
        let task = {id: v1(), title: title, isDone: false};
        tasks[todolistID] = [task, ...tasks[todolistID]]
        setTasks({...tasks});
    }
    function changeStatus(taskId: string, isDone: boolean, todolistID: string) {
        let task = tasks[todolistID].find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone;
            setTasks({...tasks});
        }
    }
    function changeTodolistTitle(title: string, todolistID: string) {
        let todolist = todolists.find( tl => tl.id === todolistID )
        if (todolist) {
            todolist.title = title
            setTodolists(todolists)
        }
    }
    function changeTaskTitle(title: string, taskId: string, todolistID: string) {
        let task = tasks[todolistID].find( t => t.id === taskId )
        if (task) {
            task.title = title
            setTasks({...tasks})
        }
    }
    function changeFilter(value: FilterValuesType, todolistID: string) {
        let todolist = todolists.find( tl => tl.id === todolistID )
        if (todolist) {
            todolist.filter = value
            setTodolists([...todolists])
        }
    }
    function removeTodoList(id: string){
        const removedTodolist = todolists.filter( tl => tl.id !== id)
        if (removedTodolist) {
            setTodolists(removedTodolist)
            delete tasks[id]
            setTasks({...tasks})
        }
    }
    function addTodolist(title: string) {
        let newTodolistID = v1()
        let newTodolist: TodolistsType = { id: newTodolistID, title: title, filter: "all"}
        setTodolists([newTodolist,...todolists])
        setTasks({
            ...tasks,
            [newTodolistID]: []
        })
    }


    return (
        <div>
            <AddItemForm addItem={addTodolist} />
            <div className={s.App}>
                {
                    todolists.map(tl => {

                        let allTodolistTasks = tasks[tl.id]
                        if (tl.filter === "active") { allTodolistTasks = allTodolistTasks.filter(t => !t.isDone); }
                        if (tl.filter === "completed") { allTodolistTasks = allTodolistTasks.filter(t => t.isDone); }

                        return (
                            <TodoList
                                key={ tl.id }
                                id={ tl.id }
                                title={ tl.title }
                                tasks={ allTodolistTasks }
                                removeTask={ removeTask }
                                removeTodoList={ removeTodoList }
                                changeFilter={ changeFilter }
                                addTask={ addTask }
                                changeStatus={ changeStatus }
                                changeTaskTitle={ changeTaskTitle }
                                changeTodolistTitle={ changeTodolistTitle }
                                filter={ tl.filter }/>
                        )
                    })
                }
            </div>
        </div>

    );
}

export default App;

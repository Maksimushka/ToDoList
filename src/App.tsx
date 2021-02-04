import React, {useState} from 'react';
import './App.css';
import {v1} from 'uuid';
import {TodoList} from "./component/Todolist/Todolist";

export type FilterValuesType = "all" | "active" | "completed";
type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {

    const todolistID1 = v1()
    const todolistID2 = v1()

    const [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: "What to learn", filter: "all"},
        {id: todolistID2, title: "What to buy", filter: "all"},
    ])

    const [tasks, setTasks] = useState({
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "bread", isDone: false},
            {id: v1(), title: "milk", isDone: true},
            {id: v1(), title: "meat", isDone: false},
            {id: v1(), title: "eggs", isDone: true},
            {id: v1(), title: "tea", isDone: true},
        ]
    });

    function removeTask(id: string, todolistID: string) {
        let filteredTasks = tasks[todolistID].filter(t => t.id !== id);
        tasks[todolistID] = filteredTasks
        setTasks({...tasks})
    }
    function addTask(title: string, todolistID: string) {
        let task = {id: v1(), title: title, isDone: false};
        tasks[todolistID] = [task, ...tasks[todolistID]];
        setTasks({...tasks});
    }
    function changeStatus(taskId: string, isDone: boolean, todolistID: string) {
        let task = tasks[todolistID].find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone;
            setTasks({...tasks})
        }
    }
    function changeFilter(value: FilterValuesType, todolistID: string) {
        const todolist = todolists.find( tl => tl.id === todolistID )
        if (todolist) {
            todolist.filter = value
            setTodolists( [...todolists] )
        }
    }
    function removeTodoList(todolistID: string) {
        let filteredTD = todolists.filter( tl => tl.id !== todolistID )
        if (filteredTD) {
            setTodolists(filteredTD)
            delete tasks[todolistID]
            setTasks({...tasks})
        }
    }

    return (
        <div className="App">
            {
                todolists.map( tl => {

                    let tasksForTodolist = tasks[tl.id];
                    if (tl.filter === "active") {
                        tasksForTodolist = tasks[tl.id].filter(t => !t.isDone);
                    }
                    if (tl.filter === "completed") {
                        tasksForTodolist = tasks[tl.id].filter(t => t.isDone);
                    }

                    return (
                        <TodoList key={ tl.id }
                                  id={ tl.id }
                                  title={ tl.title }
                                  tasks={ tasksForTodolist }
                                  removeTodoList={ removeTodoList }
                                  removeTask={ removeTask }
                                  changeFilter={ changeFilter }
                                  addTask={ addTask }
                                  changeStatus={ changeStatus }
                                  filter={ tl.filter }
                        />
                    )
                } )
            }

        </div>
    );
}

export default App;

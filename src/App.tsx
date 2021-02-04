import React, {useState} from 'react';
import './App.css';
import {v1} from 'uuid';
import {TaskType, TodoList} from './component/Todolist/Todolist';

export type FilterValuesType = "all" | "active" | "completed";
export type TodoListsType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    const todoListID1 = v1()
    const todoListID2 = v1()

    const [todoLists, setTodoLists] = useState<Array<TodoListsType>>([
        { id: todoListID1, title: "What to learn", filter: "all"},
        { id: todoListID2, title: "What to buy", filter: "all"},
    ])

    const [tasks, setTasks] = useState<TasksStateType>({
        [todoListID1] : [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todoListID2] : [
            {id: v1(), title: "Eggs", isDone: false},
            {id: v1(), title: "Eggs", isDone: false},
            {id: v1(), title: "Meat", isDone: false},
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Bread", isDone: true},
        ],
    });

    function removeTask(id: string, todoListID: string) {
        tasks[todoListID] = tasks[todoListID].filter(t => t.id !== id);
        setTasks({...tasks});
    }
    function addTask(title: string, todoListID: string) {
        let newTask = {id: v1(), title: title, isDone: false};
        tasks[todoListID] = [newTask, ...tasks[todoListID]]
        setTasks({ ...tasks });
    }
    function changeFilter(value: FilterValuesType, todoListID: string) {
        const todolist = todoLists.find( tl => tl.id === todoListID )
        if (todolist) {
            todolist.filter = value
            setTodoLists( [...todoLists] )
        }
    }
    function changeStatus(taskId: string, isDone: boolean, todoListID: string) {
        let task = tasks[todoListID].find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone;
            setTasks({...tasks});
        }
    }
    function removeTodolist(id: string) {
        setTodoLists( todoLists.filter( tl => tl.id !== id ) )
        delete tasks[id]
        setTasks({ ...tasks })
    }

    return (
        <div className="App">
            {
                todoLists.map( tl => {
                    let tasksForTodolist = tasks[tl.id];
                    if (tl.filter === "active") { tasksForTodolist = tasks[tl.id].filter(t => !t.isDone); }
                    if (tl.filter === "completed") { tasksForTodolist = tasks[tl.id].filter(t => t.isDone); }

                    return (
                        <TodoList
                            key={ tl.id }
                            id={ tl.id }
                            title={ tl.title }
                            tasks={ tasksForTodolist }
                            removeTask={ removeTask }
                            removeTodolist={ removeTodolist }
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

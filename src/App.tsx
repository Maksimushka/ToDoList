import React from 'react';
import {TaskType, TodoList} from './component/Todolist/Todolist';
import {AddItemForm} from './component/Todolist/AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC
} from './state/todolists-reducer';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from './state/tasks-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {RootStoreType} from './redux/store';

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    const dispatch = useDispatch()
    const tasks = useSelector<RootStoreType, TasksStateType>((state) => state.tasks)
    const todoLists = useSelector<RootStoreType, TodolistType[]>((state) => state.todoLists)

    function removeTask(id: string, todolistId: string) {
        dispatch(removeTaskAC(id, todolistId))
    }
    function addTask(title: string, todolistId: string) {
        dispatch(addTaskAC(title, todolistId))
    }
    function changeStatus(id: string, isDone: boolean, todolistId: string) {
        dispatch(changeTaskStatusAC(id, isDone, todolistId))
    }
    function changeTaskTitle(newTitle: string, id: string, todolistId: string) {
        dispatch(changeTaskTitleAC(newTitle, id, todolistId))
    }

    function removeTodolist(id: string) {
        dispatch(removeTodolistAC(id))
    }
    function changeFilter(value: FilterValuesType, todolistId: string) {
        dispatch(changeTodolistFilterAC(todolistId,value))
    }
    function changeTodolistTitle(title: string, id: string) {
        dispatch(changeTodolistTitleAC(id, title))
    }
    function addTodolist(title: string) {
        dispatch(addTodolistAC(title))
    }

    return (
        <div>
            <AppBar position={"static"}>
                <Toolbar>
                    <IconButton>
                        <Menu/>
                    </IconButton>
                    <Typography>
                        News
                    </Typography>
                    <Button color={"inherit"}>Login</Button>
                </Toolbar>
            </AppBar>

            <Container fixed>
                <Grid container style={{padding: "30px"}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container>
                    {
                        todoLists.map(tl => {
                            let allTodolistTasks = tasks[tl.id];
                            let tasksForTodolist = allTodolistTasks;

                            if (tl.filter === "active") {
                                tasksForTodolist = allTodolistTasks.filter(t => !t.isDone);
                            }
                            if (tl.filter === "completed") {
                                tasksForTodolist = allTodolistTasks.filter(t => t.isDone);
                            }

                            return <Grid style={{marginRight: "35px", marginBottom:'35px'}} item>
                                <Paper style={{padding: "10px"}}>
                            <TodoList
                                key={tl.id}
                                id={tl.id}
                                title={tl.title}
                                tasks={tasksForTodolist}
                                removeTask={removeTask}
                                changeFilter={changeFilter}
                                addTask={addTask}
                                changeStatus={changeStatus}
                                filter={tl.filter}
                                removeTodoList={removeTodolist}
                                changeTaskTitle={changeTaskTitle}
                                changeTodolistTitle={changeTodolistTitle}
                            />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>

        </div>
    );
}

export default App;

import React, {useCallback} from 'react';
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



// const removeTask = (id: string, todolistId: string) => {
//     dispatch(removeTaskAC(id, todolistId))
// }
// const addTask = (title: string, todolistId: string) => {
//     dispatch(addTaskAC(title, todolistId))
// }
// const changeStatus = (id: string, isDone: boolean, todolistId: string) => {
//     dispatch(changeTaskStatusAC(id, isDone, todolistId))
// }
// const changeTaskTitle = (newTitle: string, id: string, todolistId: string) => {
//     dispatch(changeTaskTitleAC(newTitle, id, todolistId))
// }
//
// const removeTodolist = (id: string) => {
//     dispatch(removeTodolistAC(id))
// }
// const changeFilter = (value: FilterValuesType, todolistId: string) => {
//     dispatch(changeTodolistFilterAC(todolistId,value))
// }
// const changeTodolistTitle = (title: string, id: string) => {
//     dispatch(changeTodolistTitleAC(id, title))
// }
// const addTodolist = (title: string) => {
//     dispatch(addTodolistAC(title))
// }

function App() {
    const dispatch = useDispatch()
    const tasks = useSelector<RootStoreType, TasksStateType>((state) => state.tasks)
    const todoLists = useSelector<RootStoreType, TodolistType[]>((state) => state.todoLists)

    const removeTask = useCallback((id: string, todolistId: string) => {
        dispatch(removeTaskAC(id, todolistId))
    }, [dispatch])
    const addTask = useCallback((title: string, todolistId: string) => {
        dispatch(addTaskAC(title, todolistId))
    }, [dispatch])
    const changeStatus = useCallback((id: string, isDone: boolean, todolistId: string) => {
        dispatch(changeTaskStatusAC(id, isDone, todolistId))
    }, [dispatch])
    const changeTaskTitle = useCallback((newTitle: string, id: string, todolistId: string) => {
        dispatch(changeTaskTitleAC(newTitle, id, todolistId))
    }, [dispatch])

    const removeTodolist = useCallback((id: string) => {
        dispatch(removeTodolistAC(id))
    }, [dispatch])
    const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => {
        dispatch(changeTodolistFilterAC(todolistId, value))
    }, [dispatch])
    const changeTodolistTitle = useCallback((title: string, id: string) => {
        dispatch(changeTodolistTitleAC(id, title))
    }, [dispatch])
    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistAC(title))
    }, [dispatch])

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
                            let tasksForTodolist = tasks[tl.id];

                            return <Grid style={{marginRight: "35px", marginBottom:'35px'}} item>
                                <Paper style={{padding: "10px"}}>
                            <TodoList
                                key={tl.id}
                                id={tl.id}
                                title={tl.title}
                                tasks={tasksForTodolist}
                                filter={tl.filter}
                                removeTask={removeTask}
                                changeFilter={changeFilter}
                                addTask={addTask}
                                changeStatus={changeStatus}
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

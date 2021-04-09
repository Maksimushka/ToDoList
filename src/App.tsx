import React, {useCallback, useEffect} from 'react';
import {TodoList} from './component/Todolist/Todolist';
import {AddItemForm} from './component/Todolist/AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {useDispatch, useSelector} from 'react-redux';
import {RootStoreType} from './redux/store';
import {changeTodolistFilterAC,} from './redux/reducers/todoListReducer/todolist-actions';
import {FilterValuesType, TodoListBllType} from './redux/reducers/todoListReducer/todolists-reducer';
import {TasksStateType} from './redux/reducers/tasksReducer/tasks-reducer';
import {TaskStatus} from './api/tasksAPI';
import {
    addTodoListTC,
    deleteTodoListTC,
    getTodoListsTC,
    updateTodoListTC
} from './redux/reducers/todoListReducer/todolist-thunk';
import {
    addTaskTC,
    deleteTaskTC,
    updateTaskStatusTC,
    updateTaskTitleTC
} from './redux/reducers/tasksReducer/tasks-thunk';

function App() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getTodoListsTC())
    }, [dispatch])

    const tasks = useSelector<RootStoreType, TasksStateType>((state) => state.tasks)
    const todoLists = useSelector<RootStoreType, TodoListBllType[]>((state) => state.todoLists)

    const removeTask = useCallback((id: string, todolistId: string) => {
        dispatch(deleteTaskTC(todolistId, id))
    }, [dispatch])
    const addTask = useCallback((title: string, todolistId: string) => {
        dispatch(addTaskTC(todolistId, title))
    }, [dispatch])
    const changeStatus = useCallback((id: string, status: TaskStatus, todolistId: string) => {
        dispatch(updateTaskStatusTC(todolistId, id, status))
    }, [dispatch])
    const changeTaskTitle = useCallback((title: string, id: string, todolistId: string) => {
        dispatch(updateTaskTitleTC(todolistId, id, title))
    }, [dispatch])

    const removeTodolist = useCallback((id: string) => {
        dispatch(deleteTodoListTC(id))
    }, [dispatch])
    const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => {
        dispatch(changeTodolistFilterAC(todolistId, value))
    }, [dispatch])
    const changeTodolistTitle = useCallback((title: string, id: string) => {
        dispatch(updateTodoListTC(id, title))
    }, [dispatch])
    const addTodolist = useCallback((title: string) => {
        dispatch(addTodoListTC(title))
    }, [dispatch])

    return (
        <div>
            <AppBar position={'static'}>
                <Toolbar>
                    <IconButton>
                        <Menu/>
                    </IconButton>
                    <Typography>
                        News
                    </Typography>
                    <Button color={'inherit'}>Login</Button>
                </Toolbar>
            </AppBar>

            <Container fixed>
                <Grid container style={{padding: '30px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container>
                    {
                        todoLists.map(tl => {
                            let tasksForTodolist = tasks[tl.id];

                            return <Grid key={`grid/${tl.id}`} style={{marginRight: '35px', marginBottom: '35px'}} item>
                                <Paper key={`paper/${tl.id}`} style={{padding: '10px'}}>
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

import React, {useCallback, useEffect} from 'react';
import {TodoList} from './component/Todolist/Todolist';
import {AddItemForm} from './component/AddItemForm/AddItemForm';
import {
    AppBar,
    Button,
    Container,
    Grid,
    IconButton,
    LinearProgress,
    Paper,
    Toolbar,
    Typography
} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {useDispatch, useSelector} from 'react-redux';
import {RootStoreType} from './redux/store';
import {TodoListBllType} from './redux/reducers/todoListReducer/todolists-reducer';
import {TasksStateType} from './redux/reducers/tasksReducer/tasks-reducer';
import {addTodoListTC, getTodoListsTC,} from './redux/reducers/todoListReducer/todolist-thunk';
import {AppReducerStateType} from './redux/reducers/app-reducer';
import ErrorSnackbar from './component/ErrorSnackbar/ErrorSnackBar';

function App() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getTodoListsTC())
    }, [dispatch])

    const tasks = useSelector<RootStoreType, TasksStateType>((state) => state.tasks)
    const todoLists = useSelector<RootStoreType, TodoListBllType[]>((state) => state.todoLists)
    const {status} = useSelector<RootStoreType, AppReducerStateType>(state => state.app)

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodoListTC(title))
    }, [dispatch])

    return (
        <div>
            <ErrorSnackbar />
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
            {status === 'loading' && <LinearProgress />}

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
                                        objectStatus={tl.objectStatus}
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={tasksForTodolist}
                                        filter={tl.filter}
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

import React, {useCallback, useEffect} from 'react';
import {Grid, Paper} from '@material-ui/core';
import {AddItemForm} from '../AddItemForm/AddItemForm';
import {TodoList} from '../Todolist/Todolist';
import {useDispatch, useSelector} from 'react-redux';
import {addTodoListTC, getTodoListsTC} from '../../redux/reducers/todoListReducer/todolist-thunk';
import {RootStoreType} from '../../redux/store';
import {Redirect} from 'react-router-dom';

type TodoListsListPropsType = {
    demo: boolean
}

const TodoListsList = ({demo}: TodoListsListPropsType) => {
    const dispatch = useDispatch()
    const todoLists = useSelector((state: RootStoreType) => state.todoLists)
    const tasks = useSelector((state: RootStoreType) => state.tasks )
    const {isLogged} = useSelector((state: RootStoreType) => state.auth )

    useEffect(() => {
        if (demo || !isLogged) {
            return
        }
        dispatch(getTodoListsTC())
    }, [dispatch, demo, isLogged])

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodoListTC(title))
    }, [dispatch])

    if (!isLogged) {
        return <Redirect to={'login'} />
    }

    return (
        <>
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
        </>
    );
};

export default TodoListsList;
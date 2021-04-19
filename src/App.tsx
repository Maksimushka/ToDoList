import React, {useEffect} from 'react';
import {
    AppBar, Button, CircularProgress, Container, IconButton,
    LinearProgress, Toolbar, Typography
} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {useDispatch, useSelector} from 'react-redux';
import {RootStoreType} from './redux/store';
import {AppReducerStateType} from './redux/reducers/appReducer/app-reducer';
import ErrorSnackbar from './component/ErrorSnackbar/ErrorSnackBar';
import TodoListsList from './component/TodoListsList/TodoListsList';
import { Route, Switch, Redirect} from 'react-router-dom';
import Login from './component/Login/Login';
import {initializeAppTC} from './redux/reducers/appReducer/app-actions';
import {setLogOutTC} from './redux/reducers/authReducer/auth-actions';
import {authReducerStateType} from './redux/reducers/authReducer/auth-reducer';

function App() {
    const {status, isInitialized} = useSelector<RootStoreType, AppReducerStateType>(state => state.app)
    const {isLogged} = useSelector<RootStoreType, authReducerStateType>(state => state.auth)
    const dispatch = useDispatch()
    const demo = false
    useEffect(() => {
        dispatch(initializeAppTC())
    }, [dispatch])

    const onLogOut = () => {
        dispatch(setLogOutTC())
    }

    if (!isInitialized) {
        return <div style={{position: 'fixed', top: '30%', width: '100%', textAlign: 'center'}}>
                <CircularProgress />
            </div>
    }

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
                    {isLogged && <Button onClick={onLogOut} color={'inherit'}>Log out</Button>}
                </Toolbar>
                {status === 'loading' && <LinearProgress />}
            </AppBar>
            <Container fixed>
                <Switch>
                    <Route exact path={'/'} render={() => <TodoListsList demo={demo} /> }/>
                    <Route path={'/login'} render={() => <Login /> }/>
                    <Route path={ '/404' } render={ () => <h1>404: PAGE NOT FOUND</h1> }/>
                    <Redirect from={'*'} to={'/404'}/>
                </Switch>
            </Container>
        </div>
    );
}

export default App;

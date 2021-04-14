import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import {useDispatch, useSelector} from 'react-redux';
import {RootStoreType} from '../../redux/store';
import {AppReducerStateType} from '../../redux/reducers/app-reducer';
import {setErrorAC} from '../../redux/reducers/app-actions';

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const ErrorSnackbar = () => {
    const {error} = useSelector<RootStoreType, AppReducerStateType>(state => state.app)
    const dispatch = useDispatch()

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(setErrorAC(null))
    };

    return (
            <Snackbar open={error !== null} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    {error}
                </Alert>
            </Snackbar>
    );
}

export default ErrorSnackbar

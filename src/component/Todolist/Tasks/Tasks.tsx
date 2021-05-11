import React, {useCallback} from 'react';
import {Task} from '../Task/Task';
import {TaskStatus} from '../../../api/tasksAPI';
import {useDispatch} from 'react-redux';
import {ObjectStatusType} from '../../../redux/reducers/tasksReducer/tasks-reducer';
import {fetchRemoveTask, fetchUpdateTask} from '../../../redux/reducers/tasksReducer/tasks-actions';

type TasksPropsType = {
    tasks: ObjectStatusType[]
    todoId: string
}

const Tasks: React.FC<TasksPropsType> = React.memo((props) => {

    const dispatch = useDispatch()

    const removeTask = useCallback((id: string, todolistId: string) => {
        dispatch(fetchRemoveTask(todolistId, id))
    }, [dispatch])
    const changeStatus = useCallback((id: string, status: TaskStatus, todolistId: string) => {
        dispatch(fetchUpdateTask(todolistId, id, {status}))
    }, [dispatch])
    const changeTaskTitle = useCallback((title: string, id: string, todolistId: string) => {
        dispatch(fetchUpdateTask(todolistId, id, {title}))
    }, [dispatch])

    return (
        <>
            {
                props.tasks.map(el => {
                    return <Task
                        taskObjectStatus={el.objectStatus}
                        taskId={el.id}
                        title={el.title}
                        status={el.status}
                        todoId={props.todoId}
                        changeTaskTitle={changeTaskTitle}
                        changeStatus={changeStatus}
                        removeTask={removeTask}
                        key={el.id}/>
                })
            }
        </>
    );
})

export default Tasks;
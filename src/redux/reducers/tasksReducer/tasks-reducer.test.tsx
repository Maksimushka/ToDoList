import {v1} from 'uuid';
import {tasksReducer, TasksStateType} from './tasks-reducer';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, setTasksAC} from './tasks-actions';
import {TaskPriority, TaskStatus} from '../../../api/tasksAPI';
import {addTodolistAC, removeTodolistAC} from '../todoListReducer/todolist-actions';

let todolistId1: string
let todolistId2: string
let tasks: TasksStateType

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();
    tasks = {
        [todolistId1]: [
            {
                id: v1(),
                title: 'HTML&CSS',
                status: TaskStatus.New,
                addedDate: '',
                order: 0,
                deadline: '',
                priority: TaskPriority.Low,
                description: '',
                startDate: '',
                todoListId: todolistId1
            },
            {
                id: v1(),
                title: 'JS',
                status: TaskStatus.New,
                addedDate: '',
                order: 0,
                deadline: '',
                priority: TaskPriority.Low,
                description: '',
                startDate: '',
                todoListId: todolistId1
            },
        ],
        [todolistId2]: [
            {
                id: v1(),
                title: 'Milk',
                status: TaskStatus.Completed,
                addedDate: '',
                order: 0,
                deadline: '',
                priority: TaskPriority.Low,
                description: '',
                startDate: '',
                todoListId: todolistId1
            },
            {
                id: v1(),
                title: 'React Book',
                status: TaskStatus.Completed,
                addedDate: '',
                order: 0,
                deadline: '',
                priority: TaskPriority.Low,
                description: '',
                startDate: '',
                todoListId: todolistId1
            },
        ]
    }
})

test('task reducer should add task', () => {
    // Data
    let newTask = {
        id: v1(),
        title: 'React StoryBook',
        status: TaskStatus.New,
        addedDate: '',
        order: 0,
        deadline: '',
        priority: TaskPriority.Hi,
        description: '',
        startDate: '',
        todoListId: todolistId1
    }
    // Action
    const endState = tasksReducer(tasks, addTaskAC(newTask))
    // Result
    expect(endState[todolistId1].length).toBe(3)
})

test('task reducer should remove task', () => {
    // Data
    // Action
    const endState = tasksReducer(tasks, removeTaskAC(todolistId1, tasks[todolistId1][0].id))
    // Result
    expect(endState[todolistId1].length).toBe(1)
})

test('task reducer should change task title', () => {
    // Data
    let newTitle = 'Java'
    // Action
    const endState = tasksReducer(tasks, changeTaskTitleAC(todolistId1, tasks[todolistId1][0].id, newTitle))
    // Result
    expect(endState[todolistId1][0].title).toBe(newTitle)
    expect(endState[todolistId1][1].title !== newTitle).toBe(true)
})

test('task reducer should change task status', () => {
    // Data
    let newStatus = TaskStatus.Completed
    // Action
    let action = changeTaskStatusAC(todolistId1, tasks[todolistId1][0].id, newStatus)
    const endState = tasksReducer(tasks, action)
    // Result
    expect(endState[todolistId1][0].status).toBe(newStatus)
    expect(endState[todolistId1][1].status !== newStatus).toBe(true)
})

test('new property with new array should be added when new todolist is added', () => {
    const action = addTodolistAC('new todolist')
    const endState = tasksReducer(tasks, action)

    const keys = Object.keys(endState)
    const newKey = keys.find(k => k !== todolistId1 && k !== todolistId2)

    expect(keys.length).toBe(3)
    expect(endState[newKey!]).toStrictEqual([])
})

test('property with todolistId should be deleted', () => {
    const action = removeTodolistAC(todolistId2);

    const endState = tasksReducer(tasks, action)

    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState[todolistId2]).not.toBeDefined();
});

test('task reducer should set tasks', () => {
    // data
    let todoId = todolistId2
    let newTasks = [
        {
            id: v1(),
            title: 'Bread',
            status: TaskStatus.Completed,
            addedDate: '',
            order: 0,
            deadline: '',
            priority: TaskPriority.Low,
            description: '',
            startDate: '',
            todoListId: todolistId1
        },
        {
            id: v1(),
            title: 'NEW TASK',
            status: TaskStatus.Completed,
            addedDate: '',
            order: 0,
            deadline: '',
            priority: TaskPriority.Low,
            description: '',
            startDate: '',
            todoListId: todolistId1
        },
        {
            id: v1(),
            title: 'JAVA',
            status: TaskStatus.Completed,
            addedDate: '',
            order: 0,
            deadline: '',
            priority: TaskPriority.Low,
            description: '',
            startDate: '',
            todoListId: todolistId1
        },
    ]
    // actions
    const endState = tasksReducer(tasks, setTasksAC(todoId, newTasks))

    // end
    expect(endState[todoId].length).toBe(3)
    expect(endState[todoId][0].title).toBe('Bread')
});

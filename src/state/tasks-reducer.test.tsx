import {v1} from 'uuid';
import {AddTaskAC, ChangeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC, tasksReducer} from './tasks-reducer';
import {TasksStateType, TodolistType} from '../App';

test('user reducer should add task', () => {
    // Data
    let todolistId1 = v1();
    let todolistId2 = v1();
    let todolists: TodolistType[] = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]
    let tasks: TasksStateType = {
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "Vue", isDone: true},
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: true}
        ]
    }
    let newTitle = 'Javascript for children'
    // Action
    const endState = tasksReducer(tasks, {type: 'ADD_TASK', todoID: todolistId1, title: newTitle})
    // Result
    expect(endState[todolistId1].length).toBe(5)
})

test('user reducer should remove task', () => {
    // Data
    let todolistId1 = v1();
    let todolistId2 = v1();
    let todolists: TodolistType[] = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]
    let tasks: TasksStateType = {
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "Vue", isDone: true},
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: true}
        ]
    }
    // Action
    const endState = tasksReducer(tasks, RemoveTaskAC(tasks[todolistId1][0].id, todolistId1))
    // Result
    expect(endState[todolistId1].length).toBe(3)
})

test('user reducer should change task title', () => {
    // Data
    let todolistId1 = v1();
    let todolistId2 = v1();
    let todolists: TodolistType[] = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]
    let tasks: TasksStateType = {
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "Vue", isDone: true},
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: true}
        ]
    }
    let newTitle = "Java"
    // Action
    const endState = tasksReducer(tasks, ChangeTaskTitleAC(tasks[todolistId1][0].id, newTitle, todolistId1))
    // Result
    expect(endState[todolistId1][0].title).toBe(newTitle)
    expect(endState[todolistId1][1].title !== newTitle).toBe(true)
})

test('user reducer should change task status', () => {
    // Data
    let todolistId1 = v1();
    let todolistId2 = v1();
    let todolists: TodolistType[] = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]
    let tasks: TasksStateType = {
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "Vue", isDone: true},
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: true}
        ]
    }
    let newStatus = false
    // Action
    const endState = tasksReducer(tasks, ChangeTaskStatusAC(tasks[todolistId1][0].id, newStatus, todolistId1))
    // Result
    expect(endState[todolistId1][0].isDone).toBe(newStatus)
    expect(endState[todolistId1][1].isDone !== newStatus).toBe(true)
})
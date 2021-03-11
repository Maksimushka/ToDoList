import {v1} from 'uuid';
import {
    addTaskAC, changeTaskStatusAC, changeTaskTitleAC,
    removeTaskAC,
    tasksReducer
} from './tasks-reducer';
import {TasksStateType} from '../App';
import {addTodolistAC, removeTodolistAC} from './todolists-reducer';

let todolistId1: string
let todolistId2: string
let tasks: TasksStateType

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();
    tasks = {
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
})

test('user reducer should add task', () => {
    // Data
    let newTitle = 'Javascript for children'
    // Action
    const endState = tasksReducer(tasks, addTaskAC(newTitle, todolistId1))
    // Result
    expect(endState[todolistId1].length).toBe(5)
})

test('user reducer should remove task', () => {
    // Data
    // Action
    const endState = tasksReducer(tasks, removeTaskAC(tasks[todolistId1][0].id, todolistId1))
    // Result
    expect(endState[todolistId1].length).toBe(3)
})

test('user reducer should change task title', () => {
    // Data
    let newTitle = "Java"
    // Action
    const endState = tasksReducer(tasks, changeTaskTitleAC(tasks[todolistId1][0].id, newTitle, todolistId1))
    // Result
    expect(endState[todolistId1][0].title).toBe(newTitle)
    expect(endState[todolistId1][1].title !== newTitle).toBe(true)
})

test('user reducer should change task status', () => {
    // Data
    let newStatus = false
    // Action
    let action = changeTaskStatusAC(tasks[todolistId1][0].id, newStatus, todolistId1)
    const endState = tasksReducer(tasks, action)
    // Result
    expect(endState[todolistId1][0].isDone).toBe(newStatus)
    expect(endState[todolistId1][1].isDone !== newStatus).toBe(true)
})

test('new property with new array should be added when new todolist is added', () => {
    const action = addTodolistAC('new todolist')
    const endState = tasksReducer(tasks, action)

    const keys = Object.keys(endState)
    const newKey = keys.find( k => k !== todolistId1 && k !== todolistId2)

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

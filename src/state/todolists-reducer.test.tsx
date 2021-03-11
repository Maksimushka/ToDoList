import {v1} from 'uuid';
import {FilterValuesType, TodolistType} from '../App';
import {
    addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from './todolists-reducer';

let todolistId1: string
let todolistId2: string
let todolists: Array<TodolistType>

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();
    todolists = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]
})

test('user reducer should remove todolist', () => {
    // Data
    // Action
    const endState = todolistsReducer(todolists, removeTodolistAC(todolistId1))
    // Result
    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})

test('user reducer should add todolist', () => {
    // Data
    let newTitle = 'What to read'
    // Action
    const endState = todolistsReducer(todolists, addTodolistAC(newTitle))
    // Result
    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(newTitle)
})

test('user reducer should change todolist title', () => {
    // Data
    let newTitle = 'What to read'
    // Action
    const endState = todolistsReducer(todolists, changeTodolistTitleAC(todolistId1,newTitle))
    // Result
    expect(endState[0].title).toBe(newTitle)
    expect(endState[1].title).toBe('What to buy')
})

test('user reducer should change todolist filter', () => {
    // Data
    let newFilter: FilterValuesType = 'active'
    // Action
    const endState = todolistsReducer(todolists, changeTodolistFilterAC(todolistId1, newFilter))
    // Result
    expect(endState[0].filter).toBe(newFilter)
    expect(endState[1].filter).toBe('all')
})
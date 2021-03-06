import {v1} from 'uuid';
import {FilterValuesType, TodolistType} from '../App';
import {
    addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from './todolists-reducer';

test('user reducer should remove todolist', () => {
    // Data
    let todolistId1 = v1();
    let todolistId2 = v1();
    let todolists: Array<TodolistType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]
    // Action
    const endState = todolistsReducer(todolists, removeTodolistAC(todolistId1))
    // Result
    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})

test('user reducer should add todolist', () => {
    // Data
    let todolistId1 = v1();
    let todolistId2 = v1();
    let todolists: Array<TodolistType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]
    let newTitle = 'What to read'
    // Action
    const endState = todolistsReducer(todolists, addTodolistAC(newTitle))
    // Result
    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(newTitle)
})

test('user reducer should change todolist title', () => {
    // Data
    let todolistId1 = v1();
    let todolistId2 = v1();
    let todolists: Array<TodolistType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]
    let newTitle = 'What to read'
    // Action
    const endState = todolistsReducer(todolists, changeTodolistTitleAC(todolistId1,newTitle))
    // Result
    expect(endState[0].title).toBe(newTitle)
    expect(endState[1].title).toBe('What to buy')
})

test('user reducer should change todolist filter', () => {
    // Data
    let todolistId1 = v1();
    let todolistId2 = v1();
    let todolists: Array<TodolistType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]
    let newFilter: FilterValuesType = 'active'
    // Action
    const endState = todolistsReducer(todolists, changeTodolistFilterAC(todolistId1, newFilter))
    // Result
    expect(endState[0].filter).toBe(newFilter)
    expect(endState[1].filter).toBe('all')
})
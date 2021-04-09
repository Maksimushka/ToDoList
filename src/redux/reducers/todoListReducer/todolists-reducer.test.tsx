import {v1} from 'uuid';
import {
    FilterValuesType, TodoListBllType,
    todoListsReducer
} from './todolists-reducer';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC, setTodoListsAC,
} from './todolist-actions';

let todolistId1: string
let todolistId2: string
let todolists: TodoListBllType[]

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();
    todolists = [
        {id: todolistId1, title: 'What to learn', filter: 'all', order: 0, addedDate: ''},
        {id: todolistId2, title: 'What to buy', filter: 'all', order: 1, addedDate: ''}
    ]
})

test('todoList reducer should remove todolist', () => {
    // Data
    // Action
    const endState = todoListsReducer(todolists, removeTodolistAC(todolistId1))
    // Result
    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})

test('todoList reducer should add todolist', () => {
    // Data
    let newTitle = 'What to read'
    // Action
    const endState = todoListsReducer(todolists, addTodolistAC(newTitle))
    // Result
    expect(endState.length).toBe(3)
})

test('todoList reducer should change todolist title', () => {
    // Data
    let newTitle = 'What to read'
    // Action
    const endState = todoListsReducer(todolists, changeTodolistTitleAC(todolistId1,newTitle))
    // Result
    expect(endState[0].title).toBe(newTitle)
    expect(endState[1].title).toBe('What to buy')
})
 
test('todoList reducer should change todolist filter', () => {
    // Data
    let newFilter: FilterValuesType = 'active'
    // Action
    const endState = todoListsReducer(todolists, changeTodolistFilterAC(todolistId1, newFilter))
    // Result
    expect(endState[0].filter).toBe(newFilter)
    expect(endState[1].filter).toBe('all')
})

test('todoList reducer should set todoLists', () => {
    // Data
    let newTodolists = todolists = [
        {id: todolistId1, title: 'What to read', filter: 'all', order: 0, addedDate: ''},
        {id: todolistId2, title: 'What to play', filter: 'all', order: 1, addedDate: ''}
    ]
    // Action
    const endState = todoListsReducer(todolists, setTodoListsAC(newTodolists))
    // Result
    expect(endState[0].title).toBe('What to read')
    expect(endState[1].title).toBe('What to play')
})
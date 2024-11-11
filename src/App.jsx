import { useReducer, useState } from 'react';
import './App.css';
import Todo from './components/Todo';

const initialState = {
    todos: [],
};

const ACTION = {
  ADD_TODO: 'add todo',
  DELETE_TODO: 'delete todo',
  TOGGLE_TODO: 'toggle todo',
  EDIT_TODO: 'edit todo'
};

const todoReducer = (state, action) => {
    switch (action.type) {
        case ACTION.ADD_TODO:
            return {
                ...state,
                todos: [{ id: Date.now(), text: action.payload, isCompleted: false }, ...state.todos],
            };
        case ACTION.DELETE_TODO:
            return {
                ...state,
                todos: state.todos.filter(todo => todo.id !== action.payload),
            };
        case ACTION.TOGGLE_TODO:
            return {
                ...state,
                todos: state.todos.map(todo =>
                    todo.id === action.payload
                        ? { ...todo, isCompleted: !todo.isCompleted }
                        : todo
                ),
            };
        case ACTION.EDIT_TODO:
            return {
                ...state,
                todos: state.todos.map(todo =>
                    todo.id === action.payload.id
                        ? { ...todo, text: action.payload.text }
                        : todo
                ),
            };
        default:
            return state;
    }
};

export default function App() {
    const [state, dispatch] = useReducer(todoReducer, initialState);
    const [inputValue, setInputValue] = useState('');
    const [editTodoId, setEditTodoId] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputValue.trim()) {
            if (editTodoId !== null) {
                dispatch({ type: ACTION.EDIT_TODO, payload: { id: editTodoId, text: inputValue } });
                setEditTodoId(null);
            } else {
                dispatch({ type: ACTION.ADD_TODO, payload: inputValue });
            }
            setInputValue('');
        }
    };

    const handleDelete = (id) => {
        dispatch({ type: ACTION.DELETE_TODO, payload: id });
    };

    const handleToggleComplete = (id) => {
        dispatch({ type: ACTION.TOGGLE_TODO, payload: id });
    };

    const handleEdit = (todo) => {
        setInputValue(todo.text);
        setEditTodoId(todo.id);
    };

    return (
        <>
            <h1>Todo List</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder={editTodoId ? "Edit todo" : "Add todo"}
                />
                <input type="submit" value={editTodoId ? "Update" : "Add"} />
            </form>
            <div>
                {state.todos.map((todo) => (
                    <Todo
                        key={todo.id}
                        todo={todo}
                        onDelete={() => handleDelete(todo.id)}
                        onToggleComplete={() => handleToggleComplete(todo.id)}
                        onEdit={() => handleEdit(todo)}
                    />
                ))}
            </div>
        </>
    );
}

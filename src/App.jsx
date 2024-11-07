import { useState } from 'react';
import './App.css';
import Todo from './components/Todo';

function App() {
    const [todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState(''); 

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputValue.trim()) {
            setTodos([...todos, inputValue]);
            setInputValue(''); 
        }
    };

    const handleDelete = (todoToDelete) => {
        setTodos(todos.filter(todo => todo !== todoToDelete)); 
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)} 
                />
                <input type="submit" value="Add" />
            </form>
            <div>
                {todos.map((todo, index) => (
                    <Todo key={index} todo={todo} onDelete={() => handleDelete(todo)} /> 
                ))}
            </div>
        </>
    );
}

export default App;

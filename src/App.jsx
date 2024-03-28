import React, { useState, useEffect } from 'react';
import { initialTodos, createTodo } from './todos.jsx';
import Task from './Task.jsx';
import './style.css';

export default function TodoList() {
    const [todos, setTodos] = useState(initialTodos);
    const [showActive, setShowActive] = useState(false);
    const [activeTodos, setActiveTodos] = useState([]);
    const [visibleTodos, setVisibleTodos] = useState([]);
    const [footer, setFooter] = useState(null);


    useEffect(() => {
        setActiveTodos(todos.filter(todo => !todo.completed));
    }, [todos]);

    useEffect(() => {
        setVisibleTodos(showActive ? activeTodos : todos);
    }, [showActive, todos, activeTodos]);

    useEffect(() => {
        setFooter(
            <footer>
                {activeTodos.length} tâches restantes
            </footer>
        );
    }, [activeTodos]);

    function handleDelete(id) {
        setTodos(todos.filter(todo => todo.id !== id));
    }
    function handleToggleComplete(id) {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    }


    function handleEdit(id, newText) {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, text: newText } : todo
        ));
    }

    return (
        <>
            <div className={'all-task'}>
                <div className={'text-and-input'}>
                    <NewTodo onAdd={newTodo => setTodos([...todos, newTodo])} />
                    <label>
                        <input
                            type="checkbox"
                            checked={showActive}
                            onChange={e => setShowActive(e.target.checked)}
                        />
                        Afficher les tâches en cours
                    </label>

                </div>
                <ul>
                    {visibleTodos.map(todo => (
                        <Task
                            key={todo.id}
                            todo={todo}
                            onDelete={handleDelete}
                            onToggleComplete={handleToggleComplete}
                            onEdit={handleEdit}
                        />
                    ))}
                </ul>
                <div className={'footer'}>
                {footer}
                </div>
            </div>
        </>
    );
}

function NewTodo({ onAdd }) {
    const [text, setText] = useState('');

    function handleAddClick() {
        setText('');
        onAdd(createTodo(text));
    }

    return (
        <>
            <input value={text} onChange={e => setText(e.target.value)} />
            <button onClick={handleAddClick} disabled={!text.trim()}>Ajouter</button>

        </>
    );
}

import React, { useState } from 'react';
import MyButton from './Button.jsx';
import Calendar from 'react-calendar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

export default function Task({ todo, onDelete, onEdit, onToggleComplete }) {
    const [showCalendar, setShowCalendar] = useState(false);
    const [deadline, setDeadline] = useState(null);

    const handleDateChange = date => {
        setDeadline(date);
        setShowCalendar(false); // Fermer le calendrier après avoir choisi une date
    };

    return (
        <li className="task-item">
            <div className="task-title">
                <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => onToggleComplete(todo.id)}
                />
                <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                    {todo.text}
                </span>
            </div>
            <div className="task-deadline">
                {deadline && <p>Deadline: {deadline.toLocaleDateString()}</p>}
            </div>
            <div className="task-icons">
                <FontAwesomeIcon icon={faTrashAlt} onClick={() => onDelete(todo.id)} />
                <FontAwesomeIcon icon={faEdit} onClick={() => {
                    const newText = prompt('Enter new text:', todo.text);
                    if (newText !== null) onEdit(todo.id, newText);
                }} />
                <FontAwesomeIcon icon={faCalendarAlt} onClick={() => setShowCalendar(!showCalendar)} />
                {showCalendar && <Calendar onChange={handleDateChange} value={deadline} />}
            </div>
        </li>
    );
}

function NewTodo({ onAdd }) {
    const [text, setText] = useState('');
    const [error, setError] = useState(false);

    function handleAddClick() {
        if (text.trim() !== '') {
            setError(false);
            onAdd(createTodo(text));
            setText('');
        } else {
            setError(true);
        }
    }

    return (
        <>
            <input value={text} onChange={e => setText(e.target.value)} />
            <button onClick={handleAddClick} disabled={error}>Add</button>
            {error && <p className="error-message">Please enter a task</p>}
        </>
    );
}

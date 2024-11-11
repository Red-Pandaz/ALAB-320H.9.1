import React from "react";

export default function Todo({ todo, onDelete, onToggleComplete, onEdit }) {
    return (
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <input
                type="checkbox"
                checked={todo.isCompleted}
                onChange={onToggleComplete}
            />
            <p style={{ margin: 0, textDecoration: todo.isCompleted ? "line-through" : "none" }}>
                {todo.text}
            </p>
            <button onClick={onEdit}>Edit</button>
            {todo.isCompleted && (
                <button onClick={onDelete}>Delete</button>
            )}
        </div>
    );
}

import React, { useState } from "react";

export default function Todo({ todo, onDelete }) {
    const [isCompleted, setIsCompleted] = useState(false);

    const handleCheckboxChange = () => {
        setIsCompleted(!isCompleted);
    };

    return (
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <input
                type="checkbox"
                checked={isCompleted}
                onChange={handleCheckboxChange}
            />
            <p style={{ margin: 0, textDecoration: isCompleted ? "line-through" : "none" }}>
                {todo}
            </p>
            {isCompleted && (
                <button onClick={onDelete}>Delete</button>
            )}
        </div>
    );
}
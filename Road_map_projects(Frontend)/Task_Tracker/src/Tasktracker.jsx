import React, { useState } from "react";

function Tasktracker() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [filter, setFilter] = useState("pending"); // default to pending

    function handleNewtask(e) {
        setNewTask(e.target.value);
    }

    function enterTask() {
        if (newTask.trim() !== "") {
            setTasks([...tasks, { text: newTask, checked: false }]);
            setNewTask("");
        }
    }

    function deleteTask(index) {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    }

    function toggleCheck(index) {
        const updatedTasks = [...tasks];
        updatedTasks[index].checked = !updatedTasks[index].checked;
        setTasks(updatedTasks);
    }

    // Filter tasks based on selected filter
    const filteredTasks = tasks.filter(task => {
        if (filter === "pending") return !task.checked;
        if (filter === "completed") return task.checked;
        return true; // all tasks
    });

    // Toggle between pending and completed when clicking Pending button
    function handlePendingClick() {
        if (filter === "pending") {
            setFilter("completed");
        } else {
            setFilter("pending");
        }
    }

    return (
        <div className="task-tracker">
            <h1>📋Task Tracker📌</h1>
            <div className="task-input">
                <input 
                    type="text" 
                    placeholder="Start writing and press enter to create task" 
                    value={newTask} 
                    onChange={handleNewtask}
                    onKeyPress={(e) => e.key === 'Enter' && enterTask()}
                />
                <span id="enter-container" onClick={enterTask}>
                    <img src="/src/assets/enter.png" alt="Enter" />
                </span>
            </div>
            
            {/* Filter buttons */}
            <div className="filter-buttons">
                <button 
                    className={filter === "all" ? "active" : ""}
                    onClick={() => setFilter("all")}
                >
                    All
                </button>
                <button 
                    className={filter === "pending" ? "active" : ""}
                    onClick={handlePendingClick}
                >
                    Pending
                </button>
                <button 
                    className={filter === "completed" ? "active" : ""}
                    onClick={() => setFilter("completed")}
                >
                    Completed
                </button>
            </div>
            
            <div className="track-container">
                <ol>
                    {filteredTasks.map((task) => {
                        // Find the actual index in the original tasks array
                        const actualIndex = tasks.indexOf(task);
                        return (
                            <p className="tracker-page" key={actualIndex}>
                                <input 
                                    type="checkbox" 
                                    className="filled-checkbox" 
                                    checked={task.checked}
                                    onChange={() => toggleCheck(actualIndex)}
                                />
                                <label className={`task-name ${task.checked ? 'completed-task' : ''}`}>
                                    {task.text}
                                </label>
                                <span className="del-button" onClick={() => deleteTask(actualIndex)}>🚮</span>
                            </p>
                        );
                    })}
                </ol>
            </div>
        </div>
    );
}


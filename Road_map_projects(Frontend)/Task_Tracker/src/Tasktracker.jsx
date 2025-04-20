import React, { useState } from "react";

function Tasktracker() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");

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

    // Sort tasks: unchecked first, checked last
    const sortedTasks = [...tasks].sort((a, b) => {
        if (a.checked && !b.checked) return 1;
        if (!a.checked && b.checked) return -1;
        return 0;
    });

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
            <div className="track-container">
                <ol>
                    {sortedTasks.map((task, index) => (
                        <p className="tracker-page" key={index}>
                            <input 
                                type="checkbox" 
                                className="filled-checkbox" 
                                checked={task.checked}
                                onChange={() => toggleCheck(tasks.indexOf(task))}
                            />
                            <label className="task-name">{task.text}</label>
                            <span className="del-button" onClick={() => deleteTask(tasks.indexOf(task))}>🚮</span>
                        </p>
                    ))}
                </ol>
            </div>
        </div>
    );
}

export default Tasktracker;
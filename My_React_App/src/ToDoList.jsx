import React, {useState} from "react";

function ToDoList () {
    const [tasks, setTask] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [taskDate, setTaskDate] = useState("");

    function handleInputChange(event) {
        setNewTask(event.target.value);
    }

    function handleDateChange(event){
        setTaskDate(event.target.value);
    }

    function formatDate(dateString){
        if (!dateString) return "";
        const options = {year: "numeric", month: "short", day: "numeric"};
        return new Date(dateString).toLocaleDateString(undefined, options);
    }

    function getDateStatus(dateString) {
        if (!dateString) return "";
        
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const taskDate = new Date(dateString);
        
        if (taskDate < today) {
            return "Overdue: ";
        } else if (taskDate.getTime() === today.getTime()) {
            return "Due: ";
        } else {
            return "Pending: ";
        }
    }

    function addTask(){
        if (newTask.trim() !== ""){
            setTask(t => [...t, {text: newTask, date: taskDate}]);
            setNewTask("");
            setTaskDate("");
        }
    }

    function deleteTask (index) {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTask(updatedTasks);
    }

    function moveTaskUp(index){
        if(index > 0){
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index-1]] = [updatedTasks[index-1], updatedTasks[index]];
            setTask(updatedTasks);
        }
    }

    function moveTaskDown(index){
        if(index < tasks.length-1){
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index+1]] = [updatedTasks[index+1], updatedTasks[index]];
            setTask(updatedTasks);
        }
    }

    return(
        <div className="to-do-list">
            <h1>To-Do-List</h1>
            <div>
                <input type="text" placeholder="Enter a task..." value={newTask} onChange={handleInputChange}/>
                <input type="date" value={taskDate} onChange={handleDateChange}/>
                <button className="add-button" onClick={addTask}>
                    Add
                </button>
            </div>
            <ol>
                {tasks.map((task, index) =>
                <li key={index}>
                    {task.date && (
                        <span className="date-text">
                            {getDateStatus(task.date)}
                            {formatDate(task.date)}
                        </span>
                    )}
                    <span className="text">{task.text}</span>
                    <button className="delete-button" onClick={() => deleteTask(index)}>
                        Delete
                    </button>
                    <button className="move-button" onClick={() => moveTaskUp(index)}>
                        👆
                    </button>
                    <button className="move-button" onClick={() => moveTaskDown(index)}>
                        👇
                    </button>
                </li>)}
            </ol>
        </div>
    )
}

export default ToDoList;
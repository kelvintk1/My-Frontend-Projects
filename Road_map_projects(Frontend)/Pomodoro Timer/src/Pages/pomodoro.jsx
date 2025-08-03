import './pomodoro.css';
import React, { useState, useRef, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';



function Pomodoro({collapsed, isMaximized, setIsMaximized}) {
    // Timer states
    const [timeLeft, setTimeLeft] = useState(25 * 60); // in seconds
    const [isRunning, setIsRunning] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [selectedTab, setSelectedTab] = useState('focus');
    const [showSettings, setShowSettings] = useState(false);
    const [showTaskInput, setShowTaskInput] = useState(false);
    const [showCalendar, setShowCalendar] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const calendarRef = useRef(null);
    const [showHeaderCalendar, setShowHeaderCalendar] = useState(false);
    const [showInputCalendar, setShowInputCalendar] = useState(false);
    const headerCalendarRef = useRef(null);
    const inputCalendarRef = useRef(null);

    const [focusDuration, setFocusDuration] = useState(25);
    const [shortDuration, setShortDuration] = useState(5);
    const [longDuration, setLongDuration] = useState(15);

    // Tasks are now stored per date: { 'YYYY-MM-DD': [task, ...] }
    const [tasks, setTasks] = useState({});
    const [taskInput, setTaskInput] = useState('');
    const [editIndex, setEditIndex] = useState(null);
    const [editValue, setEditValue] = useState('');
    const [currentTaskIndex, setCurrentTaskIndex] = useState(null);
    const [viewMode, setViewMode] = useState('pending'); // pending or default

    const intervalRef = useRef(null);

    // Format time as MM:SS
    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
    };

    // Format date for display
    const formatDate = (date) => {
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'short' });
        return `${day < 10 ? '0' : ''}${day} ${month}`;
    };

    // Helper to get date string (YYYY-MM-DD)
    const getDateKey = (date) => date.toISOString().split('T')[0];

    const handleAddTask = () => {
        if (taskInput.trim()){
            const dateKey = getDateKey(selectedDate);
            setTasks(prev => ({
                ...prev,
                [dateKey]: [...(prev[dateKey] || []), {text: taskInput, completed: false }]
            }));
            setTaskInput('');
            setShowTaskInput(false);
        }
    };

    const handleCheckboxChange = (taskToToggle) => {
        const dateKey = getDateKey(selectedDate);
        setTasks(prevTasks => ({
            ...prevTasks,
            [dateKey]: prevTasks[dateKey].map(task =>
                task === taskToToggle ? { ...task, completed: !task.completed} : task
            )
        }));
    };

    // Get tasks for current date
    const dateKey = getDateKey(selectedDate);
    const tasksForDate = tasks[dateKey] || [];
    const filteredTasks = tasksForDate.filter(task => task.completed === (viewMode === 'completed'));

    // Start timer
    const handleStart = () => {
        setIsRunning(true);
        setIsPaused(false);
    };

    // Pause timer
    // const handlePause = () => {
    //     setIsPaused(true);
    //     setIsRunning(false);
    // };

    // Resume timer
    const handleResume = () => {
        setIsPaused(false);
        setIsRunning(true);
    };

    // Reset timer
    const handleReset = () => {
        setIsRunning(false);
        setIsPaused(false);
        if (selectedTab === 'focus') setTimeLeft(focusDuration * 60);
        else if (selectedTab === 'short') setTimeLeft(shortDuration * 60);
        else if (selectedTab === 'long') setTimeLeft(longDuration * 60);
    };

    // Add minutes to timer
    const handleAddMinutes = (minutes) => {
        setTimeLeft(prev => prev + minutes * 60);
    };

    // Handle tab click
    const handleTabClick = (tab) => {
        setSelectedTab(tab);
        setIsRunning(false);
        setIsPaused(false);
        if (tab === 'focus') setTimeLeft(focusDuration * 60);
        if (tab === 'short') setTimeLeft(shortDuration * 60);
        if (tab === 'long') setTimeLeft(longDuration * 60);
    };

    // Timer effect
    useEffect(() => {
        if (isRunning && !isPaused) {
            intervalRef.current = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev > 0) return prev - 1;
                    clearInterval(intervalRef.current);
                    setIsRunning(false);
                    return 0;
                });
            }, 1000);
        }
        return () => clearInterval(intervalRef.current);
    }, [isRunning, isPaused]);

    // Add this useEffect to handle Escape key for closing task input
    useEffect(() => {
        if (!showTaskInput) return;
        const handleEsc = (e) => {
            if (e.key === "Escape") setShowTaskInput(false);
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [showTaskInput]);

    // Close calendar when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (
                calendarRef.current &&
                !calendarRef.current.contains(event.target) &&
                !event.target.classList.contains('calendar-trigger')
            ) {
                setShowCalendar(false);
            }
        }
        if (showCalendar) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showCalendar]);

    // For header calendar
    useEffect(() => {
        function handleClickOutside(event) {
            if (
                headerCalendarRef.current &&
                !headerCalendarRef.current.contains(event.target) &&
                !event.target.classList.contains('calendar-trigger-header')
            ) {
                setShowHeaderCalendar(false);
            }
        }
        if (showHeaderCalendar) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [showHeaderCalendar]);

    // For input calendar
    useEffect(() => {
        function handleClickOutside(event) {
            if (
                inputCalendarRef.current &&
                !inputCalendarRef.current.contains(event.target) &&
                !event.target.classList.contains('calendar-trigger-input')
            ) {
                setShowInputCalendar(false);
            }
        }
        if (showInputCalendar) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [showInputCalendar]);

    // Save task handler
    const handleSaveTask = () => {
        if (taskInput.trim() !== '') {
            const dateKey = getDateKey(selectedDate);
            setTasks(prev => ({
                ...prev,
                [dateKey]: [...(prev[dateKey] || []), { text: taskInput.trim(), completed: false }]
            }));
            setTaskInput('');
            setShowTaskInput(false);
        }
    };

    // Save edited task
    const handleEditSave = () => {
        if (editValue.trim() !== '') {
            const dateKey = getDateKey(selectedDate);
            setTasks(tasks => ({
                ...tasks,
                [dateKey]: tasks[dateKey].map((task, idx) =>
                    idx === editIndex ? { ...task, text: editValue.trim() } : task
                )
            }));
            setEditIndex(null);
            setEditValue('');
        }
    };

    // Handle Enter/Escape in edit input
    const handleEditKeyDown = (e) => {
        if (e.key === 'Enter') handleEditSave();
        if (e.key === 'Escape') {
            setEditIndex(null);
            setEditValue('');
        }
    };

    // Handle Enter key in input
    const handleTaskInputKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSaveTask();
        }
    };

    return (
        <div className={`pomodoro-page ${collapsed ? 'collapsed' : ''}`}>
            <div className='task-side' style={isMaximized ? { display: 'none' } : {}}>
                <div className='task-header'>
                    <div className='left-header'>
                        <span
                            className='pending-container'
                            style={{
                                cursor: 'pointer',
                                backgroundColor: viewMode === 'pending' ? 'rgba(255, 255, 255, 0.164)' : 'transparent',
                                height: '30px',
                                borderRadius: '12px',
                                padding: '0 8px'
                            }}
                            onClick={() => setViewMode('pending')}
                        >
                            <img src='/pending.png' alt='Pending' className='pending-icon'/>
                            <p className="pending-text">Pending</p>
                        </span>
                        <span
                            className='completed-container'
                            style={{
                                cursor: 'pointer',
                                backgroundColor: viewMode === 'completed' ? 'rgba(255, 255, 255, 0.164)' : 'transparent',
                                height: '30px',
                                borderRadius: '12px',
                                padding: '0 8px'
                            }}
                            onClick={() => setViewMode('completed')}
                        >
                            <img src='/completed.png' alt='Completed' className='completed-icon'/>
                            <p className="completed-text">Completed</p>
                        </span>
                    </div>
                    <div className='right-header'>
                        {/* <img src='/refresh.png' alt='Refresh' className='completed-icon'/> */}
                        <span
                            className='completed-container calendar-trigger'
                            style={{
                                backgroundColor: 'rgba(255, 255, 255, 0.164)',
                                borderRadius:'5px',
                                height:'30px',
                                cursor:'pointer',
                                position: 'relative'
                            }}
                            onClick={() => {
                                setShowHeaderCalendar(v => {
                                    if (!v) setShowInputCalendar(false); // Close input calendar if opening header
                                    return !v;
                                });
                            }}
                        >
                            <img src='/dailyplanner.png' alt='Daily Planner' className='completed-icon calendar-trigger-header'/>
                            <p className="completed-text calendar-trigger-header">{formatDate(selectedDate)}</p>
                            {showHeaderCalendar && (
                                <div className="calendar-popup" ref={headerCalendarRef}>
                                    <Calendar
                                        onChange={date => {
                                            setSelectedDate(date);
                                            setShowHeaderCalendar(false);
                                        }}
                                        value={selectedDate}
                                    />
                                </div>
                            )}
                        </span>
                        <span className='nav-container'>
                            <img
                                src='/next.png'
                                alt='Back'
                                className='nav-icon'
                                style={{ transform: 'rotate(180deg)', cursor: 'pointer' }}
                                onClick={() => {
                                    // Go to previous day
                                    setSelectedDate(prev => {
                                        const newDate = new Date(prev);
                                        newDate.setDate(prev.getDate() - 1);
                                        return newDate;
                                    });
                                }}
                            />
                            <img
                                src='/next.png'
                                alt='Next'
                                className='nav-icon'
                                style={{ cursor: 'pointer' }}
                                onClick={() => {
                                    // Go to next day
                                    setSelectedDate(prev => {
                                        const newDate = new Date(prev);
                                        newDate.setDate(prev.getDate() + 1);
                                        return newDate;
                                    });
                                }}
                            />
                        </span>
                    </div>
                </div>
                <div className='taskfield-page'>
                    {/* No tasks and not adding */}
                    {tasksForDate.length === 0 && !showTaskInput && (
                        <div className='taskfield-container' style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%'}}>
                            <img src='/completed.png' alt='Task' className='task-icon' style={{opacity: 0.5, cursor: 'pointer', width: '70px', height: '70px'}}/>
                            <span style={{opacity: 0.5}}>No tasks for this day</span>
                            <span
                                style={{fontWeight:'bold', cursor: 'pointer', textDecoration: 'underline'}}
                                onClick={() => setShowTaskInput(true)}
                            >
                                Add a new task
                            </span>
                        </div>
                    )}

                    {/* Tasks exist and not adding */}
                    {tasksForDate.length > 0 && !showTaskInput && (
                        <div className='taskfield-container'>
                            <ul style={{listStyle: 'none', padding: 0, margin: 0, width: '100%'}}>
                                {filteredTasks.map((task, idx) => (
                                    <li
                                        key={idx}
                                        className="task-list-item"
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '8px',
                                            marginBottom: '8px',
                                            padding: '6px 12px',
                                            borderRadius: '8px',
                                            transition: 'background 0.2s'
                                        }}
                                    >
                                        <input type="checkbox" checked={task.completed} onChange={() => handleCheckboxChange(task)}/>
                                        {editIndex === idx ? (
                                            <div style={{flex: 1, display: 'flex', flexDirection: 'column'}}>
                                                <input
                                                    type="text"
                                                    value={editValue}
                                                    onChange={e => setEditValue(e.target.value)}
                                                    onKeyDown={handleEditKeyDown}
                                                    autoFocus
                                                    style={{
                                                        background: 'none',
                                                        border: 'none',
                                                        color: '#fff',
                                                        fontSize: '16px',
                                                        marginBottom: '8px'
                                                    }}
                                                />
                                                <div className='ctrl-taskInput' style={{display: 'flex', alignItems: 'center', width: '100%'}}>
                                                    <span className='ctrl-field' onClick={handleEditSave}>
                                                        <img src="/save.png" alt='Save' className='ctrl-icon' />
                                                        <p>SAVE</p>
                                                    </span>
                                                    <span className='ctrl-field' style={{marginLeft: '8px'}} onClick={() => { setEditIndex(null); setEditValue(''); }}>
                                                        <img src="/esc.png" alt='Cancel' className='ctrl-icon' />
                                                        <p>ESC</p>
                                                        <span style={{marginLeft: '4px'}}>CANCEL</span>
                                                    </span>
                                                    <span className='ctrl-field' style={{marginLeft: 'auto'}}>
                                                        <img src="/dailyplanner.png" alt='Daily Planner' className='ctrl-icon' />
                                                        <p>12 Jul</p>
                                                    </span>
                                                </div>
                                            </div>
                                        ) : (
                                            <span style={{color: '#fff', flex: 1, textDecoration: task.completed ? 'line-through' : 'none'}}>{task.text}</span>
                                        )}
                                        {editIndex !== idx && (
                                            <span className="task-actions" style={{alignItems: 'center', gap: '10px'}}>
                                                <img
                                                    src={isRunning && currentTaskIndex === idx ? "/pause.png" : "/play.png"}
                                                    alt={isRunning && currentTaskIndex === idx ? "Pause" : "Start"}
                                                    className="task-action-icon"
                                                    style={{width: '18px', height: '18px', cursor: 'pointer'}}
                                                    onClick={() => {
                                                        if (isRunning && currentTaskIndex === idx) {
                                                            setIsPaused(true);
                                                            setIsRunning(false);
                                                        } else {
                                                            setCurrentTaskIndex(idx);
                                                            setIsRunning(true);
                                                            setIsPaused(false);
                                                        }
                                                    }}
                                                />
                                                <img
                                                    src="/edit.png"
                                                    alt="Edit"
                                                    className="task-action-icon"
                                                    style={{width: '18px', height: '18px', cursor: 'pointer'}}
                                                    onClick={() => {
                                                        setEditIndex(idx);
                                                        setEditValue(task.text);
                                                    }}
                                                />
                                                <img
                                                    src="/trash.png"
                                                    alt="Delete"
                                                    className="task-action-icon"
                                                    style={{width: '18px', height: '18px', cursor: 'pointer'}}
                                                    onClick={e => {
                                                        e.stopPropagation();
                                                        const dateKey = getDateKey(selectedDate);
                                                        setTasks(tasks => ({
                                                            ...tasks,
                                                            [dateKey]: tasks[dateKey].filter((_, i) => i !== idx)
                                                        }));
                                                    }}
                                                />
                                            </span>
                                        )}
                                    </li>
                                ))}
                            </ul>
                            <div
                                style={{
                                    marginTop: '16px',
                                    border: '1px dashed #444',
                                    borderRadius: '8px',
                                    padding: '12px',
                                    textAlign: 'center',
                                    color: '#aaa',
                                    cursor: 'pointer',
                                    fontWeight: 500,
                                    fontSize: '16px'
                                }}
                                onClick={() => setShowTaskInput(true)}
                            >
                                + Add new task
                            </div>
                        </div>
                    )}

                    {/* Input open */}
                    {showTaskInput && (
                        <div className='taskInput-field' style={{
                            border: '1px solid #444',
                            borderRadius: '10px',
                            padding: '10px',
                            width: '97%',
                            margin: '0 auto',
                            marginTop: tasks.length > 0 ? '0' : '40px',
                            background: 'rgba(255,255,255,0.01)'
                        }}>
                            <input
                                type='text'
                                placeholder='Type and press enter to save or esc to cancel'
                                value={taskInput}
                                onChange={e => setTaskInput(e.target.value)}
                                onKeyDown={handleTaskInputKeyDown}
                                style={{
                                    border: 'none',
                                    background: 'none',
                                    height: '30px',
                                    width: '100%',
                                    fontSize: 'medium',
                                    color: '#fff',
                                    marginBottom: '8px'
                                }}
                                autoFocus
                            />
                            <div className='ctrl-taskInput' style={{display: 'flex', alignItems: 'center', width: '100%'}}>
                                <span className='ctrl-field' onClick={handleSaveTask}>
                                    <img src="/save.png" alt='Save' className='ctrl-icon' />
                                    <p>SAVE</p>
                                </span>
                                <span className='ctrl-field' style={{marginLeft: '8px'}} onClick={() => { setShowTaskInput(false); setTaskInput(''); }}>
                                    <img src="/esc.png" alt='Cancel' className='ctrl-icon' />
                                    <p>ESC</p>
                                    <span style={{marginLeft: '4px'}}>CANCEL</span>
                                </span>
                                <span className='ctrl-field' style={{marginLeft: 'auto', position: 'relative'}} onClick={e => {
                                    e.stopPropagation();
                                    setShowInputCalendar(v => {
                                        if (!v) setShowHeaderCalendar(false); // Close header calendar if opening input
                                        return !v;
                                    });
                                }}>
                                    <img src="/dailyplanner.png" alt='Daily Planner' className='ctrl-icon calendar-trigger-input' />
                                    <p>{formatDate(selectedDate)}</p>
                                    {showInputCalendar && (
                                        <div className="calendar-popup" ref={inputCalendarRef}>
                                            <Calendar
                                                onChange={date => {
                                                    setSelectedDate(date);
                                                    setShowInputCalendar(false);
                                                }}
                                                value={selectedDate}
                                            />
                                        </div>
                                    )}
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className={`time-side${isMaximized ? ' maximized' : ''}`}>
                <div className='time-header'>
                    <div className='Tright-header'>
                        <img src='/dualScreen.png' alt='Dual Screen' className='dual-screen-icon'/>
                        <img src='/adjust.png' alt='Adjust' className='dual-screen-icon' onClick={() => setShowSettings(true)} style={{cursor: 'pointer'}}/>
                        {isMaximized ? (
                            <img
                                src='/minimize.png'
                                alt='Minimize'
                                className='dual-screen-icon'
                                style={{cursor: 'pointer'}}
                                onClick={() => setIsMaximized(false)}
                            />
                        ) : (
                            <img
                                src='/maximize.png'
                                alt='Maximize'
                                className='dual-screen-icon'
                                style={{cursor: 'pointer'}}
                                onClick={() => setIsMaximized(true)}
                            />
                        )}
                    </div>
                </div>
                <div className="time-field">
                    <div className='timefield-container'>
                        <span className='tabs-container'>
                            <p
                                className={selectedTab === 'focus' ? 'active-tab' : ''}
                                onClick={() => handleTabClick('focus')}
                            >Focus</p>
                            <p
                                className={selectedTab === 'short' ? 'active-tab' : ''}
                                onClick={() => handleTabClick('short')}
                            >Short Break</p>
                            <p
                                className={selectedTab === 'long' ? 'active-tab' : ''}
                                onClick={() => handleTabClick('long')}
                            >Long Break</p>
                        </span>
                        <span className='time-text'>{formatTime(timeLeft)}</span>
                        <hr style={{width:'300px'}}/>
                        <span className='minutes-container'>
                            <p onClick={() => handleAddMinutes(25)}>+ 25 min</p>
                            <p onClick={() => handleAddMinutes(10)}>+ 10 min</p>
                            <p onClick={() => handleAddMinutes(5)}>+ 5 min</p>
                            <p onClick={() => handleAddMinutes(1)}>+ 1 min</p>
                        </span>
                        {/* BUTTON LOGIC */}
                        {!isRunning && !isPaused && (
                            <button className='start-button' onClick={handleStart}>Start</button>
                        )}
                        {isRunning && !isPaused && (
                            <div style={{display: 'flex', gap: '16px', justifyContent: 'center'}}>
                                <button className='start-button' onClick={() => { setIsPaused(true); setIsRunning(false); }}>Pause</button>
                                <button className='start-button' onClick={handleReset}>Reset</button>
                            </div>
                        )}
                        {!isRunning && isPaused && (
                            <div style={{display: 'flex', gap: '16px', justifyContent: 'center'}}>
                                <button className='start-button' onClick={handleResume}>Resume</button>
                                <button className='start-button' onClick={handleReset}>Reset</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {showSettings && (
  <div className="settings-modal-overlay">
    <div className="settings-modal">
      <img src='/close.png' alt='Close' className='close-icon' onClick={() => setShowSettings(false)} style={{cursor: 'pointer', marginLeft: '400px', width: '20px', height: '20px'}}/>
      <label>Pomodoro duration (minutes)</label>
      <input
        type="number"
        min="1"
        value={focusDuration}
        onChange={e => setFocusDuration(Number(e.target.value))}
        style={{width:'300px'}}
      />
      <div style={{display: 'flex', gap: '16px', marginTop: '16px'}}>
        <div style={{display:'flex'}}>
        <span style={{display:'flex', flexDirection:'column'}}>
          <label>Short break (min)</label>
          <input
            type="number"
            min="1"
            value={shortDuration}
            onChange={e => setShortDuration(Number(e.target.value))}
          />
        </span>
        <span style={{display:'flex', flexDirection:'column', marginLeft: '16px'}}>
          <label>Long break (min)</label>
          <input
            type="number"
            min="1"
            value={longDuration}
            onChange={e => setLongDuration(Number(e.target.value))}
          />
          </span>
        </div>
      </div>
      <button
        className="settings-update-btn"
        onClick={() => {
          setShowSettings(false);
          // Update the timer if on the current tab
          if (selectedTab === 'focus') setTimeLeft(focusDuration * 60);
          if (selectedTab === 'short') setTimeLeft(shortDuration * 60);
          if (selectedTab === 'long') setTimeLeft(longDuration * 60);
        }}
        style={{marginTop: '24px', width: '150px'}}
      >
        Update Settings
      </button>
    </div>
  </div>
)}
        </div>
    )
}

export default Pomodoro;
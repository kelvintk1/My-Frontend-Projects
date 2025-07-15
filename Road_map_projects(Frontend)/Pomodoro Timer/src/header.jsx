import React, { useState, useEffect, useRef } from 'react';
import './header.css';

function Header({ collapsed }) {
    const [is12hr, setIs12hr] = useState(true);
    const [currentTime, setCurrentTime] = useState(getFormattedTime(true));
    const [personalOpen, setPersonalOpen] = useState(false);
    const [generalOpen, setGeneralOpen] = useState(false);
    const [focusOpen, setFocusOpen] = useState(false);
    const personalRef = useRef(null);
    const generalRef = useRef(null);
    const focusRef = useRef(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(getFormattedTime(is12hr));
        }, 1000);
        return () => clearInterval(interval);
    }, [is12hr]);

    useEffect(() => {
        function handleClickOutside(event) {
            if (personalRef.current && !personalRef.current.contains(event.target)) {
                setPersonalOpen(false);
            }
            if (generalRef.current && !generalRef.current.contains(event.target)) {
                setGeneralOpen(false);
            }
            if (focusRef.current && !focusRef.current.contains(event.target)) {
                setFocusOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    function getFormattedTime(use12hr) {
        const now = new Date();
        let hours = now.getHours();
        let minutes = now.getMinutes();
        let ampm = '';

        if (use12hr) {
            ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12;
            hours = hours ? hours : 12; // the hour '0' should be '12'
        }
        return (
            (hours < 10 ? '0' : '') + hours + ':' +
            (minutes < 10 ? '0' : '') + minutes +
            (use12hr ? ' ' + ampm : '')
        );
    }

    const handleHrClick = () => setIs12hr(prev => !prev);

    return (
        <header className={collapsed ? "header-collapsed" : ""}>
            <div className="h-container">
                <div className="left-header">
                    <span className='page-name'>
                        Pomodoro
                    </span>
                    <span>/</span>
                    <span
                        className='folder folder-dropdown'
                        ref={personalRef}
                        onClick={() => setPersonalOpen(open => !open)}
                        tabIndex={0}
                    >
                        <img src="/folder.png" alt="Folder" className="header-icons" />
                        <p className='folder-name'>Personal</p>
                        <img src='/collapse.png' alt="Collapse" className='collapse-icon' />
                        {personalOpen && (
                            <div className="dropdown-menu">
                                <div className="dropdown-item">
                                    <img src="/folder.png" alt="Folder" className="header-icons" />
                                    <span>Personal</span>
                                    <img src="/settings.png" alt="Settings" className="dropdown-settings" />
                                </div>
                                <div className="dropdown-item workspace" style={{backgroundColor:' #cacaca2d'}}>
                                    + WORKSPACE
                                </div>
                            </div>
                        )}
                    </span>
                    <span
                        className='folder folder-dropdown'
                        ref={generalRef}
                        onClick={() => setGeneralOpen(open => !open)}
                        tabIndex={0}
                    >
                        <img src="/general.png" alt="General" className="header-icons" />
                        <p className='folder-name'>General</p>
                        <img src='/collapse.png' alt="Collapse" className='collapse-icon' />
                        {generalOpen && (
                            <div className="dropdown-menu">
                                <div className="dropdown-item">
                                    <img src="/general.png" alt="General" className="header-icons" />
                                    <span>General</span>
                                    <img src="/settings.png" alt="Settings" className="dropdown-settings" />
                                </div>
                                <div className="dropdown-item workspace" style={{backgroundColor:' #cacaca2d'}}>
                                    + PROJECT
                                </div>
                            </div>
                        )}
                    </span>
                </div>
                <div className="right-header">
                    <span className='folder'>
                        <img src="/feedback.png" alt="Feedback" className="header-icons" />
                        <p className='folder-name'>Feedback</p>
                    </span>
                    <span className='folder folder-dropdown' ref={focusRef} onClick={() => setFocusOpen(open => !open)} tabIndex={0}>
                        <img src="/focus.png" alt="Focus" className="header-icons" />
                        <p className='folder-name'>Focus</p>
                        {focusOpen && (
                            <div className="dropdown-menu focus-dropdown">
                                <div className="dropdown-item no-hover" style={{color:'#aaa', cursor:'default' }}>No saved presets</div>
                                <div className="dropdown-item workspace" style={{backgroundColor:' #cacaca2d'}}>+ NEW PRESET</div>
                            </div>
                        )}
                    </span>
                    <span className='folder-time active-folder'>
                        <p className='folder-name'>{currentTime}</p>
                    </span>
                    <button className='hr-btn' onClick={handleHrClick}>
                        {is12hr ? '12hr' : '24hr'}
                    </button>
                </div>
            </div>
        </header>
    );
}

export default Header;
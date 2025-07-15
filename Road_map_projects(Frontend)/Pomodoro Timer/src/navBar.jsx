import React, {useState, useEffect, useRef} from 'react';
import "./navBar.css";

function NavBar({ collapsed, setCollapsed }) {
    const [accountOpen, setAccountOpen] = useState(false);
    const accountRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (accountRef.current && !accountRef.current.contains(event.target)) {
                setAccountOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <nav className={`sidebar${collapsed ? " collapsed" : ""}`}>
            <span
                className="sidebar-back"
                onClick={() => setCollapsed((prev) => !prev)}
        aria-label="Collapse sidebar"
        style={{
          transform: collapsed ? "rotateY(180deg)" : "rotateY(0deg)",
          transition: "transform 0.2s",
        }}
      >
        <img src="/expand.png" alt="Expand" className="sidebar-icon" />
      </span>
      <ul className="sidebar-list">
        <li className="timezone-bar">
          <img src="/timezones.png" alt="Timezones" className="sidebar-icon" />
          <span className="sidebar-label">Timezones</span>
          <span className="sidebar-tooltip">Timezones</span>
        </li>
        <li className="pomodoro-bar">
          <img src="/pomodoro.png" alt="Pomodoro" className="sidebar-icon" />
          <span className="sidebar-label">Pomodoro</span>
          <span className="sidebar-tooltip">Pomodoro</span>
        </li>
        <li className="dailyplanner-bar">
          <img
            src="/dailyplanner.png"
            alt="Daily Planner"
            className="sidebar-icon"
          />
          <span className="sidebar-label">Daily Planner</span>
          <span className="sidebar-tooltip">Daily Planner</span>
        </li>
        <li className="worldtime-bar">
          <img src="/worldtime.png" alt="World Time" className="sidebar-icon" />
          <span className="sidebar-label">World Time</span>
          <span className="sidebar-tooltip">World Time</span>
        </li>
        <li className="timer-bar">
          <img src="/timer.png" alt="Timer" className="sidebar-icon" />
          <span className="sidebar-label">Timer</span>
          <span className="sidebar-tooltip">Timer</span>
        </li>
        <li className="stopwatch-bar">
          <img src="/stopwatch.png" alt="Stopwatch" className="sidebar-icon" />
          <span className="sidebar-label">Stopwatch</span>
          <span className="sidebar-tooltip">Stopwatch</span>
        </li>
      </ul>
      <div className="sidebar-account"
        ref={accountRef}
        onClick={() => setAccountOpen(open => !open)}
        tabIndex={0}
      >
        <span className="account-icon">K</span>
        <span className="sidebar-label">Account</span>
        <span className="sidebar-tooltip">Account</span>
        {accountOpen && (
          <div className="account-dropdown">
            <div className='profile'>
              <span className='account-icon'>K</span>
              <span className='account-name'>
                <p className='profile-name'>John Doe</p>
                <p className='profile-email'>john.doe@example.com</p>
              </span>
            </div>
            <div className='account-settings'>
              <img src='/settings.png' alt='Settings' className='settings-icon'/>
              <span className='settings-text'>Settings</span>
            </div>
            <div className='account-logout'>
              <img src='/logout.png' alt='Logout' className='logout-icon'/>
              <span className='logout-text' style={{color:'red'}}>Logout</span>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
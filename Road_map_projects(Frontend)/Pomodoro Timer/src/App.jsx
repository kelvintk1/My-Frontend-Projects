import NavBar from "./navBar";
import Header from "./header";
import "./App.css";
import React, { useState } from "react";
import Pomodoro from "./Pages/pomodoro";

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);

  return (
    <div className="app-root">
      <NavBar collapsed={collapsed} setCollapsed={setCollapsed} />
      <div className="main-content">
        {!isMaximized && <Header collapsed={collapsed} />}
        {/*main page content here */}
        <Pomodoro collapsed={collapsed} isMaximized={isMaximized} setIsMaximized={setIsMaximized}/>
      </div>
    </div>
  );
}

export default App;
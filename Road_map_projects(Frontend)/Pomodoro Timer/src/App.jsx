import NavBar from "./navBar";
import Header from "./header";
import "./App.css";
import React, { useState } from "react";
import Pomodoro from "./Pages/pomodoro";

function App() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="app-root">
      <NavBar collapsed={collapsed} setCollapsed={setCollapsed} />
      <div className="main-content">
        <Header collapsed={collapsed} />
        {/* Add your main page content here */}
        <Pomodoro collapsed={collapsed}/>
      </div>
    </div>
  );
}

export default App;
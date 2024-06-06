// src/App.js
import React from 'react';
import './App.css';
import DashboardPage from './pages/dashboard';
import 'daisyui/dist/full.css'; // Import DaisyUI


function App() {
  return (
    <div className="bg-white h-full overflow-y-scroll">
      <DashboardPage />
    </div>
  );
}

export default App;

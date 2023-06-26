/*
  * Project: My Unfinished Project
  * Author: liwa-dev
  * Watermark:
*/

/***
 *    ██╗     ██╗██╗    ██╗ █████╗       ██████╗ ███████╗██╗   ██╗
 *    ██║     ██║██║    ██║██╔══██╗      ██╔══██╗██╔════╝██║   ██║
 *    ██║     ██║██║ █╗ ██║███████║█████╗██║  ██║█████╗  ██║   ██║
 *    ██║     ██║██║███╗██║██╔══██║╚════╝██║  ██║██╔══╝  ╚██╗ ██╔╝
 *    ███████╗██║╚███╔███╔╝██║  ██║      ██████╔╝███████╗ ╚████╔╝ 
 *    ╚══════╝╚═╝ ╚══╝╚══╝ ╚═╝  ╚═╝      ╚═════╝ ╚══════╝  ╚═══╝  
 *                                                                
 */


import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Startup from './components/startup';
import Dashboard from './components/dashboard';
import { useState } from 'react';

function App() {
  // Add a state variable to track if the startup animation has finished
  const [startupFinished, setStartupFinished] = useState(false);

  // Define a function to handle the startup animation finish event
  const handleStartupFinish = () => {
    setStartupFinished(true);
  };

  // Render the routes conditionally based on the startup status
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Startup onFinish={handleStartupFinish} />} />
        {startupFinished ? (
          <Route path="/dashboard/*" element={<Dashboard />} />
        ) : (
          <Route
            path="/dashboard/*"
            element={<Navigate to="/" replace />}
          />
        )}
        <Route path="/*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

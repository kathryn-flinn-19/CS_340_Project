/** SOURCE: Exploration --- Web Application Technology
 * Link: https://canvas.oregonstate.edu/courses/2007765/pages/exploration-web-application-technology-2?module_item_id=25664612
 * Date Accessed: 7/30/2025
 * Notes: We were instructed to copy and paste this code into this file, but I am still
   citing it anyway for full transparency.
 */

import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Pages
import Home from './pages/Home';
import BSGPeople from './pages/BSGPeople';

// Components
import Navigation from './components/Navigation';

// Define the backend port and URL for API requests
const backendPort = 55864;  // Use the port you assigned to the backend server, this would normally go in a .env file
const backendURL = `http://classwork.engr.oregonstate.edu:${backendPort}`;

function App() {

    return (
        <>
            <Navigation />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/bsg-people" element={<BSGPeople backendURL={backendURL} />} />
            </Routes>
        </>
    );

} export default App;
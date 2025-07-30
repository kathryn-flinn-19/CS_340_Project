/** SOURCE: Exploration --- Web Application Technology
 * Link: https://canvas.oregonstate.edu/courses/2007765/pages/exploration-web-application-technology-2?module_item_id=25664612
 * Date Accessed: 7/30/2025
 * Notes: We were instructed to copy and paste this code into this file, but I am still
   citing it anyway for full transparency.
 */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </StrictMode>,
);
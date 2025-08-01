/** SOURCE: Exploration --- Web Application Technology
 * Link: https://canvas.oregonstate.edu/courses/2007765/pages/exploration-web-application-technology-2?module_item_id=25664612
 * Date Accessed: 7/30/2025
 * Notes: We were instructed to copy and paste this code into this file, but I am still
   citing it anyway for full transparency.
 */

// ########################################
// ########## SETUP

// Database
const db = require('./database/db-connector');

// Express
const express = require('express');
const app = express();

// Middleware
const cors = require('cors');
app.use(cors({ credentials: true, origin: "*" }));
app.use(express.json()); // this is needed for post requests


const PORT = 55864;

// ########################################
// ########## ROUTE HANDLERS

// READ ROUTES
app.get('/patients', async (req, res) => {
    try {
        // Create and execute our queries (basic select for now)
        const query1 = `SELECT * from Patients;`;
        const [patients] = await db.query(query1);
    
        res.status(200).json(patients);  // Send the results to the frontend

    } catch (error) {
        console.error("Error executing queries:", error);
        // Send a generic error message to the browser
        res.status(500).send("An error occurred while executing the database queries.");
    }
    
});

app.get('/prescriptions', async (req, res) => {
    try {
        // Create and execute our queries
        const query1 = `SELECT * from Prescriptions;`;
        const [prescriptions] = await db.query(query1);
    
        res.status(200).json(prescriptions);  // Send the results to the frontend

    } catch (error) {
        console.error("Error executing queries:", error);
        // Send a generic error message to the browser
        res.status(500).send("An error occurred while executing the database queries.");
    }
    
});

app.get('/prescription-meds', async (req, res) => {
    try {
        // Create and execute our queries
        
        const query1 = `SELECT * from PrescriptionMeds;`;
        const [prescriptionMeds] = await db.query(query1);
        res.status(200).json(prescriptionMeds);  // Send the results to the frontend

    } catch (error) {
        console.error("Error executing queries:", error);
        // Send a generic error message to the browser
        res.status(500).send("An error occurred while executing the database queries.");
    }
    
});

app.get('/meds', async (req, res) => {
    try {
        // Create and execute our queries

        const query1 = `SELECT * from Meds;`;
        const [meds] = await db.query(query1);
    
        res.status(200).json(meds);  // Send the results to the frontend

    } catch (error) {
        console.error("Error executing queries:", error);
        // Send a generic error message to the browser
        res.status(500).send("An error occurred while executing the database queries.");
    }
    
});

app.get('/sales', async (req, res) => {
    try {
        // Create and execute our queries
        
        const query1 = `SELECT * from Sales;`;
        const [sales] = await db.query(query1);
    
        res.status(200).json(sales);  // Send the results to the frontend

    } catch (error) {
        console.error("Error executing queries:", error);
        // Send a generic error message to the browser
        res.status(500).send("An error occurred while executing the database queries.");
    }
    
});

// ########################################
// ########## LISTENER

app.listen(PORT, function () {
    console.log('Express started on http://classwork.engr.oregonstate.edu:' + PORT + '; press Ctrl-C to terminate.');
});
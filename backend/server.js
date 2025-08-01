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


const PORT = 52810;

// ########################################
// ########## ROUTE HANDLERS

/**
 * -- Display Patients full name, birthdate, phonenumber, and email on Patients page.
SELECT patientID, firstName, lastName, birthDate, phoneNumber, emailAddress
FROM Patients;

-- INSERT new patient.
INSERT INTO Patients (firstName, lastName, birthDate, phoneNumber, emailAddress)
VALUES (@firstNameInput, @lastNameInput, @birthDateInput, @phoneNumberInput, @emailAddressInput);

-- Display Meds name, dosage form, strength, unit and quantity.
SELECT medicationID, name, dosageForm, dosageStrength, dosageUnit, quantity
FROM Meds;

-- UPDATE the quantity of a medication.
SELECT medicationID, name, dosageForm, dosageStrength, dosageUnit, quantity
FROM Meds
WHERE medicationID = @med_ID_SELECTed_FROM_display_med_page;

UPDATE Meds
SET quantity = @quantityInput
WHERE medicationID = @med_ID_FROM_the_update_form;

-- Display Prescriptions patient name, doctor name, date issued, and refills
SELECT prescriptionID, concat(Patients.firstName,' ',Patients.lastName) AS patientID, doctorName, dateIssued, numRefills
FROM Prescriptions
INNER JOIN Patients ON Prescriptions.patientID = Patients.patientID;

-- DELETE a prescription.
DELETE FROM Prescriptions 
WHERE prescriptionID = @prescription_ID_selected_from_display_prescription_page;

-- Display PrescriptionsMeds prescriptionID, Med name, quantity filled, date filled, and subtotal paid.
SELECT ID, prescriptionID, Meds.name AS medicationID, quantityFilled, dateFilled, subTotal
FROM PrescriptionMeds
INNER JOIN Meds ON PrescriptionMeds.medicationID = Meds.medicationID;

-- Display Sales salesID, prescriptionID, sale date, and total amount.
SELECT saleID, prescriptionID, saleDate, totalAmount
FROM Sales;
 * 
 */

// READ ROUTES
app.get('/patients', async (req, res) => {
    try {
        // Create and execute our queries (basic select for now)
        const query1 = `SELECT patientID, firstName, lastName, birthDate, phoneNumber, emailAddress FROM Patients;`;
        const [patients] = await db.query(query1);

        res.status(200).json({ patients });  // Send the results to the frontend

    } catch (error) {
        console.error("Error executing queries:", error);
        // Send a generic error message to the browser
        res.status(500).send("An error occurred while executing the database queries.");
    }
    
});

app.get('/prescriptions', async (req, res) => {
    try {
        // Create and execute our queries
        const query1 = `SELECT prescriptionID, concat(Patients.firstName,' ',Patients.lastName) AS patientID, doctorName, dateIssued, numRefills FROM Prescriptions INNER JOIN Patients ON Prescriptions.patientID = Patients.patientID;`;
        const [prescriptions] = await db.query(query1);
    
        res.status(200).json({ prescriptions });  // Send the results to the frontend

    } catch (error) {
        console.error("Error executing queries:", error);
        // Send a generic error message to the browser
        res.status(500).send("An error occurred while executing the database queries.");
    }
    
});

app.get('/prescription-meds', async (req, res) => {
    try {
        // Create and execute our queries
        
        const query1 = `SELECT ID, prescriptionID, Meds.name AS medicationID, quantityFilled, dateFilled, subTotal FROM PrescriptionMeds INNER JOIN Meds ON PrescriptionMeds.medicationID = Meds.medicationID;`;
        const [prescriptionMeds] = await db.query(query1);
        res.status(200).json({ prescriptionMeds });  // Send the results to the frontend

    } catch (error) {
        console.error("Error executing queries:", error);
        // Send a generic error message to the browser
        res.status(500).send("An error occurred while executing the database queries.");
    }
    
});

app.get('/meds', async (req, res) => {
    try {
        // Create and execute our queries

        const query1 = `SELECT medicationID, name, dosageForm, dosageStrength, dosageUnit, quantity FROM Meds;`;
        const [meds] = await db.query(query1);
    
        res.status(200).json({ meds });  // Send the results to the frontend

    } catch (error) {
        console.error("Error executing queries:", error);
        // Send a generic error message to the browser
        res.status(500).send("An error occurred while executing the database queries.");
    }
    
});

app.get('/sales', async (req, res) => {
    try {
        // Create and execute our queries
        
        const query1 = `SELECT saleID, prescriptionID, saleDate, totalAmount FROM Sales`;
        const [sales] = await db.query(query1);
    
        res.status(200).json({ sales });  // Send the results to the frontend

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
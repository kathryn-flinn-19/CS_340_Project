/**
 * Source: https://www.geeksforgeeks.org/web-tech/express-js-res-redirect-function/
 * Reason for Use: I used the above website to figure out how to automatically redirect
                    to another page after a new PrescriptionMed is deleted. I just needed
                    the function syntax.
 * Date accessed: 8/7/2025
 */

// ########################################
// ########## SETUP

// Express
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// production port 
const PORT = 50348;

// development port 
//const PORT = 52028;

// Database
const db = require('./database/db-connector');

// Handlebars
const { engine } = require('express-handlebars'); // Import express-handlebars engine
app.engine('.hbs', engine({ extname: '.hbs' })); // Create instance of handlebars
app.set('view engine', '.hbs'); // Use handlebars engine for *.hbs files.

// ########################################
// ########## ROUTE HANDLERS

// READ ROUTES
app.get('/', async function (req, res) {
    try {
        res.render('home'); // Render the home.hbs file
    } catch (error) {
        console.error('Error rendering page:', error);
        // Send a generic error message to the browser
        res.status(500).send('An error occurred while rendering the page.');
    }
});

app.get('/patients', async function (req, res) {
    try {
        // Create and execute our queries
        // simple select to get all patient attributes
        const query1 = `SELECT patientID, firstName, lastName, birthDate, phoneNumber, emailAddress FROM Patients;`;
        const [patients] = await db.query(query1);

        res.render('patients', { patients: patients });
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});

app.get('/prescriptions', async function (req, res) {
    try {
        // Create and execute our queries
        // grabbing prescription info AND the name of the patient each is associated with
        const query1 = `SELECT prescriptionID, concat(Patients.firstName,' ',Patients.lastName) AS patientID, doctorName, dateIssued, numRefills FROM Prescriptions INNER JOIN Patients ON Prescriptions.patientID = Patients.patientID;`;
        const [prescriptions] = await db.query(query1);

        res.render('prescriptions', { prescriptions: prescriptions });
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});

app.get('/meds', async function (req, res) {
    try {
        // Create and execute our queries
        // simple select to get all meds attributes
        const query1 = `SELECT medicationID, name, dosageForm, dosageStrength, dosageUnit, quantity FROM Meds;`;
        const [meds] = await db.query(query1);

        res.render('meds', { meds: meds });
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});

app.get('/sales', async function (req, res) {
    try {
        // Create and execute our queries
        // simple select to get all meds attributes
        const query1 = `SELECT saleID, prescriptionID, saleDate, totalAmount FROM Sales`;
        const [sales] = await db.query(query1);

        res.render('sales', { sales: sales });
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});

app.get('/prescription-meds', async function (req, res) {
    try {
        // Create and execute our queries
        // grabbing prescriptionMed info w/ the NAME of each med, as opposed to just the id
        const query1 = `SELECT ID, prescriptionID, Meds.name AS medicationID, quantityFilled, dateFilled, subTotal FROM PrescriptionMeds INNER JOIN Meds ON PrescriptionMeds.medicationID = Meds.medicationID;`;
        const [prescriptionMeds] = await db.query(query1);

        const query2 = `SELECT * FROM Meds`;
        const [meds] = await db.query(query2);
    
        res.render('prescription-meds', { prescriptionMeds: prescriptionMeds, meds: meds });
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});

app.get('/prescription-meds/update/:id', async function (req, res){
    try {
        const query = `SELECT PrescriptionMeds.ID, prescriptionID, Meds.name AS medicationID, Meds.dosageForm, \ 
        Meds.dosageStrength, Meds.dosageUnit, quantityFilled, dateFilled, subTotal \ 
        FROM PrescriptionMeds JOIN Meds ON PrescriptionMeds.medicationID = Meds.medicationID \
        AND PrescriptionMeds.ID = ${req.params.id};`;
        const [prescriptionMedInfo] = await db.query(query);

        res.render('prescription-med-update', { prescriptionMedInfo: prescriptionMedInfo });
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});

app.get('/prescription-meds/delete/', async function(req, res) {
    try {
        const query1 = `CALL sp_delete_prescription_med(${req.query.delete_prescriptionMed_id})`;
        await db.query(query1);

        res.redirect('/prescription-meds');
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser

        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});

app.get('/reset', async function(req, res) {
    try {
        const query1 = `CALL sp_load_pharmdb();`;
        await db.query(query1);

        // redirect to home page
        res.redirect('/');
    } catch (error) {
        console.error('Error executing queries: ', error);

        res.status(500).send('An error occured while executing the database queries.');
    }
});

// ########################################
// ########## LISTENER

app.listen(PORT, function () {
    console.log(
        'Express started on http://localhost:' +
            PORT +
            '; press Ctrl-C to terminate.'
    );
});
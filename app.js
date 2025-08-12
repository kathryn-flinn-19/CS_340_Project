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
//const PORT = 50348;

// development port 
const PORT = 50321;

// Database
const db = require('./database/db-connector');

// Handlebars
const { engine } = require('express-handlebars'); // Import express-handlebars engine
app.engine('.hbs', engine({ extname: '.hbs' })); // Create instance of handlebars
app.set('view engine', '.hbs'); // Use handlebars engine for *.hbs files.

// helper functions:

// this function iterates through the given array and changes the date parameter of each
// item in the array such that the date matches the following format: 'YYYY-MM-DD' 
function formatDates(arrToUpdate, dateParamName){
    for(let i = 0; i < arrToUpdate.length; i++){
        let zeroString = '0';
        // note that we have to use square brackets to ensure that
        // we can actually access the dateParamName variable value
        let dateString = (arrToUpdate[i])[dateParamName];

        // grabbing the year, month, and day
        let year = dateString.getFullYear();
        // since getMonth starts at 0 (i.e., january = 0), we have to 
        // increment month to make it consistent with our date formatting
        let month = dateString.getMonth();
        month++;
        let day = dateString.getDate();

        // updating the day value such that there is a preceeding 0 as necessary
        if(day < 10){
            day = zeroString.concat(day);
            zeroString = '0';
        }

        // updating the month value to add a preceeding 0 as necessary
        if(month < 10){
            month = zeroString.concat(month);
            zeroString = '0';
        }

        // putting it all together into the formatted date via concat
        let formattedDate = ''; 
        formattedDate = formattedDate.concat(year, '-', month, '-', day);

        // don't forget to actually update the array item's date value!
        (arrToUpdate[i])[dateParamName] = formattedDate;
    }
}

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

        formatDates(patients, 'birthDate');

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

        formatDates(prescriptions, 'dateIssued');

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

        formatDates(sales, 'saleDate');

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
        const query1 = `SELECT ID, prescriptionID, concat(name, ' ', dosageForm, ' ', dosageStrength, ' ', dosageUnit) as medication, \
            quantityFilled, dateFilled, subTotal FROM PrescriptionMeds INNER JOIN Meds ON PrescriptionMeds.medicationID = Meds.medicationID;`;
        const [prescriptionMeds] = await db.query(query1);

        formatDates(prescriptionMeds, 'dateFilled');

        const query2 = `SELECT medicationID, concat(name, ' ', dosageForm, ' ', dosageStrength, ' ', dosageUnit) as info \
            FROM Meds`;
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
        const query1 = `SELECT PrescriptionMeds.ID, prescriptionID, quantityFilled, dateFilled, subTotal \ 
            FROM PrescriptionMeds JOIN Meds ON PrescriptionMeds.medicationID = Meds.medicationID \
            AND PrescriptionMeds.ID = ${req.params.id};`;
        const [prescriptionMedInfo] = await db.query(query1);

        formatDates(prescriptionMedInfo, 'dateFilled');

        const query2 = `SELECT Meds.medicationID, concat(Meds.name, ' ', Meds.dosageForm, ' ', Meds.dosageStrength, ' ', \
            Meds.dosageUnit) AS info FROM Meds \
            WHERE Meds.medicationID = (SELECT medicationID FROM PrescriptionMeds \
                WHERE PrescriptionMeds.ID = ${req.params.id});`;
        const [selectedMed] = await db.query(query2);

        const query3 = `SELECT Meds.medicationID, concat(Meds.name, ' ', Meds.dosageForm, ' ', Meds.dosageStrength, ' ', \
            Meds.dosageUnit) AS info FROM Meds \
            WHERE NOT Meds.medicationID = (SELECT medicationID FROM PrescriptionMeds \
                WHERE PrescriptionMeds.ID = ${req.params.id});`;
        const [otherMeds] = await db.query(query3);

        res.render('prescription-med-update', { prescriptionMedInfo: prescriptionMedInfo, selectedMed: selectedMed, otherMeds: otherMeds });
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});

app.post('/prescription-meds/update/:id/', async function (req, res){
    try {
        let data = req.body;
        
        // make sure to go back and sanitize data

        console.log(data.update_prescriptionMed_dateFilled);

        const query1 = `CALL sp_update_PrescriptionMed(?, ?, ?, ?, ?, ?);`;

        await db.query(query1, [
            req.params.id,
            data.update_prescriptionMed_prescriptionID,
            data.update_prescriptionMed_info,
            data.update_prescriptionMed_quantity,
            data.update_prescriptionMed_dateFilled,
            data.update_prescriptionMed_subtotal
        ]);

        res.redirect('/prescription-meds');

        //res.render('prescription-med-update', { prescriptionMedInfo: prescriptionMedInfo, selectedMed: selectedMed, otherMeds: otherMeds });
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

app.post('/prescription-meds/create', async function(req, res) {
    try {
        // sanitize inputs in the future

        let data = req.body;

        const query1 = `CALL sp_add_PrescriptionMed(?, ?, ?, ?, ?);`;

        await db.query(query1, [
            data.create_prescriptionMed_prescriptionID,
            data.create_prescriptionMed_med,
            data.create_prescriptionMed_quantity,
            data.create_prescriptionMed_dateFilled,
            data.create_prescriptionMed_subTotal
        ]);
        
        res.redirect('/prescription-meds');
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser

        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
})

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
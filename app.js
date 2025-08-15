/**
 * Citation
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
//const PORT = 51807;

// Database
const db = require('./database/db-connector');

// Handlebars
const { engine } = require('express-handlebars'); // Import express-handlebars engine
app.engine('.hbs', engine({ extname: '.hbs' })); // Create instance of handlebars
app.set('view engine', '.hbs'); // Use handlebars engine for *.hbs files.

// helper functions:

// this function iterates through the given array and changes the date parameter of each
// item in the array such that the date matches the following format: 'YYYY-MM-DD' 
// the concept behind this function was inspired by Justice Peyton from this Ed Discussion
// post: https://edstem.org/us/courses/79587/discussion/6854326?answer=15925074
// notably, the implementation details are completely different, but the idea of manipulating
// the date-time string came from this post. 
// Additionally, this article helped me understand the syntax for the JS date manipulation
// functions used: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date 
function formatDates(arrToUpdate, dateParamName){
    for(let i = 0; i < arrToUpdate.length; i++){

        let zeroString = '0';
        // note that we have to use square brackets to ensure that
        // we can actually access the dateParamName variable value
        let dateString = (arrToUpdate[i])[dateParamName];
        if(dateString === null){
            continue;
        }

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

        // formatting dates in YYYY-MM-DD format
        formatDates(patients, 'birthDate');

        // rendering patients page
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
        
        // grabbing prescription info AND the name of the patient each is associated with
        const query1 = `SELECT prescriptionID, Prescriptions.patientID, \
            concat(Patients.firstName,' ',Patients.lastName) AS patientName, doctorName, \
            dateIssued, numRefills FROM Prescriptions \
            JOIN Patients ON Prescriptions.patientID = Patients.patientID;`;
        const [prescriptions] = await db.query(query1);

        // again formatting the dates
        formatDates(prescriptions, 'dateIssued');

        // rendering prescriptions page
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
        
        // simple select to get all meds attributes
        const query1 = `SELECT medicationID, name, dosageForm, dosageStrength, dosageUnit, quantity FROM Meds;`;
        const [meds] = await db.query(query1);

        // rendering meds page
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
        
        // simple select to get all sales attributes
        const query1 = `SELECT saleID, prescriptionID, saleDate, totalAmount FROM Sales`;
        const [sales] = await db.query(query1);

        // formatting dates
        formatDates(sales, 'saleDate');

        // render sales page
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
        
        // grabbing prescriptionMed info w/ the info about its med as well
        const query1 = `SELECT ID, prescriptionID, PrescriptionMeds.medicationID, \
            concat(name, ' ', dosageForm, ' ', dosageStrength, ' ', dosageUnit) as medInfo, \
            quantityFilled, dateFilled, subTotal FROM PrescriptionMeds \
            JOIN Meds ON PrescriptionMeds.medicationID = Meds.medicationID;`;
        const [prescriptionMeds] = await db.query(query1);

        // formatting dates
        formatDates(prescriptionMeds, 'dateFilled');

        // grabbing all med info for our create form med dropdown
        const query2 = `SELECT medicationID, concat(name, ' ', dosageForm, ' ', dosageStrength, ' ', dosageUnit) as info \
            FROM Meds ORDER BY medicationID;`;
        const [meds] = await db.query(query2);
    
        // grabbing all prescriptions for our create form prescription dropdown
        const query3 = `SELECT prescriptionID, dateIssued, concat(firstName, ' ', lastName) as name, \
            birthDate FROM Prescriptions JOIN Patients ON Prescriptions.patientID = Patients.patientID;`;
        const [prescriptions] = await db.query(query3);

        // formatting the dates
        formatDates(prescriptions, 'dateIssued');
        formatDates(prescriptions, 'birthDate');

        // rendering prescription-meds page
        res.render('prescription-meds', { 
            prescriptionMeds: prescriptionMeds, 
            meds: meds, 
            prescriptions: prescriptions 
        });
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});

// for loading the update page
app.get('/prescription-meds/update/:id', async function (req, res){
    try {
        // gotta make sure the id value in the url is actually a number and that someone
        // isn't trying to do something fishy (i.e. sql injection)
        if(isNaN(parseInt(req.params.id))){
            res.redirect('/prescription-meds');
        } else {
        
            // grabbing all info about the PrescriptionMed given by req.params.id
            const query1 = `SELECT PrescriptionMeds.ID, PrescriptionMeds.medicationID, \
                prescriptionID, quantityFilled, dateFilled, subTotal \ 
                FROM PrescriptionMeds JOIN Meds ON PrescriptionMeds.medicationID = Meds.medicationID \
                AND PrescriptionMeds.ID = ${req.params.id};`;
            const [prescriptionMedInfo] = await db.query(query1);

            // formatting date in YYYY-MM-DD
            formatDates(prescriptionMedInfo, 'dateFilled');

            // grabbing info about the medication the PrescriptionMed is associated with --- this will be the default selected
            // option in our medication dropdown in the update form
            const query2 = `SELECT Meds.medicationID, concat(Meds.name, ' ', Meds.dosageForm, ' ', \
                Meds.dosageStrength, ' ', Meds.dosageUnit) AS info FROM Meds \
                WHERE Meds.medicationID = (SELECT medicationID FROM PrescriptionMeds \
                    WHERE PrescriptionMeds.ID = ${req.params.id});`;
            const [selectedMed] = await db.query(query2);

            // grabs all other meds that AREN'T the selected one, to populate the rest of the select options for the medication
            const query3 = `SELECT Meds.medicationID, concat(Meds.name, ' ', Meds.dosageForm, ' ', Meds.dosageStrength, ' ', \
                Meds.dosageUnit) AS info FROM Meds \
                WHERE NOT Meds.medicationID = (SELECT medicationID FROM PrescriptionMeds \
                    WHERE PrescriptionMeds.ID = ${req.params.id}) ORDER BY Meds.medicationID;`;
            const [otherMeds] = await db.query(query3);

            // grabbing info about the selected prescription (making sure to get more than the id, so we can actually identify which 
            // prescription is which). this will be the default selected option for the prescription dropdown in the update form
            const query4 = `SELECT prescriptionID, dateIssued, concat(firstName, ' ', lastName) as name, birthDate FROM Prescriptions \
                JOIN Patients ON Prescriptions.patientID = Patients.patientID AND Prescriptions.prescriptionID = ${prescriptionMedInfo[0].prescriptionID};`;
            const [selectedPrescription] = await db.query(query4);

            // have to format the dates
            formatDates(selectedPrescription, 'dateIssued');
            formatDates(selectedPrescription, 'birthDate');
            
            // grabbing the rest of the prescriptions to populate the rest of the prescription dropdown's options
            const query5 = `SELECT prescriptionID, dateIssued, concat(firstName, ' ', lastName) as name, birthDate FROM Prescriptions \
                JOIN Patients ON Prescriptions.patientID = Patients.patientID AND NOT Prescriptions.prescriptionID = ${prescriptionMedInfo[0].prescriptionID};`;
            const [otherPrescriptions] = await db.query(query5);

            // again have to format the dates
            formatDates(otherPrescriptions, 'dateIssued');
            formatDates(otherPrescriptions, 'birthDate');

            // rendering the page and setting up all of the stuff we grabbed above
            res.render('prescription-med-update', 
                { prescriptionMedInfo: prescriptionMedInfo, 
                selectedMed: selectedMed, 
                otherMeds: otherMeds, 
                selectedPrescription: selectedPrescription,
                otherPrescriptions: otherPrescriptions 
                });
        }
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});

// for submitting the update form
app.post('/prescription-meds/update/:id/', async function (req, res){
    try {
        let data = req.body;
        
        // data sanitizing --- logically, this should never get activated (the browser should force
        // the user to only enter a number for these inputs), but this is good practice regardless
        // additionally --- the dropdowns prevent invalid values from being selected, and the date
        // must have a value selected, so those don't need to be checked
        let reason;
        let failed = 0;
        if (isNaN(parseInt(data.update_prescriptionMed_quantity))){
            reason = 'please enter a valid quantity';
            failed = 1;
        } else if (isNaN(parseInt(data.update_prescriptionMed_subtotal))){
            reason = 'please enter a valid subTotal';
            failed = 1;
        }

        // update value to NULL as opposed to a blank value (which would come back as the default
        // date of 1899 otherwise)
        if(data.update_prescriptionMed_dateFilled === ''){
            data.update_prescriptionMed_dateFilled = null;
        }

        if(failed === 1){
            // leading user to a page telling them that the update failed and why
            res.render('update-failed', { reason: reason });
        } else {
            // parameterizing query to prevent sql injection
            const query1 = `CALL sp_update_PrescriptionMed(?, ?, ?, ?, ?, ?);`;

            await db.query(query1, [
                req.params.id,
                data.update_prescriptionMed_prescriptionID,
                data.update_prescriptionMed_info,
                data.update_prescriptionMed_quantity,
                data.update_prescriptionMed_dateFilled,
                data.update_prescriptionMed_subtotal
            ]);

            // after the update successfully goes through, redirect to prev page
            res.redirect('/prescription-meds');
        }
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});


app.post('/prescription-meds/delete/', async function(req, res) {
    try {
        let data = req.body;
        
        // parameterize stored procedure call to prevent sql injections
        const query1 = `CALL sp_delete_prescription_med(?)`;
        await db.query(query1, [data.delete_prescriptionMed_id]);

        // redirecting back to the prescription-meds page
        res.redirect('/prescription-meds');
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser

        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});

// for submitting the create form
app.post('/prescription-meds/create', async function(req, res) {
    try {
        let data = req.body;

        // sanitizing data --- checking if a field was not filled out, or if
        // an invalid value was put
        let reason;
        let failed = 0;
        if(data.create_prescriptionMed_prescriptionID === undefined){
            reason = 'please select a prescription';
            failed = 1;
        } else if(data.create_prescriptionMed_med === undefined){
            reason = 'please select a medication';
            failed = 1;
        } else if (isNaN(parseInt(data.create_prescriptionMed_quantity))){
            reason = 'please enter a valid quantity';
            failed = 1;
        } else if (isNaN(parseInt(data.create_prescriptionMed_subTotal))){
            reason = 'please enter a valid subTotal';
            failed = 1;
        }

        // insert NULL as opposed to a blank value
        if(data.create_prescriptionMed_dateFilled === ''){
            data.create_prescriptionMed_dateFilled = null;
        }

        // in case of failure, bring the user to a page informing them of the 
        // failure and giving them a reason (note --- node doesn't support 
        // window.alert(), which is why I opted for a separate page. I also
        // didn't want the user to have just a plain white page with error text
        // --- i wanted it to feel more polished than that)
        if(failed === 1){
            res.render('create-failed', { reason: reason });
        } else {

            // parameterized sp call to prevent sql injection
            const query1 = `CALL sp_add_PrescriptionMed(?, ?, ?, ?, ?);`;

            await db.query(query1, [
                data.create_prescriptionMed_prescriptionID,
                data.create_prescriptionMed_med,
                data.create_prescriptionMed_quantity,
                data.create_prescriptionMed_dateFilled,
                data.create_prescriptionMed_subTotal
            ]);
            
            // redirect to prescription-meds page --- since the data has been 
            // sanitized, the create was successful
            res.redirect('/prescription-meds');
    }
    
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser

        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
})

/**
 * Citation: 
 * Link: https://edstem.org/us/courses/79587/discussion/6858972?answer=15934533
 * Reason for use: I used this comment to figure out how to restore a trigger after resetting the
 * database. query2 in app.get('/reset') is *based on* the method used in this comment's code.
 * Date accessed: 8/13/2025
 */
app.get('/reset', async function(req, res) {
    try {
        // resetting database w/ stored procedure
        const query1 = `CALL sp_load_pharmdb();`;
        await db.query(query1);

        // manually recreating trigger to drop Prescriptions without associated PrescriptionMeds
        const query2 = `CREATE TRIGGER trigger_delete_orphan_prescription
            AFTER DELETE ON PrescriptionMeds
            FOR EACH ROW
            BEGIN
                -- Check if a prescriptionID no longer exists in PrescriptionMeds
                IF NOT EXISTS (
                    SELECT 1 FROM PrescriptionMeds WHERE PrescriptionMeds.prescriptionID = OLD.prescriptionID
                ) THEN
                    DELETE FROM Prescriptions WHERE prescriptionID = OLD.prescriptionID;
                END IF;
            END;`;
        await db.query(query2);

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
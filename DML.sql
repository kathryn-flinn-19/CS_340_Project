-- Display Patients full name, birthdate, phonenumber, and email on Patients page.
SELECT patientID, firstName, lastName, birthDate, phoneNumber, emailAddress
FROM Patients;

-- INSERT new patient.
-- INSERT INTO Patients (firstName, lastName, birthDate, phoneNumber, emailAddress)
-- VALUES (@firstNameInput, @lastNameInput, @birthDateInput, @phoneNumberInput, @emailAddressInput);

-- Display Meds name, dosage form, strength, unit and quantity.
SELECT medicationID, name, dosageForm, dosageStrength, dosageUnit, quantity
FROM Meds;

-- UPDATE the quantity of a medication.
-- SELECT medicationID, name, dosageForm, dosageStrength, dosageUnit, quantity
-- FROM Meds
-- WHERE medicationID = @med_ID_SELECTed_FROM_display_med_page;

-- UPDATE Meds
-- SET quantity = @quantityInput
-- WHERE medicationID = @med_ID_FROM_the_update_form;

-- Display Prescriptions patient name, doctor name, date issued, and refills
SELECT prescriptionID, concat(Patients.firstName,' ',Patients.lastName) AS patientID, doctorName, dateIssued, numRefills
FROM Prescriptions
INNER JOIN Patients ON Prescriptions.patientID = Patients.patientID;

-- DELETE a prescription.
-- DELETE FROM Prescriptions 
-- WHERE prescriptionID = @prescription_ID_selected_from_display_prescription_page;

-- Display PrescriptionsMeds prescriptionID, Med name, quantity filled, date filled, and subtotal paid.
SELECT ID, prescriptionID, Meds.name AS medicationID, quantityFilled, dateFilled, subTotal
FROM PrescriptionMeds
INNER JOIN Meds ON PrescriptionMeds.medicationID = Meds.medicationID;

-- SELECT PrescriptionMeds attributes to allow for updating:
SELECT PrescriptionMeds.ID, prescriptionID, Meds.name AS medicationID, Meds.dosageForm,  
        Meds.dosageStrength, Meds.dosageUnit, quantityFilled, dateFilled, subTotal 
        FROM PrescriptionMeds JOIN Meds ON PrescriptionMeds.medicationID = Meds.medicationID 
        AND PrescriptionMeds.ID = @prescriptionMed_ID_FROM_the_update_form;

-- UPDATE query for PrescriptionMeds to be added

-- DELETE query for PrescriptionMeds can now be found in a sp

-- Display Sales salesID, prescriptionID, sale date, and total amount.
SELECT saleID, prescriptionID, saleDate, totalAmount
FROM Sales;

-- citations: none
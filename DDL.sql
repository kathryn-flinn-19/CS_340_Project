SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;

DROP TABLE IF EXISTS Patients;
CREATE TABLE Patients (
    patientID int NOT NULL AUTO_INCREMENT,
    firstName varchar(45) not null,
    lastName varchar(45) not null,
    birthDate date not null,
    phoneNumber bigint,
    emailAddress varchar(45),
    PRIMARY KEY (patientID)
);

INSERT INTO Patients (firstName, lastName, birthDate, phoneNumber, emailAddress) 
VALUES ('John', 'Smith', '1996-01-10', '1234567890', 'john.smith@abc.com'),
('Carly', 'Jones', '1972-04-26', '4150000000', NULL),
('Lily', 'Fisher', '2002-09-02', NULL, 'lfish@gmail.com'),
('Riley', 'King', '1999-02-14', '7891012345', NULL),
('Chris', 'Jacobs', '1965-08-29', NULL, NULL);

-----------------------------------------------------------------------------------------------

DROP TABLE IF EXISTS Prescriptions;
CREATE TABLE Prescriptions (
    prescriptionID int NOT NULL AUTO_INCREMENT,
    patientID int not null,
    doctorName varchar(45) not null,
    dateIssued date not null,
    numRefills int not null DEFAULT 0,
    PRIMARY KEY (prescriptionID),
    FOREIGN KEY (patientID) REFERENCES Patients(patientID)
);

INSERT INTO Prescriptions (patientID, doctorName, dateIssued, numRefills) 
VALUES (1, 'Abby Connor', '2025-07-01', 1),
(1, 'Abby Connor', '2025-07-15', 0),
(4, 'Stephen Fin', '2025-06-28', 1),
(5, 'Jeff Travis', '2025-07-24', 1),
(3, 'Kelsey Nam', '2025-06-01', 1);

-----------------------------------------------------------------------------------------------

DROP TABLE IF EXISTS Meds;
CREATE TABLE Meds (
    medicationID int NOT NULL AUTO_INCREMENT,
    name varchar(45) not null,
    dosageForm varchar(45) not null,
    dosageStrength decimal(10,2) not null,
    dosageUnit varchar(45) not null,
    quantity int not null,
    PRIMARY KEY (medicationID) 
);

INSERT INTO Meds (name, dosageForm, dosageStrength, dosageUnit, quantity) 
VALUES ('Gabapentin', 'Capsule', 100, 'mg', 100),
('Dicyclomine', 'Capsule', 10, 'mg', 250),
('Ondansetron', 'Pill', 8, 'mg', 300),
('Amoxicillin', 'Liquid', 100, 'mg/mL', 125),
('Lisinopril', 'Tablet', 20, 'mg', 200);

-----------------------------------------------------------------------------------------------

DROP TABLE IF EXISTS PrescriptionMeds;
CREATE TABLE PrescriptionMeds (
    ID int NOT NULL AUTO_INCREMENT,
    prescriptionID int NOT NULL,
    medicationID int NOT NULL,
    quantityFilled int not null,
    dateFilled date not null,
    subTotal decimal(10,2) not null,
    PRIMARY KEY (ID),
    FOREIGN KEY (prescriptionID) REFERENCES Prescriptions(prescriptionID),
    FOREIGN KEY (medicationID) REFERENCES Meds(medicationID)
);

INSERT INTO PrescriptionMeds (prescriptionID, medicationID, quantityFilled, dateFilled, subTotal) 
VALUES (1, 3, 50, '2025-07-01', 30.00),
(1, 4, 25, '2025-07-01', 4.99),
(5, 3, 50, '2025-06-25', 35.99),
(3, 4, 20, '2025-06-28', 4.75),
(3, 3, 20, '2025-06-28', 10.00);

-----------------------------------------------------------------------------------------------

DROP TABLE IF EXISTS Sales;
CREATE TABLE Sales (
    saleID int NOT NULL AUTO_INCREMENT,
    prescriptionID int NOT NULL,
    saleDate date not null,
    totalAmount decimal(10,2) not null,
    PRIMARY KEY (saleID),
    FOREIGN KEY (prescriptionID) REFERENCES Prescriptions(prescriptionID)
);

INSERT INTO Sales (prescriptionID, saleDate, totalAmount) 
VALUES (1, '2025-07-01', 34.99),
(3, '2025-07-01', 14.75),
(5, '2025-06-28', 35.99),
(1, '2025-07-28', 34.99);



SET FOREIGN_KEY_CHECKS=1;
COMMIT;
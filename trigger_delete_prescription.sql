DROP TRIGGER IF EXISTS trigger_delete_orphan_prescription;
DELIMITER //

CREATE TRIGGER trigger_delete_orphan_prescription
AFTER DELETE ON PrescriptionMeds FOR EACH ROW
BEGIN
    IF NOT EXISTS (SELECT 1 FROM PrescriptionMeds WHERE PrescriptionMeds.prescriptionID = OLD.prescriptionID) 
    THEN
        DELETE FROM Prescriptions WHERE prescriptionID = OLD.prescriptionID;
    END IF;
END; //

DELIMITER ;

-- citations: none
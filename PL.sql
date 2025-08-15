DROP PROCEDURE IF EXISTS sp_delete_prescription_med;
DELIMITER //

CREATE PROCEDURE sp_delete_prescription_med (
    IN input_id INT
)
BEGIN
    -- Delete the PrescriptionMed row
    DELETE FROM PrescriptionMeds WHERE ID = input_id;
END //

DELIMITER ;

-- citations: none
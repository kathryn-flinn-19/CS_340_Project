import DeletePrescriptionForm from "./DeletePrescriptionForm";

const PrescriptionTableRow = ({ rowObject, backendURL, refreshPrescriptions }) => {
    return (
        <tr>
            {Object.values(rowObject).map((value, index) => (
                <td key={index}>{value}</td>
            ))}
            
            <DeletePrescriptionForm rowObject={rowObject} backendURL={backendURL} refreshPrescriptions={refreshPrescriptions} />

        </tr>
    );
};

export default PrescriptionTableRow;
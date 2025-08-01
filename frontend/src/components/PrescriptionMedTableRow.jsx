const PrescriptionMedTableRow = ({ rowObject, backendURL, refreshPrescriptionMeds }) => {
    return (
        <tr>
            {Object.values(rowObject).map((value, index) => (
                <td key={index}>{value}</td>
            ))}
            
        </tr>
    );
};

export default PrescriptionMedTableRow;
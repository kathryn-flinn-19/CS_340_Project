import UpdateMedForm from './UpdateMedForm';

const MedTableRow = ({ rowObject, backendURL, refreshMeds }) => {
    return (
        <tr>
            {Object.values(rowObject).map((value, index) => (
                <td key={index}>{value}</td>
            ))}
            
            <UpdateMedForm rowObject={rowObject} backendURL={backendURL} refreshMeds={refreshMeds} />
        </tr>
    );
};

export default MedTableRow;
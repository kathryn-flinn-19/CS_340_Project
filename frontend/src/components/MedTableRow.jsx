import UpdateMedForm from './UpdateMedForm';

const MedTableRow = ({ rowObject, backendURL, refreshMeds }) => {
    return (
        <tr>
            {Object.values(rowObject).map((value, index) => (
                <td key={index}>{value}</td>
            ))}
            
        </tr>
    );
};

export default MedTableRow;
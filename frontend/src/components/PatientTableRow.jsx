import CreatePatientForm from './CreatePatientForm';

const PatientTableRow = ({ rowObject, backendURL, refreshPatients }) => {
    return (
        <tr>
            {Object.values(rowObject).map((value, index) => (
                <td key={index}>{value}</td>
            ))}
        </tr>
    );
};

export default PatientTableRow;
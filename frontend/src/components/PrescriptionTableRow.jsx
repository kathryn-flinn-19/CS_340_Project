/** SOURCE: Exploration --- Web Application Technology
 * Link: https://canvas.oregonstate.edu/courses/2007765/pages/exploration-web-application-technology-2?module_item_id=25664612
 * Date Accessed: 7/31/2025
 * Notes: We were instructed to copy and paste the base code, but I am still citing it anyway for full transparency.
 */
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
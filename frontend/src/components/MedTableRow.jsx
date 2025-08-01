/** SOURCE: Exploration --- Web Application Technology
 * Link: https://canvas.oregonstate.edu/courses/2007765/pages/exploration-web-application-technology-2?module_item_id=25664612
 * Date Accessed: 7/31/2025
 * Notes: We were instructed to copy and paste the base code, but I am still citing it anyway for full transparency.
 */

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
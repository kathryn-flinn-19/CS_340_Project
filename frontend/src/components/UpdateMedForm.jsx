/** SOURCE: Exploration --- Web Application Technology
 * Link: https://canvas.oregonstate.edu/courses/2007765/pages/exploration-web-application-technology-2?module_item_id=25664612
 * Date Accessed: 7/31/2025
 * Notes: We were instructed to copy and paste the base code, but I am still citing it anyway for full transparency.
 */

function UpdateMedForm({ meds, backendURL, refreshMeds }){
    return (
    <>
        <h2>Update a Med</h2>
        <form className='cuForm'>
            <label htmlFor="update_med_id">Med to Update: </label>
            <select
                name="update_med_id"
                id="update_med_id"
            >
                <option value="">Select a Med</option>
                {meds.map((med) => (
                    <option key={med.medicationID} value={med.medicationID}>
                        {med.medicationID} - {med.name} {med.dosageForm} {med.dosageStrength} {med.dosageUnit}
                    </option>
                ))}
            </select>

            <label htmlFor="update_med_quantity">Quantity: </label>
            <input
                type="number"
                name="update_med_quantity"
                id="update_med_quantity"
            />

            <input type="submit" />
        </form>

        <p>This form will allow you to update the quantity of a medication.</p>
        </>
    );

} export default UpdateMedForm;
/** SOURCE: Exploration --- Web Application Technology
 * Link: https://canvas.oregonstate.edu/courses/2007765/pages/exploration-web-application-technology-2?module_item_id=25664612
 * Date Accessed: 7/31/2025
 * Notes: We were instructed to copy and paste the base code, but I am still citing it anyway for full transparency.
 */

function CreatePatientForm(){
    return(
    
    <>
        
        <h2>Create a Patient</h2>

        <form className='cuForm'>
            <label htmlFor="create_patient_fname">First Name: </label>
            <input
                type="text"
                name="create_patient_fname"
                id="create_patient_fname"
            />

            <label htmlFor="create_patient_lname">Last Name: </label>
            <input
                type="text"
                name="create_patient_lname"
                id="create_patient_lname"
            />

            <label htmlFor="create_patient_birthDate">Birth Date: </label>
            <input
                type="text"
                name="create_patient_birthDate"
                id="create_patient_birthDate"
            />
            
            <label htmlFor="create_patient_phoneNumber">Phone Number: </label>
            <input
                type="number"
                name="create_patient_phoneNumber"
                id="create_patient_phoneNumber"
            />

            <label htmlFor="create_patient_emailAddress">Email Address: </label>
            <input
                type="text"
                name="create_patient_emailAddress"
                id="create_patient_emailAddress"
            />

            <input type="submit" />
        </form>
    </>
    );
} export default CreatePatientForm;
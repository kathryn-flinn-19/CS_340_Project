/** SOURCE: Exploration --- Web Application Technology
 * Link: https://canvas.oregonstate.edu/courses/2007765/pages/exploration-web-application-technology-2?module_item_id=25664612
 * Date Accessed: 7/31/2025
 * Notes: We were instructed to copy and paste the base code, but I am still citing it anyway for full transparency.
 */

import { useState, useEffect } from 'react';
import PrescriptionTableRow from '../components/PrescriptionTableRow';
import DeletePrescriptionForm from "../components/DeletePrescriptionForm";

function Prescriptions({ backendURL }){
    const [prescriptions, setPrescriptions] = useState([]);
        
    const getData = async function () {
        try {
            // Make a GET request to the backend
            console.log(backendURL + '/prescriptions');

            const response = await fetch(backendURL + '/prescriptions');
            
            // Convert the response into JSON format
            const { prescriptions } = await response.json();
    
            // Update the patients state with the response data
            setPrescriptions(prescriptions);
            
        } catch (error) {
            // If the API call fails, print the error to the console
            console.log(error);
        }

    };

    // Load table on page load
    useEffect(() => {
        getData();
    }, []);

    return (
        <>
            <h1>Prescription Meds</h1>

            <table>
                <thead>
                    <tr>
                        {prescriptions.length > 0 && Object.keys(prescriptions[0]).map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {prescriptions.map((prescription, index) => (
                        <PrescriptionTableRow key={index} rowObject={prescription} backendURL={backendURL} refreshPrescriptions={getData}/>
                    ))}

                </tbody>
            </table>
            
            <p>This page will display all Prescriptions and allow the user to delete Prescriptions.</p>

        </>
    );
} export default Prescriptions;
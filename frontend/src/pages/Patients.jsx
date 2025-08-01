/** SOURCE: Exploration --- Web Application Technology
 * Link: https://canvas.oregonstate.edu/courses/2007765/pages/exploration-web-application-technology-2?module_item_id=25664612
 * Date Accessed: 7/31/2025
 * Notes: We were instructed to copy and paste this code into this file, but I am still
   citing it anyway for full transparency.
 */

import { useState, useEffect } from 'react';  // Importing useState for managing state in the component
import PatientTableRow from '../components/PatientTableRow';
import CreatePatientForm from '../components/CreatePatientForm';

function Patients ({ backendURL }) {

    // Set up a state variable `patients` to store and display the backend response
    const [patients, setPatients] = useState([]);


    const getData = async function () {
        try {
            // Make a GET request to the backend
            console.log(backendURL + '/patients');

            const response = await fetch(backendURL + '/patients');

            console.log(response);
            
            // Convert the response into JSON format
            const {patients} = await response.json();
    
            console.log(patients);

            // Update the patients state with the response data
            setPatients(patients);
            
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
            <h1>Patients</h1>

            <table>
                <thead>
                    <tr>
                        {patients.length > 0 && Object.keys(patients[0]).map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {patients.map((patient, index) => (
                        <PatientTableRow key={index} rowObject={patient} backendURL={backendURL} refreshPatients={getData}/>
                    ))}

                </tbody>
            </table>
            
            <CreatePatientForm backendURL={backendURL} refreshPatients={getData} />

            <p>This page will display the Patient information and allow the user to create a new Patient.</p>
        </>
    );

    /*return (
        <>
            <h1>Patients</h1>
            
            <p>This page will display the Patient information and allow the user to create a new Patient.</p>

            <CreatePatientForm backendURL={backendURL} />
        </>
    );*/

} export default Patients;
 
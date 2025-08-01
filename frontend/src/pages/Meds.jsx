import { useState, useEffect } from 'react';

import UpdateMedForm from "../components/UpdateMedForm";

function Meds({ backendURL }){
    const [meds, setMeds] = useState([]);
    
    const getData = async function () {
        try {
            // Make a GET request to the backend
            console.log(backendURL + '/meds');
            
            const response = await fetch(backendURL + '/meds');
            
            console.log(response);

            // Convert the response into JSON format
            const {meds} = await response.json();
    
            console.log(meds);

            // Update the patients state with the response data
            setMeds(meds);

            console.log(meds);
            
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
            <h1>Meds</h1>

            <table>
                <thead>
                    <tr>
                        {meds.length > 0 && Object.keys(meds[0]).map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {meds.map((med, index) => (
                        <MedTableRow key={index} rowObject={med} backendURL={backendURL} refreshMeds={getData}/>
                    ))}

                </tbody>
            </table>
            
            <p>This page will display all Meds and allow the user to update the quantity of a Med.</p>
        </>
    );
} export default Meds;
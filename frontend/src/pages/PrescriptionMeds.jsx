import { useState, useEffect } from 'react';

function PrescriptionMeds({ backendURL }){
    const [prescriptionMeds, setPrescriptionMeds] = useState([]);
    
    
        const getData = async function () {
            try {
                // Make a GET request to the backend
                const response = await fetch(backendURL + '/prescription-meds');
                
                // Convert the response into JSON format
                const { prescriptionMeds } = await response.json();
        
                // Update the patients state with the response data
                setPrescriptionMeds(prescriptionMeds);
                
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
                            {prescriptionMeds.length > 0 && Object.keys(prescriptionMeds[0]).map((header, index) => (
                                <th key={index}>{header}</th>
                            ))}
                            <th></th>
                        </tr>
                    </thead>
    
                    <tbody>
                        {prescriptionMeds.map((prescriptionMed, index) => (
                            <PrescriptionMedTableRow key={index} rowObject={prescriptionMed} backendURL={backendURL} refreshPrescriptionMeds={getData}/>
                        ))}
    
                    </tbody>
                </table>
                
                <p>This page will display all PrescriptionMeds.</p>
                
            </>
        );
} export default PrescriptionMeds;
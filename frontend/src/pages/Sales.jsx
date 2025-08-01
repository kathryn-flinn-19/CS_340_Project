/** SOURCE: Exploration --- Web Application Technology
 * Link: https://canvas.oregonstate.edu/courses/2007765/pages/exploration-web-application-technology-2?module_item_id=25664612
 * Date Accessed: 7/31/2025
 * Notes: We were instructed to copy and paste the base code, but I am still citing it anyway for full transparency.
 */

import { useState, useEffect } from 'react';
import SaleTableRow from '../components/SaleTableRow';

function Sales({ backendURL }){
    const [sales, setSales] = useState([]);
            
            
    const getData = async function () {
        try {
            // Make a GET request to the backend
            console.log(backendURL + '/sales');

            const response = await fetch(backendURL + '/sales');
            
            // Convert the response into JSON format
            const { sales } = await response.json();
    
            // Update the patients state with the response data
            setSales(sales);
            
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
            <h1>Sales</h1>

            <table>
                <thead>
                    <tr>
                        {sales.length > 0 && Object.keys(sales[0]).map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {sales.map((sale, index) => (
                        <SaleTableRow key={index} rowObject={sale} backendURL={backendURL} refreshSales={getData}/>
                    ))}

                </tbody>
            </table>
            
            <p>This page will display all Sales.</p>

        </>
    );
} export default Sales;
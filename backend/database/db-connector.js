/** SOURCE: Exploration --- Web Application Technology
 * Link: https://canvas.oregonstate.edu/courses/2007765/pages/exploration-web-application-technology-2?module_item_id=25664612
 * Date Accessed: 7/30/2025
 * Notes: We were instructed to copy and paste this code into this file, but I am still
   citing it anyway for full transparency.
 */

// Get an instance of mysql we can use in the app
let mysql = require('mysql2')

/** SOURCE: "Environment Variables in Windows/macOS/Linux"
 * Link: https://www3.ntu.edu.sg/home/ehchua/programming/howto/Environment_Variables.html
 * Date Accessed: 7/30/2025
 * Used for: setting up a local environment variable for use in this program
 */
// Create a 'connection pool' using the provided credentials
const pool = mysql.createPool({
    waitForConnections: true,
    connectionLimit   : 10,
    host              : 'classmysql.engr.oregonstate.edu',
    user              : `cs340_${USER}`,
    password          : `${DBPW}`,
    database          : `cs340_${USER}`
}).promise(); // This makes it so we can use async / await rather than callbacks

// Export it for use in our application
module.exports = pool;
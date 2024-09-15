import { createClient } from "@propelauth/javascript";

/*const {MongoClient} = require('mongodb');

const url = 'mongodb+srv://smmayfield3:wmJJogNtpOK3iMsb@cluster0.wx6un.mongodb.net/';
const client = new MongoClient(url);
const dbName = 'sample_mflix';

const authClient = createClient({
    authUrl: "https://37078264.propelauthtest.com",
    enableBackgroundTokenRefresh: true,
});


async function run() {
    try {
        // Connect to the MongoDB cluster
        await client.connect();
        console.log('Connected successfully to server');

        const db = client.db(dbName);
        const collection = db.collection('properties'); // Replace with your collection name

        // Query for a document in the collection
        const query = { school: 'Virginia Tech' }; // Replace with your query
        const document = await collection.findOne(query);
        
        console.log('Found document:', document);
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    } finally {
        // Close the connection to the MongoDB cluster
        await client.close();
    }
}

run().catch(console.error);*/

const authClient = createClient({
    // The base URL where your authentication pages are hosted.
    // You can find this under the Frontend Integration section for your project.
    authUrl: "https://37078264.propelauthtest.com",
  
    // If true, periodically refresh the access token in the background.
    // This helps ensure you always have a valid token ready to go. Default true.
    enableBackgroundTokenRefresh: true,
  });

const authInfo = await authClient.getAuthenticationInfoOrNull()
if (authInfo) {
    console.log("User is logged in as", authInfo.user.email)
} else {
    console.log("User is not logged in")
}

document.getElementById("signup").onclick = authClient.redirectToSignupPage;
document.getElementById("login").onclick = authClient.redirectToLoginPage;
document.getElementById("account").onclick = authClient.redirectToAccountPage;
document.getElementById("logout").onclick = authClient.logout;

authClient.addLoggedInChangeObserver((isLoggedIn) => {
    if (isLoggedIn) {
        document.getElementById("display-when-logged-in").style.display = "revert";
        document.getElementById("display-when-logged-out").style.display = "none";

        // Get authentication info and set email to it
        authClient.getAuthenticationInfoOrNull()
            .then(authInfo => {
                document.getElementById("email").innerText = authInfo?.user?.email;
            });
    } else {
        document.getElementById("display-when-logged-in").style.display = "none";
        document.getElementById("display-when-logged-out").style.display = "revert";
    }
});

function switchPage(page) {
    window.location.href = page;
}



/*function displayDate(){
    var today = new Date();
    var options = { year: 'numeric', month: 'long' };
    var dateString = today.toLocaleDateString('en-US', options);
    document.getElementById('curr-date').innerText = dateString.toUpperCase();
}*/
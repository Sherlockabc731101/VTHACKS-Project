function contactInfoFunc(){
    document.getElementById("contactButton").style.display="none";
    document.getElementById("contactForm").style.display="block";
    document.getElementById("hiddenContactInfo").style.display="block";
}
function openIndex(){
    window.open("index.html", "_self");
}

async function submitForm(event) {
    event.preventDefault();

    const formData = {
        fullName: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        company: document.getElementById('company').value,
        message: document.getElementById('message').value
    };

    try {
        const response = await axios.post('http://cluster0.wx6un.mongodb.net/api/contact', formData);
        alert('Form submitted successfully');
    } catch (error) {
        console.error('Error submitting form', error);
        alert('Error submitting form');
    }
}
/*function openSignUp(){
    window.open("pages/signUp/signUp.html", "_self");
}
function openLogIn(){
    window.open("pages/logIn/logIn.html", "_self");
}
function openDownload(){
    window.open("pages/download/download.html", "_self");
}*/
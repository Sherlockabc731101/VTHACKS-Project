const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

// Connect to MongoDB
mongoose.connect('mongodb+srv://smmayfield3:wmJJogNtpOK3iMsb@cluster0.wx6un.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true });

// Define a schema and model for the form data
const formSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    company: String,
    message: String
});

const FormData = mongoose.model('FormData', formSchema);

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Endpoint to handle form submission
app.post('/api/contact', async (req, res) => {
    const { fullName, email, company, message } = req.body;
    const newFormData = new FormData({ fullName, email, company, message });
    await newFormData.save();
    res.send('Form data saved successfully');
});

app.listen(port, () => {
    console.log(`Server running at http://cluster0.wx6un.mongodb.net:${port}`);
});
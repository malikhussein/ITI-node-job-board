import nodemailer from 'nodemailer';
import { emailTemplate } from './emailTemplate.js';
import dotenv from 'dotenv'
dotenv.config({})
const transporter = nodemailer.createTransport({
  service: 'gmail', // Use Gmail or another email provider
  auth: {
    user: process.env.SEND_EMAIL_ADDRESS , // Your email address
    pass: process.env.SEND_EMAIL_PASSWORD ,
    
  },
  tls: {
    rejectUnauthorized: false // Allow unauthorized access to the server
  },
});

// Send an email
async function sendEmail(email,url) {
  try {
    const info = await transporter.sendMail({
      from: 'Node Proj ITI',
      to: email,
      subject: 'Hello world',
      text: '',
      html: emailTemplate(url),
    });



    console.log('Email sent successfully:', info.messageId);
  } catch (error) {
    console.error('Error occurred while sending email: ', error);
  }
}
export { sendEmail };


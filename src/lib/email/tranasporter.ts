import nodemailer from 'nodemailer';

const { MAIL_USERNAME = '', MAIL_PASSWORD = '' } = process.env;

export const mailTransporter = nodemailer.createTransport({
  host: 'smtp.wp.pl',
  port: 465,
  secure: true, // Use SSL
  auth: {
    user: MAIL_USERNAME,
    pass: MAIL_PASSWORD,
  },
  debug: true, // Enable debug logs
  logger: true, // Enable logger
});

// Test the connection
mailTransporter.verify(function (error) {
  if (error) {
    console.log('SMTP connection error:', error);
  } else {
    console.log('SMTP connection is ready to take our messages');
  }
});

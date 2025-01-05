import nodemailer from 'nodemailer';

const {
  MAIL_USERNAME = '',
  MAIL_PASSWORD = '',
  MAIL_HOST = '',
  MAIL_PORT = '',
} = process.env;

export const mailTransporter = nodemailer.createTransport({
  host: MAIL_HOST,
  port: Number(MAIL_PORT),
  secure: true,
  auth: {
    user: MAIL_USERNAME,
    pass: MAIL_PASSWORD,
  },
  debug: true,
  logger: true,
});

// Test the connection
mailTransporter.verify(function (error) {
  if (error) {
    console.log('SMTP connection error:', error);
  } else {
    console.log('SMTP connection is ready to take our messages');
  }
});

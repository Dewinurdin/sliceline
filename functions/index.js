// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
const htmlToText = require('nodemailer-html-to-text').htmlToText;
const { email, password } = require('./config');

const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: email,
    pass: password
  }
});
mailTransport.use('compile', htmlToText());

const admin = require('firebase-admin')
const cors = require("cors")({ origin: true });

admin.initializeApp();

exports.sendUserEmail = functions.database
  .ref('/orders/{pushId}')
  .onCreate(order => {
    console.log('Sending User Email')
    sendOrderEmail();
  });


const APP_NAME = 'SliceLine'

//includes exports so function will be exported to Google functions
// function.database = accessing database function
exports.sendUserEmail = functions.database
  .ref('/orders/{pushId}')
  .onCreate(order => {
    sendOrderEmail();
  });

  // Send Order Email Functions 
  function sendOrderEmail(){
    const mailOptions = {
      from: `${APP_NAME} <noreply@sliceline.com>`,
      to: email,
      subject: `Your order receipt from ${APP_NAME}`,
      html: `
        <div>
          <strong>
            Hello
          </strong>
          World
        </div>  
      `
    };
    mailTransport.sendMail(mailOptions);
  }
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const { google } = require('googleapis');
const readFile = promisify( fs.readFile );
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
const CREDENTIALS_PATH = path.join( __dirname, 'jj-bot-365714-862a4c223e60.json' );

const getAuthClient = async () => {
   const content = await readFile( CREDENTIALS_PATH )
       .catch( error => console.log( 'Error loading client secret file:', error ) );

   const { client_email, private_key } = JSON.parse( content );

   const client = new google.auth.JWT(
       client_email,
       null,
       private_key,
       SCOPES,
       null,
   );

   return client;
};

module.exports = {
   getAuthClient,
};
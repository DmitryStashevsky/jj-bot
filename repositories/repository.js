const { google } = require('googleapis');
const config = require('config');
const spreadsheetId = config.get('GoogleSpreadSheetId');
const { getAuthClient } = require('../google.config.js');
const { extractSpreedsheetData } = require('../helper.js');

class Repository {
    
    countOfHeaders = 1;

    getApiClient = async () => {
        const authClient = await getAuthClient();
        const { spreadsheets: apiClient } = google.sheets( {
            version : 'v4',
            auth    : authClient,
        } );
     
        return apiClient;
     };

    getValuesData = async (apiClient, range) => {
        const { data } = await apiClient.get( {
            spreadsheetId : spreadsheetId,
            ranges: range,
            fields: 'sheets',
            includeGridData : true,
        } );
     
        return extractSpreedsheetData(data);
     };

     setValuesData = async (apiClient, range, value) => {
        let values = value instanceof Array ? 
            [value] : [
            [
              value
            ]
          ];
          const resource = {
            values,
          };

        await apiClient.values.update( {
            spreadsheetId : spreadsheetId,
            range: range,
            valueInputOption: 'RAW',
            resource: resource
        } );
     };
    }

module.exports = Repository;
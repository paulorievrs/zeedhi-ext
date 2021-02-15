const utils = require('../utils.js');
const vscode = require('vscode');
const axios = require('axios');
const Fs = require('fs')  
const Path = require('path')  

module.exports = {
    
    createJSON: async function() {

        const dataSourceName = await vscode.window.showInputBox({
            value: '',
            placeHolder: 'Type a dataSource name to create.'
        });

        if(!dataSourceName) {
            vscode.window.showErrorMessage('You have to set a dataSourceName');
            return false;
        }

        vscode.window.showInformationMessage("Creating datasource on file to download.");
        axios.post('http://gabrielxavier.zeedhi.com/workfolder/generate-data-source/backend/service/index.php/GenerateDataSource', {
            filter: [
                {
                    name: "owner",
                    operator: "=",
                    value: "USR_ORG_20"
                },
                {
                    name: "tableName",
                    operator: "=",
                    value: dataSourceName
                },
                {
                    name: "pathToSaveFile",
                    operator: "=",
                    value: "/home/developer/workfolder/datasource"
                }
            ],
            requestType: 'FilterData'
        })
        .then(res => {
            console.log(`statusCode: ${res.statusCode}`);
            console.log('Done');
        })
        
        .catch(error => {
            console.error('error 1');
        });        
        
        return dataSourceName;

    },
    downloadJson: async function(dataSourceName) {

        if(!dataSourceName) {
            vscode.window.showErrorMessage('You have to set a filename');

            return false;
        }

        const folderPath = utils.getCurrentWorkspaceFolder();

        vscode.window.showInformationMessage("Starting to download file...");

        const path = Path.resolve(folderPath, dataSourceName + '.json');
        const writer = Fs.createWriteStream(path);
    
        const response = await axios({
            url: 'http://gabrielxavier.zeedhi.com/workfolder/datasource/' + dataSourceName + '.json',
            method: 'GET',
            responseType: 'stream'
        });
        vscode.window.showInformationMessage("Created file sucessfully.");
        response.data.pipe(writer);
        
    },
    hasWorkspace: function() {
        const folderPath = utils.getCurrentWorkspaceFolder();
        if (!folderPath) {
            vscode.window.showErrorMessage('Select a workspace!');
            return false;
        } 
        return true;
        
    }
}
const utils = require('../utils.js');
const vscode = require('vscode');
const axios = require('axios');
const Fs = require('fs')  
const Path = require('path')  

module.exports = {
    
    createJSON: async function() {

        let dataSourceName = await vscode.window.showInputBox({
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
            vscode.window.showInformationMessage("Created datasource successfully on /workfolder/datasource/.");

        })
        
        .catch(error => {
            vscode.window.showErrorMessage('Datasource not found.');
            dataSourceName = null;
        });        
        
        return dataSourceName;

    },
    downloadJson: async function(dataSourceName) {

        if(!dataSourceName) {
            return false;
        }

        const folderPath = utils.getCurrentWorkspaceFolder();

        const path = Path.resolve(folderPath, dataSourceName + '.json');
        const writer = Fs.createWriteStream(path);
        
        try {
            const response = await axios({
                url: 'http://gabrielxavier.zeedhi.com/workfolder/datasource/' + dataSourceName + '.json',
                method: 'GET',
                responseType: 'stream'
            });
            response.data.pipe(writer);
            vscode.window.showInformationMessage("Created file successfully.");
        } catch {
            vscode.window.showErrorMessage('Dowload error. If the file is empty verify if the datasource exists.');

        }
        
        
        
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
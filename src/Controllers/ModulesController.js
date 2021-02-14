const utils = require('../utils.js');
const vscode = require('vscode');

module.exports = {
    
    start: function() {
        const folderPath = utils.getCurrentWorkspaceFolder();

        try {

            vscode.window.showInformationMessage("Executando comando...");
            
            require('child_process').exec('cd ' + folderPath + '/tecfood/mobile && npm start', {}, (error, stdout, stderr) => {

                let outputChannel = vscode.window.createOutputChannel('Zeedhi Debug');
                outputChannel.appendLine(stdout);
                if(!error) {
                    vscode.window.showInformationMessage("Created file sucessfully.");
                } else {
                    vscode.window.showErrorMessage('Error you have to be into workfolder project!', folderPath);
                }
            });


        } catch (err) {
            vscode.window.showErrorMessage('Error you have to be into workfolder project!', folderPath);

        }
    },

    gql: function() {
        createModule('gql');
    },

    cadSup: function() {
        createModule('cadSup');
    },

    sup: function() {
        createModule('sup');
    }

}

function createModule(module) {

    const folderPath = utils.getCurrentWorkspaceFolder();

    try {

        vscode.window.showInformationMessage("Executando comando...");
        
        require('child_process').exec('cd ' + folderPath + '/tecfood/mobile && npm start ' + module, {}, (error, stdout, stderr) => {

            let outputChannel = vscode.window.createOutputChannel('Zeedhi Debug');
            outputChannel.appendLine(stdout);
            if(!error) {
                vscode.window.showInformationMessage("Created file sucessfully.");
            } else {
                vscode.window.showErrorMessage('Error you have to be into workfolder project!', folderPath);
            }
        });


    } catch (err) {
        vscode.window.showErrorMessage('Error you have to be into workfolder project!', folderPath);

    }
}
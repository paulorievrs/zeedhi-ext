const utils = require('./utils.js');
const vscode = require('vscode');

const fs = require("fs");
const path = require("path");

module.exports = {
    createJSON: function() {
        
        let json = `{ 
            "name": "filename",
            "label": "screen label",
            "showMenu": true,
            "showHeader": true,
            "showFooter": true,
            "template": "container/window.html",
            "footer": "component/footer.html",
            "widgets": []
        }`;


        const folderPath = utils.getCurrentWorkspaceFolder();
        fs.writeFile(folderPath + '/json.json', json, err => {
            if (err) {
                return vscode.window.showErrorMessage(err.message);
            }

            vscode.window.showInformationMessage(
                "JSON criado com sucesso"
            );
        });
        
    },
    copyJSON: function() {
        let json = `{ 
            "name": "filename",
            "label": "screen label",
            "showMenu": true,
            "showHeader": true,
            "showFooter": true,
            "template": "container/window.html",
            "footer": "component/footer.html",
            "widgets": []
        }`;
        try {
            require('child_process').spawn('clip').stdin.end((json)); 
            return true;
        } catch (err) {
            return false;
        }

    },
    hasWorkspace: function() {
        const folderPath = utils.getCurrentWorkspaceFolder();
        if (!folderPath) {
            vscode.window.showErrorMessage('Selecione um workspace!');
            return false;
        } 
        return true;
        
    }
}
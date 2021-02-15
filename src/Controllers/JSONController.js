const utils = require('../utils.js');
const vscode = require('vscode');

const fs = require("fs");
const path = require("path");

module.exports = {
    
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
            vscode.window.showErrorMessage('Select a workspace!');
            return false;
        } 
        return true;
        
    }
}
const vscode = require('vscode');

module.exports = {
    getCurrentWorkspaceFolder: function () {
        try {
          let CurrentWorkspaceFolder = vscode
            .workspace
            .workspaceFolders[0]
            .uri
            .toString()
            .split("/Users")[1];
            return 'C:/Users/' + CurrentWorkspaceFolder;

        } catch (error) {
          console.error(error);
          return '';
        }
      }
}
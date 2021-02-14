// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const criaJSON = require('./src/criaJSON');
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "zeedhi-ext" is now active!');

    vscode.commands.registerCommand('zeedhi-ext.criaJSON', function () {
		if(criaJSON.hasWorkspace()) {
			criaJSON.createJSON();
		}
	});

	vscode.commands.registerCommand('zeedhi-ext.criaJSONCopy', function () {
		if(criaJSON.copyJSON()) {
			vscode.window.showInformationMessage('Copiado com sucesso!');
		}
	});

	context.subscriptions.push();
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}

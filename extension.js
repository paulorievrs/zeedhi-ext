// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const JSONController = require('./src/Controllers/JSONController');
const ModulesController = require('./src/Controllers/ModulesController');
const DataSourceController = require('./src/Controllers/DataSourceController');


// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only 6be executed once when your extension is activated
	console.log('Congratulations, your extension "zeedhi-ext" is now active!');

    vscode.commands.registerCommand('zeedhi-ext.criaJSON', function () {
		if(JSONController.hasWorkspace()) {
			JSONController.createJSON();
		}
	});

	vscode.commands.registerCommand('zeedhi-ext.criaJSONCopy', function () {
		if(JSONController.copyJSON()) {
			vscode.window.showInformationMessage('Copied with success!');
		}
	});

	vscode.commands.registerCommand('zeedhi-ext.moduleStart', function () {
		ModulesController.start();
	});

	vscode.commands.registerCommand('zeedhi-ext.createGQL', function () {
		ModulesController.gql();
	});

	vscode.commands.registerCommand('zeedhi-ext.createCadSup', function () {
		ModulesController.cadSup();
	});

	vscode.commands.registerCommand('zeedhi-ext.createSup', function () {
		ModulesController.sup();
	});
	vscode.commands.registerCommand('zeedhi-ext.createDataSource', async function () {
		const dataSourceName = await DataSourceController.createJSON();
		DataSourceController.downloadJson(dataSourceName);
	});


	context.subscriptions.push();
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}

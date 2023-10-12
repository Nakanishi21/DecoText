import * as vscode from 'vscode';
import { decoTextMap } from './decoTextMap';


export function activate(context: vscode.ExtensionContext) {
	const disposable = vscode.commands.registerCommand('decotext.galConvert', () => {

		const editor = vscode.window.activeTextEditor; // エディタ取得

		if(editor === undefined) {
			return;
		}

		const doc = editor.document;
		const curSelection = editor.selection;
		const text = doc.getText(curSelection);

		// 選んだテキストをギャル文字にイメチェンするよ☆
		const result = text.split('').map(char => decoTextMap[char] || char).join('');

		// 選んだところをギャル文字にするよ☆
		editor.edit(edit => {
			edit.replace(curSelection, result);
		});
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}

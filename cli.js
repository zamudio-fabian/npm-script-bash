#!/usr/bin/env node
const fs = require('fs');
const shell = require('shelljs');

const pjson = require('./package.json');

const [, , ...args] = process.argv;

function getParamsStringFromArgs(argsAux) {
	let params = '';

	argsAux.map((param) => {
		params += `${param} `;
		return params;
	});

	return params;
}

function execBash(pathCommand, options = []) {
	options.shift();

	const params = getParamsStringFromArgs(options);

	const command = `bash ${pathCommand} ${params}`;

	shell.exec(command);
}

try {
	console.log(`qr-utils v${pjson.version}`);
	const action = args[0];
	let actionFileName = 'help';
	switch (action) {
		case 'date':
		case 'd':
			actionFileName = 'date';
			break;
		case 'help':
		case 'h':
		default:
			actionFileName = 'help';
			break;
	}
	if (
		args.length >= 1 &&
		fs.existsSync(`${__dirname}/commands/${actionFileName}`)
	) {
		execBash(
			`${__dirname}/commands/${actionFileName}/command.sh`,
			args
		);
	} else {
		execBash(`${__dirname}/commands/help/command.sh`);
	}
} catch (err) {
	console.error(err);
}

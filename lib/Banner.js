const _ = require('lodash');
const os = require('os');

const EOL = os.EOL;
const defaultConfig = {
	width: process.stdout.columns,
	fillChar: '='
};

process.stdout.on('resize', () => {
	defaultConfig.width = process.stdout.columns;
});

module.exports = class Banner {
	constructor(config) {
		if (!config) {
			this.config = defaultConfig;
			return;
		}

		this.config = _.defaults(config, defaultConfig);
	}

	genBig(text) {
		const offset = (this.config.width - text.length) / 2;
		let outputString = '';
		let row = '';

		for(let i = 0; i < this.config.width; i++){
			row += this.config.fillChar;
		}

		outputString += row + EOL;

		for(let i = 0; i < offset; i++){
			outputString += ' ';
		}

		outputString += text + EOL;
		outputString += row + EOL;

		return outputString;
	}

	genSmall(text){
		const offset = Math.floor((this.config.width - text.length) / 2 - 1);
		let offsetString = '';

		for(let i = 0; i < offset; i++){
			offsetString += this.config.fillChar;
		}

		let outputString = `${offsetString} ${text} ${offsetString}`;

		while(outputString.length < this.config.width){
			outputString += this.config.fillChar;
		}

		outputString += EOL;

		return outputString;
	}

	gen() {
		return this.genBig.apply(this, arguments);
	}

	printBig(text){
		return console.log(this.genBig(text));
	}

	printSmall(text){
		return console.log(this.genSmall(text));
	}

	print(){
		return this.printBig.apply(this, arguments);
	}
};
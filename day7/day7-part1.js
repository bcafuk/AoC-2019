const readline = require('readline');
const Amplifier = require('./Amplifier.js');

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

rl.on('line', line => {
	const intCode = line.split(',').map(n => Number(n));
	
	let maxOutput = -Infinity;
	for (let perm = 0; perm < 120; ++perm) {
		const phases = [];
		
		{
			let n = perm;
			const phaseList = [0, 1, 2, 3, 4];
			
			for (let i = 5; i > 0; --i) {
				const phase = phaseList.splice(n % i, 1)[0];
				phases.push(phase);
				n = Math.floor(n / i);
			}
		}
	
		let output = 0;
		
		let amplifiers = [];
		for (let i = 0; i < 5; ++i) {
			amplifiers[i] = new Amplifier(intCode);
			amplifiers[i].enqueueInput(phases[i]);
		}
		
		for (let i = 0; i < 5; ++i) {
			amplifiers[i].enqueueInput(output);
			output = amplifiers[i].run();
		}
		
		maxOutput = Math.max(maxOutput, output);
	}
	
	console.log(maxOutput);
});

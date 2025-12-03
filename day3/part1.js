const fs = require("fs");
const readline = require("readline");

async function parseBanks() {
	const fileStream = fs.createReadStream("./banks.txt");

	const rl = readline.createInterface({
		input: fileStream,
		crlfDelay: Infinity
	});

	let banks = [];
	let totalJoltage = 0;

	for await (const line of rl) {
		let bank = [...line.match(/\d/gm)];
		totalJoltage += joltage(bank);
	}

	console.log(totalJoltage);
}

function joltage(bank) {
	let best = -1;
	let maxRight = -1;

	for (let i = bank.length - 1; i >= 0; i--) {
		const d = bank[i] - 0;

		if (maxRight >= 0) {
			const val = d * 10 + maxRight;
			if (val > best) best = val;
		}

		if (d > maxRight) maxRight = d;
	}

	return best;
}

parseBanks();
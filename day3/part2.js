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
	const k = 12;
	const result = [];

	let start = 0;
	let remaining = bank.length;

	for (let needed = k; needed > 0; needed--) {
		let end = remaining - needed;

		let bestDigit = -1;
		let bestIndex = start;

		for (let i = start; i <= end; i++) {
			const d = bank[i] - 0;
			if (d > bestDigit) {
				bestDigit = d;
				bestIndex = i;
			}
		}

		result.push(bestDigit);
		start = bestIndex + 1;
	}

	return Number(result.join(""));
}

parseBanks();
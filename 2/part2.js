const fs = require("fs");

fs.readFile("./ids.txt", (err, data) => {
	if (err) throw err;

	data = data.toString().split(",");

	let ids = [];
	let max = 0;
	let invalidIds = [];
	let res = 0;

	data.forEach(id => {
		if (id.includes("-")) {
			const [start, end] = id.split("-").map(Number);
			for (let i = start; i <= end; i++) {
				ids.push(i);
			}

		} else {
			ids.push(id)

		}
	});

	ids.forEach(id => {
		if (id.toString().match(/^(\d+)\1$/gm)) {
			invalidIds.push(id)
		}
	})


	invalidIds.forEach(id => {
		res = res + id;
	});

	console.log(res)

});

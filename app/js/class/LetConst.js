// let、const
function test() {
	for (let i = 0; i < 10; i++) {
		console.log(i);
	}
	// 严格模式
	// console.log(i);
}
test();

function last() {
	const PI = 3.14;
	console.log(PI);
}
last();
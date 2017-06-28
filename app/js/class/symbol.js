// symbol的概念，提供一个独一无二的值
{
	// 声明
	let a1 = Symbol();
	let a2 = Symbol();
	console.log(a1 === a2);
	let a3 = Symbol.for('a3');	// Symbol.for()
	let a4 = Symbol.for('a3');
	console.log(a3 === a4);
}

// 作用
{
	let a1 = Symbol.for('abc');
	let obj = {
		[a1]: 123,		// 独一无二
		'abc': 456,
		'c': 456
	};
	console.log(obj);

	// 使用Object.entries获取key、value，获取不到Symbol的值
	for (let [key, value] of Object.entries(obj)) {
		console.log('Object.entries:', key, value);
	}

	// 使用该方法获取对象的Symbol属性
	Object.getOwnPropertySymbols(obj).forEach(function(item) {
		console.log(obj[item]);
	});

	Reflect.ownKeys(obj).forEach(function(one) {
		console.log(one, obj[one]);
	});
}
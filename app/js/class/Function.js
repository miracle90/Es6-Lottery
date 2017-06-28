// 函数参数默认值
{
	function test(x = 'hello', y = 'world', z) {
		console.log('默认值', x, y);
	}
	test();
	test('nihao', 'beijing');
}

// 作用域，函数参数默认值
{
	let a = 'hahah'
	let x = 'test x';
	let y = 'test y';
	function test2(x, y = x, z = a) {
		console.log('作用域', x, y, z);
	}
	test2();
	test2('hello', 'world');
}

// rest参数，把输入的参数都转化成一个数组
{
	function test3(...arg) {
		for (let v of arg) {
			console.log('rest', v);
		}
	}
	test3(1, 2, 3, 4, '5');
}

// 扩展运算符，把数组拆成离散的值
{
	console.log([1, 2, 4]);
	console.log(...[1, 2, 4]);
	console.log('a', ...[1, 2, 4]);
}

// 箭头函数，有时候适合用箭头函数，有时候不适合用箭头函数
{
	let arrow = v => v * 2;		// 后面是返回值
	let arrow2 = () => 4;
	console.log('arrow function', arrow(2));
	console.log('arrow function', arrow2());
}

// 伪调用，存在于函数式编程，提升性能，避免递归
{
	function tail(x) {
		console.log('tail', x);
	}
	function fx(x) {
		return tail(x);
	}
	fx(3);
}
// 解构赋值
{
	let a, b, rest;
	[a, b] = [1, 2];
	console.log(a, b);
}

// 数组结构赋值
{
	let a, b, rest;
	[a, b, ...rest] = [1, 2, 3, 4, 5, 6];
	console.log(a, b, rest);
}

// 对象结构赋值
{
	let a, b;
	({a, b} = {a: 1, b: 2});
	console.log(a, b);
}

// 如果没有在结构上成功配对，只声明没赋值，默认值是来解决该问题
{
	let a, b, c, rest;
	[a, b, c = 3] = [1, 2];
	console.log(a, b, c);
}

// 变量交换
{
	let a = 1;
	let b = 2;
	[a, b] = [b, a];
	console.log(a, b);
}

// 函数返回值
{
	function f() {
		return [1, 2];
	}
	let a, b;
	[a, b] = f();
	console.log(a, b);
}

// 返回多个值，可以选择性的接收
{
	function f() {
		return [1, 2, 3, 4,5];
	}
	let a, b, c;
	[a,,,,b] = f()
	console.log(a, b);
}

{
	function f() {
		return [1, 2, 3, 4,5];
	}
	let a, b, c;
	[a, , ...b] = f()
	console.log(a, b);
}

// 对象结构赋值，键值对的对应
{
	let o = {
		p: 42,
		q: true
	};
	let {q, p} = o;
	console.log(p, q);
}

// 默认值
{
	let {a = 10, b = 5} = {a: 3};
	console.log(a, b);
}

// json对象，嵌套对象和数组
{
	let metaData = {
		title: 'abc',
		test: [{
			title: 'test',
			desc: 'description'
		}]
	}
	let {title: esTitle, test: [{title: cnTitle}]} = metaData;
	console.log(esTitle, cnTitle);
}
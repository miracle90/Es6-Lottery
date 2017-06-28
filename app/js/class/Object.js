{
	// 简介表示法
	let o = 1;
	let k = 2;
	let es5 = {
		o: o,
		k: k
	}
	let es6 = {
		o,
		k
	}
	console.log(es5, es6);
	let es5_method = {
		test: function() {
			console.log('hello');
		}
	}
	let es6_method = {
		test: function() {
			console.log('hello');
		}
	}
	console.log(es5_method.test(), es6_method.test());
}

{
	// 属性表达式
	let a = 'b';
	let es5_obj = {
		a: 'c',
		b: 'c'
	};
	let es6_obj = {
		[a]: 'c'
	};

	console.log(es5_obj, es6_obj);
}

// 新增几个API
{	
	console.log('字符串', Object.is('abc', 'abc'), 'abc' === 'abc');
	console.log('数组', Object.is([], []), [] === []);

	console.log('拷贝', Object.assign({a: 'a'}, {b: 'b'}));		// 浅复制，只有自身对象的属性，不会拷贝继承的属性，不会拷贝不可枚举的属性

	let test = {
		k: 123,
		o: 456
	}
	for (let [key, value] of Object.entries(test)) {
		console.log([key, value]);
	}
}

// 扩展运算符
// {
// 	let {a, b, ...c} = {a: '1', b: '2', c: '3', d: '4'};
// 	console.log(a, b, c);
// }
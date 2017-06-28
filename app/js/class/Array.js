// Array.of()，把一组数据变量，转换成数据类型
{
	let arr = Array.of(1, 3, 5, 7, 9, 0);
	console.log('arr=', arr);

	let empty = Array.of();
	console.log('empty=', empty);
}

// Array.from()，把伪数组或者是一些集合，转换成数组
{
	let p = document.querySelectorAll('p');
	let pArr = Array.from(p);
	pArr.forEach(function(item) {
		console.log(item.textContent);		// 获取DOM节点文本内容
	});

	// 另一种用法，类似于map
	console.log(Array.from([1, 2, 3, 4, 5], function(item) {return item*2}));
}

// 关于填充数组，fill()
{
	console.log('fill:', [1, 'a', 'undefined'].fill(7));

	console.log('fill, fill:', ['a', 'b', 'c', 'd', 'e'].fill(7, 1, 3));		// 换7，从1开始，3之前结束
}

// keys、values、entries
{
	let arr = ['a', 'b', 'c', 'd', 'e'];
	for (let it of arr.keys()) {
		console.log('keys', it);
	}
	// values()方法需要引入babel-polyfill包
	// for (let one of arr.values()) {
	// 	console.log('values', one);
	// }
	for (let [key, value] of arr.entries()) {
		console.log([key, value]);
	}
}

// copyWithin
{
	console.log('copyWithin：', [1, 2, 3, 4, 5].copyWithin(1, 0, 3));		// 第一个要被替换的索引开始值，第二个替换值得索引开始，第三个替换值得索引结束
}

// 查找，find，findIndex
{
	console.log([1, 2, 3, 4, 5, 6].find(function(item) {return item > 3}));			// 返回条件的第一个值
	console.log([1, 2, 3, 4, 5, 6].findIndex(function(item) {return item > 3}));			// 返回条件的第一个值的索引
}

// includes，解决NaN非数字的情况
{
	console.log('includes:', [1, 'a', NaN].includes(1));
	console.log('includes:', [1, 'a', NaN].includes('a'));
	console.log('includes:', [1, 'a', NaN].includes(NaN));
}
// 示范
{
	let arr = ['Hello', 'World'];
	let map = arr[Symbol.iterator]();
	console.log(map.next());
	console.log(map.next());
	console.log(map.next());
}

// 自定义iterator接口
{
	let obj = {
		start: [1,3,2],
		end: [7,9,8],
		// 声明一个iterator接口方法
		[Symbol.iterator]() {
			let self = this;
			let index = 0;
			let arr = self.start.concat(self.end);
			let len = arr.length;
			return {
				next() {
					if (index < len) {
						return {
							value: arr[index++],
							done: false
						}
					} else {
						return {
							value: arr[index++],
							done: true
						}
					}
				}
			}
		}
	}

	for (let key of obj) {
		console.log(key);
	}
}

{
	let arr = ['Hello', 'World'];
	for (let val of arr) {
		console.log('value', val)
	}
}
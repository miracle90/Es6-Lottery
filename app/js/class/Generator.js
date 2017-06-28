{
	// generator基本用法
	let tell = function* (){
		yield 'a';
		yield 'b';
		return 'c';
	};

	let k = tell();
	console.log(k.next());
	console.log(k.next());
	console.log(k.next());
	console.log(k.next());
}

{
	let obj = {};
	obj[Symbol.iterator] = function* (){
		yield 1;
		yield 2;
		yield 3;
	}

	for (let val of obj) {
		console.log('value', val);
	}
}

// generator最大的优势，状态机
{
	let state = function* (){
		while(1) {
			yield "A";
			yield "B";
			yield "C";
		}
	}

	// let state = async function(){
	// 	while(1) {
	// 		await "A";
	// 		await "B";
	// 		await "C";
	// 	}
	// }

	let status = state();
	console.log(status.next());
	console.log(status.next());
	console.log(status.next());
	console.log(status.next());
	console.log(status.next());
	console.log(status.next());
}

// 应用，抽奖环节
{
	let draw = function(count) {
		// 具体抽奖的逻辑
		console.info(`剩余次数${count}`);
	}

	let residue = function* (count){
		while (count > 0) {
			count--;
			yield draw(count);
		}
	}
	let start = residue(5);
	let btn = document.createElement('button');
	btn.id = 'start';
	btn.textContent = '抽奖';
	document.body.appendChild(btn);
	document.getElementById('start').addEventListener('click', function() {
		start.next();
	}, false);
}

// 服务端的状态定期变化，前端需要定期去取状态
{
	// 长轮询
	let ajax = function* (){
		yield new Promise(function(resolve, reject) {
			setTimeout(function() {
				resolve({code: 0})
			}, 1000);
		})
	}

	let pull = function (){
		let generator = ajax();
		let step = generator.next();
		step.value.then(function(d) {
			if (d.code != 0) {
				setTimeout(function() {
					console.log('wait');
					pull();
				}, 1000)
			} else {
				console.info(d);
			}
		})
	}
	pull();
}
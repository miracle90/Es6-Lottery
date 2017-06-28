// 通过用户拿的对象和原始对象不能直接操作，需要通过代理，在代理的层面，读写
{
	let obj = {
		time: '2017-1-1',
		name: 'net',
		_r: 123
	};

	// 代理
	let monitor = new Proxy(obj, {
		// 拦截对象属性的读取
		get(target, key) {
			return target[key].replace('2017', '2018');
		},
		// 拦截对象设置属性
		set(target, key, value) {
			if (key === 'name') {
				return target[key] = value;
			} else {
				return target[key];
			}
		},
		// 拦截 key in object操作
		has(target, key) {
			if (key === 'name') {
				return target[key];
			} else {
				return false;
			}
		},
		// 拦截delete
		deleteProperty(target, key) {
			if (key.indexOf('_') > -1) {
				delete target[key];
				return true;
			} else {
				return target[key];
			}
		},
		// 拦截Object.key，Object.getOwnPropertySymbols，Object.getOwnPropertyNames
		ownKeys(target) {
			return Object.keys(target).filter(item => item != 'time');
		}
	});

	console.log('get', monitor.time);

	monitor.time = '2008';
	monitor.name = 'mukewang';
	console.log('set', monitor.name, monitor);
	console.log('has', 'name' in monitor, 'time' in monitor);
	// delete monitor.time;
	// console.log('delete', monitor);
	// delete monitor._r;
	// console.log('delete', monitor);
	console.log('ownKeys', Object.keys(monitor));
}

{
	let obj = {
		time: '2017-1-1',
		name: 'net',
		_r: 123
	};

	// 不用Reflect 没有new，直接使用
	console.log('reflect get', Reflect.get(obj, 'time'));
	Reflect.set(obj, 'name', 'imooc');
	console.log('reflect set', obj);
	console.log('reflect has', Reflect.has(obj, 'name'));

}

// DEMO，使用代理，相对于之前，代码更容易维护、复用
{
	// 提供代理，Proxy对象
	function validator(target, validator) {
		// 返回一个代理，set进行限制
		return new Proxy(target, {
			_validator: validator,
			set(target, key, value, proxy) {
				if (target.hasOwnProperty(key)) {
					let va = this._validator[key];
					if (!!va(value)) {
						return Reflect.set(target, key, value, proxy);
					} else {
						throw Error(`不能设置${key}到${value}`);
					}
				} else {
					throw Error(`${key} 不存在`);
				}
			}
		});
	}

	// 设置一个过滤选项，校验条件
	const personValidators = {
		name(val) {
			return typeof val === 'string'
		},
		age(val) {
			return typeof val === 'string' && val > 18
		}
	}

	class Person{
		constructor(name, age) {
			this.name = name;
			this.age = age;
			// 返回一个Proxy对象，Proxy对象拦截、代理了Person对象
			return validator(this, personValidators);
		}
	}

	const person = new Person('lilei', 30);

	console.info(person);
}
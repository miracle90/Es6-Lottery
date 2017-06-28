{
	// 定义一个修饰器函数
	let readonly = function(target, name, descriptor) {
		descriptor.writable = false;
		return descriptor;
	};

	class Test{
		@readonly		// 在类中，使用修饰器
		time() {
			return '2017-06-24'
		}
	}

	let test = new Test();
	// test.time = function() {
	// 	console.log('Reset Time')
	// };
	console.log(test.time());
}

{
	let typename = function(target, name, descriptor) {
		target.myname = 'hello';
	}

	@typename		// 修饰器，给类添加一个静态属性myname，在外面使用
	class Test{

	}

	console.log(Test.myname);
	// 第三方修饰器js库：core-decorators
}

// 日志系统
{
	let log = (type) => {
		return function(target, name, descriptor) {
			let src_method = descriptor.value;
			descriptor.value = (...arg) => {
				src_method.apply(target, arg);
				console.log(`log ${type}`);
			}
		}
	}

	class AD{
		@log('show')
		show() {
			console.log('ad is show');
		}
		@log('click')
		click() {
			console.log('ad is click');
		}
	}

	let ad = new AD();
	ad.show();
	ad.click();
}
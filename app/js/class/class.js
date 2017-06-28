// 基本定义和生成实例
{
	class Parent{
		// 构造函数
		constructor(name = 'imooc') {
			this.name = name;
		}
	}
	let v_parent = new Parent('v');
	console.log(v_parent);
}

// 继承
{
	class Parent{
		constructor(name = 'imooc') {
			this.name = name;
		}
	}
	class Child extends Parent{
		//
	}

	console.log(new Child());
}

// 子类修改父类中的参数，super()
{
	class Parent{
		constructor(name = 'imooc') {
			this.name = name;
		}
	}
	class Child extends Parent{
		constructor(name = 'child') {
			super(name);
			// 调用this，一定要在super()后面
			this.type = 'child';
		}
	}

	console.log(new Child('hello'));
}

// getter、setter
{
	class Parent{
		constructor(name = 'imooc') {
			this.name = name;
		}
		// 属性，不是函数
		get longName() {
			return 'mk' + this.name;
		}
		// 
		set longName(value) {
			this.name = value;
		}
	}

	let v = new Parent();
	console.log('getter', v.longName);
	v.longName = 'hello';
	console.log('setter', v.longName);
}

// 静态方法
{
	class Parent{
		constructor(name = 'imooc') {
			this.name = name;
		}
		static tell() {
			console.log('tell');
		}
	}

	// 静态方法通过类去调用，而不是通过类的实例去调用
	Parent.tell();
}

// 静态属性
{
	class Parent{
		constructor(name = 'imooc') {
			this.name = name;
		}
		static tell() {
			console.log('tell');
		}
	}
	Parent.type = 'test';
	console.log(Parent.type);
}
{
	console.log(0b111110111);		// 二进制，二进制都是以0b开头
	console.log(0o767);				// 八进制，八进制以0o开头
}

// Number.isFinite判断这个值是不是有尽
{
	console.log('15', Number.isFinite(15));
	console.log('NaN', Number.isFinite(NaN));
	console.log('1/0', Number.isFinite(1/0));
	// Number.isNaN
	console.log('NaN', Number.isNaN(NaN));
	console.log('1', Number.isNaN(1));
	console.log('a', Number.isNaN('a'));
}

// Number.isInteger判断是不是整数，25.0也是整数
{
	console.log('0', Number.isInteger(0));
	console.log('NaN', Number.isInteger(NaN));
	console.log('25', Number.isInteger(25));
	console.log('"25"', Number.isInteger('25'));
	console.log('25.0', Number.isInteger(25.0));
	console.log('25.00', Number.isInteger(25.00));
	console.log('25.01', Number.isInteger(25.01));
	console.log('2.5', Number.isInteger(2.5));
	console.log('a', Number.isInteger('a'));
}

// 2的53次方，负的2的53次方，es6的表示法
{
	console.log('max', Number.MAX_SAFE_INTEGER);
	console.log('min', Number.MIN_SAFE_INTEGER);
	console.log('isSafeInteger-10', Number.isSafeInteger(10));
	console.log('isSafeInteger-a', Number.isSafeInteger('a'));
}

// 判断带小数的整数部分，并返回，Math.trunc，相较于Es5中的Math.floor
{
	console.log('4.1', Math.trunc(4.1));
	console.log('4.9', Math.trunc(4.9));
}

// 判断大于、小于、等于0，返回-1，0，1
{
	console.log('-5', Math.sign(-5));
	console.log('0', Math.sign(0));
	console.log('5', Math.sign(5));
	console.log('"50"', Math.sign('50'));
	console.log('a', Math.sign('a'));
	console.log('NaN', Math.sign('NaN'));
}

// 立方根
{
	console.log('5', Math.cbrt(8));
	console.log('-1', Math.cbrt(-1));
	console.log('0', Math.cbrt(0));
	console.log('a', Math.cbrt('a'));
}

// 三角函数、对数计算
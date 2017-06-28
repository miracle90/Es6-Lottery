// Unicode表示法，反引号``
{
	console.log('a', `\u0061`);
	// 码值大于两个字节的最大码值，超过0xFFFF，不会按一个字符处理，让前四个作为一个字符
	console.log('s', `\u20BB7`);

	console.log('s', `\u{20BB7}`);
}

{
	// es5
	let s = '𠮷';
	console.log('length', s.length);
	console.log('0', s.charAt(0));		// 乱码
	console.log('1', s.charAt(1));		// 乱码
	console.log('at0', s.charCodeAt(0));
	console.log('at1', s.charCodeAt(1));

	// es6
	let s1 = '𠮷a';
	console.log('length', s1.length);
	console.log('code0', s1.codePointAt(0));
	console.log('code0', s1.codePointAt(0).toString(16));
	console.log('code1', s1.codePointAt(1));
	console.log('code2', s1.codePointAt(2));
}

{	
	// es5
	console.log(String.fromCharCode('0x20bb7'));
	// es6
	console.log(String.fromCodePoint('0x20bb7'));
}

// 字符串遍历接口
{
	let str = '\u{20bb7}abc';
	for (let i = 0; i < str.length; i++) {
		console.log('es5' + str[i]);
	}
	for (let code of str) {
		console.log('es6' + code);
	}
}

{
	let str = 'string';
	console.log('includes', str.includes('s'));
	console.log('start', str.startsWith('str'));
	console.log('end', str.endsWith('ing'));
}

{
	let str = 'yes';
	console.log(str.repeat(3));
}

// 模板字符串
{
	let name = 'list';
	let info = 'hello world';
	let m = `i am ${name}, ${info}`;
	console.log(m);
}

// es7草案
{
	console.log('1'.padStart(8, '0'));
	console.log('9'.padEnd(8, '0'));
}

// 标签模板
{
	let user = {
		name: 'list',
		info: 'hello world',
		code: 1
	}
	console.log(abc`i am ${user.name}, ${user.info}, ${user.code}`);
	function abc(s, v1, v2, v3) {
		console.log(s, v1, v2, v3);
		return s + v1 + v2 + v3
	}
}

// raw使\失效
{
	console.log(String.raw`Hi\n${1+2}`);
	console.log(`Hi\n${1+2}`);
}
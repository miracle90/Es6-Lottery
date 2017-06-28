// es5
{
	let regex = new RegExp('xyz', 'i');
	let regex2 = new RegExp(/xyz/i);

	console.log(regex.test('xyz123'), regex2.test('xyz123'));

	// 可以两个参数，第二个修饰符覆盖第一个
	let regex3 = new RegExp(/xyz/ig, 'i');
	// flags用来获取正则对象修饰符
	console.log(regex3.flags);
}

// y修饰符
{
	let s = 'bbb_bb_b';
	let a1 = /b+/g;
	let a2 = /b+/y;

	// 都是全局匹配，g是从上一次匹配，y匹配的第一个必须是紧跟着的下一个字符'_'
	console.log('one', a1.exec(s), a2.exec(s));
	console.log('two', a1.exec(s), a2.exec(s));

	// 开启y修饰符模式
	console.log(a1.sticky, a2.sticky);
}

// u修饰符，第一个字母，匹配模式 + test + 匹配字符串
{
	console.log('u-1', /^\uD83D/.test('\uD83D\uDC2A'));		// 当成了两个字符
	console.log('u-2', /^\uD83D/u.test('\uD83D\uDC2A'));	// 当做一个字符
	//unicode字符，不加u不被识别
	console.log(/\u{61}/.test('a'));
	console.log(/\u{61}/u.test('a'));
}

{
    console.log('u修饰符',/^\uD83D/.test('\uD83D\uDC2A')); // true
    console.log('u修饰符',/^\uD83D/u.test('\uD83D\uDC2A')); // false
    // 大括号表示Unicode字符，只有加上u才能识别
    console.log(/\u{61}/.test('a')); // false
    console.log(/\u{61}/u.test('a')); // true
    console.log(/\u{20BB7}/u.test('𠮷')); // true
    
    // 点（.）字符不能识别码点大于0xFFFF的Unicode字符，必须加上u修饰符。
    let s = '𠮷';
    console.log('大于0xFFFF的Unicode字符',/^.$/.test(s)); // false
    console.log('使用u字符',/^.$/u.test(s)); // true

    // 使用u修饰符后，所有量词都会正确识别大于码点大于0xFFFF的Unicode字符。
    console.log('量词',/a{2}/.test('aa')); // true
    console.log('量词',/a{2}/u.test('aa')); // true
    console.log('量词',/𠮷{2}/.test('𠮷𠮷')); // false
    console.log('量词',/𠮷{2}/u.test('𠮷𠮷')); // true
}

{
    // #正则表达式中，点（.）是一个特殊字符，代表任意的单个字符，但是行终止符（line terminator character）除外
    // U+000A 换行符（\n）
    // U+000D 回车符（\r）
    // U+2028 行分隔符（line separator）
    // U+2029 段分隔符（paragraph separator）
    // 只是一个提案目前还不支持
    // let reg=/test.go/s;
    // console.log(reg.test('test\ngo'));
    // console.log(reg.test('test\ngo'));
    console.log('s变通方法',/foo.bar/.test('foo\nbar'));
    console.log('s变通方法',/foo[^]bar/.test('foo\nbar'));
}

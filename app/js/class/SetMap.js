{
	let list = new Set();
	list.add(5);
	list.add(7);
	console.log('list size:', list.size);
}

{
	let arr = [1, 2, 3, 4, 5];
	let list = new Set(arr);

	console.log('list size:', list.size);
}

{
	let list = new Set();
	list.add(5);
	list.add(7);
	list.add(5);	// 重复元素不会生效

	console.log('list', list);

	let arr = [1, 3, 2, 1, '2', 4, '5', 4];
	let list1 = new Set(arr);
	console.log('arr:', list1);

	let arr1 = ['add', 'delete', 'has', 'clear'];
	let list2 = new Set(arr1);
	console.log('has', list2.has('has'), list2);
	console.log('delete', list2.delete('has'), list2);
	console.log('clear', list2.clear(), list2);
	console.log(typeof list2);
}

{
	let arr = ['add', 'delete', 'has', 'clear'];
	let list = new Set(arr);
	
	for (let one of list.keys()) {
		console.log('for of keys:', one)
	}
	for (let one of list.values()) {
		console.log('for of values:', one)
	}
	for (let [key, value] of list.entries()) {
		console.log('for of entries:', key, value)
	}
	list.forEach(function(item) {console.log(item)});
}

{
	let weaksetList = new WeakSet();
	let arg = {};
	weaksetList.add(arg);
	console.log(weaksetList);
	// weaksetList.add(2);
}

{
	let map = new Map();
	let arr = ['a'];
	map.set(arr, 456);
	console.log(map, map.get(arr));
}

{
	let map = new Map([['a', 1], ['b', 2], ['c', 3]]);
	console.log(map);
}

{
	let map = new Map([['a',123],['b',456]]);
	console.log('map args',map);
	console.log('size',map.size);
	console.log('delete',map.delete('a'),map);
	console.log('clear',map.clear(),map);
}

{
	let weakList = new WeakMap();
	let o = {

	};
	weakList.set(o, 123);
	console.log(weakList.get(o));
}

{
	// map和数组对比，数据结构横向对比，增删改查
	let map = new Map();
	let arr = [];
	
	// 增
	map.set('t', 1);
	arr.push({t: 1});
	console.info('map-array', map, arr);
	
	// 改
	map.set('t', 2);
	arr.forEach(item => item.t ? item.t = 2 : '');
	console.info('map-array-modify', map, arr);

	// 查
	let map_exist = map.has('t');	// true
	let array_exist = arr.find(item => item.t);		// 如果存在，返回值
	console.info('map-array', map_exist, array_exist);

	// 删
	map.delete('t');
	let index = arr.findIndex(item => item.t);
	arr.splice(index, 1);
	console.log(map, arr);
}

{
	// set和array对比
	let set = new Set();
	let array = [];

	// 增
	set.add({t: 1});
	array.push({t: 1});
	// 查
}

{
	// map、set、对象对比
	let item = {t:1};
	let map = new Map();
	let set = new Set();
	let obj = {};

	// 增
	map.set('t', 1);
	set.add(item);
	obj['t'] = 1;
	console.info('map-set-obj', map, set, obj);

	// 查
	console.log({
		map_exist: map.has('t'),
		set_exist: set.has('item'),
		obj_exist: 't' in obj
	});

	// 改
	map.set('t', 2);
	item.t = 2;
	obj['t'] = 2;
	console.info('map-set-obj-modify', map, set, obj);

	// 删
	map.delete('t');
	set.delete(item);
	delete obj['t'];
	console.info('map-set-obj-empty', map, set, obj);
}
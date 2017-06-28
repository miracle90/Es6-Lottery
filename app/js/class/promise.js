// 回调
{
	// 基本定义
	let ajax = function(cb) {
		console.log('执行1');
		setTimeout(function() {
			cb && cb.call()
		}, 1000);
	}
	ajax(function() {
		console.log('i am callback');
	})
}

// Promise
{
	let ajax = function() {
		console.log('执行2');
		return new Promise(function(resolve, reject) {
			setTimeout(function() {
				resolve();
			}, 1000);
		})
	}
	// then()里面，第一个对应resolve，第二对应reject
	ajax().then(function() {
		console.log('i am promise');
	})
}

{
	let ajax = function() {
		console.log('执行3');
		return new Promise(function(resolve, reject) {
			setTimeout(function() {
				resolve();
			}, 1000);
		})
	}

	ajax()
		.then(function() {
			return new Promise(function(resolve, reject) {
				setTimeout(function() {
					resolve();
				}, 2000);
			})
		})
		.then(function() {
			console.log('i am then');
		})
}

// catch
{
	let ajax = function(num) {
		console.log('执行4');
		return new Promise(function(resolve, reject) {
			if (num > 5) {
				resolve();
			} else {
				throw new Error('出错了');
			}
		})
	}

	ajax(4)
		.then(function() {
			console.log('i am catch');
		})
		.catch(function() {
			console.log('捕捉错误', err);
		})
}

// all,所有的图片加载完再加载页面
{
	function loadImg(src) {
		return new Promise((resolve, reject) => {
			let img = document.createElement('img');
			img.src = src;
			img.onload = function() {
				resolve(img);
			}
			img.onerror = function(err) {
				reject(err);
			}
		})
	}

	function showImgs(imgs) {
		imgs.forEach(function(img) {
			document.body.appendChild(img);
		})
	}

	Promise.all([
		loadImg('http://i4.buimg.com/567571/df1ef0720bea6832.png'),
		loadImg('http://i4.buimg.com/567571/2b07ee25b08930ba.png'),
		loadImg('http://i2.muimg.com/567571/5eb8190d6b2a1c9c.png')
	]).then(showImgs);
}

// race，先到先得
{
	function loadImg(src) {
		return new Promise((resolve, reject) => {
			let img = document.createElement('img');
			img.src = src;
			img.onload = function() {
				resolve(img);
			}
			img.onerror = function(err) {
				reject(err);
			}
		})
	}

	function showImg(img) {
		let p = document.createElement('p');
		p.appendChild(img);
		document.body.appendChild(p);
	}

	Promise.race([
		loadImg('http://i4.buimg.com/567571/df1ef0720bea6832.png'),
		loadImg('http://i4.buimg.com/567571/2b07ee25b08930ba.png'),
		loadImg('http://i2.muimg.com/567571/5eb8190d6b2a1c9c.png')
	]).then(showImg);
}
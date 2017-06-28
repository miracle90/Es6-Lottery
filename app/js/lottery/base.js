import $ from 'jquery';

class Base{
	// 初始化奖金和玩法及说明
	initPlayList() {
		this.play_list.set('r2', {
			bonus: 6,
			tip: '从01～11中任选2个或多个号码，所选号码与开奖号码任意两个号码相同，即中奖<em class="red">6</em>元',
			name: '任二'
		})
		.set('r3', {
			bonus: 19,
			tip: '从01～11中任选3个或多个号码，所选号码与开奖号码任意三个号码相同，即中奖<em class="red">19</em>元',
			name: '任三'
		})
		.set('r4', {
			bonus: 78,
			tip: '从01～11中任选4个或多个号码，所选号码与开奖号码任意四个号码相同，即中奖<em class="red">78</em>元',
			name: '任四'
		})
		.set('r5', {
			bonus: 540,
			tip: '从01～11中任选5个或多个号码，所选号码与开奖号码任意五个号码相同，即中奖<em class="red">540</em>元',
			name: '任五'
		})
		.set('r6', {
			bonus: 60,
			tip: '从01～11中任选6个或多个号码，所选号码与开奖号码任意六个号码相同，即中奖<em class="red">60</em>元',
			name: '任二'
		})
		.set('r7', {
			bonus: 26,
			tip: '从01～11中任选7个或多个号码，所选号码与开奖号码任意七个号码相同，即中奖<em class="red">26</em>元',
			name: '任二'
		})
		.set('r8', {
			bonus: 9,
			tip: '从01～11中任选8个或多个号码，所选号码与开奖号码任意八个号码相同，即中奖<em class="red">9</em>元',
			name: '任八'
		})
	}

	// 初始化号码
	initNumber() {
		for (let i = 1; i < 12; i++) {
			this.number.add(('' + i).padStart(2, '0'));		// set对象，使用add()，因为投注号码不可能重复，set不允许元素重复，padStart让每个字符串保持2个，要不然添加0
		}
	}

	// 设置遗漏数据，先清空，再重新赋值（10分钟更新一次）
	setOmit(omit) {
		let self = this;
		self.omit.clear();
		// 使用map对象的遍历方式
		for (let [index, item] of omit.entries()) {
			self.omit.set(index, item);
		}
		// 更新到页面上
		$(self.omit_el).each(function(index, item) {
			$(item).text(self.omit.get(index));
		});
	}

	// 设置开奖
	setOpenCode(code) {
		let self = this;
		self.open_code.clear();
		for (let item of code.values()) {
			self.open_code.add(item);		// set对象，开奖号码不重复
		}
		self.updateOpenCode && self.updateOpenCode.call(self, code);
	}

	// 如何选中一个号码，及取消
	toggleCodeActive(e) {
		let self = this;
		let $cur = $(e.currentTarget);		// 通过委托代理，获得当前被选中的DOM
		$cur.toggleClass('btn-boll-active');		// jquery方法，切换类
		self.getCount();
	}

	// 切换玩法
	changePlayNav(e) {
		let self = this;
		let $cur = $(e.currentTarget);		// currentTarget返回子元素，相对于target
		$cur.addClass('active').siblings().removeClass('active');		// 兄弟节点
		self.cur_play = $cur.attr('desc').toLocaleLowerCase();		// 将desc转成小写
		$('#zx_sm span').html(self.play_list.get(self.cur_play).tip);		// 玩法切换
		$('.boll-list .btn-boll').removeClass('btn-boll-active');
		self.getCount();
	}

	// 操作区动作
	assistHandle(e) {
		// 阻止默认事件
		e.preventDefault();
		let self = this;
		let $cur = $(e.currentTarget);
		let index = $cur.index();
		$('.boll-list .btn-boll').removeClass('btn-boll-active');
		if (index === 0) {
			$('.boll-list .btn-boll').addClass('btn-boll-active');		// 全选
		}
		if (index === 1) {
			$('.boll-list .btn-boll').each(function(i, t) {
				if (t.textContent > 5) {
					$(t).addClass('btn-boll-active');		// 大
				}
			})
		}
		if (index === 2) {
			$('.boll-list .btn-boll').each(function(i, t) {
				if (t.textContent < 6) {
					$(t).addClass('btn-boll-active');		// 小
				}
			})
		}
		if (index === 3) {
			$('.boll-list .btn-boll').each(function(i, t) {
				if (t.textContent % 2 === 1) {
					$(t).addClass('btn-boll-active');		// 奇
				}
			})
		}
		if (index === 4) {
			$('.boll-list .btn-boll').each(function(i, t) {
				if (t.textContent % 2 === 0) {
					$(t).addClass('btn-boll-active');		// 偶
				}
			})
		}
		self.getCount();
	}

	// 获取当前彩票名称
	getName() {
		return this.name;
	}

	// 确认选号
	addCode() {
		let self = this;
		let $active = $('.boll-list .btn-boll-active').text().match(/\d{2}/g);		// 每两个一组拼接成
		let active = $active ? $active.length : 0;
		let count = self.computeCount(active, self.cur_play);		// 注数
		if (count > 0) {
			self.addCodeItem($active.join(' '), self.cur_play, self.play_list.get(self.cur_play).name, count);
		}
	}

	// 添加单次号码
	addCodeItem(code, type, typeName, count) {
		let self = this;
		const tpl = `
			<li codes="${type}|${code}" bonus="${count*2}" count="${count}">
				<div class="code">
					<b>${typeName}${count > 1 ? '复式' : '单式'}</b>
					<b class="em">${code}</b>
					[${count}注,<em class="code-list-money">${count*2}</em>元]
				</div>
			</li>`;
		$(self.cart_el).append(tpl);		// append()是jquery的用法，appendChild是原生js用法
		self.getTotal();		// 计算总金额
	}

	// 
	getCount() {
		let self = this;
		let active = $('.boll-list .btn-boll-active').length;
		let count = self.computeCount(active, self.cur_play);
		let range = self.computeBonus(active, self.cur_play);
		let money = count * 2;
		let win1 = range[0] - money;		// 最小盈利
		let win2 = range[1] - money;		// 最大盈利
		let tpl;
		let c1 = (win1 < 0 && win2 < 0) ? Math.abs(win1) : win1;		// Math.abs()取绝对值
		let c2 = (win1 < 0 && win2 < 0) ? Math.abs(win2) : win2;
		if (count === 0) {
			tpl = `您选了 <b class="red">${count}</b> 注，共 <b class="red">${count*2}</b> 元`;
		} else if (range[0] === range[1]) {
			tpl = `您选了 <b>${count}</b> 注，共 <b>${count*2}</b> 元  
				<em>若中奖，奖金：
				<strong class="red">${range[0]}</strong> 元，
				您将${win1 >= 0 ? '盈利' : '亏损'}
				<strong class="${win1 >= 0 ? 'red' : 'green'}">${Math.abs(win1)}</strong> 元</em>
			`;
		} else {
			tpl = `您选了 <b>${count}</b> 注，共 <b>${count*2}</b> 元  
				<em>若中奖，奖金：
				<strong class="red">${range[0]}</strong> 至 <strong class="red"> ${range[1]} </strong> 元，
				您将${(win1 < 0 && win2 < 0) ? '亏损' : '盈利'}
				<strong class="${win1 >= 0 ? 'red' : 'green'}">${c1}</strong> 至
				<strong class="${win2 >= 0 ? 'red' : 'green'}"> ${c2} </strong> 元</em>
			`;
		}
		$('.sel_info').html(tpl);
	}

	// 计算总金额
	getTotal() {
		let count = 0;
		$('.result li').each(function(index, item) {
			count += $(item).attr('count') * 1;
		})
		$('#count').text(count);
		$('#money').text(count * 2);
	}

	// 随机
	getRandom(num) {
		let arr = [], index;
		let number = Array.from(this.number);		// 把类似数组转换成真正的数组
		while (num--) {
			index = Number.parseInt(Math.random() * number.length);
			arr.push(number[index]);
			number.splice(index, 1);
		}
		return arr.join(' ');
	}

	// 添加随机号码
	getRandomCode(e) {
		e.preventDefault();
		let num = e.currentTarget.getAttribute('count');
		let play = this.cur_play.match(/\d+/g)[0];
		let self = this;
		if (num === '0') {
			$(self.cart_el).html('');
		} else {
			for (let i = 0; i < num; i++) {
				self.addCodeItem(self.getRandom(play), self.cur_play, self.play_list.get(self.cur_play).name, 1);
			}
		}
	}
}

export default Base;

// 应用es6知识点
// 1、模块化，导入导出
// 2、class
// 3、数据结构，map，数据结构任意指定
// 4、字符串padStart(2, '0')补白
// 5、set集合，避免每个元素是重复的
// 6、clear()清空数据结构，无论是Set和Map
// 7、for(let [index, item] of omit.entries())遍历
// 8、字符串模板 `${}`
// 9、Array.from()把一个集合转换成一个数组，Map、Set --> 数组
// 10、jquery中的e.preventDefault()，阻止事件冒泡

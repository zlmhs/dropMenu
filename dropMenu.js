
(function(sunshine) {
 window.DropMeun = sunshine
})(function() {

	function DropMeun(option) {
		this.picker = null
		this.self = null
		this.option = option
		this.item = option.item || []
		this.style = option.style || {}
		this.dataList = option.data || []

		this.init()
    return this;
	}

	DropMeun.prototype.init = function () {
		var html = '',
				_this = this

		this.self = document.createElement('ul')
		this.picker = document.getElementById(this.option.id)

		if (! this.picker) {
			throw 'picker is null, making sure that picker\'s ID \''+ this.option.id +'\' is correct'
			return
		}


		if (this.option.ableSearch) {
			html += '<li><input class="dropMeun-searchInput" type="text"></li>'
		}

		this.dataList.forEach(function(data, index) {
			var item 		= _this.option.dataSrc ? data[_this.option.dataSrc] : data,
					content = _this.item.render  ? _this.item.render(item, data)  : item

			html += '<li class="dropMeun-item '+ (_this.item.className || '') +'" data-index="'+ index +'">'+ content +'</li>'
		})

		this.self.classList.add('dropMeun')
		this.self.innerHTML = html
		document.body.appendChild(this.self)

		this.setStyle()
		this.bindEvent()
	}

	DropMeun.prototype.setStyle = function() {

		this.self.style.width =
		this.style.width ?
		(parseInt(this.style.width) - 26) + 'px' :
		'150px'

		this.self.style.maxHeight =
		this.style.maxHeight ?
		(parseInt(this.style.maxHeight) - 26) + 'px' :
		'300px'

		var w = this.picker.offsetLeft + (parseInt(this.style.left) || 0)
		var h = this.picker.offsetTop + this.picker.offsetHeight + (parseInt(this.style.top) || 0)

		var realWidth = parseInt(this.self.style.width) + 26 	// 26 = dobule(padding + border)


		if (this.style.initPos === 'right') {
			w = w - realWidth + this.picker.offsetWidth
		}

		this.self.style.top  = h + 'px'
		this.self.style.left = w + 'px'

	}

	DropMeun.prototype.bindEvent = function() {
		var

		_this = this,
		iEvent = this.picker.nodeName.toUpperCase() !== 'INPUT' ?
						 'click' :
						 this.picker.type.toUpperCase() === 'TEXT' ?
						 'focus' : 'click'

		this.picker.addEventListener('click', function(ev) {
			var ev = ev || window.ev
			ev.stopPropagation()
		})

		//
		this.picker.addEventListener(iEvent, function(ev) {

			document.body.click() 	// 触发 window.click 使其他dropMeun关闭

			_this.self.style.display = 'block'
		})

		//
		window.addEventListener('click', function() {
			_this.self.style.display = 'none'
		})

		//
		this.self.addEventListener('click', function(ev) {
			var ev = ev || window.ev
			ev.stopPropagation()

			// 事件委托 item点击
			if (ev.target.classList.contains('dropMeun-item')) {
				var index = parseInt(ev.target.getAttribute('data-index'))
						data = _this.option.dataSrc ?
									 _this.dataList[index][_this.option.dataSrc] :
									 _this.dataList[index]


				if (iEvent === 'focus') {
					_this.picker.value = ev.target.innerText
				}

        if (_this.item.callbakc) {
          _this.item.callbakc(data, _this.picker, _this.dataList[index], _this.dataList)
        }

				_this.self.style.display = 'none'
			}
		})
		//
		if (_this.option.ableSearch) {

			_this.searchInput = _this.self.getElementsByClassName('dropMeun-searchInput')[0]

			_this.searchInput.addEventListener('keyup', function() {
				var target = this.value.trim(),
						items = _this.self.getElementsByClassName('dropMeun-item');

				[].slice.call(items).forEach(function(item, index) {
					item.style.display =
					item.innerText.indexOf(target) === -1 ?
					'none' : ''
				})

			})
		}
	}

	return DropMeun
}())

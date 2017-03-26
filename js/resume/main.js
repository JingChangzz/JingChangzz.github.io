$(document).ready(function() {
    $('#fullpage').fullpage({
    	anchors: ['firstPage', 'secondPage', 'thirdPage', 'fourthPage','fifthPage', 'lastPage'],
		menu: '#myMenu',
		navigation: true,
    	sectionsColor: ['#F9FAE1', '#F04F47', '#F9FAE1', '#F04F47', '#F9FAE1','#F04F47','#F9FAE1' ],
    	'afterLoad': function(anchorLink, index){
    				var speed = 500
				    var windowWidth =  $(window).width()
				    var radius = 60;
						if(windowWidth < 600){
							radius = 50;
						}
						if(windowWidth < 350){
							radius = 40;
						}
						var fontSize = Math.floor(radius / 3.3);
				if(index == 1){
					}
					if(index == 2){
						setTimeout(function () {
							$('#skills').find('.order1').addClass('active')
						}, speed*1)

						setTimeout(function () {
							$('#skills').find('.order2').addClass('active')
						}, speed*2)

						$('#html').waterbubble({
							radius: radius,
							wave: false,
							txt: 'HTML',
							font:'bold ' + fontSize + 'px "microsoft Yahei"',
							waterColor: '#F9FAE1',
							textColor: 'rgba(0, 0, 0, 0.8)',
							data: 0.8
						})
						$('#css').waterbubble({
							radius: radius,
							wave: false,
							txt: 'CSS',
							font:'bold ' + fontSize + 'px "microsoft Yahei"',
							waterColor: '#F9FAE1',
							textColor: 'rgba(0, 0, 0, 0.8)',
							data: 0.7
						})
						$('#javascript').waterbubble({
							radius: radius,
							wave: false,
							txt: 'JavaScript',
							font:'bold ' + fontSize + 'px "microsoft Yahei"',
							waterColor: '#F9FAE1',
							textColor: 'rgba(0, 0, 0, 0.8)',
							data: 0.6
						})
						$('#jquery').waterbubble({
							radius: radius,
							wave: false,
							txt: 'jQuery',
							font:'bold ' + fontSize + 'px "microsoft Yahei"',
							waterColor: '#F9FAE1',
							textColor: 'rgba(0, 0, 0, 0.8)',
							data: 0.5
						})
						$('#design').waterbubble({
							radius: radius,
							wave: false,
							txt: 'Design',
							font:'bold ' + fontSize + 'px "microsoft Yahei"',
							waterColor: '#F9FAE1',
							textColor: 'rgba(0, 0, 0, 0.8)',
							data: 0.5
						})
						$('#vue').waterbubble({
							radius: radius,
							wave: false,
							txt: 'Vue',
							font:'bold ' + fontSize + 'px "microsoft Yahei"',
							waterColor: '#F9FAE1',
							textColor: 'rgba(0, 0, 0, 0.8)',
							data: 0.5
						})
					}
					if(index == 3){
						setTimeout(function () {
							$('#projects').find('.order1').addClass('active')
						}, speed*1)

						setTimeout(function () {
							$('#projects').find('.order2').addClass('active')
						}, speed*2)
					}

					if(index == 4){
						setTimeout(function () {
							$('#education').find('.order1').addClass('active')
						}, speed*1)

						setTimeout(function () {
							$('#education').find('.order2').addClass('active')
						}, speed*2)
					}
				}
	});
	
	

});

function atvImg(){
	var d = document,
		de = d.documentElement,
		bd = d.getElementsByTagName('body')[0],
		htm = d.getElementsByTagName('html')[0],
		win = window,
		imgs = d.querySelectorAll('.atvImg'),
		totalImgs = imgs.length,
		supportsTouch = 'ontouchstart' in win || navigator.msMaxTouchPoints;

	if(totalImgs <= 0){
		return;
	}

	for(var l=0;l<totalImgs;l++){

		var thisImg = imgs[l],
			layerElems = thisImg.querySelectorAll('.atvImg-layer'),
			totalLayerElems = layerElems.length;

		if(totalLayerElems <= 0){
			continue;
		}

		while(thisImg.firstChild) {
			thisImg.removeChild(thisImg.firstChild);
		}

		var containerHTML = d.createElement('div'),
			shineHTML = d.createElement('div'),
			shadowHTML = d.createElement('div'),
			layersHTML = d.createElement('div'),
			layers = [];

		thisImg.id = 'atvImg__'+l;
		containerHTML.className = 'atvImg-container';
		shineHTML.className = 'atvImg-shine';
		shadowHTML.className = 'atvImg-shadow';
		layersHTML.className = 'atvImg-layers';

		for(var i=0;i<totalLayerElems;i++){
			var layer = d.createElement('div'),
				imgSrc = layerElems[i].getAttribute('data-img');

			layer.className = 'atvImg-rendered-layer';
			layer.setAttribute('data-layer',i);
			layer.style.backgroundImage = 'url('+imgSrc+')';
			layersHTML.appendChild(layer);

			layers.push(layer);
		}

		containerHTML.appendChild(shadowHTML);
		containerHTML.appendChild(layersHTML);
		containerHTML.appendChild(shineHTML);
		thisImg.appendChild(containerHTML);

		var w = thisImg.clientWidth || thisImg.offsetWidth || thisImg.scrollWidth;
		thisImg.style.transform = 'perspective('+ w*3 +'px)';

		if(supportsTouch){
			win.preventScroll = false;

			(function(_thisImg,_layers,_totalLayers,_shine) {
				thisImg.addEventListener('touchmove', function(e){
					if (win.preventScroll){
						e.preventDefault();
					}
					processMovement(e,true,_thisImg,_layers,_totalLayers,_shine);
				});
				thisImg.addEventListener('touchstart', function(e){
					win.preventScroll = true;
					processEnter(e,_thisImg);
				});
				thisImg.addEventListener('touchend', function(e){
					win.preventScroll = false;
					processExit(e,_thisImg,_layers,_totalLayers,_shine);
				});
			})(thisImg,layers,totalLayerElems,shineHTML);
		} else {
			(function(_thisImg,_layers,_totalLayers,_shine) {
				thisImg.addEventListener('mousemove', function(e){
					processMovement(e,false,_thisImg,_layers,_totalLayers,_shine);
				});
				thisImg.addEventListener('mouseenter', function(e){
					processEnter(e,_thisImg);
				});
				thisImg.addEventListener('mouseleave', function(e){
					processExit(e,_thisImg,_layers,_totalLayers,_shine);
				});
			})(thisImg,layers,totalLayerElems,shineHTML);
		}
	}

	function processMovement(e, touchEnabled, elem, layers, totalLayers, shine){

		var bdst = bd.scrollTop || htm.scrollTop,
			bdsl = bd.scrollLeft,
			pageX = (touchEnabled)? e.touches[0].pageX : e.pageX,
			pageY = (touchEnabled)? e.touches[0].pageY : e.pageY,
			offsets = elem.getBoundingClientRect(),
			w = elem.clientWidth || elem.offsetWidth || elem.scrollWidth,
			h = elem.clientHeight || elem.offsetHeight || elem.scrollHeight,
			wMultiple = 320/w,
			offsetX = 0.52 - (pageX - offsets.left - bdsl)/w,
			offsetY = 0.52 - (pageY - offsets.top - bdst)/h,
			dy = (pageY - offsets.top - bdst) - h / 2,
			dx = (pageX - offsets.left - bdsl) - w / 2,
			yRotate = (offsetX - dx)*(0.07 * wMultiple),
			xRotate = (dy - offsetY)*(0.1 * wMultiple),
			imgCSS = 'rotateX(' + xRotate + 'deg) rotateY(' + yRotate + 'deg)',
			arad = Math.atan2(dy, dx),
			angle = arad * 180 / Math.PI - 90;

		if (angle < 0) {
			angle = angle + 360;
		}

		if(elem.firstChild.className.indexOf(' over') != -1){
			imgCSS += ' scale3d(1.07,1.07,1.07)';
		}
		elem.firstChild.style.transform = imgCSS;

		shine.style.background = 'linear-gradient(' + angle + 'deg, rgba(255,255,255,' + (pageY - offsets.top - bdst)/h * 0.4 + ') 0%,rgba(255,255,255,0) 80%)';
		shine.style.transform = 'translateX(' + (offsetX * totalLayers) - 0.1 + 'px) translateY(' + (offsetY * totalLayers) - 0.1 + 'px)';

		var revNum = totalLayers;
		for(var ly=0;ly<totalLayers;ly++){
			layers[ly].style.transform = 'translateX(' + (offsetX * revNum) * ((ly * 2.5) / wMultiple) + 'px) translateY(' + (offsetY * totalLayers) * ((ly * 2.5) / wMultiple) + 'px)';
			revNum--;
		}
	}

	function processEnter(e, elem){
		elem.firstChild.className += ' over';
	}

	function processExit(e, elem, layers, totalLayers, shine){

		var container = elem.firstChild;

		container.className = container.className.replace(' over','');
		container.style.transform = '';
		shine.style.cssText = '';

		for(var ly=0;ly<totalLayers;ly++){
			layers[ly].style.transform = '';
		}

	}
}

atvImg();

/**
 * main.js
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2017, Codrops
 * http://www.codrops.com
 */
;(function(window) {

	'use strict';

	/**
	 * StackFx: The parent class.
	 */
	function StackFx(el) {
		this.DOM = {};
		this.DOM.el = el;
		this.DOM.stack = this.DOM.el.querySelector('.stack');
		this.DOM.stackItems = [].slice.call(this.DOM.stack.children);
		this.totalItems = this.DOM.stackItems.length;
		this.DOM.img = this.DOM.stack.querySelector('.stack__figure > .stack__img');
		this.DOM.caption = this.DOM.el.querySelector('.grid__item-caption');
		this.DOM.title = this.DOM.caption.querySelector('.grid__item-title');
		this.DOM.columns = {left: this.DOM.caption.querySelector('.column--left'), right: this.DOM.caption.querySelector('.column--right')};
	}

	StackFx.prototype._removeAnimeTargets = function() {
		anime.remove(this.DOM.stackItems);
		anime.remove(this.DOM.img);
		anime.remove(this.DOM.title);
		anime.remove(this.DOM.columns.left);
		anime.remove(this.DOM.columns.right);
	};

	/************************************************************************
	 * VegaFx.
	 ************************************************************************/
	function VegaFx(el) {
		StackFx.call(this, el);
		this._initEvents();
	}

	VegaFx.prototype = Object.create(StackFx.prototype);
	VegaFx.prototype.constructor = VegaFx;

	VegaFx.prototype._initEvents = function() {
		var self = this;
		this._mouseenterFn = function() {
			self._removeAnimeTargets();
			self._in();
		};
		this._mouseleaveFn = function() {
			self._removeAnimeTargets();
			self._out();
		};
		this.DOM.stack.addEventListener('mouseenter', this._mouseenterFn);
		this.DOM.stack.addEventListener('mouseleave', this._mouseleaveFn);
	};

	VegaFx.prototype._in = function() {
		var self = this;

		this.DOM.stackItems.map(function(e, i) {
			e.style.opacity = i !== self.totalItems - 1 ? 0.2*i+0.2 : 1
		});

		anime({
			targets: this.DOM.stackItems,
			translateZ: [
				{
					value: function(target, index) {
						return index*8 + 8;
					},
					duration: 200 ,
					easing: [0.42,0,1,1]
				},
				{
					value: function(target, index) {
						return index*20 + 20;
					},
					duration: 700,
					easing: [0.2,1,0.3,1]
				}
			],
			rotateX: [
				{
					value: function(target, index) {
						return -1 * (index*2 + 2);
					},
					duration: 200,
					easing: [0.42,0,1,1]
				},
				{
					value: 0,
					duration: 700,
					easing: [0.2,1,0.3,1]
				}
			]
		});

		anime({
			targets: this.DOM.img,
			duration: 900,
			easing: [0.2,1,0.3,1],
			scale: 0.7
		});

		anime({
			targets: this.DOM.title,
			translateY: {
				value: [35,0],
				duration: 500,
				easing: [0.5,1,0.3,1]
			},
			opacity: {
				value: [0,1],
				duration: 400,
				easing: 'linear'
			}
		});

		anime({
			targets: [this.DOM.columns.left, this.DOM.columns.right],
			translateY: [
				{
					value: function(target, index) {
						return index === 0 ? [40,0] : [60,0];
					},
					duration: 500,
					easing: [0.5,1,0.3,1],
					delay: 100
				}
			],
			opacity: [
				{value: [0,0], duration: 1, easing: 'linear'},
				{value: 1, delay: 100, duration: 400, easing: 'linear'}
			]
		});
	};

	VegaFx.prototype._out = function() {
		var self = this;

		anime({
			targets: this.DOM.stackItems,
			translateZ: [
				{
					value: function(target, index) {
						return index * 20 + 20 - 8;
					},
					duration: 200 ,
					easing: [0.42,0,1,1]
				},
				{
					value: 0,
					duration: 900,
					easing: [0.2,1,0.3,1]
				}
			],
			rotateX: [
				{
					value: function(target, index) {
						return index*2 + 2;
					},
					duration: 200,
					easing: [0.42,0,1,1]
				},
				{
					value: 0,
					duration: 900,
					easing: [0.2,1,0.3,1]
				}
			],
			opacity: {
				value: function(target, index, cnt) {
					return index !== cnt - 1 ? 0 : 1
				},
				duration: 900,
				delay: 200,
				easing: [0.2,1,0.3,1]
			}
		});

		anime({
			targets: this.DOM.img,
			duration: 900,
			easing: [0.2,1,0.3,1],
			scale: 1
		});

		anime({
			targets: this.DOM.title,
			duration: 750,
			easing: [0.2,1,0.3,1],
			translateY: 0,
			opacity: 1
		});

		anime({
			targets: [this.DOM.columns.left, this.DOM.columns.right],
			duration: 750,
			easing: [0.2,1,0.3,1],
			translateY: 0,
			opacity: 1
		});
	};

	window.VegaFx = VegaFx;

	/************************************************************************
	 * CastorFx.
	 ************************************************************************/
	function CastorFx(el) {
		StackFx.call(this, el);
		this._initEvents();
	}

	CastorFx.prototype = Object.create(StackFx.prototype);
	CastorFx.prototype.constructor = CastorFx;

	CastorFx.prototype._initEvents = function() {
		var self = this;
		this._mouseenterFn = function() {
			self._removeAnimeTargets();
			self._in();
		};
		this._mouseleaveFn = function() {
			self._removeAnimeTargets();
			self._out();
		};
		this.DOM.stack.addEventListener('mouseenter', this._mouseenterFn);
		this.DOM.stack.addEventListener('mouseleave', this._mouseleaveFn);
	};

	CastorFx.prototype._in = function() {
		var self = this;

		anime({
			targets: this.DOM.stackItems,
			rotateX: {
				value: function(target, index, cnt) {
					return index === cnt - 1 ? 0 : [70, 0];
				},
				duration: 1000,
				easing: 'easeOutExpo'
			},
			translateZ: {
				value: function(target, index, cnt) {
					return index === cnt - 1 ? index*20 : [-300, index*20];
				},
				duration: 1000,
				easing: 'easeOutExpo'
			},
			opacity: {
				value: function(target, index, cnt) {
					return index === cnt - 1 ? 1 : [0,0.2*index+0.2];
				},
				duration: 1000,
				easing: 'linear'
			},
			delay: function(target, index, cnt) {
				return (cnt-index-1)*100
			}
		});

		anime({
			targets: this.DOM.img,
			duration: 1000,
			easing: 'easeOutExpo',
			scale: 0.7
		});

		anime({
			targets: this.DOM.title,
			duration: 1000,
			easing: 'easeOutExpo',
			translateZ: 30
		});
	};

	CastorFx.prototype._out = function() {
		var self = this;

		anime({
			targets: this.DOM.stackItems,
			duration: 1000,
			easing: 'easeOutExpo',
			translateZ: 0,
			opacity: function(target, index, cnt) {
				return index !== cnt - 1 ? 0 : 1
			}
		});

		anime({
			targets: this.DOM.img,
			duration: 1000,
			easing: 'easeOutExpo',
			scale: 1
		});

		anime({
			targets: this.DOM.title,
			duration: 1000,
			easing: 'easeOutExpo',
			translateZ: 0
		});

		anime({
			targets: [this.DOM.columns.left, this.DOM.columns.right],
			duration: 500,
			easing: 'easeOutExpo',
			delay: function(target, index) {
				return index === 0 ? 150 : 200;
			},
			translateX: 0,
			translateY: 0
		});
	};

	window.CastorFx = CastorFx;

	/************************************************************************
	 * HamalFx.
	 ************************************************************************/
	function HamalFx(el) {
		StackFx.call(this, el);
		this._initEvents();
	}

	HamalFx.prototype = Object.create(StackFx.prototype);
	HamalFx.prototype.constructor = HamalFx;

	HamalFx.prototype._initEvents = function() {
		var self = this;
		this._mouseenterFn = function() {
			self._removeAnimeTargets();
			self._in();
		};
		this._mouseleaveFn = function() {
			self._removeAnimeTargets();
			self._out();
		};
		this.DOM.stack.addEventListener('mouseenter', this._mouseenterFn);
		this.DOM.stack.addEventListener('mouseleave', this._mouseleaveFn);
	};

	HamalFx.prototype._in = function() {
		var self = this;

		this.DOM.stackItems.map(function(e, i) {
			e.style.opacity = i !== self.totalItems - 1 ? 0.2*i+0.2 : 1
		});

		anime({
			targets: this.DOM.stackItems,
			duration: 1000,
			easing: 'easeOutExpo',
			translateY: function(target, index) {
				return -1*index*5;
			},
			rotate: function(target, index, cnt) {
				if( index === cnt - 1 ) {
					return 0;
				}
				else {
					return index%2 ? (cnt-index)*1 : -1*(cnt-index)*1;
				}
			},
			scale: function(target, index, cnt) {
				if( index === cnt - 1 ) {
					return 1;
				}
				else {
					return 1.05;
				}
			},
			delay: function(target, index, cnt) {
				return (cnt-index-1)*30
			}
		});

		anime({
			targets: this.DOM.img,
			duration: 1000,
			easing: 'easeOutExpo',
			scale: 0.7
		});

		anime({
			targets: [this.DOM.columns.left, this.DOM.columns.right],
			duration: 1000,
			easing: 'easeOutExpo',
			translateX: function(target, index) {
				return index === 0 ? -30 : 30;
			}
		});

	};

	HamalFx.prototype._out = function() {
		var self = this;

		anime({
			targets: this.DOM.stackItems,
			duration: 500,
			easing: 'easeOutExpo',
			translateY: 0,
			rotate: 0,
			scale: 1,
			opacity: function(target, index, cnt) {
				return index !== cnt - 1 ? 0 : 1
			}
		});

		anime({
			targets: this.DOM.img,
			duration: 1000,
			easing: 'easeOutElastic',
			scale: 1
		});

		anime({
			targets: [this.DOM.columns.left, this.DOM.columns.right],
			duration: 500,
			easing: 'easeOutExpo',
			translateX: 0
		});
	};

	window.HamalFx = HamalFx;

	/************************************************************************
	 * PolarisFx.
	 ************************************************************************/
	function PolarisFx(el) {
		StackFx.call(this, el);
		this._initEvents();
	}

	PolarisFx.prototype = Object.create(StackFx.prototype);
	PolarisFx.prototype.constructor = PolarisFx;

	PolarisFx.prototype._initEvents = function() {
		var self = this;
		this._mouseenterFn = function() {
			self._removeAnimeTargets();
			self._in();
		};
		this._mouseleaveFn = function() {
			self._removeAnimeTargets();
			self._out();
		};
		this.DOM.stack.addEventListener('mouseenter', this._mouseenterFn);
		this.DOM.stack.addEventListener('mouseleave', this._mouseleaveFn);
	};

	PolarisFx.prototype._in = function() {
		var self = this;

		this.DOM.stackItems.map(function(e, i) {
			e.style.opacity = i !== self.totalItems - 1 ? 0.2*i+0.2 : 1
		});

		anime({
			targets: this.DOM.stackItems,
			duration: 1000,
			easing: 'easeOutElastic',
			translateZ: function(target, index) {
				return index*10;
			},
			delay: function(target, index, cnt) {
				return (cnt-index-1)*20
			}
		});

		anime({
			targets: this.DOM.img,
			duration: 500,
			easing: 'easeOutExpo',
			scale: 0.7
		});

		anime({
			targets: this.DOM.title,
			duration: 1000,
			easing: 'easeOutElastic',
			translateZ: 30
		});

		anime({
			targets: [this.DOM.columns.left, this.DOM.columns.right],
			duration: 1000,
			easing: 'easeOutElastic',
			translateX: function(target, index) {
				return index === 0 ? -30 : 30;
			},
			translateY: 30
		});
	};

	PolarisFx.prototype._out = function() {
		var self = this;

		anime({
			targets: this.DOM.stackItems,
			duration: 1000,
			easing: 'easeOutExpo',
			translateZ: 0,
			opacity: function(target, index, cnt) {
				return index !== cnt - 1 ? 0 : 1
			}
		});

		anime({
			targets: this.DOM.img,
			duration: 1000,
			easing: 'easeOutExpo',
			scale: 1
		});

		anime({
			targets: this.DOM.title,
			duration: 500,
			delay: 100,
			easing: 'easeOutExpo',
			translateZ: 0
		});

		anime({
			targets: [this.DOM.columns.left, this.DOM.columns.right],
			duration: 500,
			easing: 'easeOutExpo',
			delay: function(target, index) {
				return index === 0 ? 150 : 200;
			},
			translateX: 0,
			translateY: 0
		});
	};

	window.PolarisFx = PolarisFx;

	/************************************************************************
	 * AlphardFx.
	 ************************************************************************/
	function AlphardFx(el) {
		StackFx.call(this, el);
		this._initEvents();
	}

	AlphardFx.prototype = Object.create(StackFx.prototype);
	AlphardFx.prototype.constructor = AlphardFx;

	AlphardFx.prototype._initEvents = function() {
		var self = this;
		this._mouseenterFn = function() {
			self._removeAnimeTargets();
			self._in();
		};
		this._mouseleaveFn = function() {
			self._removeAnimeTargets();
			self._out();
		};
		this.DOM.stack.addEventListener('mouseenter', this._mouseenterFn);
		this.DOM.stack.addEventListener('mouseleave', this._mouseleaveFn);
	};

	AlphardFx.prototype._in = function() {
		var self = this;

		this.DOM.stackItems.map(function(e, i) {
			e.style.opacity = i !== self.totalItems - 1 ? 0.2*i+0.2 : 1
		});

		anime({
			targets: this.DOM.stackItems,
			opacity: {
				value: function(target, index, cnt) {
					return index !== cnt - 1 ? [0,0.2*index+0.2] : 1
				},
				duration: 1,
				easing: 'linear',
				delay: function(target, index, cnt) {
					return (cnt-index-1)*30 + 250
				}
			},
			rotate: [
				{
					value: 12,
					duration: 250,
					easing: 'easeOutQuad'
				},
				{
					value: function(target, index) {
						return -1*index*3 - 3;
					},
					duration: 1000,
					easing: 'easeOutExpo'
				}
			],
			delay: function(target, index, cnt) {
				return (cnt-index-1)*30
			}
		});

		anime({
			targets: this.DOM.img,
			rotate: [
				{
					value: [0,12],
					duration: 250,
					easing: 'easeOutQuad',
				},
				{
					value: [12,0],
					duration: 1200,
					delay: 50,
					easing: 'easeOutExpo',
				}
			]
		});

		anime({
			targets: [this.DOM.columns.left, this.DOM.columns.right],
			duration: 500,
			easing: 'easeOutExpo',
			translateY: function(target, index) {
				return index === 0 ? -5 : 5;
			}
		});
	};

	AlphardFx.prototype._out = function() {
		var self = this;

		anime({
			targets: this.DOM.stackItems,
			duration: 500,
			easing: 'easeOutExpo',
			rotate: 0,
			opacity: function(target, index, cnt) {
				return index !== cnt - 1 ? 0 : 1
			}
		});

		anime({
			targets: this.DOM.img,
			duration: 1000,
			easing: 'easeOutExpo',
			rotate: 1
		});

		anime({
			targets: [this.DOM.columns.left, this.DOM.columns.right],
			duration: 500,
			easing: 'easeOutExpo',
			translateY: 0
		});
	};

	window.AlphardFx = AlphardFx;

	/************************************************************************
	 * AltairFx.
	 ************************************************************************/
	function AltairFx(el) {
		StackFx.call(this, el);
		this._initEvents();
	}

	AltairFx.prototype = Object.create(StackFx.prototype);
	AltairFx.prototype.constructor = AltairFx;

	AltairFx.prototype._initEvents = function() {
		var self = this;
		this._mouseenterFn = function() {
			self._removeAnimeTargets();
			self._in();
		};
		this._mouseleaveFn = function() {
			self._removeAnimeTargets();
			self._out();
		};
		this.DOM.stack.addEventListener('mouseenter', this._mouseenterFn);
		this.DOM.stack.addEventListener('mouseleave', this._mouseleaveFn);
	};

	AltairFx.prototype._in = function() {
		var self = this;

		this.DOM.stackItems.map(function(e, i) {
			e.style.opacity = i !== self.totalItems - 1 ? 0.2*i+0.2 : 1
		});

		anime({
			targets: this.DOM.stackItems,
			duration: 1000,
			easing: 'easeOutElastic',
			translateZ: function(target, index, cnt) {
				return index*3;
			},
			rotateX: function(target, index, cnt) {
				return -1*index*4;
			},
			delay: function(target, index, cnt) {
				return (cnt-index-1)*30
			}
		});

		anime({
			targets: this.DOM.img,
			duration: 500,
			easing: 'easeOutExpo',
			scale: 0.7
		});

		anime({
			targets: this.DOM.title,
			duration: 1000,
			easing: 'easeOutElastic',
			translateY: 20
		});

		anime({
			targets: [this.DOM.columns.left, this.DOM.columns.right],
			duration: 1000,
			easing: 'easeOutElastic',
			translateY: function(target, index) {
				return index === 0 ? 30 : 20;
			}
		});
	};

	AltairFx.prototype._out = function() {
		var self = this;

		anime({
			targets: this.DOM.stackItems,
			duration: 500,
			easing: 'easeOutExpo',
			opacity: function(target, index, cnt) {
				return index !== cnt - 1 ? 0 : 1
			},
			translateZ: 0,
			rotateX: 0
		});

		anime({
			targets: this.DOM.img,
			duration: 500,
			easing: 'easeOutExpo',
			scale: 1
		});

		anime({
			targets: [this.DOM.columns.left, this.DOM.columns.right, this.DOM.title],
			duration: 500,
			easing: 'easeOutExpo',
			translateY: 0
		});
	};

	window.AltairFx = AltairFx;

	/************************************************************************
	 * RigelFx.
	 ************************************************************************/
	function RigelFx(el) {
		StackFx.call(this, el);
		this._initEvents();
	}

	RigelFx.prototype = Object.create(StackFx.prototype);
	RigelFx.prototype.constructor = RigelFx;

	RigelFx.prototype._initEvents = function() {
		var self = this;
		this._mouseenterFn = function() {
			self._removeAnimeTargets();
			self._in();
		};
		this._mouseleaveFn = function() {
			self._removeAnimeTargets();
			self._out();
		};
		this.DOM.stack.addEventListener('mouseenter', this._mouseenterFn);
		this.DOM.stack.addEventListener('mouseleave', this._mouseleaveFn);
	};

	RigelFx.prototype._in = function() {
		var self = this;

		anime({
			targets: this.DOM.stackItems,
			translateZ: {
				value: function(target, index) {
					return index*10;
				},
				duration: 800,
				easing: 'easeOutExpo',
				delay: 200
			},
			opacity: {
				value: function(target, index, cnt) {
					return index !== cnt - 1 ? [0,0.1*index+0.1] : 1
				},
				duration: 1,
				easing: 'linear',
				delay: 200
			},
			translateY: [
				{
					value: function(target, index) {
						return -1*index*10;
					},
					duration: 800,
					delay: 200,
					elasticity: 300
				},
			],
			scaleY: [
				{
					value: 0.8,
					duration: 200,
					easing: 'easeOutExpo'
				},
				{
					value: 1,
					duration: 800,
					elasticity: 300
				}
			],
			scaleX: [
				{
					value: 1.1,
					duration: 200,
					easing: 'easeOutExpo'
				},
				{
					value: 1,
					duration: 800,
					elasticity: 300
				}
			]
		});

		anime({
			targets: this.DOM.img,
			duration: 900,
			easing: 'easeOutExpo',
			delay: 200,
			scale: 0.7
		});

		anime({
			targets: this.DOM.title,
			translateY: {
				value: [200,0],
				duration: 800,
				easing: 'easeOutExpo',
			},
			opacity: {
				value: [0,1],
				duration: 400,
				delay: 200,
				easing: 'linear'
			}
		});

		anime({
			targets: [this.DOM.columns.left, this.DOM.columns.right],
			translateY: [
				{
					value: [60,0],
					duration: 800,
					easing: 'easeOutExpo',
					delay: 200
				}
			],
			opacity: [
				{value: [0,0], duration: 1, easing: 'linear'},
				{value: 1, delay: 300, duration: 400, easing: 'linear'}
			]
		});
	};

	RigelFx.prototype._out = function() {
		var self = this;

		anime({
			targets: this.DOM.stackItems,
			duration: 800,
			easing: 'easeOutElastic',
			translateZ: 0,
			opacity: function(target, index, cnt) {
				return index !== cnt - 1 ? 0 : 1
			},
			translateY: 0
		});

		anime({
			targets: this.DOM.img,
			duration: 800,
			easing: 'easeOutElastic',
			scale: 1
		});

		anime({
			targets: this.DOM.title,
			duration: 800,
			easing: 'easeOutExpo',
			translateY: 0,
			opacity: 1
		});

		anime({
			targets: [this.DOM.columns.left, this.DOM.columns.right],
			duration: 800,
			easing: 'easeOutExpo',
			translateY: 0,
			opacity: 1
		});
	};

	window.RigelFx = RigelFx;

	/************************************************************************
	 * CanopusFx.
	 ************************************************************************/
	function CanopusFx(el) {
		StackFx.call(this, el);
		this._initEvents();
	}

	CanopusFx.prototype = Object.create(StackFx.prototype);
	CanopusFx.prototype.constructor = CanopusFx;

	CanopusFx.prototype._initEvents = function() {
		var self = this;
		this._mouseenterFn = function() {
			self._removeAnimeTargets();
			self._in();
		};
		this._mouseleaveFn = function() {
			self._removeAnimeTargets();
			self._out();
		};
		this.DOM.stack.addEventListener('mouseenter', this._mouseenterFn);
		this.DOM.stack.addEventListener('mouseleave', this._mouseleaveFn);
	};

	CanopusFx.prototype._in = function() {
		var self = this;

		this.DOM.stackItems.map(function(e, i) {
			e.style.opacity = i !== self.totalItems - 1 ? 0 : 1
		});

		var self = this;
		anime({
			targets: this.DOM.stackItems,
			translateZ: {
				value: function(target, index, cnt) {
					return -1*(cnt-index-1)*20;
				},
				duration: 800,
				easing: 'easeOutExpo',
				delay: function(target, index, cnt) {
					return (cnt-index-1)*70 + 200;
				}
			},
			translateY: [
				{
					value: function(target, index) {
						return -1*index*20 - 30;
					},
					duration: 800,
					delay: function(target, index, cnt) {
						return (cnt-index-1)*70 + 200;
					},
					elasticity: 500
				},
			],
			scaleY: [
				{
					value: function(target, index, cnt) {
						return index === cnt-1 ? 0.6 : 1;
					},
					duration: 200,
					easing: 'easeOutExpo'
				},
				{
					value: 0.8,
					duration: 800,
					elasticity: 450
				}
			],
			scaleX: [
				{
					value: function(target, index, cnt) {
						return index === cnt-1 ? 1.1 : 1;
					},
					duration: 200,
					easing: 'easeOutExpo'
				},
				{
					value: 0.8,
					duration: 800,
					elasticity: 300
				}
			],
			opacity: {
				value: function(target, index, cnt) {
					return index === cnt-1 ? 1 : [0,0.2*index+0.2];
				},
				duration: 200,
				easing: 'linear',
				delay: function(target, index, cnt) {
					return (cnt-index-1)*70 + 200;
				}
			}
		});

		anime({
			targets: this.DOM.img,
			scale: [
				{
					value: 1.8,
					duration: 200,
					easing: 'easeOutExpo'
				},
				{
					value: 0.7,
					duration: 1100,
					easing: 'easeOutExpo'
				}
			]
		});

		anime({
			targets: [this.DOM.title, this.DOM.columns.left, this.DOM.columns.right],
			duration: 1000,
			easing: 'easeOutElastic',
			translateY: -30,
			delay: 200
		});
	};

	CanopusFx.prototype._out = function() {
		var self = this;

		anime({
			targets: this.DOM.stackItems,
			duration: 500,
			easing: 'easeOutExpo',
			translateZ: 0,
			translateY: 0,
			scaleY: 1,
			scaleX: 1,
			opacity: function(target, index, cnt) {
				return index !== cnt - 1 ? 0 : 1
			}
		});

		anime({
			targets: this.DOM.img,
			duration: 500,
			easing: 'easeOutExpo',
			scale: 1
		});

		anime({
			targets: [this.DOM.title, this.DOM.columns.left, this.DOM.columns.right],
			duration: 500,
			easing: 'easeOutExpo',
			translateY: 0
		});
	};

	window.CanopusFx = CanopusFx;

	/************************************************************************
	 * PolluxFx.
	 ************************************************************************/
	function PolluxFx(el) {
		StackFx.call(this, el);
		this._initEvents();
	}

	PolluxFx.prototype = Object.create(StackFx.prototype);
	PolluxFx.prototype.constructor = PolluxFx;

	PolluxFx.prototype._initEvents = function() {
		var self = this;
		this._mouseenterFn = function() {
			self._removeAnimeTargets();
			self._in();
		};
		this._mouseleaveFn = function() {
			self._removeAnimeTargets();
			self._out();
		};
		this.DOM.stack.addEventListener('mouseenter', this._mouseenterFn);
		this.DOM.stack.addEventListener('mouseleave', this._mouseleaveFn);
	};

	PolluxFx.prototype._in = function() {
		var self = this;

		anime({
			targets: this.DOM.stackItems,
			duration: 1000,
			opacity: {
				value: function(target, index, cnt) {
					return index !== cnt - 1 ? [0,0.1*index+0.1] : 1
				},
				easing: 'linear',
				delay: function(target, index, cnt) {
					return (cnt-index-1)*60;
				}
			},
			translateY: {
				value: function(target, index) {
					return -1*index*10;
				},
				easing: 'easeInOutCubic'
			},
			rotateX: {
				value: 80,
				easing: 'easeInOutCubic'
			},
			rotateZ: {
				value: 360,
				easing: 'easeInOutCubic',
				delay: function(target, index, cnt) {
					return (cnt-index-1)*60;
				}
			}
		});

		anime({
			targets: this.DOM.img,
			duration: 1000,
			easing: 'easeInOutCubic',
			scale: 0.7
		});

		anime({
			targets: this.DOM.title,
			rotate: [
				{
					value: [0,10],
					duration: 300,
					delay: 300,
					easing: 'easeOutCubic',
				},
				{
					value: [-20,0],
					duration: 300,
					easing: 'easeOutCubic',
				}
			],
			opacity: [
				{
					value: [1,0],
					duration: 100,
					delay: 300,
					easing: 'easeOutCubic'
				},
				{
					value: [0,1],
					duration: 100,
					delay: 300,
					easing: 'easeOutCubic'
				}
			]
		});
	};

	PolluxFx.prototype._out = function() {
		var self = this;

		anime({
			targets: this.DOM.stackItems,
			duration: 1000,
			opacity: {
				value: function(target, index, cnt) {
					return index !== cnt - 1 ? 0 : 1
				},
				easing: 'linear',
				delay: function(target, index) {
					return index*60;
				},
			},
			translateY: {
				value: 0,
				easing: 'easeInOutCubic'
			},
			rotateX: {
				value: 0,
				easing: 'easeInOutCubic'
			},
			rotateZ: {
				value: 0,
				easing: 'easeInOutCubic',
				delay: function(target, index, cnt) {
					return (cnt-index-1)*60;
				}
			}
		});

		anime({
			targets: this.DOM.img,
			duration: 1000,
			easing: 'easeInOutCubic',
			scale: 1
		});

		anime({
			targets: this.DOM.title,
			duration: 1000,
			easing: 'easeInOutCubic',
			rotate: 0,
			opacity: 1
		});
	};

	window.PolluxFx = PolluxFx;

	/************************************************************************
	 * DenebFx.
	 ************************************************************************/
	function DenebFx(el) {
		StackFx.call(this, el);
		this._initEvents();
	}

	DenebFx.prototype = Object.create(StackFx.prototype);
	DenebFx.prototype.constructor = DenebFx;

	DenebFx.prototype._initEvents = function() {
		var self = this;
		this._mouseenterFn = function() {
			self._removeAnimeTargets();
			self._in();
		};
		this._mouseleaveFn = function() {
			self._removeAnimeTargets();
			self._out();
		};
		this.DOM.stack.addEventListener('mouseenter', this._mouseenterFn);
		this.DOM.stack.addEventListener('mouseleave', this._mouseleaveFn);
	};

	DenebFx.prototype._in = function() {
		var self = this;

		anime({
			targets: this.DOM.stackItems,
			duration: 1000,
			easing: [0.2,1,0.3,1],
			rotate: 360,
			opacity: function(target, index, cnt) {
				return index !== cnt - 1 ? [0,0.1*index+0.1] : 1
			},
			delay: function(target, index, cnt) {
				return (cnt-index-1)*30;
			}
		});

		anime({
			targets: this.DOM.img,
			duration: 1100,
			delay: 20,
			easing: [0.2,1,0.3,1],
			scale: 0.7,
			rotate: 360
		});

		anime({
			targets: [this.DOM.columns.left, this.DOM.columns.right],
			duration: 650,
			delay: 400,
			easing: [0.2,1,0.3,1],
			rotate: [-20,0],
			opacity: 1
		});
	};

	DenebFx.prototype._out = function() {
		var self = this;

		anime({
			targets: this.DOM.stackItems,
			duration: 1000,
			easing: [0.2,1,0.3,1],
			rotate: 0,
			opacity: function(target, index, cnt) {
				return index !== cnt - 1 ? [0,0.1*index+0.1] : 1
			},
			delay: function(target, index, cnt) {
				return (cnt-index-1)*30;
			}
		});

		anime({
			targets: this.DOM.img,
			duration: 1750,
			easing: [0.2,1,0.3,1],
			scale: 1,
			rotate: 0
		});

		anime({
			targets: [this.DOM.columns.left, this.DOM.columns.right],
			duration: 400,
			easing: 'easeInCubic',
			rotate: [0,-10],
			opacity: 0
		});
	};

	window.DenebFx = DenebFx;

})(window);/**
 * main.js
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2017, Codrops
 * http://www.codrops.com
 */
;(function(window) {

	'use strict';

	/**
	 * StackFx: The parent class.
	 */
	function StackFx(el) {
		this.DOM = {};
		this.DOM.el = el;
		this.DOM.stack = this.DOM.el.querySelector('.stack');
		this.DOM.stackItems = [].slice.call(this.DOM.stack.children);
		this.totalItems = this.DOM.stackItems.length;
		this.DOM.img = this.DOM.stack.querySelector('.stack__figure > .stack__img');
		this.DOM.caption = this.DOM.el.querySelector('.grid__item-caption');
		this.DOM.title = this.DOM.caption.querySelector('.grid__item-title');
		this.DOM.columns = {left: this.DOM.caption.querySelector('.column--left'), right: this.DOM.caption.querySelector('.column--right')};
	}

	StackFx.prototype._removeAnimeTargets = function() {
		anime.remove(this.DOM.stackItems);
		anime.remove(this.DOM.img);
		anime.remove(this.DOM.title);
		anime.remove(this.DOM.columns.left);
		anime.remove(this.DOM.columns.right);
	};

	/************************************************************************
	 * VegaFx.
	 ************************************************************************/
	function VegaFx(el) {
		StackFx.call(this, el);
		this._initEvents();
	}

	VegaFx.prototype = Object.create(StackFx.prototype);
	VegaFx.prototype.constructor = VegaFx;

	VegaFx.prototype._initEvents = function() {
		var self = this;
		this._mouseenterFn = function() {
			self._removeAnimeTargets();
			self._in();
		};
		this._mouseleaveFn = function() {
			self._removeAnimeTargets();
			self._out();
		};
		this.DOM.stack.addEventListener('mouseenter', this._mouseenterFn);
		this.DOM.stack.addEventListener('mouseleave', this._mouseleaveFn);
	};

	VegaFx.prototype._in = function() {
		var self = this;

		this.DOM.stackItems.map(function(e, i) {
			e.style.opacity = i !== self.totalItems - 1 ? 0.2*i+0.2 : 1
		});

		anime({
			targets: this.DOM.stackItems,
			translateZ: [
				{
					value: function(target, index) {
						return index*8 + 8;
					},
					duration: 200 ,
					easing: [0.42,0,1,1]
				},
				{
					value: function(target, index) {
						return index*20 + 20;
					},
					duration: 700,
					easing: [0.2,1,0.3,1]
				}
			],
			rotateX: [
				{
					value: function(target, index) {
						return -1 * (index*2 + 2);
					},
					duration: 200,
					easing: [0.42,0,1,1]
				},
				{
					value: 0,
					duration: 700,
					easing: [0.2,1,0.3,1]
				}
			]
		});

		anime({
			targets: this.DOM.img,
			duration: 900,
			easing: [0.2,1,0.3,1],
			scale: 0.7
		});

		anime({
			targets: this.DOM.title,
			translateY: {
				value: [35,0],
				duration: 500,
				easing: [0.5,1,0.3,1]
			},
			opacity: {
				value: [0,1],
				duration: 400,
				easing: 'linear'
			}
		});

		anime({
			targets: [this.DOM.columns.left, this.DOM.columns.right],
			translateY: [
				{
					value: function(target, index) {
						return index === 0 ? [40,0] : [60,0];
					},
					duration: 500,
					easing: [0.5,1,0.3,1],
					delay: 100
				}
			],
			opacity: [
				{value: [0,0], duration: 1, easing: 'linear'},
				{value: 1, delay: 100, duration: 400, easing: 'linear'}
			]
		});
	};

	VegaFx.prototype._out = function() {
		var self = this;

		anime({
			targets: this.DOM.stackItems,
			translateZ: [
				{
					value: function(target, index) {
						return index * 20 + 20 - 8;
					},
					duration: 200 ,
					easing: [0.42,0,1,1]
				},
				{
					value: 0,
					duration: 900,
					easing: [0.2,1,0.3,1]
				}
			],
			rotateX: [
				{
					value: function(target, index) {
						return index*2 + 2;
					},
					duration: 200,
					easing: [0.42,0,1,1]
				},
				{
					value: 0,
					duration: 900,
					easing: [0.2,1,0.3,1]
				}
			],
			opacity: {
				value: function(target, index, cnt) {
					return index !== cnt - 1 ? 0 : 1
				},
				duration: 900,
				delay: 200,
				easing: [0.2,1,0.3,1]
			}
		});

		anime({
			targets: this.DOM.img,
			duration: 900,
			easing: [0.2,1,0.3,1],
			scale: 1
		});

		anime({
			targets: this.DOM.title,
			duration: 750,
			easing: [0.2,1,0.3,1],
			translateY: 0,
			opacity: 1
		});

		anime({
			targets: [this.DOM.columns.left, this.DOM.columns.right],
			duration: 750,
			easing: [0.2,1,0.3,1],
			translateY: 0,
			opacity: 1
		});
	};

	window.VegaFx = VegaFx;

	/************************************************************************
	 * CastorFx.
	 ************************************************************************/
	function CastorFx(el) {
		StackFx.call(this, el);
		this._initEvents();
	}

	CastorFx.prototype = Object.create(StackFx.prototype);
	CastorFx.prototype.constructor = CastorFx;

	CastorFx.prototype._initEvents = function() {
		var self = this;
		this._mouseenterFn = function() {
			self._removeAnimeTargets();
			self._in();
		};
		this._mouseleaveFn = function() {
			self._removeAnimeTargets();
			self._out();
		};
		this.DOM.stack.addEventListener('mouseenter', this._mouseenterFn);
		this.DOM.stack.addEventListener('mouseleave', this._mouseleaveFn);
	};

	CastorFx.prototype._in = function() {
		var self = this;

		anime({
			targets: this.DOM.stackItems,
			rotateX: {
				value: function(target, index, cnt) {
					return index === cnt - 1 ? 0 : [70, 0];
				},
				duration: 1000,
				easing: 'easeOutExpo'
			},
			translateZ: {
				value: function(target, index, cnt) {
					return index === cnt - 1 ? index*20 : [-300, index*20];
				},
				duration: 1000,
				easing: 'easeOutExpo'
			},
			opacity: {
				value: function(target, index, cnt) {
					return index === cnt - 1 ? 1 : [0,0.2*index+0.2];
				},
				duration: 1000,
				easing: 'linear'
			},
			delay: function(target, index, cnt) {
				return (cnt-index-1)*100
			}
		});

		anime({
			targets: this.DOM.img,
			duration: 1000,
			easing: 'easeOutExpo',
			scale: 0.7
		});

		anime({
			targets: this.DOM.title,
			duration: 1000,
			easing: 'easeOutExpo',
			translateZ: 30
		});
	};

	CastorFx.prototype._out = function() {
		var self = this;

		anime({
			targets: this.DOM.stackItems,
			duration: 1000,
			easing: 'easeOutExpo',
			translateZ: 0,
			opacity: function(target, index, cnt) {
				return index !== cnt - 1 ? 0 : 1
			}
		});

		anime({
			targets: this.DOM.img,
			duration: 1000,
			easing: 'easeOutExpo',
			scale: 1
		});

		anime({
			targets: this.DOM.title,
			duration: 1000,
			easing: 'easeOutExpo',
			translateZ: 0
		});

		anime({
			targets: [this.DOM.columns.left, this.DOM.columns.right],
			duration: 500,
			easing: 'easeOutExpo',
			delay: function(target, index) {
				return index === 0 ? 150 : 200;
			},
			translateX: 0,
			translateY: 0
		});
	};

	window.CastorFx = CastorFx;

	/************************************************************************
	 * HamalFx.
	 ************************************************************************/
	function HamalFx(el) {
		StackFx.call(this, el);
		this._initEvents();
	}

	HamalFx.prototype = Object.create(StackFx.prototype);
	HamalFx.prototype.constructor = HamalFx;

	HamalFx.prototype._initEvents = function() {
		var self = this;
		this._mouseenterFn = function() {
			self._removeAnimeTargets();
			self._in();
		};
		this._mouseleaveFn = function() {
			self._removeAnimeTargets();
			self._out();
		};
		this.DOM.stack.addEventListener('mouseenter', this._mouseenterFn);
		this.DOM.stack.addEventListener('mouseleave', this._mouseleaveFn);
	};

	HamalFx.prototype._in = function() {
		var self = this;

		this.DOM.stackItems.map(function(e, i) {
			e.style.opacity = i !== self.totalItems - 1 ? 0.2*i+0.2 : 1
		});

		anime({
			targets: this.DOM.stackItems,
			duration: 1000,
			easing: 'easeOutExpo',
			translateY: function(target, index) {
				return -1*index*5;
			},
			rotate: function(target, index, cnt) {
				if( index === cnt - 1 ) {
					return 0;
				}
				else {
					return index%2 ? (cnt-index)*1 : -1*(cnt-index)*1;
				}
			},
			scale: function(target, index, cnt) {
				if( index === cnt - 1 ) {
					return 1;
				}
				else {
					return 1.05;
				}
			},
			delay: function(target, index, cnt) {
				return (cnt-index-1)*30
			}
		});

		anime({
			targets: this.DOM.img,
			duration: 1000,
			easing: 'easeOutExpo',
			scale: 0.7
		});

		anime({
			targets: [this.DOM.columns.left, this.DOM.columns.right],
			duration: 1000,
			easing: 'easeOutExpo',
			translateX: function(target, index) {
				return index === 0 ? -30 : 30;
			}
		});

	};

	HamalFx.prototype._out = function() {
		var self = this;

		anime({
			targets: this.DOM.stackItems,
			duration: 500,
			easing: 'easeOutExpo',
			translateY: 0,
			rotate: 0,
			scale: 1,
			opacity: function(target, index, cnt) {
				return index !== cnt - 1 ? 0 : 1
			}
		});

		anime({
			targets: this.DOM.img,
			duration: 1000,
			easing: 'easeOutElastic',
			scale: 1
		});

		anime({
			targets: [this.DOM.columns.left, this.DOM.columns.right],
			duration: 500,
			easing: 'easeOutExpo',
			translateX: 0
		});
	};

	window.HamalFx = HamalFx;

	/************************************************************************
	 * PolarisFx.
	 ************************************************************************/
	function PolarisFx(el) {
		StackFx.call(this, el);
		this._initEvents();
	}

	PolarisFx.prototype = Object.create(StackFx.prototype);
	PolarisFx.prototype.constructor = PolarisFx;

	PolarisFx.prototype._initEvents = function() {
		var self = this;
		this._mouseenterFn = function() {
			self._removeAnimeTargets();
			self._in();
		};
		this._mouseleaveFn = function() {
			self._removeAnimeTargets();
			self._out();
		};
		this.DOM.stack.addEventListener('mouseenter', this._mouseenterFn);
		this.DOM.stack.addEventListener('mouseleave', this._mouseleaveFn);
	};

	PolarisFx.prototype._in = function() {
		var self = this;

		this.DOM.stackItems.map(function(e, i) {
			e.style.opacity = i !== self.totalItems - 1 ? 0.2*i+0.2 : 1
		});

		anime({
			targets: this.DOM.stackItems,
			duration: 1000,
			easing: 'easeOutElastic',
			translateZ: function(target, index) {
				return index*10;
			},
			delay: function(target, index, cnt) {
				return (cnt-index-1)*20
			}
		});

		anime({
			targets: this.DOM.img,
			duration: 500,
			easing: 'easeOutExpo',
			scale: 0.7
		});

		anime({
			targets: this.DOM.title,
			duration: 1000,
			easing: 'easeOutElastic',
			translateZ: 30
		});

		anime({
			targets: [this.DOM.columns.left, this.DOM.columns.right],
			duration: 1000,
			easing: 'easeOutElastic',
			translateX: function(target, index) {
				return index === 0 ? -30 : 30;
			},
			translateY: 30
		});
	};

	PolarisFx.prototype._out = function() {
		var self = this;

		anime({
			targets: this.DOM.stackItems,
			duration: 1000,
			easing: 'easeOutExpo',
			translateZ: 0,
			opacity: function(target, index, cnt) {
				return index !== cnt - 1 ? 0 : 1
			}
		});

		anime({
			targets: this.DOM.img,
			duration: 1000,
			easing: 'easeOutExpo',
			scale: 1
		});

		anime({
			targets: this.DOM.title,
			duration: 500,
			delay: 100,
			easing: 'easeOutExpo',
			translateZ: 0
		});

		anime({
			targets: [this.DOM.columns.left, this.DOM.columns.right],
			duration: 500,
			easing: 'easeOutExpo',
			delay: function(target, index) {
				return index === 0 ? 150 : 200;
			},
			translateX: 0,
			translateY: 0
		});
	};

	window.PolarisFx = PolarisFx;

	/************************************************************************
	 * AlphardFx.
	 ************************************************************************/
	function AlphardFx(el) {
		StackFx.call(this, el);
		this._initEvents();
	}

	AlphardFx.prototype = Object.create(StackFx.prototype);
	AlphardFx.prototype.constructor = AlphardFx;

	AlphardFx.prototype._initEvents = function() {
		var self = this;
		this._mouseenterFn = function() {
			self._removeAnimeTargets();
			self._in();
		};
		this._mouseleaveFn = function() {
			self._removeAnimeTargets();
			self._out();
		};
		this.DOM.stack.addEventListener('mouseenter', this._mouseenterFn);
		this.DOM.stack.addEventListener('mouseleave', this._mouseleaveFn);
	};

	AlphardFx.prototype._in = function() {
		var self = this;

		this.DOM.stackItems.map(function(e, i) {
			e.style.opacity = i !== self.totalItems - 1 ? 0.2*i+0.2 : 1
		});

		anime({
			targets: this.DOM.stackItems,
			opacity: {
				value: function(target, index, cnt) {
					return index !== cnt - 1 ? [0,0.2*index+0.2] : 1
				},
				duration: 1,
				easing: 'linear',
				delay: function(target, index, cnt) {
					return (cnt-index-1)*30 + 250
				}
			},
			rotate: [
				{
					value: 12,
					duration: 250,
					easing: 'easeOutQuad'
				},
				{
					value: function(target, index) {
						return -1*index*3 - 3;
					},
					duration: 1000,
					easing: 'easeOutExpo'
				}
			],
			delay: function(target, index, cnt) {
				return (cnt-index-1)*30
			}
		});

		anime({
			targets: this.DOM.img,
			rotate: [
				{
					value: [0,12],
					duration: 250,
					easing: 'easeOutQuad',
				},
				{
					value: [12,0],
					duration: 1200,
					delay: 50,
					easing: 'easeOutExpo',
				}
			]
		});

		anime({
			targets: [this.DOM.columns.left, this.DOM.columns.right],
			duration: 500,
			easing: 'easeOutExpo',
			translateY: function(target, index) {
				return index === 0 ? -5 : 5;
			}
		});
	};

	AlphardFx.prototype._out = function() {
		var self = this;

		anime({
			targets: this.DOM.stackItems,
			duration: 500,
			easing: 'easeOutExpo',
			rotate: 0,
			opacity: function(target, index, cnt) {
				return index !== cnt - 1 ? 0 : 1
			}
		});

		anime({
			targets: this.DOM.img,
			duration: 1000,
			easing: 'easeOutExpo',
			rotate: 1
		});

		anime({
			targets: [this.DOM.columns.left, this.DOM.columns.right],
			duration: 500,
			easing: 'easeOutExpo',
			translateY: 0
		});
	};

	window.AlphardFx = AlphardFx;

	/************************************************************************
	 * AltairFx.
	 ************************************************************************/
	function AltairFx(el) {
		StackFx.call(this, el);
		this._initEvents();
	}

	AltairFx.prototype = Object.create(StackFx.prototype);
	AltairFx.prototype.constructor = AltairFx;

	AltairFx.prototype._initEvents = function() {
		var self = this;
		this._mouseenterFn = function() {
			self._removeAnimeTargets();
			self._in();
		};
		this._mouseleaveFn = function() {
			self._removeAnimeTargets();
			self._out();
		};
		this.DOM.stack.addEventListener('mouseenter', this._mouseenterFn);
		this.DOM.stack.addEventListener('mouseleave', this._mouseleaveFn);
	};

	AltairFx.prototype._in = function() {
		var self = this;

		this.DOM.stackItems.map(function(e, i) {
			e.style.opacity = i !== self.totalItems - 1 ? 0.2*i+0.2 : 1
		});

		anime({
			targets: this.DOM.stackItems,
			duration: 1000,
			easing: 'easeOutElastic',
			translateZ: function(target, index, cnt) {
				return index*3;
			},
			rotateX: function(target, index, cnt) {
				return -1*index*4;
			},
			delay: function(target, index, cnt) {
				return (cnt-index-1)*30
			}
		});

		anime({
			targets: this.DOM.img,
			duration: 500,
			easing: 'easeOutExpo',
			scale: 0.7
		});

		anime({
			targets: this.DOM.title,
			duration: 1000,
			easing: 'easeOutElastic',
			translateY: 20
		});

		anime({
			targets: [this.DOM.columns.left, this.DOM.columns.right],
			duration: 1000,
			easing: 'easeOutElastic',
			translateY: function(target, index) {
				return index === 0 ? 30 : 20;
			}
		});
	};

	AltairFx.prototype._out = function() {
		var self = this;

		anime({
			targets: this.DOM.stackItems,
			duration: 500,
			easing: 'easeOutExpo',
			opacity: function(target, index, cnt) {
				return index !== cnt - 1 ? 0 : 1
			},
			translateZ: 0,
			rotateX: 0
		});

		anime({
			targets: this.DOM.img,
			duration: 500,
			easing: 'easeOutExpo',
			scale: 1
		});

		anime({
			targets: [this.DOM.columns.left, this.DOM.columns.right, this.DOM.title],
			duration: 500,
			easing: 'easeOutExpo',
			translateY: 0
		});
	};

	window.AltairFx = AltairFx;

	/************************************************************************
	 * RigelFx.
	 ************************************************************************/
	function RigelFx(el) {
		StackFx.call(this, el);
		this._initEvents();
	}

	RigelFx.prototype = Object.create(StackFx.prototype);
	RigelFx.prototype.constructor = RigelFx;

	RigelFx.prototype._initEvents = function() {
		var self = this;
		this._mouseenterFn = function() {
			self._removeAnimeTargets();
			self._in();
		};
		this._mouseleaveFn = function() {
			self._removeAnimeTargets();
			self._out();
		};
		this.DOM.stack.addEventListener('mouseenter', this._mouseenterFn);
		this.DOM.stack.addEventListener('mouseleave', this._mouseleaveFn);
	};

	RigelFx.prototype._in = function() {
		var self = this;

		anime({
			targets: this.DOM.stackItems,
			translateZ: {
				value: function(target, index) {
					return index*10;
				},
				duration: 800,
				easing: 'easeOutExpo',
				delay: 200
			},
			opacity: {
				value: function(target, index, cnt) {
					return index !== cnt - 1 ? [0,0.1*index+0.1] : 1
				},
				duration: 1,
				easing: 'linear',
				delay: 200
			},
			translateY: [
				{
					value: function(target, index) {
						return -1*index*10;
					},
					duration: 800,
					delay: 200,
					elasticity: 300
				},
			],
			scaleY: [
				{
					value: 0.8,
					duration: 200,
					easing: 'easeOutExpo'
				},
				{
					value: 1,
					duration: 800,
					elasticity: 300
				}
			],
			scaleX: [
				{
					value: 1.1,
					duration: 200,
					easing: 'easeOutExpo'
				},
				{
					value: 1,
					duration: 800,
					elasticity: 300
				}
			]
		});

		anime({
			targets: this.DOM.img,
			duration: 900,
			easing: 'easeOutExpo',
			delay: 200,
			scale: 0.7
		});

		anime({
			targets: this.DOM.title,
			translateY: {
				value: [200,0],
				duration: 800,
				easing: 'easeOutExpo',
			},
			opacity: {
				value: [0,1],
				duration: 400,
				delay: 200,
				easing: 'linear'
			}
		});

		anime({
			targets: [this.DOM.columns.left, this.DOM.columns.right],
			translateY: [
				{
					value: [60,0],
					duration: 800,
					easing: 'easeOutExpo',
					delay: 200
				}
			],
			opacity: [
				{value: [0,0], duration: 1, easing: 'linear'},
				{value: 1, delay: 300, duration: 400, easing: 'linear'}
			]
		});
	};

	RigelFx.prototype._out = function() {
		var self = this;

		anime({
			targets: this.DOM.stackItems,
			duration: 800,
			easing: 'easeOutElastic',
			translateZ: 0,
			opacity: function(target, index, cnt) {
				return index !== cnt - 1 ? 0 : 1
			},
			translateY: 0
		});

		anime({
			targets: this.DOM.img,
			duration: 800,
			easing: 'easeOutElastic',
			scale: 1
		});

		anime({
			targets: this.DOM.title,
			duration: 800,
			easing: 'easeOutExpo',
			translateY: 0,
			opacity: 1
		});

		anime({
			targets: [this.DOM.columns.left, this.DOM.columns.right],
			duration: 800,
			easing: 'easeOutExpo',
			translateY: 0,
			opacity: 1
		});
	};

	window.RigelFx = RigelFx;

	/************************************************************************
	 * CanopusFx.
	 ************************************************************************/
	function CanopusFx(el) {
		StackFx.call(this, el);
		this._initEvents();
	}

	CanopusFx.prototype = Object.create(StackFx.prototype);
	CanopusFx.prototype.constructor = CanopusFx;

	CanopusFx.prototype._initEvents = function() {
		var self = this;
		this._mouseenterFn = function() {
			self._removeAnimeTargets();
			self._in();
		};
		this._mouseleaveFn = function() {
			self._removeAnimeTargets();
			self._out();
		};
		this.DOM.stack.addEventListener('mouseenter', this._mouseenterFn);
		this.DOM.stack.addEventListener('mouseleave', this._mouseleaveFn);
	};

	CanopusFx.prototype._in = function() {
		var self = this;

		this.DOM.stackItems.map(function(e, i) {
			e.style.opacity = i !== self.totalItems - 1 ? 0 : 1
		});

		var self = this;
		anime({
			targets: this.DOM.stackItems,
			translateZ: {
				value: function(target, index, cnt) {
					return -1*(cnt-index-1)*20;
				},
				duration: 800,
				easing: 'easeOutExpo',
				delay: function(target, index, cnt) {
					return (cnt-index-1)*70 + 200;
				}
			},
			translateY: [
				{
					value: function(target, index) {
						return -1*index*20 - 30;
					},
					duration: 800,
					delay: function(target, index, cnt) {
						return (cnt-index-1)*70 + 200;
					},
					elasticity: 500
				},
			],
			scaleY: [
				{
					value: function(target, index, cnt) {
						return index === cnt-1 ? 0.6 : 1;
					},
					duration: 200,
					easing: 'easeOutExpo'
				},
				{
					value: 0.8,
					duration: 800,
					elasticity: 450
				}
			],
			scaleX: [
				{
					value: function(target, index, cnt) {
						return index === cnt-1 ? 1.1 : 1;
					},
					duration: 200,
					easing: 'easeOutExpo'
				},
				{
					value: 0.8,
					duration: 800,
					elasticity: 300
				}
			],
			opacity: {
				value: function(target, index, cnt) {
					return index === cnt-1 ? 1 : [0,0.2*index+0.2];
				},
				duration: 200,
				easing: 'linear',
				delay: function(target, index, cnt) {
					return (cnt-index-1)*70 + 200;
				}
			}
		});

		anime({
			targets: this.DOM.img,
			scale: [
				{
					value: 1.8,
					duration: 200,
					easing: 'easeOutExpo'
				},
				{
					value: 0.7,
					duration: 1100,
					easing: 'easeOutExpo'
				}
			]
		});

		anime({
			targets: [this.DOM.title, this.DOM.columns.left, this.DOM.columns.right],
			duration: 1000,
			easing: 'easeOutElastic',
			translateY: -30,
			delay: 200
		});
	};

	CanopusFx.prototype._out = function() {
		var self = this;

		anime({
			targets: this.DOM.stackItems,
			duration: 500,
			easing: 'easeOutExpo',
			translateZ: 0,
			translateY: 0,
			scaleY: 1,
			scaleX: 1,
			opacity: function(target, index, cnt) {
				return index !== cnt - 1 ? 0 : 1
			}
		});

		anime({
			targets: this.DOM.img,
			duration: 500,
			easing: 'easeOutExpo',
			scale: 1
		});

		anime({
			targets: [this.DOM.title, this.DOM.columns.left, this.DOM.columns.right],
			duration: 500,
			easing: 'easeOutExpo',
			translateY: 0
		});
	};

	window.CanopusFx = CanopusFx;

	/************************************************************************
	 * PolluxFx.
	 ************************************************************************/
	function PolluxFx(el) {
		StackFx.call(this, el);
		this._initEvents();
	}

	PolluxFx.prototype = Object.create(StackFx.prototype);
	PolluxFx.prototype.constructor = PolluxFx;

	PolluxFx.prototype._initEvents = function() {
		var self = this;
		this._mouseenterFn = function() {
			self._removeAnimeTargets();
			self._in();
		};
		this._mouseleaveFn = function() {
			self._removeAnimeTargets();
			self._out();
		};
		this.DOM.stack.addEventListener('mouseenter', this._mouseenterFn);
		this.DOM.stack.addEventListener('mouseleave', this._mouseleaveFn);
	};

	PolluxFx.prototype._in = function() {
		var self = this;

		anime({
			targets: this.DOM.stackItems,
			duration: 1000,
			opacity: {
				value: function(target, index, cnt) {
					return index !== cnt - 1 ? [0,0.1*index+0.1] : 1
				},
				easing: 'linear',
				delay: function(target, index, cnt) {
					return (cnt-index-1)*60;
				}
			},
			translateY: {
				value: function(target, index) {
					return -1*index*10;
				},
				easing: 'easeInOutCubic'
			},
			rotateX: {
				value: 80,
				easing: 'easeInOutCubic'
			},
			rotateZ: {
				value: 360,
				easing: 'easeInOutCubic',
				delay: function(target, index, cnt) {
					return (cnt-index-1)*60;
				}
			}
		});

		anime({
			targets: this.DOM.img,
			duration: 1000,
			easing: 'easeInOutCubic',
			scale: 0.7
		});

		anime({
			targets: this.DOM.title,
			rotate: [
				{
					value: [0,10],
					duration: 300,
					delay: 300,
					easing: 'easeOutCubic',
				},
				{
					value: [-20,0],
					duration: 300,
					easing: 'easeOutCubic',
				}
			],
			opacity: [
				{
					value: [1,0],
					duration: 100,
					delay: 300,
					easing: 'easeOutCubic'
				},
				{
					value: [0,1],
					duration: 100,
					delay: 300,
					easing: 'easeOutCubic'
				}
			]
		});
	};

	PolluxFx.prototype._out = function() {
		var self = this;

		anime({
			targets: this.DOM.stackItems,
			duration: 1000,
			opacity: {
				value: function(target, index, cnt) {
					return index !== cnt - 1 ? 0 : 1
				},
				easing: 'linear',
				delay: function(target, index) {
					return index*60;
				},
			},
			translateY: {
				value: 0,
				easing: 'easeInOutCubic'
			},
			rotateX: {
				value: 0,
				easing: 'easeInOutCubic'
			},
			rotateZ: {
				value: 0,
				easing: 'easeInOutCubic',
				delay: function(target, index, cnt) {
					return (cnt-index-1)*60;
				}
			}
		});

		anime({
			targets: this.DOM.img,
			duration: 1000,
			easing: 'easeInOutCubic',
			scale: 1
		});

		anime({
			targets: this.DOM.title,
			duration: 1000,
			easing: 'easeInOutCubic',
			rotate: 0,
			opacity: 1
		});
	};

	window.PolluxFx = PolluxFx;

	/************************************************************************
	 * DenebFx.
	 ************************************************************************/
	function DenebFx(el) {
		StackFx.call(this, el);
		this._initEvents();
	}

	DenebFx.prototype = Object.create(StackFx.prototype);
	DenebFx.prototype.constructor = DenebFx;

	DenebFx.prototype._initEvents = function() {
		var self = this;
		this._mouseenterFn = function() {
			self._removeAnimeTargets();
			self._in();
		};
		this._mouseleaveFn = function() {
			self._removeAnimeTargets();
			self._out();
		};
		this.DOM.stack.addEventListener('mouseenter', this._mouseenterFn);
		this.DOM.stack.addEventListener('mouseleave', this._mouseleaveFn);
	};

	DenebFx.prototype._in = function() {
		var self = this;

		anime({
			targets: this.DOM.stackItems,
			duration: 1000,
			easing: [0.2,1,0.3,1],
			rotate: 360,
			opacity: function(target, index, cnt) {
				return index !== cnt - 1 ? [0,0.1*index+0.1] : 1
			},
			delay: function(target, index, cnt) {
				return (cnt-index-1)*30;
			}
		});

		anime({
			targets: this.DOM.img,
			duration: 1100,
			delay: 20,
			easing: [0.2,1,0.3,1],
			scale: 0.7,
			rotate: 360
		});

		anime({
			targets: [this.DOM.columns.left, this.DOM.columns.right],
			duration: 650,
			delay: 400,
			easing: [0.2,1,0.3,1],
			rotate: [-20,0],
			opacity: 1
		});
	};

	DenebFx.prototype._out = function() {
		var self = this;

		anime({
			targets: this.DOM.stackItems,
			duration: 1000,
			easing: [0.2,1,0.3,1],
			rotate: 0,
			opacity: function(target, index, cnt) {
				return index !== cnt - 1 ? [0,0.1*index+0.1] : 1
			},
			delay: function(target, index, cnt) {
				return (cnt-index-1)*30;
			}
		});

		anime({
			targets: this.DOM.img,
			duration: 1750,
			easing: [0.2,1,0.3,1],
			scale: 1,
			rotate: 0
		});

		anime({
			targets: [this.DOM.columns.left, this.DOM.columns.right],
			duration: 400,
			easing: 'easeInCubic',
			rotate: [0,-10],
			opacity: 0
		});
	};

	window.DenebFx = DenebFx;

})(window);
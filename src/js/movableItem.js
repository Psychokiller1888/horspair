import Moveable from 'moveable'

export default class MoveableItem {

	constructor(controller) {
		this.controller = controller
		this.moveable = null
		this.target = null
	}

	destroyMoveable() {
		try {
			this.moveable.destroy()
			this.target = null
		} catch {
			// do nothing
		}
	}

	computeStyle(obj) {
		let style = `left:${obj['settings']['x']}px;`
		style += `top:${obj['settings']['y']}px;`
		style += `width:${obj['settings']['w']}px;`
		style += `height:${obj['settings']['h']}px;`
		style += `z-index:${obj['settings']['z']};`
		style += `transform:rotate(${obj['settings']['r']}deg);`

		return style
	}

	setMoveable(target, note) {
		this.destroyMoveable()
		this.target = target
		this.moveable = new Moveable(document.querySelector('.board'), {
			target:             target,
			draggable:          true,
			resizable:          true,
			rotatable:          true,
			snappable:          false,
			roundable:          false,
			isDisplaySnapDigit: true,
			snapCenter:         true,
			snapGap:            false,
			snapThreshold:      15,
			throttleDrag:       1,
			throttleResize:     1,
			throttleRotate:     5,
			scalable:           false,
			keepRatio:          false,
			edge:               false,
			origin:             false
		})

		this.moveable.on('drag', ({target, left, top, _clientX, _clientY}) => {
			target.style.left = `${left}px`
			target.style.top = `${top}px`
		}).on('dragEnd', ({target, left, top}) => {
			console.log('implement drag end')
		}).on('rotate', ({target, rotation}) => {
			target.style.transform = `rotate(${rotation}deg)`
		}).on('rotateEnd', ({target, rotation}) => {
			console.log('Implement rotate end')
		}).on('resize', ({target, width, height}) => {
			target.style.width = `${width}px`
			target.style.height = `${height}px`
		}).on('resizeEnd', ({target, width, height}) => {
			console.log('Implement resize end')
		})
	}
}

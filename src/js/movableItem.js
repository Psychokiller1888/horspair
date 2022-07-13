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
			props:              note,
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

		let self = this
		this.moveable.on('drag', ({target, left, top, _clientX, _clientY}) => {
			self.moveable.props.object.startX = left
			self.moveable.props.object.startY = top
			//target.style.left = `${left}px`
			//target.style.top = `${top}px`
		}).on('dragEnd', ({target, left, top}) => {
			self.moveable.props.save()
		}).on('rotate', ({target, rotation}) => {
			self.moveable.props.object.rotation = rotation
			//target.style.transform = `rotate(${rotation}deg)`
		}).on('rotateEnd', ({target, rotation}) => {
			self.moveable.props.save()
		}).on('resize', ({target, width, height}) => {
			self.moveable.props.object.width = width
			self.moveable.props.object.height = height
			//target.style.width = `${width}px`
			//target.style.height = `${height}px`
		}).on('resizeEnd', ({target, width, height}) => {
			self.moveable.props.save()
		})
	}
}

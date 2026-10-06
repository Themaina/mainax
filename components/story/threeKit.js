/**
 * Shared helpers for the story's three.js scenes.
 */

export const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v))
export const ease = t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
export const lerp = (a, b, t) => a + (b - a) * t

/**
 * Loads three.js + helpers and creates a renderer inside `el`.
 * Returns null when WebGL is unavailable.
 */
export async function createStage(el) {
	const THREE = await import('three')
	const { RoundedBoxGeometry } = await import('three/examples/jsm/geometries/RoundedBoxGeometry.js')
	const { RoomEnvironment } = await import('three/examples/jsm/environments/RoomEnvironment.js')

	let renderer
	try {
		renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' })
	} catch (e) {
		return null
	}
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
	renderer.setSize(el.clientWidth, el.clientHeight)
	renderer.outputColorSpace = THREE.SRGBColorSpace
	renderer.toneMapping = THREE.ACESFilmicToneMapping
	renderer.toneMappingExposure = 1.1
	el.appendChild(renderer.domElement)

	const scene = new THREE.Scene()
	const pmrem = new THREE.PMREMGenerator(renderer)
	scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.03).texture

	const maxAniso = renderer.capabilities.getMaxAnisotropy()

	const canvasTexture = (w, h, draw) => {
		const c = document.createElement('canvas')
		c.width = w; c.height = h
		const g = c.getContext('2d')
		draw(g, w, h)
		const t = new THREE.CanvasTexture(c)
		t.colorSpace = THREE.SRGBColorSpace
		t.anisotropy = maxAniso
		t.userData.canvas = c
		t.userData.redraw = fn => { fn(g, w, h); t.needsUpdate = true }
		return t
	}

	const loadImage = src => new Promise(resolve => {
		const img = new Image()
		img.onload = () => resolve(img)
		img.onerror = () => resolve(null)
		img.src = src
	})

	// Rounded rectangle path usable for both canvas and THREE.Shape
	const roundRect = (s, x, y, w, h, r) => {
		s.moveTo(x + r, y); s.lineTo(x + w - r, y); s.quadraticCurveTo(x + w, y, x + w, y + r)
		s.lineTo(x + w, y + h - r); s.quadraticCurveTo(x + w, y + h, x + w - r, y + h); s.lineTo(x + r, y + h)
		s.quadraticCurveTo(x, y + h, x, y + h - r); s.lineTo(x, y + r); s.quadraticCurveTo(x, y, x + r, y)
	}

	const dispose = () => {
		scene.traverse(o => {
			if (o.geometry) o.geometry.dispose()
			if (o.material) [].concat(o.material).forEach(m => {
				Object.values(m).forEach(v => v && v.isTexture && v.dispose())
				m.dispose()
			})
		})
		pmrem.dispose()
		renderer.dispose()
		renderer.domElement.remove()
	}

	return { THREE, RoundedBoxGeometry, renderer, scene, canvasTexture, loadImage, roundRect, dispose }
}

/**
 * Runs `frame(dt, t)` on every animation frame while `el` is on screen.
 */
export function runLoop(THREE, el, frame) {
	let raf = 0, visible = true
	const clock = new THREE.Clock()
	const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) clock.getDelta() })
	io.observe(el)
	const tick = () => {
		raf = requestAnimationFrame(tick)
		if (!visible) return
		const dt = Math.min(clock.getDelta(), .1)
		frame(dt, clock.elapsedTime)
	}
	tick()
	return () => { cancelAnimationFrame(raf); io.disconnect() }
}

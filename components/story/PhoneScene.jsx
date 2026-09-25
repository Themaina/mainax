import { useEffect, useRef } from 'react'

/**
 * PhoneScene
 * A procedurally-built smartphone in three.js that explodes into its layers
 * and then dives into the SoC as the visitor scrolls.
 *
 * @param {MotionValue} progress 0..1 scroll progress of the hero section
 */
export default function PhoneScene({ progress, className }) {

	const mount = useRef(null)

	useEffect(() => {
		let disposed = false
		let cleanup = () => {}

		;(async () => {
			const THREE = await import('three')
			const { RoundedBoxGeometry } = await import('three/examples/jsm/geometries/RoundedBoxGeometry.js')
			const { RoomEnvironment } = await import('three/examples/jsm/environments/RoomEnvironment.js')
			if (disposed || !mount.current) return

			const el = mount.current
			let renderer
			try {
				renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' })
			} catch (e) {
				return // No WebGL: the section still reads fine without the model
			}
			renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
			renderer.setSize(el.clientWidth, el.clientHeight)
			renderer.outputColorSpace = THREE.SRGBColorSpace
			renderer.toneMapping = THREE.ACESFilmicToneMapping
			renderer.toneMappingExposure = 1.05
			el.appendChild(renderer.domElement)

			const scene = new THREE.Scene()
			const pmrem = new THREE.PMREMGenerator(renderer)
			scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture

			const camera = new THREE.PerspectiveCamera(32, el.clientWidth / el.clientHeight, 0.01, 100)
			camera.position.set(0, 0, 9)

			// Lights: warm key, red rim, cool fill
			scene.add(new THREE.AmbientLight(0xffffff, 0.15))
			const key = new THREE.DirectionalLight(0xffffff, 1.6)
			key.position.set(3, 4, 6)
			scene.add(key)
			const rim = new THREE.PointLight(0xff1a1a, 60, 20)
			rim.position.set(-4, 1, -2)
			scene.add(rim)
			const under = new THREE.PointLight(0xff3b30, 25, 12)
			under.position.set(2, -4, 2)
			scene.add(under)

			const W = 1.5, H = 3.1, R = 0.2
			const phone = new THREE.Group()
			scene.add(phone)

			// ---------- Textures drawn on canvas ----------
			const canvasTexture = (w, h, draw) => {
				const c = document.createElement('canvas')
				c.width = w; c.height = h
				draw(c.getContext('2d'), w, h)
				const t = new THREE.CanvasTexture(c)
				t.colorSpace = THREE.SRGBColorSpace
				t.anisotropy = 8
				return t
			}

			const screenTex = canvasTexture(512, 1060, (g, w, h) => {
				const grd = g.createRadialGradient(w * .5, h * .38, 10, w * .5, h * .45, h * .7)
				grd.addColorStop(0, '#ff2a1f'); grd.addColorStop(.35, '#8a0008'); grd.addColorStop(1, '#050505')
				g.fillStyle = grd; g.fillRect(0, 0, w, h)
				g.fillStyle = 'rgba(255,255,255,.92)'
				g.font = '600 34px Inter, sans-serif'; g.textAlign = 'center'
				g.fillText('09:41', w / 2, 90)
				g.font = '800 250px Inter, sans-serif'
				g.fillText('M', w / 2, h * .5)
				g.font = '500 30px Inter, sans-serif'
				g.fillStyle = 'rgba(255,255,255,.7)'
				g.fillText('how does this work?', w / 2, h * .5 + 80)
			})

			const boardTex = canvasTexture(512, 560, (g, w, h) => {
				g.fillStyle = '#0b0b0d'; g.fillRect(0, 0, w, h)
				g.strokeStyle = 'rgba(255,40,30,.75)'; g.lineWidth = 2
				for (let i = 0; i < 70; i++) {
					let x = Math.random() * w, y = Math.random() * h
					g.beginPath(); g.moveTo(x, y)
					for (let s = 0; s < 4; s++) {
						Math.random() > .5 ? x += (Math.random() - .5) * 180 : y += (Math.random() - .5) * 180
						g.lineTo(x, y)
					}
					g.stroke()
				}
				g.fillStyle = 'rgba(255,200,120,.8)'
				for (let i = 0; i < 160; i++) g.fillRect(Math.random() * w, Math.random() * h, 3, 3)
			})

			// ---------- Layers ----------
			const layers = []
			const addLayer = (mesh, z, spread) => { mesh.position.z = z; mesh.userData = { z, spread }; phone.add(mesh); layers.push(mesh); return mesh }

			// Back glass (rosso corsa) + camera bump
			const back = new THREE.Group()
			const backMesh = new THREE.Mesh(
				new RoundedBoxGeometry(W, H, 0.03, 6, R),
				new THREE.MeshPhysicalMaterial({ color: 0xb0000b, metalness: .2, roughness: .25, clearcoat: 1, clearcoatRoughness: .05 })
			)
			back.add(backMesh)
			const bump = new THREE.Mesh(new RoundedBoxGeometry(.62, .62, .04, 4, .14), new THREE.MeshPhysicalMaterial({ color: 0x1a0003, metalness: .6, roughness: .3, clearcoat: 1 }))
			bump.position.set(-.35, 1.1, -.03)
			back.add(bump)
			const lensMat = new THREE.MeshPhysicalMaterial({ color: 0x050505, metalness: .9, roughness: .05, clearcoat: 1 })
			;[[-.47, 1.22], [-.23, .98], [-.47, .98]].forEach(([x, y], i) => {
				const lens = new THREE.Mesh(new THREE.CylinderGeometry(i === 2 ? .05 : .1, i === 2 ? .05 : .1, .05, 32), lensMat)
				lens.rotation.x = Math.PI / 2
				lens.position.set(x, y, -.06)
				back.add(lens)
			})
			addLayer(back, -.07, -1.5)

			// Battery
			const battery = new THREE.Mesh(
				new RoundedBoxGeometry(1.15, 1.55, .05, 4, .06),
				new THREE.MeshStandardMaterial({ color: 0x1b1b1f, metalness: .5, roughness: .45 })
			)
			battery.position.y = -.55
			addLayer(battery, -.035, -.75)

			// Logic board with chips
			const board = new THREE.Group()
			board.position.y = .78
			const boardMesh = new THREE.Mesh(new RoundedBoxGeometry(1.2, 1.3, .025, 3, .05), new THREE.MeshStandardMaterial({ map: boardTex, roughness: .6, metalness: .3 }))
			board.add(boardMesh)
			const chipMat = new THREE.MeshStandardMaterial({ color: 0x2a2a2e, metalness: .8, roughness: .25, emissive: 0xff1a0a, emissiveIntensity: 0 })
			const soc = new THREE.Mesh(new RoundedBoxGeometry(.36, .36, .03, 3, .01), chipMat)
			soc.position.set(.1, -.05, .022)
			board.add(soc)
			const smallChip = new THREE.MeshStandardMaterial({ color: 0x151517, metalness: .7, roughness: .35 })
			;[[-.35, .35, .22, .16], [.38, .4, .18, .18], [-.3, -.4, .26, .12], [.4, -.42, .14, .2]].forEach(([x, y, w, h]) => {
				const c = new THREE.Mesh(new THREE.BoxGeometry(w, h, .02), smallChip)
				c.position.set(x, y, .02)
				board.add(c)
			})
			addLayer(board, 0, 0)

			// Midframe: rounded ring
			const ring = new THREE.Shape()
			const rr = (s, w, h, r) => {
				s.moveTo(-w / 2 + r, -h / 2); s.lineTo(w / 2 - r, -h / 2); s.quadraticCurveTo(w / 2, -h / 2, w / 2, -h / 2 + r)
				s.lineTo(w / 2, h / 2 - r); s.quadraticCurveTo(w / 2, h / 2, w / 2 - r, h / 2); s.lineTo(-w / 2 + r, h / 2)
				s.quadraticCurveTo(-w / 2, h / 2, -w / 2, h / 2 - r); s.lineTo(-w / 2, -h / 2 + r); s.quadraticCurveTo(-w / 2, -h / 2, -w / 2 + r, -h / 2)
			}
			rr(ring, W + .02, H + .02, R)
			const hole = new THREE.Path(); rr(hole, W - .08, H - .08, R - .04); ring.holes.push(hole)
			const frame = new THREE.Mesh(
				new THREE.ExtrudeGeometry(ring, { depth: .14, bevelEnabled: true, bevelThickness: .01, bevelSize: .01, bevelSegments: 3, curveSegments: 24 }),
				new THREE.MeshStandardMaterial({ color: 0x3a3a40, metalness: 1, roughness: .28 })
			)
			frame.geometry.translate(0, 0, -.07)
			addLayer(frame, 0, .9)

			// Display
			const display = new THREE.Mesh(
				new RoundedBoxGeometry(W - .06, H - .06, .02, 4, R - .03),
				new THREE.MeshStandardMaterial({ color: 0x000000, emissive: 0xffffff, emissiveMap: screenTex, emissiveIntensity: 1.1, roughness: .4 })
			)
			addLayer(display, .055, 1.7)

			// Front glass
			const glass = new THREE.Mesh(
				new RoundedBoxGeometry(W, H, .02, 6, R),
				new THREE.MeshPhysicalMaterial({ color: 0xffffff, metalness: 0, roughness: 0, transparent: true, opacity: .14, clearcoat: 1 })
			)
			addLayer(glass, .078, 2.5)

			// Layers in front of the board fade out as the camera dives onto the SoC
			const fading = [frame, display, glass].map(mesh => {
				mesh.material.transparent = true
				return { mat: mesh.material, base: mesh.material.opacity }
			})

			// ---------- Ember particles ----------
			const N = 500
			const pos = new Float32Array(N * 3)
			for (let i = 0; i < N; i++) { pos[i * 3] = (Math.random() - .5) * 14; pos[i * 3 + 1] = (Math.random() - .5) * 10; pos[i * 3 + 2] = (Math.random() - .5) * 8 - 2 }
			const pGeo = new THREE.BufferGeometry(); pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
			const embers = new THREE.Points(pGeo, new THREE.PointsMaterial({ color: 0xff3326, size: .025, transparent: true, opacity: .7, depthWrite: false }))
			scene.add(embers)

			// ---------- Animation ----------
			const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v))
			const ease = t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
			const lerp = (a, b, t) => a + (b - a) * t
			const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

			const socWorld = new THREE.Vector3()
			const look = new THREE.Vector3()
			const camFrom = new THREE.Vector3(0, 0, 9)
			let smooth = 0, raf = 0, visible = true
			const clock = new THREE.Clock()

			const onResize = () => {
				const w = el.clientWidth, h = el.clientHeight
				renderer.setSize(w, h); camera.aspect = w / h
				camera.position.z = camFrom.z = w < h ? 12 : 9
				camera.updateProjectionMatrix()
			}
			onResize()
			window.addEventListener('resize', onResize)

			const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting })
			io.observe(el)

			const tick = () => {
				raf = requestAnimationFrame(tick)
				if (!visible) return
				const t = clock.getElapsedTime()
				const target = progress ? progress.get() : 0
				smooth += (target - smooth) * (reduced ? 1 : .08)
				const p = smooth

				const explode = ease(clamp((p - .18) / .32))   // 0.18 → 0.50
				const dive = ease(clamp((p - .58) / .36))      // 0.58 → 0.94

				// Idle float + turn to a 3/4 view while exploding
				phone.rotation.y = lerp(Math.sin(t * .4) * .25, -.75, explode) + dive * .35
				phone.rotation.x = lerp(Math.sin(t * .3) * .06, .35, explode)
				const rise = ease(clamp(p / .18))
				phone.position.y = lerp(-1.45, 0, rise) + Math.sin(t * .8) * .05 * (1 - explode)
				phone.scale.setScalar(lerp(.82, 1, rise))
				phone.position.x = lerp(0, .3, explode) * (1 - dive)

				layers.forEach(m => { m.position.z = m.userData.z + m.userData.spread * explode })

				fading.forEach(f => { f.mat.opacity = f.base * (1 - clamp(dive * 1.6)) })
				frame.visible = display.visible = glass.visible = dive < .6

				// SoC heats up as we dive into it
				chipMat.emissiveIntensity = dive * (1.6 + Math.sin(t * 4) * .4)
				rim.intensity = 60 + dive * 80

				soc.getWorldPosition(socWorld)
				camera.position.set(
					lerp(camFrom.x, socWorld.x + .25, dive),
					lerp(camFrom.y, socWorld.y + .1, dive),
					lerp(camFrom.z, socWorld.z + 1.7, dive)
				)
				look.set(lerp(0, socWorld.x, dive), lerp(0, socWorld.y, dive), lerp(0, socWorld.z, dive))
				camera.lookAt(look)

				embers.rotation.y = t * .02
				embers.position.y = Math.sin(t * .2) * .2

				renderer.render(scene, camera)
			}
			tick()

			cleanup = () => {
				cancelAnimationFrame(raf)
				io.disconnect()
				window.removeEventListener('resize', onResize)
				scene.traverse(o => {
					if (o.geometry) o.geometry.dispose()
					if (o.material) [].concat(o.material).forEach(m => { m.map && m.map.dispose(); m.emissiveMap && m.emissiveMap.dispose(); m.dispose() })
				})
				pmrem.dispose()
				renderer.dispose()
				renderer.domElement.remove()
			}
		})()

		return () => { disposed = true; cleanup() }
	}, [progress])

	return <div ref={mount} className={className} aria-hidden="true" />
}

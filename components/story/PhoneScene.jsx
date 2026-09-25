import { useEffect, useRef } from 'react'
import { createStage, runLoop, clamp, ease, lerp } from './threeKit'

/**
 * PhoneScene
 * A detailed, procedurally-modelled smartphone. It rises into view, comes apart
 * into its real layers (with labels), then the camera dives onto the processor.
 *
 * @param {MotionValue} progress 0..1 scroll progress of the hero section
 */
export default function PhoneScene({ progress, className, labelClass }) {

	const mount = useRef(null)

	useEffect(() => {
		let disposed = false
		let cleanup = () => {}

		;(async () => {
			const el = mount.current
			if (!el) return
			const stage = await createStage(el)
			if (!stage || disposed) { stage && stage.dispose(); return }
			const { THREE, RoundedBoxGeometry, renderer, scene, canvasTexture, loadImage, roundRect } = stage

			const camera = new THREE.PerspectiveCamera(30, el.clientWidth / el.clientHeight, .1, 60)
			camera.position.set(0, 0, 9)

			// Studio lighting: soft key, cool fill, Ferrari-red rim
			scene.add(new THREE.AmbientLight(0xffffff, .12))
			const key = new THREE.DirectionalLight(0xffffff, 2.2); key.position.set(4, 5, 6); scene.add(key)
			const fill = new THREE.DirectionalLight(0xbfd4ff, .5); fill.position.set(-5, -2, 4); scene.add(fill)
			const rim = new THREE.PointLight(0xff1a1a, 70, 20); rim.position.set(-4, 1.5, -3); scene.add(rim)
			const under = new THREE.PointLight(0xff3b30, 22, 12); under.position.set(2, -4, 2); scene.add(under)

			const W = 1.46, H = 3.0, R = .24
			const phone = new THREE.Group()
			scene.add(phone)

			const logo = await loadImage('/img/story/logo-light.png')
			if (disposed) { stage.dispose(); return }

			// ---------- Textures ----------
			const now = new Date()
			const time = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
			const date = now.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })

			const screenTex = canvasTexture(1000, 2054, (g, w, h) => {
				g.fillStyle = '#000'; g.fillRect(0, 0, w, h)
				g.save()
				g.beginPath(); roundRect(g, 18, 18, w - 36, h - 36, 150); g.clip()
				// Wallpaper: deep red silk
				const bg = g.createLinearGradient(0, 0, w, h)
				bg.addColorStop(0, '#2a0003'); bg.addColorStop(.45, '#8f0008'); bg.addColorStop(1, '#0a0000')
				g.fillStyle = bg; g.fillRect(0, 0, w, h)
				g.filter = 'blur(60px)'
				;[['#ff2a1f', .25, .62, 380], ['#ff5a3c', .78, .38, 260], ['#3a0004', .6, .9, 420], ['#b3000c', .15, .22, 300]].forEach(([c, x, y, r]) => {
					g.fillStyle = c; g.globalAlpha = .75; g.beginPath(); g.arc(x * w, y * h, r, 0, Math.PI * 2); g.fill()
				})
				g.filter = 'none'; g.globalAlpha = 1
				// Status bar + dynamic island
				g.fillStyle = '#fff'; g.font = '600 42px Inter, sans-serif'; g.textAlign = 'left'
				g.fillText(time, 110, 118)
				g.fillStyle = '#000'; g.beginPath(); roundRect(g, w / 2 - 170, 58, 340, 96, 48); g.fill()
				g.fillStyle = '#fff'
				;[0, 1, 2, 3].forEach(i => g.fillRect(w - 250 + i * 18, 108 - i * 9, 12, 12 + i * 9))
				g.strokeStyle = '#fff'; g.lineWidth = 3; g.beginPath(); roundRect(g, w - 160, 80, 70, 36, 10); g.stroke()
				g.fillRect(w - 154, 86, 50, 24)
				// Lock screen
				g.textAlign = 'center'
				g.font = '500 50px Inter, sans-serif'; g.fillStyle = 'rgba(255,255,255,.85)'
				g.fillText(date, w / 2, 330)
				g.font = '800 300px Inter, sans-serif'; g.fillStyle = 'rgba(255,255,255,.95)'
				g.fillText(time, w / 2, 610)
				if (logo) { g.globalAlpha = .95; g.drawImage(logo, w / 2 - 190, 820, 380, 380); g.globalAlpha = 1 }
				// Notification: the question that started it all
				g.fillStyle = 'rgba(40,40,44,.72)'; g.beginPath(); roundRect(g, 60, h - 560, w - 120, 190, 50); g.fill()
				g.fillStyle = '#e10600'; g.beginPath(); roundRect(g, 100, h - 520, 96, 96, 24); g.fill()
				g.fillStyle = '#fff'; g.font = '800 58px Inter, sans-serif'; g.fillText('?', 148, h - 452)
				g.textAlign = 'left'; g.font = '700 42px Inter, sans-serif'; g.fillText('Curiosity', 230, h - 485)
				g.font = '400 40px Inter, sans-serif'; g.fillStyle = 'rgba(255,255,255,.85)'; g.fillText('How does this thing actually work?', 230, h - 432)
				g.textAlign = 'right'; g.font = '400 34px Inter, sans-serif'; g.fillStyle = 'rgba(255,255,255,.5)'; g.fillText('now', w - 100, h - 485)
				// Torch / camera buttons + home indicator
				g.fillStyle = 'rgba(30,30,30,.6)'
				;[180, w - 180].forEach(x => { g.beginPath(); g.arc(x, h - 250, 80, 0, Math.PI * 2); g.fill() })
				g.fillStyle = '#fff'; g.beginPath(); roundRect(g, w / 2 - 190, h - 70, 380, 14, 7); g.fill()
				g.restore()
			})

			const boardTex = canvasTexture(1024, 1100, (g, w, h) => {
				g.fillStyle = '#0c1210'; g.fillRect(0, 0, w, h)
				// copper traces on a solder-masked board
				let seed = 11; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647
				for (let i = 0; i < 180; i++) {
					let x = rnd() * w, y = rnd() * h
					g.strokeStyle = rnd() > .8 ? 'rgba(255,60,40,.8)' : 'rgba(196,128,70,.55)'
					g.lineWidth = rnd() > .7 ? 3 : 1.5
					g.beginPath(); g.moveTo(x, y)
					for (let s = 0; s < 5; s++) { rnd() > .5 ? x += (rnd() - .5) * 220 : y += (rnd() - .5) * 220; g.lineTo(x, y) }
					g.stroke()
				}
				g.fillStyle = '#d4af6a'
				for (let i = 0; i < 700; i++) { const s = rnd() > .9 ? 6 : 3; g.fillRect(rnd() * w, rnd() * h, s, s) }
				g.fillStyle = 'rgba(255,255,255,.6)'; g.font = '500 18px monospace'
				;['U2', 'C104', 'R17', 'L3', 'J1', 'TP9', 'U7', 'C33'].forEach((t, i) => g.fillText(t, 60 + (i % 4) * 240, 80 + Math.floor(i / 4) * 900))
			})

			const socTex = canvasTexture(512, 512, (g, w, h) => {
				const m = g.createLinearGradient(0, 0, w, h); m.addColorStop(0, '#3a3a40'); m.addColorStop(1, '#1b1b1f')
				g.fillStyle = m; g.fillRect(0, 0, w, h)
				if (logo) { g.globalAlpha = .9; g.drawImage(logo, w / 2 - 110, 70, 220, 220); g.globalAlpha = 1 }
				g.fillStyle = '#e8e8ea'; g.textAlign = 'center'
				g.font = '800 64px Inter, sans-serif'; g.fillText('MAINA', w / 2, 370)
				g.font = '500 30px monospace'; g.fillStyle = '#9a9aa1'; g.fillText('M-SERIES · 2026', w / 2, 425)
			})

			const batteryTex = canvasTexture(640, 860, (g, w, h) => {
				g.fillStyle = '#26262b'; g.fillRect(0, 0, w, h)
				g.fillStyle = '#f5f5f7'; g.textAlign = 'center'
				g.font = '700 54px Inter, sans-serif'; g.fillText('Li-ion Polymer', w / 2, 330)
				g.font = '500 40px Inter, sans-serif'; g.fillStyle = '#b8b8bf'; g.fillText('3.87V  ·  4500mAh', w / 2, 400)
				g.font = '400 26px monospace'; g.fillText('MAINA ENERGY', w / 2, 470)
				g.strokeStyle = '#e10600'; g.lineWidth = 6; g.strokeRect(40, 40, w - 80, h - 80)
			})

			// ---------- Materials ----------
			const titanium = new THREE.MeshPhysicalMaterial({ color: 0x8d8a86, metalness: 1, roughness: .32, clearcoat: .3 })
			const backGlass = new THREE.MeshPhysicalMaterial({ color: 0xa3000a, metalness: .1, roughness: .38, clearcoat: 1, clearcoatRoughness: .25, sheen: .4, sheenColor: 0xff4a3a })
			const plateauGlass = new THREE.MeshPhysicalMaterial({ color: 0x8c0008, metalness: .2, roughness: .08, clearcoat: 1 })
			const lensGlass = new THREE.MeshPhysicalMaterial({ color: 0x06060a, metalness: .6, roughness: .02, clearcoat: 1, iridescence: 1, iridescenceIOR: 1.6, iridescenceThicknessRange: [200, 600] })

			// ---------- Layers ----------
			const layers = []
			const addLayer = (obj, z, spread) => { obj.position.z = z; obj.userData = { z, spread }; phone.add(obj); layers.push(obj); return obj }

			// Back glass with camera plateau, lenses, flash and logo
			const back = new THREE.Group()
			back.add(new THREE.Mesh(new RoundedBoxGeometry(W, H, .03, 8, R), backGlass))
			const plateau = new THREE.Mesh(new RoundedBoxGeometry(.72, .72, .05, 6, .17), plateauGlass)
			plateau.position.set(-.29, 1.03, -.03); back.add(plateau)
			const ringGeo = new THREE.TorusGeometry(.115, .018, 16, 48)
			;[[-.45, 1.19], [-.45, .87], [-.13, 1.03]].forEach(([x, y]) => {
				const ring = new THREE.Mesh(ringGeo, titanium); ring.position.set(x, y, -.065); back.add(ring)
				const lens = new THREE.Mesh(new THREE.CylinderGeometry(.105, .105, .05, 48), lensGlass)
				lens.rotation.x = Math.PI / 2; lens.position.set(x, y, -.06); back.add(lens)
				const iris = new THREE.Mesh(new THREE.CircleGeometry(.045, 32), new THREE.MeshPhysicalMaterial({ color: 0x0a1030, metalness: 1, roughness: 0, iridescence: 1 }))
				iris.position.set(x, y, -.0861); iris.rotation.y = Math.PI; back.add(iris)
			})
			const flash = new THREE.Mesh(new THREE.CircleGeometry(.04, 24), new THREE.MeshStandardMaterial({ color: 0xfff4d6, emissive: 0x332200, roughness: .3 }))
			flash.position.set(-.13, 1.25, -.0561); flash.rotation.y = Math.PI; back.add(flash)
			if (logo) {
				const decal = new THREE.Mesh(new THREE.PlaneGeometry(.5, .5), new THREE.MeshPhysicalMaterial({ map: canvasTexture(256, 256, (g, w, h) => g.drawImage(logo, 0, 0, w, h)), transparent: true, metalness: .9, roughness: .15 }))
				decal.position.set(0, -.1, -.0161); decal.rotation.y = Math.PI; back.add(decal)
			}
			addLayer(back, -.07, -1.5)

			// Battery pouch
			const battery = new THREE.Mesh(new RoundedBoxGeometry(1.12, 1.5, .05, 4, .05), new THREE.MeshStandardMaterial({ map: batteryTex, metalness: .35, roughness: .5 }))
			battery.position.y = -.55
			addLayer(battery, -.035, -.75)

			// Logic board with shields and SoC
			const board = new THREE.Group()
			board.position.y = .78
			board.add(new THREE.Mesh(new RoundedBoxGeometry(1.18, 1.28, .025, 3, .05), new THREE.MeshStandardMaterial({ map: boardTex, roughness: .55, metalness: .25 })))
			const chipMat = new THREE.MeshStandardMaterial({ map: socTex, metalness: .7, roughness: .3, emissive: 0xff1a0a, emissiveIntensity: 0 })
			const soc = new THREE.Mesh(new RoundedBoxGeometry(.38, .38, .03, 3, .012), chipMat)
			soc.position.set(.12, -.06, .024); board.add(soc)
			const shield = new THREE.MeshStandardMaterial({ color: 0xb9bcc2, metalness: 1, roughness: .38 })
			;[[-.33, .34, .3, .22], [.36, .38, .22, .24], [-.3, -.38, .34, .16], [.4, -.42, .16, .2]].forEach(([x, y, w, h]) => {
				const c = new THREE.Mesh(new RoundedBoxGeometry(w, h, .022, 2, .01), shield); c.position.set(x, y, .022); board.add(c)
			})
			addLayer(board, 0, 0)

			// Titanium frame with rounded edges and side buttons
			const ring = new THREE.Shape(); roundRect(ring, -W / 2, -H / 2, W, H, R)
			const hole = new THREE.Path(); roundRect(hole, -W / 2 + .05, -H / 2 + .05, W - .1, H - .1, R - .05); ring.holes.push(hole)
			const frame = new THREE.Group()
			const frameMesh = new THREE.Mesh(new THREE.ExtrudeGeometry(ring, { depth: .1, bevelEnabled: true, bevelThickness: .04, bevelSize: .03, bevelSegments: 10, curveSegments: 32 }), titanium)
			frameMesh.geometry.translate(0, 0, -.05)
			frame.add(frameMesh)
			;[[-1, .95, .18], [-1, .55, .28], [-1, .18, .28], [1, .6, .45]].forEach(([side, y, h]) => {
				const b = new THREE.Mesh(new RoundedBoxGeometry(.04, h, .06, 3, .018), titanium)
				b.position.set(side * (W / 2 + .045), y, 0); frame.add(b)
			})
			addLayer(frame, 0, .9)

			// Display panel
			const display = new THREE.Mesh(
				new RoundedBoxGeometry(W - .02, H - .02, .015, 6, R - .02),
				new THREE.MeshStandardMaterial({ color: 0x000000, emissive: 0xffffff, emissiveMap: screenTex, emissiveIntensity: 1, roughness: .5 })
			)
			addLayer(display, .065, 1.7)

			// Front glass: clear with a real reflection
			const glass = new THREE.Mesh(
				new RoundedBoxGeometry(W + .02, H + .02, .02, 8, R + .01),
				new THREE.MeshPhysicalMaterial({ color: 0xffffff, metalness: 0, roughness: .02, transparent: true, opacity: .1, clearcoat: 1, clearcoatRoughness: 0, envMapIntensity: 1.5 })
			)
			addLayer(glass, .085, 2.5)

			// Front layers fade as the camera dives onto the SoC
			const fading = [frameMesh.material, display.material, glass.material].map(mat => ({ mat, base: mat.opacity }))
			fading.forEach(f => { f.mat.transparent = true })

			// ---------- Labels pinned to layers ----------
			const labelDefs = [
				[glass, 'Glass', 'the first thing I cracked', 1.3],
				[display, 'Display', 'millions of tiny lights', .75],
				[frame, 'Frame', 'titanium skeleton', -1.45],
				[board, 'Logic board', 'where the magic lives', .2],
				[battery, 'Battery', 'the heartbeat', -.3],
				[back, 'Back glass', 'Ferrari red, obviously', -1.4],
			].map(([obj, name, note, y], i) => {
				const div = document.createElement('div')
				div.className = labelClass || ''
				div.innerHTML = `<b>${name}</b><span>${note}</span>`
				div.style.opacity = 0
				el.appendChild(div)
				return { obj, div, local: new THREE.Vector3(W / 2 + .06, y - (obj === board ? .78 : obj === battery ? -.55 : 0), 0), i }
			})
			const tmp = new THREE.Vector3()

			// ---------- Embers ----------
			const N = 450
			const pos = new Float32Array(N * 3)
			for (let i = 0; i < N; i++) { pos[i * 3] = (Math.random() - .5) * 14; pos[i * 3 + 1] = (Math.random() - .5) * 10; pos[i * 3 + 2] = (Math.random() - .5) * 8 - 3 }
			const pGeo = new THREE.BufferGeometry(); pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
			const embers = new THREE.Points(pGeo, new THREE.PointsMaterial({ color: 0xff3326, size: .022, transparent: true, opacity: .6, depthWrite: false }))
			scene.add(embers)

			// ---------- Animation ----------
			const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
			const socWorld = new THREE.Vector3(), look = new THREE.Vector3(), camFrom = new THREE.Vector3(0, 0, 9)
			let smooth = 0, portrait = false

			const onResize = () => {
				const w = el.clientWidth, h = el.clientHeight
				renderer.setSize(w, h); camera.aspect = w / h
				portrait = w < h
				camera.position.z = camFrom.z = portrait ? 12.5 : 9
				camera.updateProjectionMatrix()
			}
			onResize()
			window.addEventListener('resize', onResize)

			const stop = runLoop(THREE, el, (dt, t) => {
				const target = progress ? progress.get() : 0
				smooth += (target - smooth) * (reduced ? 1 : 1 - Math.exp(-dt * 5))
				const p = smooth

				const rise = ease(clamp(p / .18))
				const turn = ease(clamp((p - .02) / .16))        // show the red back, then the screen
				const explode = ease(clamp((p - .18) / .32))
				const dive = ease(clamp((p - .58) / .36))

				// Opens on the back (camera island + logo), spins round to the lock screen
				const idle = Math.sin(t * .4) * .18 * (1 - explode)
				phone.rotation.y = lerp(Math.PI * .85, 0, turn) + idle + lerp(0, -.75, explode) + dive * .35
				phone.rotation.x = lerp(Math.sin(t * .3) * .05, .35, explode)
				phone.position.y = lerp(-1.35, 0, rise) + Math.sin(t * .8) * .04 * (1 - explode)
				phone.scale.setScalar(lerp(.84, 1, rise) * (portrait ? lerp(1, .8, explode) : 1))
				phone.position.x = lerp(0, portrait ? 0 : .3, explode) * (1 - dive)
				if (portrait) phone.position.y += .9 * explode * (1 - dive)

				layers.forEach(o => { o.position.z = o.userData.z + o.userData.spread * explode })

				fading.forEach(f => { f.mat.opacity = f.base * (1 - clamp(dive * 1.6)) })
				frame.visible = display.visible = glass.visible = dive < .6

				chipMat.emissiveIntensity = dive * (.35 + Math.sin(t * 4) * .1)
				rim.intensity = 70 + dive * 80

				soc.getWorldPosition(socWorld)
				camera.position.set(lerp(camFrom.x, socWorld.x + .2, dive), lerp(camFrom.y, socWorld.y + .08, dive), lerp(camFrom.z, socWorld.z + 1.6, dive))
				look.set(lerp(0, socWorld.x, dive), lerp(0, socWorld.y, dive), lerp(0, socWorld.z, dive))
				camera.lookAt(look)

				embers.rotation.y = t * .02
				embers.position.y = Math.sin(t * .2) * .2

				scene.updateMatrixWorld()
				const w = el.clientWidth, h = el.clientHeight
				labelDefs.forEach(({ obj, div, local, i }) => {
					const o = clamp((explode - .35 - i * .08) / .25) * (1 - clamp(dive * 4))
					div.style.opacity = o
					if (o <= 0) return
					tmp.copy(local); obj.localToWorld(tmp); tmp.project(camera)
					const x = Math.min(w - 150, (tmp.x * .5 + .5) * w)
					div.style.transform = `translate(${x.toFixed(1)}px, ${((-tmp.y * .5 + .5) * h).toFixed(1)}px)`
				})

				renderer.render(scene, camera)
			})

			cleanup = () => {
				stop()
				window.removeEventListener('resize', onResize)
				labelDefs.forEach(l => l.div.remove())
				stage.dispose()
			}
		})()

		return () => { disposed = true; cleanup() }
	}, [progress, labelClass])

	return <div ref={mount} className={className} aria-hidden="true" />
}

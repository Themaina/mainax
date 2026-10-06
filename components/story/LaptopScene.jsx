import { useEffect, useRef } from 'react'
import { createStage, runLoop, clamp, ease, lerp } from './threeKit'

// What types itself out on the screen: a slice of the Orderly AI kitchen agent
const CODE = [
	[['c', '// orderly-ai / kitchen agent']],
	[['k', '<?php']],
	[],
	[['k', 'final class '], ['t', 'KitchenAgent'], ['k', ' extends '], ['t', 'OrderlyAiTool']],
	[['p', '{']],
	[['k', '    public function '], ['f', 'handle'], ['p', '('], ['t', 'Order '], ['v', '$order'], ['p', '): '], ['t', 'Result']],
	[['p', '    {']],
	[['k', '        if '], ['p', '('], ['v', '$order'], ['p', '->'], ['f', 'isStuck'], ['p', '()) {']],
	[['k', '            return '], ['v', '$this'], ['p', '->'], ['f', 'escalate'], ['p', '('], ['v', '$order'], ['p', ');']],
	[['p', '        }']],
	[],
	[['t', '        Mpesa'], ['p', '::'], ['f', 'confirm'], ['p', '('], ['v', '$order'], ['p', '->payment);']],
	[['t', '        Etims'], ['p', '::'], ['f', 'invoice'], ['p', '('], ['v', '$order'], ['p', ');']],
	[],
	[['k', '        return '], ['t', 'Result'], ['p', '::'], ['f', 'fire'], ['p', '('], ['v', '$order'], ['p', ');  '], ['c', '// → kitchen']],
	[['p', '    }']],
	[['p', '}']],
]
const COLORS = { c: '#6a737d', k: '#ff5f56', t: '#ffd580', f: '#79c0ff', v: '#f5f5f7', p: '#c9c9d1' }
const TOTAL = CODE.reduce((n, line) => n + line.reduce((m, [, s]) => m + s.length, 0) + 1, 0)

/**
 * LaptopScene
 * A detailed laptop: the lid opens with scroll, the display wakes, and code types itself.
 *
 * @param {MotionValue} progress 0..1 scroll progress of the laptop section
 */
export default function LaptopScene({ progress, className }) {

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

			const camera = new THREE.PerspectiveCamera(30, el.clientWidth / el.clientHeight, .2, 60)

			scene.add(new THREE.AmbientLight(0xffffff, .15))
			const key = new THREE.DirectionalLight(0xffffff, 2.4); key.position.set(3, 6, 5); scene.add(key)
			const fill = new THREE.DirectionalLight(0xbfd4ff, .5); fill.position.set(-5, 2, 3); scene.add(fill)
			const rim = new THREE.PointLight(0xff1a1a, 60, 20); rim.position.set(-3, 2, -4); scene.add(rim)
			const glow = new THREE.PointLight(0x79a8ff, 0, 5); glow.position.set(0, .8, .8); scene.add(glow)

			const logo = await loadImage('/img/story/logo-light.png')
			if (disposed) { stage.dispose(); return }

			// ---------- Materials ----------
			const alu = new THREE.MeshPhysicalMaterial({ color: 0x2b2c30, metalness: 1, roughness: .38, clearcoat: .15 })
			const aluDark = new THREE.MeshPhysicalMaterial({ color: 0x1a1b1e, metalness: .9, roughness: .45 })
			const keyMat = new THREE.MeshStandardMaterial({ color: 0x0d0d0f, roughness: .7, metalness: .1 })
			const trackMat = new THREE.MeshPhysicalMaterial({ color: 0x232428, metalness: .6, roughness: .22, clearcoat: .6 })

			const BW = 3.1, BD = 2.15, BT = .07   // base width, depth, thickness
			const laptop = new THREE.Group()
			scene.add(laptop)

			// Base
			const base = new THREE.Mesh(new RoundedBoxGeometry(BW, BT, BD, 6, .05), alu)
			base.position.y = BT / 2
			laptop.add(base)

			// Keyboard well + keys (instanced)
			const well = new THREE.Mesh(new RoundedBoxGeometry(BW * .86, .006, BD * .44, 3, .002), aluDark)
			well.position.set(0, BT + .002, -BD * .16)
			laptop.add(well)
			const keyGeo = new RoundedBoxGeometry(.165, .02, .165, 2, .025)
			const rows = [14, 14, 13, 12, 11]
			const keys = new THREE.InstancedMesh(keyGeo, keyMat, rows.reduce((a, b) => a + b, 0) + 3)
			const m = new THREE.Matrix4()
			let n = 0
			rows.forEach((count, r) => {
				const pitch = .188, rowW = count * pitch
				for (let i = 0; i < count; i++) {
					m.makeTranslation(-rowW / 2 + pitch / 2 + i * pitch, BT + .012, -BD * .36 + r * pitch)
					keys.setMatrixAt(n++, m)
				}
			})
			// Space bar row
			;[[-.55, .165], [0, .9], [.55, .165]].forEach(([x, sx]) => {
				m.makeScale(sx / .165, 1, 1).setPosition(x, BT + .012, -BD * .36 + 5 * .188)
				keys.setMatrixAt(n++, m)
			})
			laptop.add(keys)

			// Trackpad
			const pad = new THREE.Mesh(new RoundedBoxGeometry(1.25, .004, .78, 3, .002), trackMat)
			pad.position.set(0, BT + .001, BD * .27)
			laptop.add(pad)

			// Lid, hinged along the back edge of the base
			const LH = 2.05
			const hinge = new THREE.Group()
			hinge.position.set(0, BT, -BD / 2 + .02)
			laptop.add(hinge)
			const lid = new THREE.Group()
			hinge.add(lid)
			const lidShell = new THREE.Mesh(new RoundedBoxGeometry(BW, LH, .045, 6, .05), alu)
			lidShell.position.set(0, LH / 2, 0)
			lid.add(lidShell)
			const barrel = new THREE.Mesh(new THREE.CylinderGeometry(.045, .045, BW * .8, 24), aluDark)
			barrel.rotation.z = Math.PI / 2
			hinge.add(barrel)
			if (logo) {
				const decal = new THREE.Mesh(new THREE.PlaneGeometry(.55, .55), new THREE.MeshPhysicalMaterial({ map: canvasTexture(256, 256, (g, w, h) => g.drawImage(logo, 0, 0, w, h)), transparent: true, metalness: 1, roughness: .12 }))
				decal.position.set(0, LH / 2, -.0235); decal.rotation.y = Math.PI
				lid.add(decal)
			}

			// Display: bezel + panel texture that types code
			const bezel = new THREE.Mesh(new RoundedBoxGeometry(BW - .04, LH - .04, .004, 4, .04), new THREE.MeshStandardMaterial({ color: 0x050506, roughness: .3 }))
			bezel.position.set(0, LH / 2, .0235)
			lid.add(bezel)

			let typed = -1, lastBlink = -1
			const drawScreen = (chars, wake) => (g, w, h) => {
				g.fillStyle = '#000'; g.fillRect(0, 0, w, h)
				g.globalAlpha = wake
				const bg = g.createLinearGradient(0, 0, 0, h); bg.addColorStop(0, '#15161a'); bg.addColorStop(1, '#0d0e11')
				g.fillStyle = bg; g.fillRect(0, 0, w, h)
				// window chrome
				g.fillStyle = '#1c1d22'; g.fillRect(0, 0, w, 64)
				;['#ff5f56', '#ffbd2e', '#27c93f'].forEach((c, i) => { g.fillStyle = c; g.beginPath(); g.arc(40 + i * 34, 32, 11, 0, Math.PI * 2); g.fill() })
				g.fillStyle = '#8b8b93'; g.font = '500 24px Inter, sans-serif'; g.textAlign = 'center'
				g.fillText('KitchenAgent.php — orderly-ai', w / 2, 40)
				// sidebar
				g.fillStyle = '#111216'; g.fillRect(0, 64, 280, h - 64)
				g.textAlign = 'left'; g.font = '400 22px monospace'
				;['▾ orderly-ai', '  ▸ engine', '  ▸ providers', '  ▾ tools', '    KitchenAgent.php', '    FindFood.php', '    AddToCart.php', '  ▸ watchers', '▸ maina-cms', '▸ linkmeup'].forEach((t, i) => {
					g.fillStyle = i === 4 ? '#ff5f56' : '#7d7d86'; g.fillText(t, 22, 116 + i * 38)
				})
				// code, typed up to `chars`, with a caret after the last character
				g.font = '500 27px monospace'
				let left = chars, y = 116, caretX = 360, caretY = 116
				CODE.forEach((line, li) => {
					g.fillStyle = '#44454d'; g.fillText(String(li + 1).padStart(2, ' '), 300, y)
					let x = 360
					for (const [kind, text] of line) {
						if (left <= 0) break
						const part = text.slice(0, left); left -= part.length
						g.fillStyle = COLORS[kind]; g.fillText(part, x, y); x += g.measureText(part).width
						caretX = x; caretY = y
					}
					if (left > 0) { left -= 1; caretX = 360; caretY = y + 42 }
					y += 42
				})
				if (wake > .5 && Math.floor(Date.now() / 500) % 2 === 0) { g.fillStyle = '#ff2d1f'; g.fillRect(caretX + 2, caretY - 26, 3, 32) }
				g.globalAlpha = 1
			}

			const screenTex = canvasTexture(1600, 1040, drawScreen(0, 0))
			const panel = new THREE.Mesh(
				new THREE.PlaneGeometry(BW - .2, LH - .22),
				new THREE.MeshBasicMaterial({ map: screenTex, toneMapped: false })   // self-lit like a real display, no glare
			)
			panel.position.set(0, LH / 2 + .03, .032)   // clear of the bezel so they never z-fight
			lid.add(panel)

			// Soft floor shadow
			const shadowTex = canvasTexture(256, 256, (g, w, h) => {
				const r = g.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w / 2)
				r.addColorStop(0, 'rgba(0,0,0,.65)'); r.addColorStop(1, 'rgba(0,0,0,0)')
				g.fillStyle = r; g.fillRect(0, 0, w, h)
			})
			const shadow = new THREE.Mesh(new THREE.PlaneGeometry(BW * 1.6, BD * 1.6), new THREE.MeshBasicMaterial({ map: shadowTex, transparent: true, depthWrite: false }))
			shadow.rotation.x = -Math.PI / 2; shadow.position.y = -.01
			laptop.add(shadow)

			// ---------- Animation ----------
			const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
			let smooth = 0, portrait = false
			const onResize = () => {
				const w = el.clientWidth, h = el.clientHeight
				renderer.setSize(w, h); camera.aspect = w / h; portrait = w < h
				camera.updateProjectionMatrix()
			}
			onResize()
			window.addEventListener('resize', onResize)

			const look = new THREE.Vector3()
			const stop = runLoop(THREE, el, (dt, t) => {
				const target = progress ? progress.get() : 0
				smooth += (target - smooth) * (reduced ? 1 : 1 - Math.exp(-dt * 5))
				const p = smooth

				const open = ease(clamp((p - .08) / .32))
				const wake = clamp((p - .3) / .12)
				const type = clamp((p - .38) / .47)
				const push = ease(clamp((p - .7) / .3))

				hinge.rotation.x = lerp(Math.PI / 2 - .02, -.18, open)   // closed → ~100° open
				laptop.rotation.y = lerp(-.6, 0, ease(clamp(p / .5))) + Math.sin(t * .35) * .04 * (1 - push)

				const chars = Math.floor(type * TOTAL)
				const blink = Math.floor(t * 2)
				if (chars !== typed || wake < 1 || blink !== lastBlink) { typed = chars; lastBlink = blink; screenTex.userData.redraw(drawScreen(chars, wake)) }
				glow.intensity = wake * 1.5

				const dist = portrait ? 18 : 7.2
				camera.position.set(0, lerp(3.4, 1.9, open) + lerp(0, -.35, push), lerp(dist, dist * .78, open) * lerp(1, portrait ? .72 : .52, push))
				look.set(0, lerp(.2, 1.05, open), 0)
				camera.lookAt(look)

				renderer.render(scene, camera)
			})

			cleanup = () => { stop(); window.removeEventListener('resize', onResize); stage.dispose() }
		})()

		return () => { disposed = true; cleanup() }
	}, [progress])

	return <div ref={mount} className={className} aria-hidden="true" />
}

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { m, useScroll, useTransform, useInView } from 'framer-motion'

import css from '../../styles/story/story.module.scss'

const useIsoLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect

/**
 * Fades and lifts children into view once.
 */
export function Reveal({ children, delay = 0, y = 40, className, as = 'div' }) {
	const Tag = m[as]
	return (
		<Tag
			className={className}
			initial={{ opacity: 0, y }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, margin: '-10% 0px' }}
			transition={{ duration: .9, delay, ease: [.16, 1, .3, 1] }}
		>
			{children}
		</Tag>
	)
}

/**
 * Chapter eyebrow + title.
 */
export function ChapterTitle({ index, kicker, title, children }) {
	return (
		<header className={css.chapterTitle}>
			<Reveal><span className={css.eyebrow}>{index && <b>{index}</b>}{kicker}</span></Reveal>
			<Reveal delay={.08}><h2 className={css.display}>{title}</h2></Reveal>
			{children && <Reveal delay={.16}><p className={css.lede}>{children}</p></Reveal>}
		</header>
	)
}

/**
 * Apple-style paragraph that lights up word by word as it scrolls through the viewport.
 */
export function ScrollText({ text, className }) {
	const ref = useRef(null)
	const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.4'] })
	const words = text.split(' ')
	return (
		<p ref={ref} className={`${css.scrollText} ${className || ''}`}>
			{words.map((w, i) => (
				<Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>{w}</Word>
			))}
		</p>
	)
}

function Word({ children, progress, range }) {
	const opacity = useTransform(progress, range, [0.14, 1])
	return <m.span style={{ opacity }}>{children} </m.span>
}

/**
 * Vertical scroll drives a horizontal track of cards.
 */
export function HorizontalGallery({ children, title }) {
	const section = useRef(null)
	const track = useRef(null)
	const [distance, setDistance] = useState(0)

	useIsoLayoutEffect(() => {
		const measure = () => {
			if (!track.current) return
			setDistance(Math.max(0, track.current.scrollWidth - window.innerWidth))
		}
		measure()
		window.addEventListener('resize', measure)
		return () => window.removeEventListener('resize', measure)
	}, [])

	const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end end'] })
	const x = useTransform(scrollYProgress, [0, 1], [0, -distance])

	return (
		<section ref={section} className={css.hGallery} style={{ height: `calc(100vh + ${distance}px)` }}>
			<div className={css.hSticky}>
				{title}
				<m.div ref={track} className={css.hTrack} style={{ x }}>
					{children}
				</m.div>
			</div>
		</section>
	)
}

/**
 * Animated circuit traces, as seen under the repair microscope.
 */
export function CircuitScope() {
	const ref = useRef(null)
	const inView = useInView(ref, { once: false, margin: '-20% 0px' })
	// Deterministic pseudo-random traces so SSR and client markup match
	let seed = 7
	const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647
	const traces = Array.from({ length: 26 }, () => {
		let x = 20 + rnd() * 360, y = 20 + rnd() * 360
		let d = `M${x.toFixed(1)} ${y.toFixed(1)}`
		for (let s = 0; s < 4; s++) {
			if (rnd() > .5) x = Math.min(390, Math.max(10, x + (rnd() - .5) * 160))
			else y = Math.min(390, Math.max(10, y + (rnd() - .5) * 160))
			d += ` L${x.toFixed(1)} ${y.toFixed(1)}`
		}
		return { d, end: [x, y], delay: rnd() * 3 }
	})
	return (
		<div ref={ref} className={`${css.scope} ${inView ? css.scopeOn : ''}`}>
			<svg viewBox="0 0 400 400" role="img" aria-label="Circuit board traces lighting up under a microscope">
				<defs>
					<radialGradient id="scopeVignette" cx="50%" cy="50%" r="50%">
						<stop offset="60%" stopColor="#000" stopOpacity="0" />
						<stop offset="100%" stopColor="#000" stopOpacity=".95" />
					</radialGradient>
				</defs>
				<rect width="400" height="400" fill="#0b0b0d" />
				{traces.map((t, i) => (
					<g key={i}>
						<path d={t.d} className={css.traceBase} />
						<path d={t.d} className={css.traceLit} style={{ animationDelay: `${t.delay}s` }} pathLength="1" />
						<circle cx={t.end[0]} cy={t.end[1]} r="3.2" className={css.pad} />
					</g>
				))}
				<rect x="150" y="150" width="100" height="100" rx="6" className={css.bga} />
				{Array.from({ length: 36 }, (_, i) => (
					<circle key={i} cx={162 + (i % 6) * 15.2} cy={162 + Math.floor(i / 6) * 15.2} r="3" className={css.ball} style={{ animationDelay: `${(i % 7) * .18}s` }} />
				))}
				<rect width="400" height="400" fill="url(#scopeVignette)" />
			</svg>
			<span className={css.scopeTip} />
			<span className={css.scopeLabel}>BGA reball · 40× magnification</span>
		</div>
	)
}

/**
 * Pulsing neural network for the AI chapter.
 */
export function NeuralNet() {
	const layers = [4, 7, 7, 3]
	const W = 520, H = 360
	const nodes = layers.map((n, li) => Array.from({ length: n }, (_, ni) => ({
		x: 50 + li * ((W - 100) / (layers.length - 1)),
		y: H / 2 + (ni - (n - 1) / 2) * 44,
	})))
	const edges = []
	nodes.forEach((layer, li) => {
		if (!nodes[li + 1]) return
		layer.forEach((a, ai) => nodes[li + 1].forEach((b, bi) => edges.push({ a, b, k: `${li}-${ai}-${bi}`, delay: ((ai * 3 + bi * 5 + li * 7) % 20) / 8 })))
	})
	return (
		<svg className={css.neural} viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Neural network with signals travelling between layers">
			{edges.map(e => <line key={e.k} x1={e.a.x} y1={e.a.y} x2={e.b.x} y2={e.b.y} className={css.synapse} />)}
			{edges.filter((_, i) => i % 3 === 0).map(e => (
				<line key={`p${e.k}`} x1={e.a.x} y1={e.a.y} x2={e.b.x} y2={e.b.y} className={css.signal} pathLength="1" style={{ animationDelay: `${e.delay}s` }} />
			))}
			{nodes.flat().map((n, i) => <circle key={i} cx={n.x} cy={n.y} r="7" className={css.neuron} style={{ animationDelay: `${(i % 9) * .3}s` }} />)}
		</svg>
	)
}

/**
 * A server rack with blinking status LEDs.
 */
export function Rack() {
	return (
		<div className={css.rack} aria-hidden="true">
			{Array.from({ length: 10 }, (_, u) => (
				<div key={u} className={css.unit}>
					<span className={css.unitVents} />
					{Array.from({ length: 6 }, (_, l) => (
						<i key={l} className={css.led} style={{ animationDelay: `${((u * 7 + l * 3) % 11) / 5}s`, animationDuration: `${1 + ((u + l) % 4) * .35}s` }} />
					))}
				</div>
			))}
		</div>
	)
}

/**
 * Infinite marquee of large type.
 */
export function Marquee({ items, reverse }) {
	const row = items.concat(items)
	return (
		<div className={css.marquee}>
			<div className={`${css.marqueeTrack} ${reverse ? css.marqueeReverse : ''}`}>
				{row.map((it, i) => <span key={i}>{it}<em>●</em></span>)}
			</div>
		</div>
	)
}

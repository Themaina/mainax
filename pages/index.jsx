import Head from 'next/head'
import Link from 'next/link'
import { useRef } from 'react'
import { m, useScroll, useTransform, useSpring } from 'framer-motion'

import PhoneScene from '../components/story/PhoneScene'
import { Reveal, ChapterTitle, ScrollText, HorizontalGallery, CircuitScope, NeuralNet, Rack, Marquee, Timeline } from '../components/story/blocks'

import css from '../styles/story/story.module.scss'

import builds from '../content/story/builds.json'
import group from '../content/story/group.json'
import journey from '../content/story/journey.json'

/**
 * Story homepage
 * A first-person documentary: how one question about phones became Maina Group.
 */
export default function Story() {

	const { scrollYProgress } = useScroll()
	const bar = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

	return (
		<div className={css.story}>
			<Head>
				<title>Alvin Maina | Hardware, Software, AI</title>
				<meta name="description" content="Alvin Maina: from repairing phones to building AI. Founder and CEO of Maina Group, architect of Orderly." />
				<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
				<meta property="og:title" content="Alvin Maina | It all started with a simple question" />
				<meta property="og:description" content="How one question about phones led me to hardware, software, AI and Maina Group." />
				<meta name="theme-color" content="#050505" />
			</Head>
			<style jsx global>{`
				#__next { overflow-x: clip; }
				html { background: #050505; }
			`}</style>

			<m.div className={css.progress} style={{ scaleX: bar }} />
			<nav className={css.nav}>
				<a href="#top" className={css.brand}>MAINA<span>.</span></a>
				<div className={css.navLinks}>
					<a href="#bench">Hardware</a>
					<a href="#journey">Journey</a>
					<a href="#code">Software</a>
					<a href="#frontier">AI</a>
					<a href="#group">Group</a>
					<a href="#contact" className={css.navCta}>Contact</a>
				</div>
			</nav>

			<Hero />
			<Bench />
			<Journey />
			<Code />
			<Architect />
			<Frontier />
			<Group />
			<Red />
			<Datacenter />
			<Contact />
		</div>
	)
}

Story.bareLayout = true

/* ------------------------------------------------------------------ */

function Hero() {
	const ref = useRef(null)
	const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

	const c1 = useTransform(scrollYProgress, [0, .12, .18], [1, 1, 0])
	const c1y = useTransform(scrollYProgress, [0, .18], [0, -60])
	const c2 = useTransform(scrollYProgress, [.18, .24, .52, .58], [0, 1, 1, 0])
	const c3 = useTransform(scrollYProgress, [.62, .72, .92, 1], [0, 1, 1, 1])
	const hint = useTransform(scrollYProgress, [0, .05], [1, 0])

	return (
		<section id="top" ref={ref} className={css.hero}>
			<div className={css.heroSticky}>
				<PhoneScene progress={scrollYProgress} className={css.heroCanvas} labelClass={css.layerLabel} />
				<div className={css.heroGlow} />

				<m.div className={css.heroCopy} style={{ opacity: c1, y: c1y }}>
					<span className={css.eyebrow}>A story in five chapters</span>
					<h1 className={css.heroTitle}>It all started with{" "}<br />a simple question.</h1>
					<p className={css.heroSub}>&ldquo;How does a phone actually work?&rdquo;</p>
				</m.div>

				<m.div className={css.lowerThird} style={{ opacity: c1 }}>
					<i />
					<div>
						<b>Alvin Maina</b>
						<span>Founder &amp; CEO, Maina Group · Nairobi</span>
					</div>
				</m.div>

				<m.div className={`${css.heroCopy} ${css.heroLeft}`} style={{ opacity: c2 }}>
					<h2 className={css.heroTitleSm}>So I opened one.</h2>
					<p className={css.heroSub}>Every layer was a lesson. I wanted to know what each one did, and why.</p>
				</m.div>

				<m.div className={`${css.heroCopy} ${css.heroBottom}`} style={{ opacity: c3 }}>
					<h2 className={css.heroTitleSm}>Inside, I found a story written in silicon.</h2>
					<p className={css.heroSub}>I had to learn to read it. Then I started writing my own.</p>
				</m.div>

				<m.div className={css.scrollHint} style={{ opacity: hint }}>
					<span>Scroll</span><i />
				</m.div>
			</div>
		</section>
	)
}

/* ------------------------------------------------------------------ */

function Bench() {
	const skills = [
		['Microsoldering', 'Component-level rework under the microscope.'],
		['Level AAA repair', 'Board-level fault finding, BGA reballing, dead-short tracing.'],
		['Phones · Consoles · Laptops', 'If it has a circuit, I can bring it back.'],
		['Diagnostics, not guesswork', 'Measure, isolate, prove. It is still how I debug code.'],
	]
	return (
		<section id="bench" className={css.chapter}>
			<ChapterTitle index="01" kicker="The bench · 2020" title="Then I went deeper.">
				I took that curiosity to the repair bench at Dexters Electronics in Nairobi. Phones, consoles, laptops. I learned microsoldering and board-level repair the hard way, one dead device at a time.
			</ChapterTitle>

			<div className={css.split}>
				<Reveal><CircuitScope /></Reveal>
				<div className={css.skillList}>
					{skills.map(([t, d], i) => (
						<Reveal key={t} delay={i * .08} className={css.skill}>
							<h3>{t}</h3>
							<p>{d}</p>
						</Reveal>
					))}
				</div>
			</div>

			<ScrollText text="Reballing chips thinner than a fingernail. Tracing a short across a board half the width of a coin. Every repair taught me the same thing: machines are logical, and anything logical can be understood." />
		</section>
	)
}

/* ------------------------------------------------------------------ */

function Journey() {
	return (
		<section id="journey" className={css.chapter}>
			<ChapterTitle index="02" kicker="The journey · 2015 to now" title="Then a new question: how are apps made?">
				Hardware showed me how machines work. Software was how you tell them what to do. Honestly, it looked like sorcery, and I wanted in. So I went to university and sharpened everything.
			</ChapterTitle>

			<Timeline items={journey} />

			<ScrollText text="My curiosity always got the better of me. Every answer came with a better question, so I kept going: deeper into the code, deeper into the systems, deeper into how it all connects." />
		</section>
	)
}

/* ------------------------------------------------------------------ */

function Code() {
	return (
		<section id="code" className={`${css.chapter} ${css.chapterFlush}`}>
			<div className={css.chapterPad}>
				<ChapterTitle index="03" kicker="The code · 2021" title="From fixing machines to telling them what to do.">
					PHP and JavaScript became my home ground. At Crosstech I led the build of a full e-commerce platform with POS, affiliates, inventory and M-Pesa. Then I built for businesses across Kenya.
				</ChapterTitle>

				<div className={css.langs}>
					<Reveal className={css.lang}><code>&lt;?php</code><span>PHP · Laravel · Yii</span></Reveal>
					<Reveal delay={.1} className={css.lang}><code>=&gt;</code><span>JavaScript · React · Next.js · Node</span></Reveal>
					<Reveal delay={.2} className={css.lang}><code>SELECT</code><span>MySQL · MariaDB · PostgreSQL · Redis</span></Reveal>
				</div>
			</div>

			<HorizontalGallery title={<p className={css.galleryLabel}>Shipped for real businesses. Keep scrolling →</p>}>
				{builds.map((b, i) => (
					<a key={b.name} href={b.url} target="_blank" rel="noopener noreferrer" className={css.buildCard}>
						<span className={css.buildTag}>{b.tag}</span>
						{b.image
							? <img className={css.buildShot} src={b.image} alt={`${b.name} website`} loading="lazy" />
							: <span className={css.buildNum} aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>}
						<h3>{b.name}</h3>
						<p>{b.text}</p>
						<div className={css.buildStack}>{b.stack.map(s => <span key={s}>{s}</span>)}</div>
						<span className={css.buildGo}>Visit ↗</span>
					</a>
				))}
			</HorizontalGallery>
		</section>
	)
}

/* ------------------------------------------------------------------ */

function Architect() {
	const surfaces = ['Customer app', 'Point of sale', 'Kitchen display', 'Tableside', 'Back-office', 'Delivery dispatch', 'Rider app', 'Desktop']
	const modules = ['M-Pesa', 'Paystack', 'KRA eTIMS', 'OTP auth', 'Inventory', 'Firebase push', 'Redis', 'Design system']
	return (
		<section id="architect" className={css.chapter}>
			<ChapterTitle index="04" kicker="The architect · June 2024" title="So I built my own. From zero.">
				Orderly is a complete restaurant operating system. I architected every app from scratch: ordering, service, kitchen, dispatch, and the platform underneath all of it.
			</ChapterTitle>

			<div className={css.orbitWrap}>
				<Reveal className={css.orbit}>
					<div className={css.orbitCore}>
						<span>ORDERLY</span>
						<small>core platform</small>
					</div>
					<div className={css.orbitRing}>
						{surfaces.map((s, i) => (
							<span key={s} className={css.orbitItem} style={{ '--i': i, '--n': surfaces.length }}><b>{s}</b></span>
						))}
					</div>
				</Reveal>
				<div className={css.orbitSide}>
					<Reveal><h3 className={css.h3}>Built for Kenya, built to last.</h3></Reveal>
					<Reveal delay={.08}><p className={css.body}>I designed an update-safe module architecture, so custom features survive every upstream release. Local payments and tax compliance are built in, not bolted on.</p></Reveal>
					<Reveal delay={.16}><div className={css.chips}>{modules.map(mod => <span key={mod}>{mod}</span>)}</div></Reveal>
				</div>
			</div>

			<div className={css.duo}>
				<Reveal className={css.panel}>
					<span className={css.eyebrow}>My own engine</span>
					<h3 className={css.h3}>Maina CMS</h3>
					<p className={css.body}>A content management system I wrote myself. It now runs e-commerce and bookings too, and it sits underneath the group&apos;s products.</p>
				</Reveal>
				<Reveal delay={.1} className={css.panel}>
					<span className={css.eyebrow}>For small businesses</span>
					<h3 className={css.h3}>Link Me Up</h3>
					<p className={css.body}>One link for a Kenyan business, with WhatsApp, M-Pesa till, directions and catalogue, plus a QR poster for the counter.</p>
				</Reveal>
			</div>
		</section>
	)
}

/* ------------------------------------------------------------------ */

function Frontier() {
	return (
		<section id="frontier" className={`${css.chapter} ${css.frontier}`}>
			<ChapterTitle index="05" kicker="The frontier · now" title="Now I build the minds.">
				I&apos;m training Orderly AI and Maina AI to take on real business operations: agents that know the menu, the kitchen and the books.
			</ChapterTitle>

			<div className={css.split}>
				<Reveal><NeuralNet /></Reveal>
				<div className={css.aiList}>
					{[
						['Orderly AI', 'A multi-provider engine I built on Claude and OpenRouter. Its agents take orders by chat, run the kitchen queue, mark dishes sold out and log waste.'],
						['Watchers', 'Background agents that catch stuck orders, failing payment gateways and status drift before a human notices.'],
						['Guardrails', 'Encrypted keys, model policies, usage metering and a full audit trail on every action an agent takes.'],
						['Maina AI', 'The next step: AI trained to ease day-to-day operations for businesses across the group and beyond.'],
					].map(([t, d], i) => (
						<Reveal key={t} delay={i * .08} className={css.skill}>
							<h3>{t}</h3>
							<p>{d}</p>
						</Reveal>
					))}
				</div>
			</div>

			<ScrollText className={css.bigQuote} text="Curiosity took me from the phone to the circuit, from the circuit to the code, and from the code to intelligence. A polymath, second only to the AI I'm training." />
		</section>
	)
}

/* ------------------------------------------------------------------ */

function Group() {
	return (
		<section id="group" className={css.chapter}>
			<ChapterTitle kicker="And here I am" title="Two startups. One company. Everything tech.">
				Orderly and Airtaker are my startups. Maina Group is the main company, and it does pretty much everything in tech. I&apos;m the Director and CEO. Some days, the overlord.
			</ChapterTitle>

			<div className={css.bento}>
				{group.map((g, i) => (
					<Reveal key={g.name} delay={(i % 3) * .08} className={`${css.bentoCard} ${css[g.size] || ''} ${g.status ? css.bentoMuted : ''}`}>
						{g.status && <span className={css.pill}>{g.status}</span>}
						<span className={css.bentoIcon}>{g.glyph}</span>
						<h3>{g.name}</h3>
						<p>{g.text}</p>
					</Reveal>
				))}
			</div>

			<ScrollText className={css.vision} text="The goal: build one of Africa's great technology corporations. Software, AI, compute and energy, made in Nairobi for the whole continent." />
		</section>
	)
}

/* ------------------------------------------------------------------ */

function Red() {
	const ref = useRef(null)
	const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
	const bg = useTransform(scrollYProgress, [.15, .35, .75, .95], ['#050505', '#c8000a', '#c8000a', '#050505'])
	return (
		<m.section ref={ref} className={css.red} style={{ backgroundColor: bg }}>
			<div className={css.chapterPad}>
				<Reveal><span className={css.eyebrowLight}>Off the clock</span></Reveal>
				<Reveal delay={.08}><h2 className={css.display}>Red has something on me.</h2></Reveal>
			</div>
			<Marquee items={['Ferrari', 'Ducati', 'Manchester United', 'FC Bayern']} />
			<Marquee items={['Formula 1', 'MotoGP', 'Premier League', 'Bundesliga']} reverse />
			<div className={css.chapterPad}>
				<Reveal><p className={css.redNote}>I&apos;m a racing addict and I back the red teams. That&apos;s also why Maina Racing is on the roadmap.</p></Reveal>
			</div>
		</m.section>
	)
}

/* ------------------------------------------------------------------ */

function Datacenter() {
	return (
		<section className={css.chapter}>
			<div className={css.split}>
				<div>
					<ChapterTitle kicker="What's next" title="Next stop: the datacenter.">
						I started with one phone on a workbench. Next, I want to work on racks in a data hall. Maina Compute and Maina Energy already keep my cloud services online. Same curiosity, bigger machines.
					</ChapterTitle>
				</div>
				<Reveal><Rack /></Reveal>
			</div>
		</section>
	)
}

/* ------------------------------------------------------------------ */

function Contact() {
	const links = [
		['WhatsApp', 'https://wa.me/254797049888'],
		['GitHub', 'https://github.com/Themaina'],
		['LinkedIn', 'https://www.linkedin.com/in/themainax/'],
		['Medium', 'https://medium.com/@alvor.mi.na'],
	]
	return (
		<section id="contact" className={css.contact}>
			<Reveal><span className={css.eyebrow}>Hardware · Software · AI</span></Reveal>
			<Reveal delay={.08}><h2 className={css.contactTitle}>Let&apos;s build<br />something.</h2></Reveal>
			<Reveal delay={.16} className={css.contactLinks}>
				<a className={css.btnPrimary} href="https://wa.me/254797049888" target="_blank" rel="noopener noreferrer">Talk to me</a>
				<Link href="/projects"><a className={css.btnGhost}>All projects</a></Link>
			</Reveal>
			<footer className={css.footer}>
				<span>© {new Date().getFullYear()} Alvin Maina · Maina Group</span>
				<div>
					{links.map(([t, u]) => <a key={t} href={u} target="_blank" rel="noopener noreferrer">{t}</a>)}
					<Link href="/classic"><a>Classic CV</a></Link>
				</div>
			</footer>
		</section>
	)
}

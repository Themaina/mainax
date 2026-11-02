import Head from 'next/head'
import Link from 'next/link'

import { Reveal, ChapterTitle } from '../components/story/blocks'

import css from '../styles/story/story.module.scss'

const WHATSAPP = 'https://wa.me/254797049888'
const MARKET = 'https://marketplace.botble.com/products/'

const quote = (what) => `${WHATSAPP}?text=${encodeURIComponent(`Hi maina888, I'd like a quote for: ${what}`)}`

// Done-for-you packages, built on the plugins below
const packages = [
	{ glyph: '🛒', name: 'Online shop', size: 'wide', text: 'A Botble online shop with M-Pesa checkout, WhatsApp sales follow-up for unpaid orders, welcome gifts for new customers, fast search and SEO that ranks. Set up, filled and handed over.' },
	{ glyph: '🛵', name: 'Shop + delivery', text: 'Sell without keeping stock: suppliers, verified riders, a dispatch board and a rider app, with every hand-over confirmed.' },
	{ glyph: '🏋️', name: 'Gym system', text: 'Memberships, QR entry at the door, reception renewals with M-Pesa and a live dashboard of who is in.' },
	{ glyph: '🚗', name: 'Car dealer site', text: 'A showroom for your stock with full specs, compare, enquiries and optional KRA import duty estimates.' },
	{ glyph: '🛠️', name: 'Custom work', text: 'A feature your Botble site is missing, a migration, or a site that needs rescuing. Tell me what you need.' },
]

// Premium plugins on the Botble Marketplace
const premium = [
	['Supply Chain and Last-mile Delivery', 'supply-chain', 49],
	['Gym: Memberships and QR Access', 'gym', 49],
	['PC Builder', 'pc-builder', 39],
	['Rides: Car Dealer Inventory', 'rides', 39],
	['Product Core', 'product-core', 29],
	['Content Engine', 'content-engine', 29],
	['Bundles and Add-on Offers', 'bundles', 24],
	['Sales Desk', 'sales-desk', 24],
	['Welcome Gifts and WhatsApp Leads', 'welcome', 24],
	['SEO Booster', 'seo-booster', 24],
	['Showcase: Top 10 Rankings', 'showcase', 19],
	['Product Search (Meilisearch)', 'product-search', 19],
	['Affiliate Rules for Affiliate Pro', 'affiliate-rules', 19],
	['Product Videos', 'product-videos', 15],
]

// Free plugins: open source, made to help
const free = [
	['M-Pesa Payment Gateway', 'maina888/mpesa'],
	['SMS via Africa\'s Talking', 'maina888/sms'],
	['WhatsApp Business Cloud API', 'maina888/whatsapp'],
	['Smart App Downloader', 'maina888/app-downloader'],
	['TikTok Feed', 'mainasoftwares/tiktok-feed'],
	['Instagram Feed', 'maina888/instagram-feed'],
	['Facebook Feed', 'maina888/facebook-feed'],
	['Google One Tap', 'maina888/one-tap'],
	['TikTok Pixel', 'maina888/tiktok-pixel'],
	['Catalog Manager', 'maina888/catalog-manager'],
	['Search Insights', 'maina888/search-insights'],
	['FAQ Hub', 'maina888/faq-hub'],
	['SEO Desk', 'maina888/seo-desk'],
	['Brand Logos', 'maina888/brand-logos'],
]

/**
 * Hire page: done-for-you Botble builds, premium plugins and free plugins by maina888.
 */
export default function Hire() {
	return (
		<div className={css.story}>
			<Head>
				<title>Hire maina888 | Botble shops, done for you</title>
				<meta name="description" content="Botble online shops, delivery, gym and car dealer systems set up for you by maina888, plus premium and free Botble plugins." />
				<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
				<meta property="og:title" content="Hire maina888 | Botble shops, done for you" />
				<meta property="og:description" content="Online shops with M-Pesa, delivery systems, gym systems and car dealer sites, built on Botble by maina888." />
				<meta name="theme-color" content="#050505" />
				<link rel="icon" type="image/png" sizes="32x32" href="/favicon/maina-32.png" />
				<link rel="apple-touch-icon" href="/favicon/maina-180.png" />
			</Head>
			<style jsx global>{`
				#__next { overflow-x: clip; }
				html { background: #050505; }
			`}</style>

			<section className={css.chapter}>
				<ChapterTitle kicker="Hire maina888" title="Your shop, built and running.">
					I build and run Botble sites for businesses in Kenya and beyond: online shops with M-Pesa, delivery, gyms and car dealers. You get a working system, not just a template, made with passion by maina888.
				</ChapterTitle>
				<Reveal delay={.2} className={css.contactLinks}>
					<a className={css.btnPrimary} href={quote('a Botble website')} target="_blank" rel="noopener noreferrer">Get a quote on WhatsApp</a>
					<Link href="/"><a className={css.btnGhost}>About me</a></Link>
				</Reveal>
			</section>

			<section className={css.chapter}>
				<ChapterTitle kicker="Done for you" title="Pick a package." />
				<div className={css.bento}>
					{packages.map((p, i) => (
						<Reveal key={p.name} delay={(i % 3) * .08} className={`${css.bentoCard} ${css[p.size] || ''}`}>
							<span className={css.bentoIcon}>{p.glyph}</span>
							<h3>{p.name}</h3>
							<p>{p.text}</p>
							<p><a href={quote(p.name)} target="_blank" rel="noopener noreferrer">Get a quote →</a></p>
						</Reveal>
					))}
				</div>
			</section>

			<section className={css.chapter}>
				<ChapterTitle kicker="Premium plugins" title="Tools I use in production.">
					Sold on the Botble Marketplace. One purchase covers one website, with updates and support.
				</ChapterTitle>
				<div className={css.bento}>
					{premium.map(([name, slug, price], i) => (
						<Reveal key={slug} delay={(i % 3) * .05} className={css.bentoCard}>
							<span className={css.pill}>${price}</span>
							<h3>{name}</h3>
							<p><a href={`${MARKET}maina888/${slug}`} target="_blank" rel="noopener noreferrer">View on the marketplace →</a></p>
						</Reveal>
					))}
				</div>
			</section>

			<section className={css.chapter}>
				<ChapterTitle kicker="Free plugins" title="Free, and staying free.">
					Open source plugins for every Botble site. If one helps you, star it, report a bug, or say thanks.
				</ChapterTitle>
				<div className={css.bento}>
					{free.map(([name, id], i) => (
						<Reveal key={id} delay={(i % 3) * .05} className={css.bentoCard}>
							<span className={css.pill}>Free</span>
							<h3>{name}</h3>
							<p><a href={`${MARKET}${id}`} target="_blank" rel="noopener noreferrer">Get it free →</a></p>
						</Reveal>
					))}
				</div>
			</section>

			<section id="contact" className={css.contact}>
				<Reveal><span className={css.eyebrow}>Made with passion by maina888</span></Reveal>
				<Reveal delay={.08}><h2 className={css.contactTitle}>Tell me what<br />you need.</h2></Reveal>
				<Reveal delay={.16} className={css.contactLinks}>
					<a className={css.btnPrimary} href={quote('a Botble website')} target="_blank" rel="noopener noreferrer">WhatsApp me</a>
					<a className={css.btnGhost} href="https://www.instagram.com/maina888_/" target="_blank" rel="noopener noreferrer">Instagram</a>
					<a className={css.btnGhost} href="https://www.linkedin.com/in/themainax/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
				</Reveal>
				<footer className={css.footer}>
					<span>© {new Date().getFullYear()} maina888</span>
					<div>
						<Link href="/"><a>Home</a></Link>
						<a href="https://github.com/Themaina" target="_blank" rel="noopener noreferrer">GitHub</a>
					</div>
				</footer>
			</section>
		</div>
	)
}

Hire.bareLayout = true

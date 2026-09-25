// Core packages
import dynamic from 'next/dynamic'
import { Analytics } from '@vercel/analytics/react';
import { LazyMotion, domAnimation } from "framer-motion"

// Utils + structure are split out, so bare-layout pages (the story homepage)
// don't ship the full icon library
const SetGridGap = dynamic(() => import('../components/utils/set.grid.util'))
const Layout = dynamic(() => import('../components/layout/layout'))

// CSS reset (https://github.com/elad2412/the-new-css-reset.git)
import "../node_modules/the-new-css-reset/css/reset.css"

// Fontsource local font import (https://github.com/fontsource/fontsource)
import "@fontsource/fira-code/400.css"
import "@fontsource/fira-code/600.css"
import "@fontsource/inter/400.css"
import "@fontsource/inter/700.css"
import "@fontsource/inter/800.css"

// Devicon import (https://github.com/devicons/devicon)
import '../node_modules/devicon/devicon.min.css'

// Global css
import '../styles/css/variables.css'
import '../styles/css/global.css'

import Head from 'next/head';

/**
 * _app.jsx
 *
 * @param {?} Component
 * @param {?} pageProps
 * @returns
 */
// Google Search Console ownership tag, needed on every page (the homepage especially)
const siteVerification = (
	<Head>
		<meta name="google-site-verification" content="F96bEq-bQoEDVC43s7LA0e_v1-9toZecHcmU3ySCR1A" />
	</Head>
)

export default function MyApp({ Component, pageProps }) {

	// Pages that bring their own chrome (e.g. the story homepage) skip the navbar/footer
	if (Component.bareLayout) {
		return (
			<LazyMotion features={domAnimation}>
				{siteVerification}
				<Component {...pageProps} />
				<Analytics />
			</LazyMotion>
		)
	}

	return (
		<>
		{siteVerification}
		<LazyMotion features={domAnimation}>
			<Layout>
				<Component {...pageProps} />
				<SetGridGap />
				<Analytics />
			</Layout>
		</LazyMotion>
		</>
	)
}
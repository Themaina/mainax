// Core packages
import Image from 'next/image'

// Section structure
import Section from '../../structure/section';
import Container from '../../structure/container';

// Section general blocks
import SectionTitle from '../../blocks/section.title.block'
import SectionGridBg from '../../blocks/section.grid.block'

// Section specific blocks
import BadgesBlock from '../../blocks/about.badges.block'
import CopyBlock from '../../blocks/about.copy.block'

// Section scss
import about from '../../../styles/sections/index/about.module.scss'

/**
 * Section: Technical
 * Highlight your technical skills with a short blurb about you,
 * Then display the programs you are proficient with and the technologies you use if applicable.
 * 
 * @returns {jsx} <Technical />
 */
export default function Technical() {
	return (
		<Section classProp={`${about.section} borderBottom`}>	
			<Container spacing={['verticalXXXLrg']}>
				<SectionTitle
					title="Proficiencies"
					preTitle="My Expertise at a Glance"
					subTitle="Hardware, software and AI, all under one roof."
				/>
				<section className={`${about.content} ${about.container}`}>
					<div className={about.copy}>
						<CopyBlock 
							title="From electronics to code to AI"
							icon={[ 'fat', 'chart-network' ]}
							copy="I work across the whole stack, from the circuit board up. I can diagnose a dead motherboard, stand up and harden a Linux server, write the PHP and JavaScript that runs on it, and connect a large language model that does real work for a business. Few engineers cover all of it. I do, and it lets me solve problems other people would pass along to someone else."
							iconClass={about.icon}
							containerClass={about.container}
						/>
						<BadgesBlock 
							title="AI Engineering" 
							copy="I build AI into production products, not demos: tool-calling agents, multi-provider LLM engines with guardrails and audit logs, background watchers that catch problems early, and AI-assisted diagnostics. I also use AI coding tools every day to ship faster."
							list={ai}
							block="software" 
							fullContainer="fullContainer"
							icon="robot"
							containerClass={about.container}
							headerIcon={about.icon} 
						/>
						<BadgesBlock 
							title="Hardware & Electronics" 
							copy="Years at the repair bench, where I diagnosed and repaired computers, gaming consoles and mobile phones down to component level. That grounding in how hardware fails is why I debug software the way I do."
							list={hardware}
							block="software" 
							fullContainer="fullContainer"
							icon="microchip"
							containerClass={about.container}
							headerIcon={about.icon} 
						/>
						<BadgesBlock 
							title="Tools I use" 
							copy="With 5+ years building digital products, I use a wide set of tools to design, build and ship efficient, scalable solutions."
							list={software}
							block="software" 
							fullContainer="fullContainer"
							icon="grid-2-plus"
							containerClass={about.container}
							headerIcon={about.icon} 
						/>
						<BadgesBlock 
							title="Technologies I build with" 
							copy="As a creative professional, I thrive by using a wide range of tools languages and frameworks to bring ideas to life."
							list={tech}
							block="tech"
							fullContainer="fullContainer" 
							icon="laptop-code"
							containerClass={about.container}
							headerIcon={about.icon} 
						/>							
					</div>
					<div className={`${about.image} ${about.technicalSvg}`}>
						<Image src="/img/dataism-24.svg" width={477} height={1111} alt="Data Strings 01 by Colorpong: https://ywft.us/2177b695b" />
					</div>
				</section>	
			</Container>
			{/* <SectionGridBg gridSize={4}/> */}
		</Section>
	)
}

const software = [
	{ key: 'photoshop', 	name: 'Photoshop', 			type: 'devicon' },
	{ key: 'illustrator', 	name: 'Illustrator', 		type: 'devicon' },
	{ key: 'figma', 		name: 'Figma', 				type: 'devicon' },
	{ key: 'vscode', 		name: 'VSCode', 			type: 'devicon' },
	{ key: 'mailbox', 		name: 'Postman', 			type: 'fas' },
	{ key: 'computer-mouse',name: 'Click Up', 			type: 'fas' },
	{ key: 'list-music',	name: 'Ableton', 			type: 'fas' },
	{ key: 'aftereffects',	name: 'After Effects', 		type: 'devicon' },
	{ key: 'premierepro',	name: 'Premiere Pro', 		type: 'devicon' },
]

const ai = [
	{ key: 'robot', 			name: 'Claude / Anthropic', 	type: 'fad' },
	{ key: 'sparkles', 			name: 'OpenRouter', 			type: 'fad' },
	{ key: 'brain', 			name: 'Gemini / Genkit', 		type: 'fad' },
	{ key: 'screwdriver-wrench',name: 'LLM Tool Calling', 		type: 'fad' },
	{ key: 'diagram-project', 	name: 'Agent Design', 			type: 'fad' },
	{ key: 'shield-check', 		name: 'AI Guardrails & Audit', 	type: 'fad' },
	{ key: 'terminal', 			name: 'Claude Code', 			type: 'fad' },
]

const hardware = [
	{ key: 'microchip', 		name: 'Board-level Repair', 	type: 'fad' },
	{ key: 'fire-flame-curved', name: 'Soldering & Rework', 	type: 'fad' },
	{ key: 'mobile-screen', 	name: 'Phone Repair', 			type: 'fad' },
	{ key: 'gamepad', 			name: 'Console Repair', 		type: 'fad' },
	{ key: 'computer', 			name: 'PC & Laptop Repair', 	type: 'fad' },
	{ key: 'wave-square', 		name: 'Diagnostics', 			type: 'fad' },
	{ key: 'server', 			name: 'Servers & Networking', 	type: 'fad' },
	{ key: 'cash-register', 	name: 'POS Hardware', 			type: 'fad' },
]

const tech	= [
	{ key: 'javascript', 	name: 'JavaScript', 		type: 'devicon' },
	{ key: 'nodejs', 		name: 'NodeJS', 			type: 'devicon' },
	{ key: 'react', 		name: 'React', 				type: 'devicon' },
	{ key: 'nextjs', 		name: 'NextJS', 			type: 'devicon' },
	{ key: 'jquery', 		name: 'jQuery', 			type: 'devicon' },
	{ key: 'php', 			name: 'PHP', 				type: 'devicon' },
	{ key: 'laravel', 		name: 'Laravel', 			type: 'devicon' },
	{ key: 'typescript', 	name: 'TypeScript', 		type: 'devicon' },
	{ key: 'vuejs', 		name: 'Vue', 				type: 'devicon' },
	{ key: 'python', 		name: 'Python', 			type: 'devicon' },
	{ key: 'redis', 		name: 'Redis', 				type: 'devicon' },
	{ key: 'firebase', 		name: 'Firebase', 			type: 'devicon' },
	{ key: 'wordpress', 	name: 'WordPress', 			type: 'devicon' },
	{ key: 'woocommerce', 	name: 'WooCommerce', 		type: 'devicon' },
	{ key: "google",		name: "GA4/GTM", 			type: "devicon" },
	{ key: 'html5', 		name: 'HTML5', 				type: 'devicon' },
	{ key: 'css3', 			name: 'CSS3', 				type: 'devicon' },
	{ key: 'sass', 			name: 'SASS', 				type: 'devicon' },
	{ key: 'git', 			name: 'Git', 				type: 'devicon' },
	{ key: 'mysql', 		name: 'MySQL', 				type: 'devicon' },
	{ key: 'mongodb', 		name: 'MongoDB', 			type: 'devicon' },
]
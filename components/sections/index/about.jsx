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
import about from '../../../styles/sections/index/about.module.scss';

/**
 * Section: About
 * An overview of yourself.
 * Highlight your top level attributes and disciplines.
 * 
 * @returns {jsx} <About />
 */
export default function About() {
	return (
		<Section classProp={about.section}>	
			<Container spacing={['verticalXXXLrg']}>
				<SectionTitle
					title="About Me"
					preTitle="Synopsis"
					subTitle="I started at the repair bench, fixing phones, consoles and computers down to the component. That taught me how systems really work. I took that into software, then into leading teams and building with AI. Hardware, software, AI: I work across all three."
				/>
				<section className={about.content}>
					<div className={about.image}>
						<img src="/img/myphoto1.png" alt="myphoto"/>
						{/* <Image src="/img/family-photo.jpg" width={600} height={800}/> */}
					</div>
					<div className={about.copy} >
						<CopyBlock 
							title="Who I am"
							containerClass={about.container}
							iconClass={about.icon}
							icon={[ 'fat', 'microchip' ]}
							copy="I'm a tech lead based in Nairobi. Today I lead engineering on Orderly, a full restaurant operating system with an AI copilot built in, and I run the e-commerce platform at Crosstech. PHP and JavaScript are my home ground. I think in both circuits and code, so I can take a product from the device on the counter to the server it talks to and the AI model behind it. Outside of work I enjoy swimming and cycling."
						/>
						<BadgesBlock 
							title="How I lead" 
							containerClass={about.container}
							list={methods} 
							fullContainer="fullContainer"
							block="methods" 
							icon="fingerprint"
							copy="The part I enjoy most is planning a system's architecture: how the modules fit, how it survives updates, how it scales, and where AI can do useful work. I also mentor, review code, and give clients a straight answer on what will work."
							//invertedColor="invertedColor"
							headerIcon={`${about.icon}`}
						/>
					</div>
				</section>	
			</Container>
		</Section>
	)
}

const methods 	= [
	{ key: 'sitemap', 			name: 'System Architecture', 	type: 'fad' },
	{ key: 'robot', 			name: 'AI Integration', 		type: 'fad' },
	{ key: 'users', 			name: 'Team Leadership', 		type: 'fad' },
	{ key: 'code-pull-request', name: 'Code Review', 			type: 'fad' },
	{ key: 'window', 			name: 'Design Systems', 		type: 'fad' },
	{ key: 'cubes', 			name: 'Product Strategy', 		type: 'far' },
	{ key: 'solar-system', 		name: 'Operations', 			type: 'fad' },
]
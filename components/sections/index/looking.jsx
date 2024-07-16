// Section structure
import Section 		from '../../structure/section';
import Container 	from '../../structure/container';

// Specing util
import Spacing 		from '../../utils/spacing.util';

// Section general blocks
import SectionGridBg from '../../blocks/section.grid.block'
import SectionTitle from '../../blocks/section.title.block'

// Section scss
import looking 		from '../../../styles/sections/index/looking.module.scss';
import section 		from '../../../styles/blocks/section.title.module.scss'

/**
 * Section: Looking
 * Declare your employment intentions 🚀
 * 
 * @returns {jsx} <Looking />
 */
export default function Looking() {
	return (
		<Section classProp={`${looking.section} borderBottom`}>	
			<Container classProp={`${section.title} ${looking.container}`} spacing={['verticalXXXLrg']}>
				<h1>&apos;Hire me</h1>
				<h2 className={looking.json}>: &#123;</h2>
				<h2 className={looking.jsonSub}><span className={looking.highlight}>Web developer</span>,</h2>
				<h2 className={looking.jsonSub}><span className={looking.highlight2}>Mobile App developer</span></h2>
				<h2 className={looking.jsonSub}><span className={looking.highlight2}>Technician</span></h2>
				<h2 className={looking.json}>&#125;</h2>
				<h4>I am particularily interested in product facing postions where I can help make an organization/individual wide impact.</h4>
				{/* <h2>Senior <span className={looking.highlight}>User Experience</span> Designer</h2> */}
				{/* <p className="subtitle">with a focus on Product Design.</p> */}
			</Container>
		</Section>
	)
}
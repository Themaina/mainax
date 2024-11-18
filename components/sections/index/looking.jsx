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
				<h1> What can i do? </h1>
				<h2 className={looking.json}>: &#123;</h2>
				<h2 className={looking.jsonSub}><span className={looking.highlight}> I create websites / Webapps </span></h2>
				<br />
				<h2 className={looking.jsonSub}><span className={looking.highlight2}> I create mobile apps ios & android</span></h2>
				<br />
				<h2 className={looking.jsonSub}><span className={looking.highlight2}> I solve computer, Mobile & server issues</span></h2>
				<br />
				<h2 className={looking.jsonSub}><span className={looking.highlight}> I cofigure web servers, Mail Servers </span></h2>
				<br />
				<h2 className={looking.jsonSub}><span className={looking.highlight}> I also offer Cybersecurity  consultation</span></h2>
				<br />
				<h2 className={looking.json}>&#125;</h2>
				<h4>Let’s turn your ideas into reality with my expertise.</h4>
				<p className="subtitle">with a focus on Product Design.</p>
			</Container>
		</Section>
	)
}
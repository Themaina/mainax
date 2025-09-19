// Section structure
import Section      from '../../structure/section';
import Container    from '../../structure/container';
import Badges       from '../../utils/badge.list.util'; // Import Badges

// ... other imports
import looking      from '../../../styles/sections/index/looking.module.scss';
import section      from '../../../styles/blocks/section.title.module.scss'

// Define your tech stack
const devOpsTools = [
    { key: 'docker', name: 'Docker', type: 'devicon' },
    { key: 'kubernetes', name: 'Kubernetes', type: 'devicon' },
    { key: 'aws', name: 'AWS', type: 'devicon' },
    { key: 'jenkins', name: 'Jenkins', type: 'devicon' },
    { key: 'nginx', name: 'Nginx', type: 'devicon' },
    { key: 'git', name: 'Git', type: 'devicon' },
    { key: 'nodejs', name: 'NodeJS', type: 'devicon' },
    { key: 'postgresql', name: 'PostgreSQL', type: 'devicon' },
	{ key: 'linux', name: 'Linux', type: 'devicon' },
	{ key: 'php', name: 'PHP', type: 'devicon' },
    { key: 'laravel', name: 'Laravel', type: 'devicon' },
    { key: 'composer', name: 'Composer', type: 'devicon' },
    { key: 'mysql', name: 'MySQL', type: 'devicon' },
    
];


export default function Looking() {
    return (
        <Section classProp={`${looking.section} borderBottom`}> 
            <Container classProp={`${section.title} ${looking.container}`} spacing={['verticalXXXLrg']}>
                <h1>Areas of Expertise</h1>
                <h2 className={looking.json}>specializations: &#123;</h2>
                
                <h2 className={looking.jsonSub}>
                    <span className={looking.highlight}>devOps</span>
                </h2>
                <h2 className={looking.jsonSub}>
                    <span className={looking.highlight2}>cybersecurity</span>
                </h2>
                <h2 className={looking.jsonSub}>
                    <span className={looking.highlight}>backendDevelopment</span>
                </h2>
                <h2 className={looking.jsonSub}>
                    <span className={looking.highlight2}>serverInfrastructure</span>
                </h2>
                
                <h2 className={looking.json}>&#125;</h2>

                {/* --- SUGGESTED ADDITIONS START HERE --- */}

                <div className={looking.techContainer}>
                    <h3>Key Technologies</h3>
                    <Badges list={devOpsTools} block="stack" />
                </div>
                
                <div className={looking.ctaContainer}>
                     
                     <a href="/path/to/your/cv.pdf" className="button secondary" target="_blank" rel="noopener noreferrer">Download CV</a>
                </div>

                 {/* --- SUGGESTED ADDITIONS END HERE --- */}

            </Container>
        </Section>
    )
}
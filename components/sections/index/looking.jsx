// Section structure
import Section      from '../../structure/section';
import Container    from '../../structure/container';
import Badges       from '../../utils/badge.list.util'; // Import Badges

// ... other imports
import looking      from '../../../styles/sections/index/looking.module.scss';
import section      from '../../../styles/blocks/section.title.module.scss'

// Key technologies across the whole stack: silicon to cloud
const keyTech = [
    { key: 'php', name: 'PHP', type: 'devicon' },
    { key: 'laravel', name: 'Laravel', type: 'devicon' },
    { key: 'javascript', name: 'JavaScript', type: 'devicon' },
    { key: 'typescript', name: 'TypeScript', type: 'devicon' },
    { key: 'react', name: 'React', type: 'devicon' },
    { key: 'nextjs', name: 'NextJS', type: 'devicon' },
    { key: 'nodejs', name: 'NodeJS', type: 'devicon' },
    { key: 'python', name: 'Python', type: 'devicon' },
    { key: 'mysql', name: 'MySQL / MariaDB', type: 'devicon' },
    { key: 'redis', name: 'Redis', type: 'devicon' },
    { key: 'firebase', name: 'Firebase', type: 'devicon' },
    { key: 'nginx', name: 'Nginx', type: 'devicon' },
    { key: 'linux', name: 'Linux', type: 'devicon' },
    { key: 'docker', name: 'Docker', type: 'devicon' },
    { key: 'git', name: 'Git', type: 'devicon' },
    { key: 'arduino', name: 'Arduino', type: 'devicon' },
];


export default function Looking() {
    return (
        <Section classProp={`${looking.section} borderBottom`}> 
            <Container classProp={`${section.title} ${looking.container}`} spacing={['verticalXXXLrg']}>
                <h1>Areas of Expertise</h1>
                <h2 className={looking.json}>specializations: &#123;</h2>
                
                <h2 className={looking.jsonSub}>
                    <span className={looking.highlight}>aiEngineering</span>
                </h2>
                <h2 className={looking.jsonSub}>
                    <span className={looking.highlight2}>fullStackDevelopment</span>
                </h2>
                <h2 className={looking.jsonSub}>
                    <span className={looking.highlight}>hardwareAndElectronics</span>
                </h2>
                <h2 className={looking.jsonSub}>
                    <span className={looking.highlight2}>serverInfrastructure</span>
                </h2>
                <h2 className={looking.jsonSub}>
                    <span className={looking.highlight}>technicalLeadership</span>
                </h2>
                
                <h2 className={looking.json}>&#125;</h2>

                <div className={looking.techContainer}>
                    <h3>Key Technologies</h3>
                    <Badges list={keyTech} block="stack" />
                </div>
                
                <div className={looking.ctaContainer}>
                     
                    <a href="https://github.com/Themaina" className="button secondary" target="_blank" rel="noopener noreferrer">See my work on GitHub</a>
                </div>
            </Container>
        </Section>
    )
}
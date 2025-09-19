// Core packages
import Image from 'next/image'

import Badges       from '../../utils/badge.list.util'

// Section structure
import Section from '../../structure/section';
import Container from '../../structure/container';

// Section general blocks
import SectionTitle from '../../blocks/section.title.block'
import SectionGridBg from '../../blocks/section.grid.block'

// Career scss
import career from '../../../styles/sections/index/career.module.scss'

/**
 * Section: Career
 *
 * @returns {jsx} <Career />
 */
export default function Career() {
    return (
        <Section classProp={`${career.section} borderBottom`}>
            <Container spacing={['verticalXXXLrg']}>
                <SectionTitle
                    title="Experience"
                    preTitle="Career"
                    subTitle="A timeline of my professional and technical journey."
                />
                <section className={career.area}>
                    {/* Crosstech Experience */}
                    <article className={career.company}>
                        <div className={career.companyContent}>
                            <span className={career.companyHeader}>
                                <h3>Crosstech.ke</h3>
                                <h4>Permanent Full-time</h4>
                                <h4>Apr 2022 - Present</h4>
                                <h5>Nairobi, Kenya</h5>
                            </span>
                            <p>
                            Crosstech is a leading destination for cutting-edge electronics and tech essentials in Kenya, committed to innovation and customer satisfaction through a diverse range of products and expert guidance.
                            </p>
                        </div>
                        <div className={career.companyAlt}></div>
                    </article>

                    <article className={career.companyPositions}>
                        <div className={career.position}>
                            <div className={career.positionContent}>
                                <span className={career.positionHeader}>
                                    <h3>E-commerce Software Developer</h3>
                                    <h4>Apr 2022 - Present</h4>
                                </span>
                                <p>
                                As the lead developer, I oversee the end-to-end lifecycle of the company's e-commerce platform. My role involves managing all online operations, ensuring a seamless and efficient digital experience for our customers.
                                </p>
                                <ul className={career.list}>
                                    <li>
                                        Spearheaded the ideation, design, development, and ongoing maintenance of the Crosstech e-commerce website.
                                        <span className={career.subList}><span className={career.bullet}></span>Built a scalable and robust online store from the ground up.</span>
                                    </li>
                                    <li>
                                        Implemented new user-facing features and backend improvements to enhance the shopping experience and streamline operations.
                                        <span className={career.subList}><span className={career.bullet}></span>Increased user engagement and conversion rates.</span>
                                    </li>
                                    <li>
                                        Managed the full technology stack, including the front-end interface, back-end APIs, and database management.
                                        <span className={career.subList}><span className={career.bullet}></span>Ensured 99.9% uptime and optimal site performance.</span>
                                    </li>
                                </ul>
                                <Badges list={fullStack} block="stack" fullContainer="fullContainer"/>
                            </div>
                            <div className={career.positionAlt}></div>
                        </div>
                    </article>

                    {/* Freelance Experience */}
                    <article className={career.company}>
                        <div className={career.companyContent}>
                            <span className={career.companyHeader}>
                                <h3>Freelance Software Developer</h3>
                                <h4>Contract</h4>
                                <h4>Dec 2023 - Present</h4>
                                <h5>Remote (via Guru.com)</h5>
                            </span>
                            <p>
                            Delivered high-quality software solutions for a diverse range of clients on the Guru.com platform. I was responsible for the full project lifecycle, from initial client consultation and requirements gathering to development, testing, and deployment. Projects included custom website development, e-commerce integrations, and feature enhancements for existing applications.
                            </p>
                            <Badges list={freelanceStack} block="stack" fullContainer="fullContainer"/>
                        </div>
                        <div className={career.companyAlt}></div>
                    </article>
                    
                    {/* Dexters Electronics Experience */}
                    <article className={career.company}>
                        <div className={career.companyContent}>
                            <span className={career.companyHeader}>
                                <h3>Dexters Electronics</h3>
                                <h4>Permanent Full-time</h4>
                                <h4>Jan 2020 - Apr 2022 · 2 yrs 4 mos</h4>
                                <h5>Nairobi, Kenya</h5>
                            </span>
                            <p>
                            Diagnosed, troubleshooted, and repaired a wide variety of electronic devices, including computers, gaming consoles, and mobile phones. This role provided me with a deep, foundational understanding of hardware components, system diagnostics, and effective problem-solving.
                            </p>
                        </div>
                        <div className={career.companyAlt}></div>
                    </article>
                </section>
            </Container>
        </Section>
    )
}

const fullStack = [
    { key: 'javascript',    name: 'JavaScript',         type: 'devicon' },
    { key: 'nodejs',        name: 'NodeJS',             type: 'devicon' },
    { key: 'react',         name: 'React',              type: 'devicon' },
    { key: 'nextjs',        name: 'NextJS',             type: 'devicon' },
    { key: 'php',           name: 'PHP',                type: 'devicon' },
    { key: 'wordpress',     name: 'WordPress',          type: 'devicon' },
    { key: 'woocommerce',   name: 'WooCommerce',        type: 'devicon' },
    { key: 'html5',         name: 'HTML5',              type: 'devicon' },
    { key: 'css3',          name: 'CSS3',               type: 'devicon' },
    { key: 'sass',          name: 'SASS',               type: 'devicon' },
    { key: 'git',           name: 'Git',                type: 'devicon' },
    { key: 'mysql',         name: 'MySQL',              type: 'devicon' },
    { key: 'mongodb',       name: 'MongoDB',            type: 'devicon' },
];

const freelanceStack = [
    { key: 'laravel',       name: 'Laravel',            type: 'devicon' },
    { key: 'php',           name: 'PHP',                type: 'devicon' },
    { key: 'mysql',         name: 'MySQL',              type: 'devicon' },
    { key: 'postgresql',    name: 'PostgreSQL',         type: 'devicon' },
    { key: 'javascript',    name: 'JavaScript',         type: 'devicon' },
    { key: 'react',         name: 'React',              type: 'devicon' },
    { key: 'wordpress',     name: 'WordPress',          type: 'devicon' },
    { key: 'git',           name: 'Git',                type: 'devicon' },
];

// Note: The 'stack' constant was identical to 'fullStack' and not used, 
// so it can be removed if not used elsewhere in your project.
const stack = [
    { key: 'javascript',    name: 'JavaScript',         type: 'devicon' },
    { key: 'nodejs',        name: 'NodeJS',             type: 'devicon' },
    { key: 'react',         name: 'React',              type: 'devicon' },
    { key: 'nextjs',        name: 'NextJS',             type: 'devicon' },
    { key: 'php',           name: 'PHP',                type: 'devicon' },
    { key: 'wordpress',     name: 'WordPress',          type: 'devicon' },
    { key: 'woocommerce',   name: 'WooCommerce',        type: 'devicon' },
    { key: 'html5',         name: 'HTML5',              type: 'devicon' },
    { key: 'css3',          name: 'CSS3',               type: 'devicon' },
    { key: 'sass',          name: 'SASS',               type: 'devicon' },
    { key: 'git',           name: 'Git',                type: 'devicon' },
    { key: 'mysql',         name: 'MySQL',              type: 'devicon' },
    { key: 'mongodb',       name: 'MongoDB',            type: 'devicon' },
];
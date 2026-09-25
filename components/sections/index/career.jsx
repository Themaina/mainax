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
                    {/* Orderly Experience */}
                    <article className={career.company}>
                        <div className={career.companyContent}>
                            <span className={career.companyHeader}>
                                <h3>Orderly</h3>
                                <h4>Tech Lead</h4>
                                <h4>2025 - Present</h4>
                                <h5>Nairobi, Kenya</h5>
                            </span>
                            <p>
                            Orderly is a restaurant operating system covering customer ordering, point-of-sale, kitchen display, tableside service, back-office management and delivery dispatch, with an AI copilot built in.
                            </p>
                        </div>
                        <div className={career.companyAlt}></div>
                    </article>

                    <article className={career.companyPositions}>
                        <div className={career.position}>
                            <div className={career.positionContent}>
                                <span className={career.positionHeader}>
                                    <h3>Tech Lead &amp; AI Architect</h3>
                                    <h4>2025 - Present</h4>
                                </span>
                                <p>
                                I lead the technical direction of the platform across its web, mobile and desktop apps: architecture, infrastructure, payments, compliance and AI.
                                </p>
                                <ul className={career.list}>
                                    <li>
                                        Designed an update-safe module architecture so custom features survive upstream platform upgrades.
                                        <span className={career.subList}><span className={career.bullet}></span>Shipped M-Pesa, Paystack, KRA eTIMS, OTP and inventory modules.</span>
                                    </li>
                                    <li>
                                        Built Orderly AI, a multi-provider LLM engine with tool-calling agents for customers, kitchens and admins.
                                        <span className={career.subList}><span className={career.bullet}></span>Includes guardrails, encrypted keys, usage metering, audit logs and automated watchers for stuck orders.</span>
                                    </li>
                                    <li>
                                        Run production infrastructure on Linux, nginx, Cloudflare, MariaDB and Redis.
                                        <span className={career.subList}><span className={career.bullet}></span>Delivered a single design system across five product surfaces.</span>
                                    </li>
                                </ul>
                                <Badges list={orderlyStack} block="stack" fullContainer="fullContainer"/>
                            </div>
                            <div className={career.positionAlt}></div>
                        </div>
                    </article>

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
                                    <h3>Lead E-commerce Developer</h3>
                                    <h4>Apr 2022 - Present</h4>
                                </span>
                                <p>
                                As the lead developer, I oversee the end-to-end lifecycle of the company&apos;s e-commerce platform. My role involves managing all online operations, ensuring a seamless and efficient digital experience for our customers.
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
                            Diagnosed, troubleshot and repaired a wide range of electronic devices, including computers, gaming consoles and mobile phones, down to board and component level. This is where my engineering started: a deep, practical understanding of hardware, system diagnostics and methodical problem-solving that I still bring to every software project.
                            </p>
                            <Badges list={hardwareSkills} block="stack" fullContainer="fullContainer"/>
                        </div>
                        <div className={career.companyAlt}></div>
                    </article>
                </section>
            </Container>
        </Section>
    )
}

const orderlyStack = [
    { key: 'php',           name: 'PHP',                type: 'devicon' },
    { key: 'yii',           name: 'Yii',                type: 'devicon' },
    { key: 'javascript',    name: 'JavaScript',         type: 'devicon' },
    { key: 'vuejs',         name: 'Vue / Quasar',       type: 'devicon' },
    { key: 'mysql',         name: 'MariaDB',            type: 'devicon' },
    { key: 'redis',         name: 'Redis',              type: 'devicon' },
    { key: 'firebase',      name: 'Firebase',           type: 'devicon' },
    { key: 'nginx',         name: 'Nginx',              type: 'devicon' },
    { key: 'linux',         name: 'Linux',              type: 'devicon' },
    { key: 'robot',         name: 'LLMs / AI Agents',   type: 'fad' },
];

const hardwareSkills = [
    { key: 'microchip',         name: 'Board-level Repair', type: 'fad' },
    { key: 'fire-flame-curved', name: 'Soldering',          type: 'fad' },
    { key: 'mobile-screen',     name: 'Phones',             type: 'fad' },
    { key: 'gamepad',           name: 'Consoles',           type: 'fad' },
    { key: 'computer',          name: 'Computers',          type: 'fad' },
    { key: 'wave-square',       name: 'Diagnostics',        type: 'fad' },
];

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

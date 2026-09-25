import Section 		from '../../structure/section';
import Container 	from '../../structure/container';
import SectionTitle from '../../blocks/section.title.block'

import css 			from '../../../styles/sections/projects/recent.module.scss'

/**
 * Section: Recent GitHub projects
 * Public repositories pulled from the GitHub API in getServerSideProps.
 *
 * @returns {jsx} <GitRecentProjects />
 */
export default function GitRecentProjects({ user, repos }) {

	if ( !Array.isArray(repos) || !repos.length ) return null

	const profile = Array.isArray(user) ? user[0] : user

	return (
		<Section classProp={css.section}>
			<Container classProp={css.container} spacing={'verticalXXXLrg'}>
				<SectionTitle
					title="Open Source"
					preTitle="On GitHub"
					subTitle="Public projects and plugins I have shipped for anyone to use."
				/>
				{ profile && profile.login &&
				<div className={css.profile}>
					<img src={profile.avatar_url} alt={profile.login} width={48} height={48} />
					<a href={profile.html_url} target="_blank" rel="noopener noreferrer">@{profile.login}</a>
				</div>
				}
				<div className={css.projects}>
					{ repos.map( ({ name, description, html_url, homepage, language, pushed_at, topics }) => (
						<a key={name} className={css.project} href={html_url} target="_blank" rel="noopener noreferrer">
							<div className={css.header}>
								<h4>{name}</h4>
								{ homepage && <span className={css.homepage}>{homepage.replace(/^https?:\/\//, '')}</span> }
							</div>
							<div className={css.descriptionContainer}>
								<p className={css.description}>{ description || 'No description yet.' }</p>
							</div>
							<div className={css.details}>
								<p>{language}</p>
								<span className={css.pushedAt}>updated {new Date(pushed_at).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })}</span>
							</div>
							{ topics && topics.length > 0 &&
							<div className={css.topicsContainer}>
								{ topics.slice(0, 4).map( topic => <span key={topic} className={css.topics}>{topic}</span> ) }
							</div>
							}
						</a>
					)) }
				</div>
			</Container>
		</Section>
	)
}

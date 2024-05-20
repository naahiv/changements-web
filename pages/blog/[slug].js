// Page Router
import { useRouter } from 'next/router'

// Head element
import Head from 'next/head'

// styles
import styles from './Blog.module.scss'

// components
import SectionContainer from '@/components/SectionContainer'
import Contact from '@/components/Contact'
import Image from 'next/image'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

// temp lists
import { articles } from '@/temp/listPlaceholders'

// contentful
import { createClient } from 'contentful'

export async function getStaticPaths() {
	const client = createClient({
		space: process.env.space,
		accessToken: process.env.accessToken
	})

	const blog = await client.getEntries({
		content_type: 'blog'
	})

	const paths = blog.items.map(article => ({
		params: { slug: article.fields.title.toLowerCase().replace(/\s+/g, '-') }
	}))

	return {
		paths,
		fallback: false
	}
}

export async function getStaticProps({ params }) {
	const client = createClient({
		space: process.env.space,
		accessToken: process.env.accessToken
	})

	const blog = await client.getEntries({
		content_type: 'blog'
	})

	return {
		props: {
			blog: blog.items
		}
	}
}

const Article = ({ blog }) => {
	const router = useRouter()
	const { slug } = router.query

	const article = blog.find(
		article => article.fields.title.toLowerCase().replace(/\s+/g, '-') === slug
	)

	return (
		<>
			<Head>
				<title>{`ImpactPlease | ${article.fields.title}`}</title>
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.svg' />
			</Head>
			<main>
				{/* Article content */}
				<SectionContainer back={true} marginTop={true}>
					{article.fields.image && (
						<div className={styles.blogPhoto}>
							<Image
								src={'https:' + article.fields.image.fields.file.url}
								fill
								quality={100}
								sizes='(max-width: 768px) 100vw, 768px'
								style={{ objectFit: 'cover' }}
								alt='Section Image'
								priority={true}
								as='img'
							/>
						</div>
					)}
					<div className={styles.blogText}>
						<p className={styles.date}>{article.subtitle}</p>
						<h3>{article.fields.title}</h3>
						<div className={styles.text}>
							{documentToReactComponents(article.fields.body)}
						</div>
					</div>
				</SectionContainer>

				{/* Other articles Section */}
				{/* {article && (
					<CardsSection
						title='Recent Posts'
						content={articles.filter(item => item !== article).slice(0, 4)}
						folder='blog'
						buttonText='Read More'
					/>
				)} */}

				{/* Contact */}
				<Contact />
			</main>
		</>
	)
}

export default Article

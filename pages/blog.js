// Head element
import Head from 'next/head'

// components
import PagesHero from '@/components/PagesHero'
import CardsSection from '@/components/CardsSection'

// sections
import Contact from '@/components/Contact'

// temp lists
import { articles } from '@/temp/listPlaceholders'

// contentful
import { createClient } from 'contentful'

export async function getStaticProps() {
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

const blog = ({ blog }) => {
	return (
		<>
			<Head>
				<title>ImpactPlease | Impact Buzz</title>
				<meta
					name='description'
					content='Read about the latest from our NGO partners.
                    Visit your NGO and create a post about your personal experience.'
				/>
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.svg' />
			</Head>

			<main>
				{/* Hero */}
				<PagesHero imageUrl='/blog-hero.jpg'>
					<h1>Impact Buzz</h1>
					<p style={{ fontSize: '2rem' }}>Impact News from Our NGO Partners</p>
				</PagesHero>

				{/* Articles Section */}
				<CardsSection contentful={blog} folder='blog' buttonText='Read More' />

				{/* Contact */}
				<Contact />
			</main>
		</>
	)
}

export default blog

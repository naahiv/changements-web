// Head element
import Head from 'next/head'

// components
import PagesHero from '@/components/PagesHero'
import CardsSection from '@/components/CardsSection'

// sections
import Contact from '@/components/Contact'

// temp lists
import { articles } from '@/temp/listPlaceholders'

const blog = () => {
	return (
		<>
			<Head>
				<title>Changements | Change Buzz</title>
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
					<h1>Change Buzz</h1>
					<p>
						Read about the latest from our NGO partners.
						<br />
						Visit your NGO and create a post about your personal experience.
					</p>
				</PagesHero>

				{/* Articles Section */}
				<CardsSection content={articles} folder='blog' buttonText='Read More' />

				{/* Contact */}
				<Contact />
			</main>
		</>
	)
}

export default blog

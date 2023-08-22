// head element
import Head from 'next/head'

// components
import PagesHero from '@/components/PagesHero'
import SectionTitle from '@/components/SectionTitle'

// hooks
import { useAuthContext } from '@/hooks/useAuthContext'

// sections
import ImageTextColumns from '@/components/ImageTextColumns'
import Contact from '@/components/Contact'

const NGOSquare = () => {
	// context
	const { user } = useAuthContext()

	return (
		<>
			<Head>
				<title>Changements | NGO Square</title>
				<meta
					name='description'
					content='Join our NGO portfolio to reach out to our Donor base, that will stay for the long term in your changemaking journey.'
				/>
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.svg' />
			</Head>

			<main>
				{/* Hero */}
				<PagesHero imageUrl='/ngo-square-hero.jpg'>
					<h1>NGO Square</h1>
					<p>
						Join our NGO portfolio to reach out to our Donor base, that will
						<br />
						stay for the long term in your changemaking journey.
					</p>
				</PagesHero>

				{/* About NGO Square */}
				<ImageTextColumns
					direction='row'
					buttonText={!user ? 'Register a NGO' : 'Go to Dashboard'}
					url={!user ? '/register' : '/dashboard'}
					photoUrl='/about-ngo.jpg'
				>
					<p>
						Thank you for being true change makers in our communities that need
						it most. We can help you reach your full potential with committed
						partners.
					</p>
					<br />
					<p>
						We connect you with donors who are passionate about joining hands
						and sharing the journey of change making.
					</p>
				</ImageTextColumns>

				{/* Create a Program Section */}
				<ImageTextColumns
					direction='row-reverse'
					buttonText='Create a Program'
					url={!user ? '/register' : '/dashboard'}
					photoUrl='/indian-old-woman.jpg'
				>
					<SectionTitle color='black'>
						Create a <span className='red'>Program</span>
					</SectionTitle>
					<p>
						We carefully curate causes for donors to choose from. You can come
						together and contribute to your individual ability, with full
						confidentiality from each other. Pick the cause that works for you
						as a group. The collective is far stronger than the individual.​
					</p>
				</ImageTextColumns>

				{/* Contact */}
				<Contact />
			</main>
		</>
	)
}

export default NGOSquare

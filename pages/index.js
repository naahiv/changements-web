// head element
import Head from 'next/head'

// sections
import Hero from '@/components/Hero'
import Contact from '@/components/Contact'
import Highlights from '@/components/Highlights'
import ImageTextColumns from '@/components/ImageTextColumns'
import DonorNgoHomeSection from '@/components/DonorNgoHomeSection'

// components
import SectionTitle from '@/components/SectionTitle'

export default function Home() {
	return (
		<>
			<Head>
				<title>Changements | One cup at a time</title>
				<meta
					name='description'
					content='We are a group of professionals committed to making a lasting impact for a happier, healthier and just world.​ A few cups of coffee can make all the difference.'
				/>
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.svg' />
			</Head>
			<main>
				{/* Hero Section */}
				<Hero />

				{/* Highlights Section */}
				<Highlights />

				{/* About Section */}
				<ImageTextColumns
					direction='row'
					buttonText='Learn More'
					url=''
					photoUrl='/indian-girl.jpg'
				>
					<SectionTitle color='black'>
						About Us &<br />
						<span className='red'>How it works</span>
					</SectionTitle>
					<p>
						We are a group of professionals committed to making a lasting impact
						for a happier, healthier and just world. ​A few cups of coffee can
						make all the difference.
					</p>
					<br />
					<p>BE THE CHANGE YOU WANT TO SEE.</p>
				</ImageTextColumns>

				{/* Portfolio Section */}
				<ImageTextColumns
					direction='row-reverse'
					buttonText='Browse Portfolio'
					url='/portfolio'
					photoUrl='/indian-old-woman.jpg'
				>
					<SectionTitle color='black'>
						Changements
						<br />
						<span className='red'>Portfolio</span>
					</SectionTitle>
					<p>
						We carefully curate causes for donors to choose from. You can come
						together and contribute to your individual ability, with full
						confidentiality from each other. Pick the cause that works for you
						as a group. The collective is far stronger than the individual.​
					</p>
				</ImageTextColumns>

				{/* Donor & NGO Section */}
				<DonorNgoHomeSection />

				{/* Donor Impact Section */}
				<ImageTextColumns direction='row' photoUrl='/donor-impact.jpg'>
					<SectionTitle color='black'>
						Donor <span className='red'>Impact</span>
					</SectionTitle>
					<p>
						Checkout the causes our donors are supporting. Much like the joy of
						singing and dancing in a group, collective giving multiplies the joy
						of making the world a better place for everybody. Here you will find
						stories from NGOs, donors and beneficiaries.
					</p>
				</ImageTextColumns>

				{/* Contact Section */}
				<Contact />
			</main>
		</>
	)
}

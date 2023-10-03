// Head element
import Head from 'next/head'

// components
import PagesHero from '@/components/PagesHero'
import SectionTitle from '@/components/SectionTitle'
import ImageTextColumns from '@/components/ImageTextColumns'
import CardsSection from '@/components/CardsSection'

// sections
import Contact from '@/components/Contact'

// hooks
import { useCollection } from '@/hooks/useCollection'

const portfolio = () => {
	const { documents: programs } = useCollection('programs')
	const { documents: nonProfits } = useCollection('users')

	return (
		<>
			<Head>
				<title>Changements | Our Portfolio</title>
				<meta
					name='description'
					content='The NGOs listed here are fully operational, approved with a TaxID. Come together as a group to compound change. You might find more than one cause that interest you and your family and friends. You can belong to more than one group or Pod. Be sure to check the progress, get involved, visit and post your experiences on our blog/vlog. Enjoy the change you are making. '
				/>
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.svg' />
			</Head>

			<main>
				{/* Hero */}
				<PagesHero imageUrl='/portfolio-hero.jpg'>
					<h1>Portfolio</h1>
					<p style={{ fontSize: '2rem' }}>Where Change is Compounded</p>
				</PagesHero>

				{/* About Portfolio */}
				<ImageTextColumns direction='row' photoUrl='/indian-girl.jpg'>
					<SectionTitle color='black'>
						Non-Profits(NGOs)
						<br /> & <span className='red'>Programs</span>
					</SectionTitle>
					<p>
						The NGOs listed here are fully operational and approved with
						permits/IDs.
					</p>
					<br />
					<p>
						You might find more than one cause that interests you and your
						family/friends. You can belong to more than one group or Pod. Be
						sure to check the progress, get involved, visit and post your
						experiences on our blog/vlog. Rejoice in the change you are making.
					</p>
				</ImageTextColumns>

				{/* NonProfits Section */}
				{nonProfits && (
					<CardsSection
						title='Non-Profits(NGOs)'
						content={nonProfits.filter(user => user.type == 'ngo')}
						folder='portfolio/non-profits'
						buttonText='Learn More'
					/>
				)}

				{/* Programs Section */}
				{/* {programs && (
					<CardsSection
						title='Programs'
						content={programs}
						folder='portfolio/programs'
						buttonText='Learn More'
					/>
				)} */}

				{/* Contact */}
				<Contact />
			</main>
		</>
	)
}

export default portfolio

// Page Router
import { useRouter } from 'next/router'

// Head element
import Head from 'next/head'

// styles
import styles from '@/styles/Portfolio.module.scss'

// components
import SectionContainer from '@/components/SectionContainer'
import CardsSection from '@/components/CardsSection'
import Contact from '@/components/Contact'
import EditProfileInfo from '@/components/profile/EditProfileInfo.js'
import Image from 'next/image'
import Button from '@/components/Button'

// hooks
import { useCollection } from '@/hooks/useCollection'

const NonProfit = () => {
	const router = useRouter()
	const { slug } = router.query
	const { documents: programs } = useCollection('programs')
	const { documents: nonProfits } = useCollection('users')

	const nonProfit =
		nonProfits && nonProfits.find(nonProfit => nonProfit.id === slug)
	const document = nonProfit

	return (
		<>
			<Head>
				<title>{nonProfit && `ImpactPlease | ${document.name}`}</title>
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.svg' />
			</Head>
			<main>

			{document && (
			<SectionContainer marginTop={true} back={true} title='Edit Profile'>
				<EditProfileInfo data={document} />
			</SectionContainer>
			)}
				

				{/* Programs Section */}
				{programs && nonProfit && (
					<CardsSection
						title='Programs'
						content={programs.filter(
							program => program.createdBy == nonProfit.id
						)}
						folder='portfolio/programs'
						buttonText='Learn More'
					/>
				)}

				{/* Contact */}
				<Contact />
			</main>
		</>
	)
}

export default NonProfit

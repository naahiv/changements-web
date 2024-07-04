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
				


				{/* NGO Detail */}
				<SectionContainer>
					{nonProfit && (
						<>
							<div className={styles.ngoPhoto}>
								<Image
									src={nonProfit.photoUrl}
									fill
									quality={100}
									sizes='(max-width: 768px) 100vw, 768px'
									style={{ objectFit: 'cover' }}
									alt='Section Image'
									priority={true}
									as='img'
								/>
							</div>

							<div className={styles.ngoInfo}>
								<h3>{nonProfit.name}</h3>
								<p>{nonProfit.description}</p>
								<div className='buttons-row'>
								{nonProfit.ngoReportFile && (
									<a href={nonProfit.ngoReportFile} target='_blank'><button>View NGO Report</button></a>
								)}
								</div>
							</div>

							<div className={styles.ngoData}>
								<div className={styles.ngoDataContainer}>
									<h5>NGO ID</h5>
									<p>{nonProfit.ngoId}</p>

									{/* <p>Funded: 12/4/2016</p> */}
									<p>
										Operating Currency: {nonProfit.operatingCurrency}
										<br />
										Donation Currencies: {nonProfit.donationCurrency}
									</p>
								</div>
								<div className={styles.ngoDataContainer}>
									<h5>Contact Info</h5>
									<p>{nonProfit.primaryContactName}</p>
									<div>
										<p>{nonProfit.phone}</p>
										<p>{nonProfit.email}</p>
										<p>{nonProfit.website}</p>
									</div>
								</div>
							</div>

							<div className={styles.ngoData}>
								<div className={styles.ngoDataContainer}>
									<h5>Address</h5>
									<p>{nonProfit.address}</p>
								</div>
								<div className={styles.ngoDataContainer}>
									<h5>Payment Info</h5>
									<p>{nonProfit.donationInformation}</p>
								</div>
							</div>

							<div className={styles.ngoData}></div>
						</>
					)}
				</SectionContainer>

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

// Page Router
import { useRouter } from 'next/router'

// Head element
import Head from 'next/head'

// styles
import styles from '../Portfolio.module.scss'

// components
import SectionContainer from '@/components/SectionContainer'
import CardsSection from '@/components/CardsSection'
import Contact from '@/components/Contact'
import Image from 'next/image'
import Button from '@/components/Button'

// temp lists
import { nonProfits, programs } from '@/temp/listPlaceholders'

const NonProfit = () => {
	const router = useRouter()
	const { slug } = router.query

	const nonProfit = nonProfits.find(
		nonProfit => nonProfit.title.toLowerCase().replace(/\s+/g, '-') === slug
	)

	return (
		<>
			<Head>
				<title>{nonProfit && `Changements | ${nonProfit.title}`}</title>
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.svg' />
			</Head>
			<main>
				{/* NGO Detail */}
				<SectionContainer back={true} marginTop={true}>
					{nonProfit && (
						<>
							<div className={styles.ngoPhoto}>
								<Image
									src={nonProfit.photo}
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
								<h3>{nonProfit.title}</h3>
								<p>{nonProfit.text}</p>

								<div className='buttons-row'>
									<Button color='orange' url=''>
										Contact NGO
									</Button>

									<Button url=''>Visit Website</Button>
								</div>
							</div>

							<div className={styles.ngoData}>
								<div className={styles.ngoDataContainer}>
									<h5>Contact Info</h5>
									<p>
										12A: 9SDFKIUJ32
										<br />
										50G: JHSDF942389778DSF
										<br />
										30C: JK78DFSKJH
										<br />
										40D: SDF877834JHF87293
									</p>

									<p>Funded: 12/4/2016</p>
									<p>
										Operating Currency: INR
										<br />
										Donation Currencies: INR
									</p>
								</div>
								<div className={styles.ngoDataContainer}>
									<h5>NGO ID Info</h5>
									<p>Bhavana Chiranjay</p>
									<div>
										<p>+919686661097</p>
										<p>ushatrao@yahoo.com</p>
										<p>www.swakshatra.in</p>
									</div>
								</div>
							</div>

							<div className={styles.ngoData}>
								<div className={styles.ngoDataContainer}>
									<h5>Address</h5>
									<p>
										No 61, 3rd cross, Raghavendra colony, 5th Main, Chamarajpet,
										Bangalore 560018
									</p>
								</div>
								<div className={styles.ngoDataContainer}>
									<h5>Payment Info</h5>
									<p>
										12A: 9SDFKIUJ32
										<br />
										50G: JHSDF942389778DSF
										<br />
										30C: JK78DFSKJH
										<br />
										40D: SDF877834JHF87293
									</p>
								</div>
							</div>

							<div className={styles.ngoData}></div>
						</>
					)}
				</SectionContainer>

				{/* Programs Section */}
				<CardsSection
					title='Programs'
					content={programs}
					folder='portfolio/programs'
					buttonText='Learn More'
				/>

				{/* Contact */}
				<Contact />
			</main>
		</>
	)
}

export default NonProfit

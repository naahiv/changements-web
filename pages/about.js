// head element
import Head from 'next/head'

// styles
import styles from '@/styles/About.module.scss'

// components
import Contact from '@/components/Contact'
import PagesHero from '@/components/PagesHero'
import SectionTitle from '@/components/SectionTitle'
import CardsSection from '@/components/CardsSection'
import Image from 'next/image'

// hooks
import { useCollection } from '@/hooks/useCollection'

const about = () => {
	const { documents: programs } = useCollection('programs')

	return (
		<>
			<Head>
				<title>Changements | About Us</title>
				<meta
					name='description'
					content="We create a long term partnership between NGOs and groups of friends or family that are vested in joining hands to help NGOs achieve scales. 

                    Change-Enabler - You are one if you are interested in making the world a better place for everybody. We bring you curated non-profits that you can engage with and be part of the journey. 
                    
                    Change-Makers - If you are an NGO looking to connect with the right people to fulfill your dream, we'll bring them to you."
				/>
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.svg' />
			</Head>
			<main>
				{/* Hero */}
				<PagesHero imageUrl='/about-hero.jpg'>
					<h1>About Us</h1>
					<p style={{ fontSize: '2rem' }}>
						Bringing Together Change Enablers and Change Makers
					</p>
				</PagesHero>

				{/* About Text */}
				<section>
					<div className='sectionContainer'>
						<div className={styles.mission}>
							<SectionTitle>
								Our <span className='red'>Mission</span>
							</SectionTitle>

							<p>
								We create lasting partnerships between Change Enablers and
								Change Makers to achieve Impacts to scale.
							</p>
							<br />
							<p>
								<span className='orange' style={{ fontWeight: '700' }}>
									Change-Enabler:
								</span>{' '}
								You are a donor interested in making the world a better place.
								We bring you curated non-profits (NGOs) to begin your journey.
							</p>
							<br />

							<p>
								<span className='red' style={{ fontWeight: '700' }}>
									Change-Makers:
								</span>{' '}
								You are an NGO looking for the right people to fulfill your
								dream. We will bring you the donors to partner in your journey.
							</p>
						</div>
						<div className={styles.howItWorks}>
							<SectionTitle>
								How it <span className='red'>Works</span>
							</SectionTitle>
								<p><span className='orange' style={{ fontWeight: '700'}}>
									Change-Enabler:
								</span>{' '}</p> <br />
							<ol>
								<li>
									<span>
										Contact us and we will help you understand the impact journey.
									</span>
								</li>
								<li>
									<span>
										Gather like-minded friends/family - a potential Donor Pod.
									</span>
								</li>
								<li>
									<span>
										Join us with your group (Donor Pod) for an online Zoom call with the NGO partner.
									</span>
								</li>
								<li>
									<span>
										Make a collective pledge to partner with the NGO. Each member can pledge an amount and 												periodicity that suits him/her. Individual pledges are confidential.
									</span>
								</li>
								<li>
									<span>
										Fulfill your pledges with the NGO by end of year - don’t worry, we will remind you.

									</span>
								</li>
								<li>
									<span>
										Watch the impact you made together – through numbers, images, videos from the NGO.
									</span>
								</li>
								<li>
									<span>
										Visit your NGO and send us your stories (writing/video) for ChangeBuzz.
									</span>
								</li>
							</ol>
<br /><br />
<p><span className='red' style={{ fontWeight: '700'}}>
									Change-Maker:
								</span>{' '}</p>
<p>Contact us to add your NGO to our Portfolio. We will work with you in presenting your NGO to groups of donors and create lasting partnerships to scale impact.</p>
						</div>
					</div>
				</section>

				{/* Programs List */}
				{programs && (
					<CardsSection
						title='The Causes'
						content={programs}
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

export default about

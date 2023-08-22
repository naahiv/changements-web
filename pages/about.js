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
					<h1>About Changements</h1>
					<p>
						We are a group of professionals committed to making a lasting impact
						for a happier, healthier and just world.
					</p>
					<p>​A few cups of coffee can make all the difference.</p>
					<p>BE THE CHANGE YOU WANT TO SEE.</p>
				</PagesHero>

				{/* About Text */}
				<section>
					<div className='sectionContainer'>
						<div className={styles.mission}>
							<SectionTitle>
								Our <span className='red'>Mission</span>
							</SectionTitle>

							<p>
								We create a long term partnership between NGOs and groups of
								friends or family that are vested in joining hands to help NGOs
								achieve scales.
							</p>
							<br />
							<p>
								Change-Enabler : You are one if you are interested in making the
								world a better place for everybody. We bring you curated
								non-profits that you can engage with and be part of the journey.
							</p>
							<br />

							<p>
								Change-Makers : If you are an NGO looking to connect with the
								right people to fulfill your dream, we'll bring them to you.
							</p>
						</div>
						<div className={styles.howItWorks}>
							<SectionTitle>
								How it <span className='red'>Works</span>
							</SectionTitle>

							<ol>
								<li>
									<span>
										Create Donor Pod (group) with like minded friends/family.​
									</span>
								</li>
								<li>
									<span>
										Browse our NGO Portfolio and pick the one that appeals to
										your group.
									</span>
								</li>
								<li>
									<span>
										Each group member, pick the number of coffee cups you will
										pledge annually.
									</span>
								</li>
								<li>
									<span>
										Together reach the goal of a Project/Program of your chosen
										NGO. Individual pledges will remain confidential.
									</span>
								</li>
								<li>
									<span>
										You can pick the periodicity of your contributions and we
										will remind you when it is due.
									</span>
								</li>
								<li>
									<span>
										If you are in the vicinity, connect with your NGO, visit and
										write about your experience on our Blog or post a video for
										others.
									</span>
								</li>
							</ol>
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

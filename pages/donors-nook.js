// head element
import Head from 'next/head'

// styles
import styles from '@/styles/DonorsNook.module.scss'

// components
import PagesHero from '@/components/PagesHero'
import Contact from '@/components/Contact'
import Button from '@/components/Button'
import ImageTextColumns from '@/components/ImageTextColumns'
import SectionTitle from '@/components/SectionTitle'
import CardsSection from '@/components/CardsSection'

// temp lists
import { donorPods } from '@/temp/listPlaceholders'

const DonorsNook = () => {
	return (
		<>
			<Head>
				<title>Changements | Donor's Nook</title>
				<meta
					name='description'
					content='Celebrate the joy of collective giving with friends and family. 
                    Partner with dedicated NGOs(non-profits) and make the reach larger and the journey rewarding.
                    '
				/>
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.svg' />
			</Head>

			<main>
				{/* Hero */}
				<PagesHero imageUrl='/donors-nook-hero.jpg'>
					<h1>Donor's Nook</h1>
					<p>
						Celebrate the joy of collective giving with friends and family.
						Partner with dedicated NGOs(non-profits) and make the reach larger
						and the journey rewarding.
					</p>
					<p>Become a Changements Member to join.</p>
				</PagesHero>

				{/* Video Section */}
				<section>
					<div className='sectionContainer'>
						<div className={styles.video}>
							<video loop poster='/hero.jpg' controls>
								<source src='/donor-video.mp4' type='video/mp4' />
							</video>
						</div>
						<div className={styles.videoText}>
							<p>
								Create a Changements account, if you do not have one, to
								initiate or join Donor Pods.
							</p>

							<Button url='/register' color='orange'>
								Become a Donor
							</Button>
						</div>
					</div>
				</section>

				{/* Make a Pledge Section */}
				<ImageTextColumns
					direction='row-reverse'
					buttonText='Make a Pledge'
					url='/register'
					photoUrl='/indian-old-woman.jpg'
				>
					<SectionTitle color='black'>
						Make a <span className='red'>Pledge</span>
					</SectionTitle>
					<p>
						We carefully curate causes for donors to choose from. You can come
						together and contribute to your individual ability, with full
						confidentiality from each other. Pick the cause that works for you
						as a group. The collective is far stronger than the individual.​
					</p>
				</ImageTextColumns>

				{/* Donor Pods Section */}
				<CardsSection
					title='Our ChangeMakers'
					content={donorPods}
					folder='portfolio/donor-pods'
					buttonText='Learn More'
				/>

				{/* Contact */}
				<Contact />
			</main>
		</>
	)
}

export default DonorsNook

// Page Router
import { useRouter } from 'next/router'

// Head element
import Head from 'next/head'

// styles
import styles from '../Portfolio.module.scss'

// components
import SectionContainer from '@/components/SectionContainer'
import Contact from '@/components/Contact'
import Image from 'next/image'
import CardsSection from '@/components/CardsSection'

// temp lists
import { donorPods } from '@/temp/listPlaceholders'

const Program = () => {
	const router = useRouter()
	const { slug } = router.query

	const pod = donorPods.find(pod => pod.id === slug)

	return (
		<>
			<Head>
				<title>{pod && `Changements | ${pod.name}`}</title>
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.svg' />
			</Head>
			<main>
				{/* Pod Detail */}
				{pod && (
					<SectionContainer back={true} marginTop={true} title={pod.name}>
						<div className={styles.programPhoto}>
							<Image
								src={pod.photoUrl}
								fill
								quality={100}
								sizes='(max-width: 768px) 100vw, 768px'
								style={{ objectFit: 'cover' }}
								alt='Section Image'
								priority={true}
								as='img'
							/>
						</div>

						<div className={styles.programContent}>
							<div className={styles.programInfo}>
								<div className={styles.programHighlights}>
									<div>
										<h2 className='dark-orange'>40</h2>
										<p>Total Pledge</p>
									</div>
									<div>
										<h2 className='orange'>40</h2>
										<p>Fullfiled Pledge</p>
									</div>
									<div>
										<h2 className='red'>40</h2>
										<p>Total Pending Pledge</p>
									</div>
								</div>

								<p>
									Thank you for being true change makers in our communities that
									need it most. We can help you reach your full potential with
									committed partners. Thank you for being true change makers in
									our communities that need it most. We can help you reach your
									full potential with committed partners. Thank you for being
									true change makers in our communities that need it most. We
									can help you reach your full potential with committed
									partners. Thank you for being true change makers in our
									communities that need it most. We can help you reach your full
									potential with committed partners. Thank you for being true
									change makers in our communities that need it most. We can
									help you reach your full potential with committed partners.
								</p>
							</div>
							<div className={styles.programPods}></div>
						</div>
					</SectionContainer>
				)}

				{/* Other Pods Section */}
				{pod && (
					<CardsSection
						title='Programs'
						content={donorPods.filter(item => item !== pod)}
						folder='portfolio/donor-pods'
						buttonText='Learn More'
					/>
				)}

				{/* Contact */}
				<Contact />
			</main>
		</>
	)
}

export default Program

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

// temp lists
import { programs } from '@/temp/listPlaceholders'

const Program = () => {
	const router = useRouter()
	const { slug } = router.query

	const program = programs.find(
		program => program.title.toLowerCase().replace(/\s+/g, '-') === slug
	)

	return (
		<>
			<Head>
				<title>{program && `Changements | ${program.title}`}</title>
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.svg' />
			</Head>
			<main>
				{/* Program Detail */}
				<SectionContainer back={true} backUrl='/portfolio' marginTop={true}>
					{program && (
						<>
							<div className='titleContainer'>
								<h3 className={styles.programTitle}>{program.title}</h3>
							</div>
							<div className='sectionContainer'>
								<div className={styles.programPhoto}>
									<Image
										src={program.photo}
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
											Thank you for being true change makers in our communities
											that need it most. We can help you reach your full
											potential with committed partners. Thank you for being
											true change makers in our communities that need it most.
											We can help you reach your full potential with committed
											partners. Thank you for being true change makers in our
											communities that need it most. We can help you reach your
											full potential with committed partners. Thank you for
											being true change makers in our communities that need it
											most. We can help you reach your full potential with
											committed partners. Thank you for being true change makers
											in our communities that need it most. We can help you
											reach your full potential with committed partners.
										</p>
									</div>
									<div className={styles.programPods}></div>
								</div>
							</div>
						</>
					)}
				</SectionContainer>

				{/* Contact */}
				<Contact />
			</main>
		</>
	)
}

export default Program

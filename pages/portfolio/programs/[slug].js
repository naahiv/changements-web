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
import Button from '@/components/Button'

// temp lists
import { donorPods } from '@/temp/listPlaceholders'

// hooks
import { useCollection } from '@/hooks/useCollection'
import { useDocument } from '@/hooks/useDocument'

const Program = () => {
	const router = useRouter()
	const { slug } = router.query
	const { documents: programs } = useCollection('programs')

	const program = programs && programs.find(program => program.id === slug)

	return (
		<>
			<Head>
				<title>{program && `Changements | ${program.title}`}</title>
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.svg' />
			</Head>
			<main>
				{/* Program Detail */}
				<SectionContainer
					back={true}
					marginTop={true}
					title={program && program.title}
				>
					{program && (
						<>
							<div className={styles.programPhoto}>
								<Image
									src={program.photoUrl}
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
											<h2 className='dark-orange'>
												{program.fundsRequired}
												<span style={{ fontSize: '1rem' }}>
													{program.currency}
												</span>
											</h2>
											<p>Funds Required</p>
										</div>
										<div>
											<h2 className='orange'>
												{program.fundsFulfilled}
												<span style={{ fontSize: '1rem' }}>
													{program.currency}
												</span>
											</h2>
											<p>Funds Fulfilled</p>
										</div>
										<div>
											<h2 className='red'>
												{program.fundsRequired - program.fundsFulfilled}
												<span style={{ fontSize: '1rem' }}>
													{program.currency}
												</span>
											</h2>
											<p>Funds Fulfilled</p>
										</div>
									</div>

									<p>{program.description}</p>
								</div>
								{/* Donor Pods Section */}
								<h4>Our ChangeMakers</h4>
								<div className={styles.programPods}>
									{/* Donor Pods Section */}
									{donorPods.map((pod, index) => (
										<div key={index} className={styles.pod}>
											<div className={styles.podImage}>
												<Image
													src={pod.photoUrl}
													fill
													quality={100}
													sizes='(max-width: 768px) 100vw, 768px'
													style={{ objectFit: 'cover' }}
													alt='Pod Photo'
													priority={true}
													as='img'
												/>
											</div>
											<div>
												<p>{pod.subtitle}</p>
												<h5>{pod.title}</h5>
											</div>
											<Button
												url={`/portfolio/donor-pods/${pod.id}`}
												color='simple'
											>
												Learn More
											</Button>
										</div>
									))}
								</div>
							</div>
						</>
					)}
				</SectionContainer>

				{/* Other Programs Section */}
				{program && (
					<CardsSection
						title='Programs'
						content={programs.filter(item => item !== program)}
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

export default Program

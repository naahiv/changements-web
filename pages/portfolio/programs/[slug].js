// Page Router
import { useRouter } from 'next/router'

// Head element
import Head from 'next/head'

// styles
import styles from '@/styles/Portfolio.module.scss'

// components
import SectionContainer from '@/components/SectionContainer'
import Contact from '@/components/Contact'
import Image from 'next/image'
import CardsSection from '@/components/CardsSection'
import Button from '@/components/Button'
import PledgeForm from '@/components/forms/PledgeForm'

// hooks
import { useAuthContext } from '@/hooks/useAuthContext'
import { useCollection } from '@/hooks/useCollection'
import { useDocument } from '@/hooks/useDocument'
import { useState } from 'react'

const Program = () => {
	const router = useRouter()
	const { slug } = router.query
	const { documents: programs } = useCollection('programs')
	const { documents: pods } = useCollection('pods')
	const {documents: users} = useCollection('users')
	const { user } = useAuthContext()
	const [formOpen, setFormOpen] = useState(false)
	const { document } = useDocument('users', user.uid)

	const program = programs && programs.find(program => program.id === slug)

	const userType = user && users && users.find(usrDoc => usrDoc.id == user.uid).type

	// const langLocale = `en-${program.currency.slice(0,2)}`
	
	// function to compute h2 font-size for top numbers
	function computeH2Font(width) {
		let m = 0.00243902
		let b = -0.512195
		return m*width+b
	}

	return (
		<>
			<Head>
				<title>{program && `ImpactPlease | ${program.name}`}</title>
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.svg' />
			</Head>
			<main>
				{/* Program Detail */}
				{program && (
					<SectionContainer back={true} marginTop={true} title={program.name}>
						{/* Pledge Form */}
					{/* {document && <PledgeForm activeProgram={program} user={document} />} */}

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

							{/* Pledge Form */}
							{formOpen && program && (
								<PledgeForm 
									activeProgram={program}
									user={document}															 setOpenForm={setFormOpen}
								/>
							)}

							{/* Make a pledge button */}
							{userType && userType == 'donor' && (
								<div>
									<Button color='orange' buttonFunction={() => {setFormOpen(!formOpen)}}>
										{formOpen ? ('Close') : 'Make a Pledge'}
									</Button>
								</div>
							)}

							<div className={styles.programInfo}>
								<div className={styles.programHighlights}>
									<div>
										<h2 className='dark-orange'>
											{Number(program.fundsRequired)
												.toLocaleString(`en-${program.currency.slice(0,2)}`, {
													style: 'currency',
													currency: program.currency
												})
												.slice(0, -3)}
										</h2>
										<p>Annual Funds Required</p>
									</div>
									<div>
										<h2 className='orange'>
											{Number(program.fundsFulfilled)
												.toLocaleString(`en-${program.currency.slice(0,2)}`, {
													style: 'currency',
													currency: program.currency
												})
												.slice(0, -3)}
										</h2>
										<p>Funds Fulfilled</p>
									</div>
									<div>
										<h2 className='red'>
											{Number(program.fundsRequired - program.fundsFulfilled)
												.toLocaleString(`en-${program.currency.slice(0,2)}`, {
													style: 'currency',
													currency: program.currency
												})
												.slice(0, -3)}
										</h2>
										<p>Funds Seeking</p>
									</div>
								</div>

								{ /* <p>{program.description}</p> */ }
								<p dangerouslySetInnerHTML={{ __html: program.description }}></p>

								<div className='buttons-row'>
								{program.programInfoFile && (
									<a href={program.programInfoFile} target='_blank'><button>View Program Info</button></a>
								)}
								</div>
							</div>

							{/* Donor Pods Section */}
							<h4>Our Change Enablers</h4>
							<div className={styles.programPods}>
								{/* Donor Pods Section */}
								{pods
									.filter(item =>
										item.programs.some(
											item2 => item2.programName == program.name
										)
									)
									.map(pod => (
										<div key={pod.id} className={styles.pod}>
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
												<h5>{pod.name}</h5>
												<p>{pod.description}</p>
											</div>
											{/* <Button
											url={`/portfolio/donor-pods/${pod.id}`}
											color='simple'
										>
											Learn More
										</Button> */}
										</div>
									))}
							</div>
						</div>
					</SectionContainer>
				)}

				{/* Other Programs Section */}
				{program && (
					<CardsSection
						title='Programs'
						content={programs.filter(item => item !== program).filter(item => item.createdBy === program.createdBy)}
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

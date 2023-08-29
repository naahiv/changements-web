// styles
import styles from '@/styles/Portfolio.module.scss'

// components
import SectionContainer from '@/components/SectionContainer'
import Contact from '@/components/Contact'
import Image from 'next/image'

// hooks
import { useDocument } from '@/hooks/useDocument'
import { useCollection } from '@/hooks/useCollection'
import { useCurrency } from '@/hooks/useCurrency'

const PodSection = ({ pod, user, backFunction, setOpenEditForm }) => {
	const { document: activeUser } = user
		? useDocument('users', user.uid)
		: useDocument('users', '123')

	const { documents: programs } = useCollection('programs')

	// Currencies
	const { convert } = useCurrency()

	return (
		<SectionContainer
			back={true}
			marginTop={true}
			title={pod.name}
			backFunction={backFunction}
		>
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
					{activeUser && (
						<div className='buttons-row'>
							{pod.members.includes(activeUser.id) || (
								<button className='button-orange'>Join</button>
							)}

							{pod.owner == activeUser.name && (
								<>
									<button className='button-orange'>Invite</button>
									<button onClick={() => setOpenEditForm(true)}>
										Edit Pod
									</button>
								</>
							)}
						</div>
					)}
					{/* <div className={styles.programHighlights}>
						<div>
							<h2 className='dark-orange'>
								{activeUser
									? convert(
											podProgram.currency,
											activeUser.operatingCurrency,
											podProgram.fundsRequired
									  )
									: Number(podProgram.fundsRequired)
											.toLocaleString('en-US', {
												style: 'currency',
												currency: podProgram.currency
											})
											.slice(0, -3)}
							</h2>
							<p>Funds Required</p>
						</div>
						<div>
							<h2 className='orange'>
								{activeUser
									? convert(
											podProgram.currency,
											activeUser.operatingCurrency,
											podProgram.fundsFulfilled
									  )
									: Number(podProgram.fundsFulfilled)
											.toLocaleString('en-US', {
												style: 'currency',
												currency: podProgram.currency
											})
											.slice(0, -3)}
							</h2>
							<p>Funds Fullfiled</p>
						</div>
						<div>
							<h2 className='red'>
								{activeUser
									? convert(
											podProgram.currency,
											activeUser.operatingCurrency,
											podProgram.fundsRequired - podProgram.fundsFulfilled
									  )
									: Number(podProgram.fundsRequired - podProgram.fundsFulfilled)
											.toLocaleString('en-US', {
												style: 'currency',
												currency: podProgram.currency
											})
											.slice(0, -3)}
							</h2>
							<p>Funds Seeking</p>
						</div>
					</div> */}

					<p>{pod.description}</p>

					<div>
						{programs &&
							programs
								.filter(item =>
									pod.programs.some(item2 => item2.programName == item.name)
								)
								.map(program => (
									<div className={styles.dashboardPodProgram} key={program.id}>
										<p className={styles.ngoName}>NGO: {program.owner}</p>
										<h4>{program.name}</h4>

										<div className={styles.programHighlights}></div>
									</div>
								))}
					</div>
				</div>
				{/* <div className={styles.programPods}></div> */}
			</div>
		</SectionContainer>
	)
}

export default PodSection

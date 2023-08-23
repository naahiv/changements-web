// styles
import styles from '@/styles/Portfolio.module.scss'

// components
import SectionContainer from '@/components/SectionContainer'
import Contact from '@/components/Contact'
import Image from 'next/image'

// hooks
import { useDocument } from '@/hooks/useDocument'
import { useCurrency } from '@/hooks/useCurrency'

const PodSection = ({ pod, podProgram, user, backFunction }) => {
	const { document: activeUser } = user
		? useDocument('users', user.uid)
		: useDocument('users', '123')

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

			{podProgram && (
				<div className={styles.programContent}>
					<div className={styles.programInfo}>
						<div className='buttons-row'>
							<button>Join</button>
							<button>Join</button>
							<button>Join</button>
						</div>
						<div className={styles.programHighlights}>
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
										: Number(
												podProgram.fundsRequired - podProgram.fundsFulfilled
										  )
												.toLocaleString('en-US', {
													style: 'currency',
													currency: podProgram.currency
												})
												.slice(0, -3)}
								</h2>
								<p>Funds Seeking</p>
							</div>
						</div>

						<p>{pod.description}</p>
					</div>
					{/* <div className={styles.programPods}></div> */}
				</div>
			)}
		</SectionContainer>
	)
}

export default PodSection

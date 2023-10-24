// styles
import styles from '@/styles/Dashboard.module.scss'

// components
import Image from 'next/image'
import Button from '../Button'

// hooks
import { useCurrency } from '@/hooks/useCurrency'
import { useCollection } from '@/hooks/useCollection'
import { useDocument } from '@/hooks/useDocument'

const PodCard = ({ name, photoUrl, description, setActivePod, pod, user }) => {
	const { documents: programs } = useCollection('programs')

	// documents && console.log(documents.find(pledge => pledge.donorId == user.id))

	// Currencies
	const { convert } = useCurrency()

	return (
		<>
			<div className={styles.card}>
				<div className={styles.cardPhoto}>
					<Image
						src={photoUrl ? photoUrl : '/indian-girl.jpg'}
						fill
						quality={80}
						sizes='(max-width: 768px) 100vw, 768px'
						style={{ objectFit: 'cover' }}
						alt='Section Image'
						priority={true}
						as='img'
					/>
				</div>

				<div className={styles.cardContent}>
					<div onClick={setActivePod} className={styles.cardTitle}>
						<h4>{name}</h4>
					</div>

					{/* <div className={styles.pledges}>
							<div>
								<h4>
									{convert(
										podProgram.currency,
										user.operatingCurrency,
										podProgram.fundsRequired
									)}
								</h4>
								<p>
									Funds
									<br />
									Required
								</p>
							</div>
							<div>
								<h4>
									{convert(
										podProgram.currency,
										user.operatingCurrency,
										fundsFulfilled
									)}
								</h4>
								<p>
									Funds
									<br />
									Fullfiled
								</p>
							</div>
							<div>
								<h4>
									{convert(
										podProgram.currency,
										user.operatingCurrency,
										podProgram.fundsRequired - fundsFulfilled
									)}
								</h4>
								<p>
									Funds
									<br />
									Seeking
								</p>
							</div>
							<div>
								<h4>
									{pledge
										? Number(pledge.amount)
												.toLocaleString('en-US', {
													style: 'currency',
													currency: user.operatingCurrency
												})
												.slice(0, -3)
										: 0}
								</h4>
								<p>
									My Total
									<br />
									Pledge
								</p>
							</div>
							<div>
								<h4>
									{pledge
										? Number(pledge.fulfilledAmount)
												.toLocaleString('en-US', {
													style: 'currency',
													currency: user.operatingCurrency
												})
												.slice(0, -3)
										: 0}
								</h4>
								<p>
									My Fulfilled
									<br />
									Pledge
								</p>
							</div>
							<div>
								<h4>
									{pledge
										? Number(pledge.amount - pledge.fulfilledAmount)
												.toLocaleString('en-US', {
													style: 'currency',
													currency: user.operatingCurrency
												})
												.slice(0, -3)
										: 0}
								</h4>
								<p>
									My Pending
									<br />
									Pledge
								</p>
							</div>
						</div> */}

					<p style={{ marginBottom: '1rem' }}>{description}</p>

					<div className='buttons-row'>
						{pod.ownerId == user.id && (
							<Button color='orange' buttonFunction={setActivePod}>
								Invite Members
							</Button>
						)}

						<Button color='orange' buttonFunction={setActivePod}>
							Make a Pledge
						</Button>
					</div>
				</div>
			</div>
		</>
	)
}

export default PodCard

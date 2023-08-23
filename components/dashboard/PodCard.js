// styles
import styles from '@/styles/Dashboard.module.scss'

// components
import Image from 'next/image'

// hooks
import { useCurrency } from '@/hooks/useCurrency'
import { useCollection } from '@/hooks/useCollection'
import { useDocument } from '@/hooks/useDocument'

const PodCard = ({ name, photoUrl, user, programId, setActivePod }) => {
	const { documents: programs } = useCollection('programs')
	const podProgram = programs && programs.find(item => item.id == programId)
	const { documents: pledges } = useCollection(`programs/${programId}/pledges`)

	// documents && console.log(documents.find(pledge => pledge.donorId == user.id))

	// Currencies
	const { convert } = useCurrency()

	const pledge = pledges && pledges.find(pledge => pledge.donorId == user.id)

	console.log(podProgram)

	const fundsFulfilled =
		pledges &&
		pledges.reduce(
			(accumulator, pledge) => accumulator + pledge.fulfilledAmount,
			0
		)

	return (
		<>
			{podProgram && (
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

						<div className={styles.pledges}>
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
						</div>
					</div>
				</div>
			)}
		</>
	)
}

export default PodCard

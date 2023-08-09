// styles
import styles from '@/styles/Dashboard.module.scss'

// components
import Image from 'next/image'

// hooks
import { useCurrency } from '@/hooks/useCurrency'

const DonorPledgeCard = ({
	name,
	photoUrl,
	fundsRequired,
	fundsFulfilled,
	pledges,
	user,
	currency
}) => {
	// Currencies
	const { convert } = useCurrency()

	const pledge = pledges.find(pledge => pledge.donorId == user.id)

	return (
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
				<div className={styles.cardTitle}>
					<h4>{name}</h4>
				</div>

				<div className={styles.pledges}>
					<div>
						<h4>{convert(currency, user.operatingCurrency, fundsRequired)}</h4>
						<p>
							Funds
							<br />
							Required
						</p>
					</div>
					<div>
						<h4>{convert(currency, user.operatingCurrency, fundsFulfilled)}</h4>
						<p>
							Funds
							<br />
							Fullfiled
						</p>
					</div>
					<div>
						<h4>
							{convert(
								currency,
								user.operatingCurrency,
								fundsRequired - fundsFulfilled
							)}
						</h4>
						<p>
							Funds
							<br />
							Seeking
						</p>
					</div>
					<div>
						<h4>{convert(currency, user.operatingCurrency, pledge.amount)}</h4>
						<p>
							My Total
							<br />
							Pledge
						</p>
					</div>
					<div>
						<h4>
							{convert(
								currency,
								user.operatingCurrency,
								pledge.fulfilledAmount
							)}
						</h4>
						<p>
							My Fulfilled
							<br />
							Pledge
						</p>
					</div>
					<div>
						<h4>
							{convert(
								currency,
								user.operatingCurrency,
								pledge.amount - pledge.fulfilledAmount
							)}
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
	)
}

export default DonorPledgeCard

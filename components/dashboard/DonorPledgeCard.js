// styles
import styles from '@/styles/Dashboard.module.scss'

// components
import Image from 'next/image'

// hooks
import { useCurrency } from '@/hooks/useCurrency'
import { useCollection } from '@/hooks/useCollection'
import { useDocument } from '@/hooks/useDocument'
import { useRouter } from 'next/router'

const DonorPledgeCard = ({
	name,
	photoUrl,
	fundsRequired,
	// fundsFulfilled,
	pledges,
	user,
	currency,
	id
}) => {

	// const { documents: programs } = useCollection('programs')
	// const pledges = (programs && programs.find((prg) => prg.id == id).pledges

	// const ngoId = programs && programs.find(program => program.id === id).createdBy
	const router = useRouter()
	const toProgramPage = () => {
		// router.push(`/${ngoId}/${id}`)
		router.push(`/portfolio/programs/${id}`)
	}


	// Currencies
	const { convert, convertUnformatted, format } = useCurrency()

	const pledge = pledges && pledges.find(pledge => pledge.donorId == user.id)

	const fundsFulfilled = pledges && pledges.reduce((acc, pledge) => 
		acc + convertUnformatted(pledge.currency, user.operatingCurrency, pledge.fulfilledAmount)
		, 0)


	return (
		<>
			{pledge && (
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
							<h4 onClick={toProgramPage}>{name}</h4>
						</div>

						<div className={styles.pledges}>
							<div>
								<h4>
									{convert(currency, user.operatingCurrency, fundsRequired)}
								</h4>
								<p>
									Funds
									<br />
									Required
								</p>
							</div>
							<div>
								<h4>
									{format(user.operatingCurrency, fundsFulfilled)}
								</h4>
								<p>
									Funds
									<br />
									Fullfiled
								</p>
							</div>
							<div>
								<h4>
									{format(user.operatingCurrency, convertUnformatted(
										currency,
										user.operatingCurrency,
										fundsRequired) - fundsFulfilled)}
								</h4>
								<p>
									Funds
									<br />
									Seeking
								</p>
							</div>
							<div>
								<h4>
									{convert(pledge.currency, user.operatingCurrency, pledge.amount)}
								</h4>
								<p>
									My Total
									<br />
									Pledge
								</p>
							</div>
							<div>
								<h4>
									{convert(pledge.currency, user.operatingCurrency, pledge.fulfilledAmount)}
								</h4>
								<p>
									My Fulfilled
									<br />
									Pledge
								</p>
							</div>
							<div>
								<h4>
									{convert(pledge.currency, user.operatingCurrency, pledge.amount - pledge.fulfilledAmount)}
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

export default DonorPledgeCard

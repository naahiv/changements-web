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
								<h3>
									{convert(pledge.currency, user.operatingCurrency, pledge.amount)}
								</h3>
								<p>
									My<br />Pledge
								</p>
							</div>
							<div>
								<h3>
									{convert(pledge.currency, user.operatingCurrency, pledge.fulfilledAmount)}
								</h3>
								<p>
									Fulfilled<br />Amt
								</p>
							</div>
							<div>
								<h3>
									{convert(pledge.currency, user.operatingCurrency, pledge.amount - pledge.fulfilledAmount)}
								</h3>
								<p>
									Pending<br />Amt
								</p>
							</div>
							<div style={{borderRight: '1px solid #360c25'}}> </div>
							<div>
								<h3 style={{color: 'rgb(198 0 0)'}}>
									{format(user.operatingCurrency, convertUnformatted(
										currency,
										user.operatingCurrency,
										fundsRequired) - fundsFulfilled)}
								</h3>
								<p>
									Funds<br />Seeking
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

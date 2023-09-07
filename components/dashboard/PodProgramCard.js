// styles
import styles from '@/styles/Portfolio.module.scss'

// hooks
import { useCurrency } from '@/hooks/useCurrency'
import { useCollection } from '@/hooks/useCollection'

const PodProgramCard = ({
	program,
	activeUser,
	openPledgeForm,
	pod
	// members
}) => {
	// Currencies
	const { convert } = useCurrency()

	const { documents: pledges } = useCollection(`programs/${program.id}/pledges`)

	const pledge =
		pledges && pledges.find(pledge => pledge.donorId == activeUser.id)

	// Calculating all fulfilled pledges from all donors to get a total funds fullfiled
	const fundsFulfilled =
		pledges &&
		pledges
			.filter(({ donorId }) => pod.members.includes(donorId))
			.reduce((accumulator, pledge) => accumulator + pledge.fulfilledAmount, 0)

	return (
		<div className={styles.dashboardPodProgram} key={program.id}>
			<div className={styles.cardTitle}>
				<div>
					<p className={styles.ngoName}>NGO: {program.owner}</p>
					<h4 className={styles.programName}>{program.name}</h4>
				</div>

				{pod.members.includes(activeUser.id) && (
					<button
						onClick={() => openPledgeForm(program)}
						className='button-orange'
					>
						Make a Pledge
					</button>
				)}
			</div>

			<div className={styles.highlightsContainer}>
				<div className={styles.programHighlights}>
					<div>
						<h5>
							{pledge
								? convert(
										pledge.donorCurrency,
										activeUser.operatingCurrency,
										pledge.amount
								  )
								: 0}
						</h5>
						<p>My Total Pledge</p>
					</div>
					<div>
						<h5>
							{pledge
								? convert(
										pledge.donorCurrency,
										activeUser.operatingCurrency,
										pledge.fulfilledAmount
								  )
								: 0}
						</h5>
						<p>My Fulfilled Pledge</p>
					</div>
					<div>
						<h5>
							{pledge
								? convert(
										pledge.donorCurrency,
										activeUser.operatingCurrency,
										pledge.amount - pledge.fulfilledAmount
								  )
								: 0}
						</h5>
						<p>My Pending Pledge</p>
					</div>
				</div>
				<div className={styles.programHighlights}>
					<div>
						<h5>
							{convert(
								program.currency,
								activeUser.operatingCurrency,
								program.fundsRequired
							)}
						</h5>
						<p>Funds Required</p>
					</div>
					<div>
						<h5>
							{pledges &&
								convert(
									program.currency,
									activeUser.operatingCurrency,
									fundsFulfilled
								)}
						</h5>
						<p>Pod Funds Fullfiled</p>
					</div>

					<div>
						<h5>
							{pledges
								? Number(program.fundsRequired - fundsFulfilled)
										.toLocaleString('en-US', {
											style: 'currency',
											currency: activeUser.operatingCurrency
										})
										.slice(0, -3)
								: 0}
						</h5>
						<p>Pod Pending Pledge</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default PodProgramCard

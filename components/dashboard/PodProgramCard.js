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

			<div className={styles.programHighlights}>
				<div>
					<h5>
						{convert(
							program.currency,
							activeUser.operatingCurrency,
							program.fundsRequired
						)}
					</h5>
					<p>
						Funds
						<br />
						Required
					</p>
				</div>
				<div>
					<h5>
						{convert(
							program.currency,
							activeUser.operatingCurrency,
							program.fundsFulfilled
						)}
					</h5>
					<p>
						Funds
						<br />
						Fullfiled
					</p>
				</div>
				<div>
					<h5>
						{convert(
							program.currency,
							activeUser.operatingCurrency,
							program.fundsRequired - program.fundsFulfilled
						)}
					</h5>
					<p>
						Funds
						<br />
						Seeking
					</p>
				</div>
				<div>
					<h5>
						{pledge
							? Number(pledge.amount)
									.toLocaleString('en-US', {
										style: 'currency',
										currency: activeUser.operatingCurrency
									})
									.slice(0, -3)
							: 0}
					</h5>
					<p>
						My Total
						<br />
						Pledge
					</p>
				</div>
				<div>
					<h5>
						{pledge
							? Number(pledge.fulfilledAmount)
									.toLocaleString('en-US', {
										style: 'currency',
										currency: activeUser.operatingCurrency
									})
									.slice(0, -3)
							: 0}
					</h5>
					<p>
						My Fulfilled
						<br />
						Pledge
					</p>
				</div>
				<div>
					<h5>
						{pledge
							? Number(pledge.amount - pledge.fulfilledAmount)
									.toLocaleString('en-US', {
										style: 'currency',
										currency: activeUser.operatingCurrency
									})
									.slice(0, -3)
							: 0}
					</h5>
					<p>
						My Pending
						<br />
						Pledge
					</p>
				</div>
			</div>
		</div>
	)
}

export default PodProgramCard

// styles
import styles from '@/styles/Dashboard.module.scss'

// components
import SectionContainer from '../SectionContainer'
import SectionTitle from '../SectionTitle'
import Card from '../Card'
import PledgeForm from '../forms/PledgeForm'
import DonorPledgeCard from './DonorPledgeCard'
import PodCard from './PodCard'
import CreatePodForm from '../forms/CreatePodForm'
import EditPodForm from '../forms/EditPodForm'
import PodSection from '../PodSection'

// hooks
import { useState } from 'react'
import { useCollection } from '@/hooks/useCollection'
import { useAuthContext } from '@/hooks/useAuthContext'

const PledgeEditor = ({ user }) => {
	const [openForm, setOpenForm] = useState(false)

	// firebase
	const { documents: programs } = useCollection('programs')
	const { documents: pods } = useCollection('pods')
	const { user: activeUser } = useAuthContext()

	// Open Pledge form
	const openPledgeForm = program => {
		setActiveProgram(program)
		setOpenForm(true)
	}

	return (
		<section>
			{/* Make a Pledge Form */}
			{openForm && (
				<SectionContainer
					marginTop={true}
					back={true}
					backFunction={() => setOpenForm(false)}
					title='Make a Pledge'
				>
				{/*<PledgeForm
						activeProgram={activeProgram}
						user={user}
						setOpenForm={setOpenForm}
						setActiveProgram={setActiveProgram}
						setOpenSearch={setOpenSearch}
					/>*/}
				</SectionContainer>
			)}

			{/* My Pledges */}
			<SectionContainer>
				<div className={styles.dashboardHeader}>
					<SectionTitle>Pledges</SectionTitle>
				</div>
				<div className={styles.cardsContainer}>
					{programs && 
						programs
							.filter(program =>
								program.pledges.find(pledge => pledge.donorId == user.id)
							)
							.map(filteredProgram => (
								<DonorPledgeCard
									key={filteredProgram.id}
									id={filteredProgram.id}
									name={filteredProgram.name}
									photoUrl={filteredProgram.photoUrl}
									fundsRequired={filteredProgram.fundsRequired}
									fundsFulfilled={filteredProgram.fundsFulfilled}
									pledges={filteredProgram.pledges}
									user={user}
									currency={filteredProgram.currency}
								/>
							))}
				</div>
			</SectionContainer>

		</section>
	)
}

export default PledgeEditor

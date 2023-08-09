// styles
import styles from '@/styles/Dashboard.module.scss'

// components
import SectionContainer from '../SectionContainer'
import SectionTitle from '../SectionTitle'
import Card from '../Card'
import DonorProgram from './DonorProgram'
import Button from '../Button'
import PledgeForm from '../forms/PledgeForm'
import DonorPledgeCard from './DonorPledgeCard'

// hooks
import { useState } from 'react'
import { useCollection } from '@/hooks/useCollection'

const DonorDashboard = ({ user }) => {
	const [openSearch, setOpenSearch] = useState(false)
	const [openForm, setOpenForm] = useState(false)
	const [searchFilter, setSearchFilter] = useState('')
	const [activeProgram, setActiveProgram] = useState(null)

	// firebase
	const { documents: programs } = useCollection('programs')

	return (
		<section>
			{/* My Pledges */}
			{!openSearch && (
				<SectionContainer marginTop={true}>
					<div className={styles.dashboardHeader}>
						<SectionTitle>My Pledges</SectionTitle>
						<button
							className='button-orange'
							onClick={() => setOpenSearch(true)}
						>
							Make a Pledge
						</button>
					</div>
					<div className={styles.cardsContainer}>
						{programs &&
							programs
								.filter(program =>
									program.pledges.find(pledge => pledge.donorId == user.id)
								)
								.map((filteredProgram, index) => (
									<DonorPledgeCard
										key={index}
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
			)}

			{/* Search */}
			{openSearch && !activeProgram && (
				<SectionContainer
					marginTop={true}
					back={true}
					backFunction={() => setOpenSearch(false)}
				>
					<div className={styles.dashboardHeader}>
						<SectionTitle>Search Programs</SectionTitle>
						<input
							type='text'
							placeholder='Search'
							value={searchFilter}
							onChange={e => setSearchFilter(e.target.value)}
						/>
					</div>

					{programs &&
						programs
							.filter(program =>
								program.name.toLowerCase().includes(searchFilter.toLowerCase())
							)
							.map(program => (
								<Card
									key={program.id}
									id={program.id}
									name={program.name}
									photo={program.photoUrl}
									subtitle={program.owner}
									text={program.description}
									buttonText='Learn More'
									buttonFunction={() => setActiveProgram(program)}
								/>
							))}
				</SectionContainer>
			)}

			{/* Open Program */}
			{activeProgram && !openForm && (
				<SectionContainer
					marginTop={true}
					back={true}
					backFunction={() => setActiveProgram(null)}
				>
					<div className={styles.dashboardHeader}>
						<SectionTitle>{activeProgram.name}</SectionTitle>
						<div className='buttons-row'>
							<button
								className='button-orange'
								onClick={() => setOpenForm(true)}
							>
								Make a Pledge
							</button>
							<Button
								url={`portfolio/non-profits/$}${activeProgram.createdBy}`}
							>
								Visit NGO Page
							</Button>
						</div>
					</div>
					<DonorProgram activeProgram={activeProgram} user={user} />
				</SectionContainer>
			)}

			{/* Make a Pledge Form */}
			{openForm && (
				<SectionContainer
					marginTop={true}
					back={true}
					backFunction={() => setOpenForm(false)}
					title='Make a Pledge'
				>
					<PledgeForm
						activeProgram={activeProgram}
						user={user}
						setOpenForm={setOpenForm}
						setActiveProgram={setActiveProgram}
						setOpenSearch={setOpenSearch}
					/>
				</SectionContainer>
			)}
		</section>
	)
}

export default DonorDashboard

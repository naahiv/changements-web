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

const DonorDashboard = ({ user }) => {
	const [openSearch, setOpenSearch] = useState(false)
	const [openPodsSearch, setOpenPodsSearch] = useState(false)
	const [openForm, setOpenForm] = useState(false)
	const [openEditForm, setOpenEditForm] = useState(false)
	const [openPodForm, setOpenPodForm] = useState(false)
	const [searchFilter, setSearchFilter] = useState('')
	const [searchPodsFilter, setSearchPodsFilter] = useState('')
	const [activeProgram, setActiveProgram] = useState(null)
	const [activePod, setActivePod] = useState(null)

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
			{/* My Pods */}
			{!openPodForm && !openEditForm && !openPodsSearch && !activePod && (
				<SectionContainer marginTop={true}>
					<div className={styles.dashboardHeader}>
						<SectionTitle>My Pods</SectionTitle>
						<div className='buttons-row'>
							<button
								className='button-orange'
								onClick={() => setOpenPodForm(true)}
							>
								Create a Pod
							</button>
							{/* <button onClick={() => setOpenPodsSearch(true)}>
								Join a Pod
							</button> */}
						</div>
					</div>
					<div className={styles.cardsContainer}>
						{pods &&
							pods
								.filter(item => item.members.includes(user.id))
								.map(pod => (
									<PodCard
										key={pod.id}
										name={pod.name}
										programs={pod.programs}
										description={pod.description}
										user={user}
										id={pod.id}
										photoUrl={pod.photoUrl}
										setActivePod={() => setActivePod(pod)}
									/>
								))}
					</div>
				</SectionContainer>
			)}

			{/* My Invites */}
			{!openPodForm && !openEditForm && !openPodsSearch && !activePod && (
				<SectionContainer marginTop={true}>
					<div className={styles.dashboardHeader}>
						<SectionTitle>My Invites</SectionTitle>
					</div>
					<div className={styles.cardsContainer}>
						{pods &&
							pods
								.filter(item => item.invites.includes(user.email))
								.map(pod => (
									<PodCard
										key={pod.id}
										name={pod.name}
										programs={pod.programs}
										description={pod.description}
										user={user}
										id={pod.id}
										photoUrl={pod.photoUrl}
										setActivePod={() => setActivePod(pod)}
									/>
								))}
					</div>
				</SectionContainer>
			)}

			{/* Create a Pod Form */}
			{openPodForm && (
				<SectionContainer
					marginTop={true}
					back={true}
					backFunction={() => setOpenPodForm(false)}
					title='Create a Pod'
				>
					<CreatePodForm setOpenPodForm={setOpenPodForm} />
				</SectionContainer>
			)}

			{/* Edit a Pod Form */}

			{openEditForm && (
				<SectionContainer
					marginTop={true}
					back={true}
					backFunction={() => setOpenEditForm(false)}
					title='Edit Pod'
				>
					<EditPodForm setOpenPodForm={setOpenEditForm} activePod={activePod} />
				</SectionContainer>
			)}

			{/* Search Pods */}
			{openPodsSearch && !activePod && (
				<SectionContainer
					marginTop={true}
					back={true}
					backFunction={() => setOpenPodsSearch(false)}
				>
					<div className={styles.dashboardHeader}>
						<SectionTitle>Search Pods</SectionTitle>
						<input
							type='text'
							placeholder='Search'
							value={searchPodsFilter}
							onChange={e => setSearchPodsFilter(e.target.value)}
						/>
					</div>

					{pods &&
						pods
							.filter(pod =>
								pod.name.toLowerCase().includes(searchPodsFilter.toLowerCase())
							)
							.map(pod => (
								<Card
									key={pod.id}
									id={pod.id}
									name={pod.name}
									photo={pod.photoUrl}
									subtitle={pod.owner}
									text={pod.description}
									buttonText='Learn More'
									buttonFunction={() => setActivePod(pod)}
								/>
							))}
				</SectionContainer>
			)}

			{/* Open Pod */}
			{activePod && !openEditForm && !openForm && (
				<PodSection
					pod={activePod}
					user={activeUser}
					backFunction={() => setActivePod(false)}
					setOpenEditForm={setOpenEditForm}
					openPledgeForm={openPledgeForm}
					setActivePod={setActivePod}
					setOpenPodsSearch={setOpenPodsSearch}
				/>
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

			{/* My Pledges */}
			{!openSearch && (
				<SectionContainer marginTop={true}>
					<div className={styles.dashboardHeader}>
						<SectionTitle>My Pledges</SectionTitle>
						{/* <button
							className='button-orange'
							onClick={() => setOpenSearch(true)}
						>
							Make a Pledge
						</button> */}
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
			{/* {activeProgram && !openForm && (
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
							<Button url={`/portfolio/non-profits/${activeProgram.createdBy}`}>
								Visit NGO Page
							</Button>
						</div>
					</div>
					<DonorProgram activeProgram={activeProgram} user={user} />
				</SectionContainer>
			)} */}
		</section>
	)
}

export default DonorDashboard

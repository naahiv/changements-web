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
import ProfileUI from '../profile/ProfileUI'
import PodCard from './PodCard'
import CreatePodForm from '../forms/CreatePodForm'
import PodSection from '../PodSection'

// hooks
import { useState } from 'react'
import { useCollection } from '@/hooks/useCollection'
import { useAuthContext } from '@/hooks/useAuthContext'

const DonorDashboard = ({ user }) => {
	const [openSearch, setOpenSearch] = useState(false)
	const [openPodsSearch, setOpenPodsSearch] = useState(false)
	const [openForm, setOpenForm] = useState(false)
	const [openPodForm, setOpenPodForm] = useState(false)
	const [searchFilter, setSearchFilter] = useState('')
	const [searchPodsFilter, setSearchPodsFilter] = useState('')
	const [activeProgram, setActiveProgram] = useState(null)
	const [activePod, setActivePod] = useState(null)

	// firebase
	const { documents: programs } = useCollection('programs')
	const { documents: pods } = useCollection('pods')
	const { user: activeUser } = useAuthContext()

	const podProgram =
		programs &&
		activePod &&
		programs.find(item => item.id == activePod.programId)

	return (
		<section>
			{/* Profile Info */}
			<ProfileUI />

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
							<Button url={`/portfolio/non-profits/${activeProgram.createdBy}`}>
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

			{/* My Pods */}
			{!openPodForm && !openPodsSearch && !activePod && (
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
							<button onClick={() => setOpenPodsSearch(true)}>
								Join a Pod
							</button>
						</div>
					</div>
					<div className={styles.cardsContainer}>
						{pods &&
							pods
								.filter(pod => pod.createdBy == user.id)
								.map(pod => (
									<PodCard
										key={pod.id}
										name={pod.name}
										programName={pod.programName}
										programId={pod.programId}
										user={user}
										id={pod.id}
										photoUrl={pod.photoUrl}
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
			{activePod && (
				<PodSection
					pod={activePod}
					podProgram={podProgram}
					user={activeUser}
					backFunction={() => setActivePod(false)}
				/>
			)}
		</section>
	)
}

export default DonorDashboard

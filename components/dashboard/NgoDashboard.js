// styles
import styles from '@/styles/Dashboard.module.scss'

// components
import SectionContainer from '../SectionContainer'
import NgoProgramCard from './NgoProgramCard'
import CreateProgramForm from '../forms/CreateProgramForm'
import EditProgramForm from '../forms/EditProgramForm'
import SectionTitle from '../SectionTitle'
import NgoProgram from './NgoProgram'
import DonorProfile from './DonorProfile'
import ProfileUI from '../profile/ProfileUI'

// hooks
import { useState } from 'react'
import { useCollection } from '@/hooks/useCollection'
import { useFirestore } from '@/hooks/useFirestore'

const NgoDashboard = ({ user, adminFlag }) => {
	const { deleteDocument } = useFirestore('programs')
	const [openForm, setOpenForm] = useState(false)
	const [openProgram, setOpenProgram] = useState(false)
	const [openDonor, setOpenDonor] = useState(false)
	const [formType, setFormType] = useState('create')
	const [activeProgram, setActiveProgram] = useState()
	const [activeDonor, setActiveDonor] = useState()

	// firebase
	const { documents: programs } = useCollection('programs', [
		'createdBy',
		'==',
		user.id
	])

	// create form
	const openCreateForm = () => {
		setOpenForm(true)
		setFormType('create')
	}

	// edit form
	const openEditForm = id => {
		setOpenForm(true)
		setFormType('edit')
		setActiveProgram(id)
		setOpenProgram(false)
	}

	// open program
	const showProgram = id => {
		setOpenProgram(true)
		setActiveProgram(id)
	}

	// delete open program
	const deleteOpenProgram = () => {
		deleteDocument(activeProgram.id)
		setOpenProgram(false)
	}

	// show Donor
	const showDonor = donorId => {
		setActiveDonor(donorId)
		setOpenDonor(true)
	}

	return (
		<section>
			{/* Profile Info */}
			{ !adminFlag && (<ProfileUI />) }

			{!openForm && !openProgram && (
				<SectionContainer marginTop={true}>
					<div className={styles.dashboardHeader}>
						<SectionTitle>My Programs</SectionTitle>
						<button className='button-orange' onClick={openCreateForm}>
							New Program
						</button>
					</div>

					<div className={styles.cardsContainer}>
						{programs &&
							programs.map(program => (
								<NgoProgramCard
									key={program.id}
									id={program.id}
									name={program.name}
									fundsRequired={program.fundsRequired}
									// fundsFulfilled={program.fundsFulfilled}
									fundsSeeking={program.fundsSeeking}
									currency={program.currency}
									description={program.description}
									user={user}
									photoUrl={program.photoUrl}
									openEditForm={openEditForm}
									showProgram={showProgram}
								/>
							))}
					</div>
				</SectionContainer>
			)}

			{openProgram && !openDonor && (
				<SectionContainer marginTop={true}>
					<NgoProgram
						setOpenProgram={setOpenProgram}
						activeProgram={activeProgram}
						openEditForm={openEditForm}
						deleteOpenProgram={deleteOpenProgram}
						user={user}
						showDonor={showDonor}
					/>
				</SectionContainer>
			)}

			{openForm && (
				<SectionContainer
					marginTop={true}
					title={formType == 'create' ? 'Create New Program' : 'Edit Program'}
				>
					{formType == 'create' && (
						<CreateProgramForm setOpenForm={setOpenForm} />
					)}

					{formType == 'edit' && (
						<EditProgramForm
							setOpenForm={setOpenForm}
							activeProgram={activeProgram}
							adminFlag={adminFlag}
						/>
					)}
				</SectionContainer>
			)}

			{openDonor && activeDonor && (
				<SectionContainer marginTop={true} noGap={true}>
					<button
						style={{ gridColumn: 'span 12' }}
						className='button-back'
						onClick={() => setOpenDonor(false)}
					>
						<div className='button-arrow'></div>
						Back
					</button>
					<DonorProfile
						activeDonor={activeDonor}
						activeProgram={activeProgram}
						setOpenDonor={setOpenDonor}
						user={user}
					/>
				</SectionContainer>
			)}
		</section>
	)
}

export default NgoDashboard

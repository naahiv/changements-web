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

const AdminDashboard = ({ user }) => {
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

	return (
		<section>
				<SectionContainer marginTop={true}>
					<div className={styles.dashboardHeader}>
						<SectionTitle>Administrator Test</SectionTitle>
					</div>
					<div className={styles.cardsContainer}>
						<p>Welcome to the administrator dashboard.</p>
					</div>

				</SectionContainer>

				<SectionContainer marginTop={true}>
					<div className={styles.dashboardHeader}>
						<SectionTitle>Section Two</SectionTitle>
					</div>
				</SectionContainer>
		</section>
	)
}

export default AdminDashboard

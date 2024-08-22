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
import CardsSection from '@/components/CardsSection'
import Button from '@/components/Button.js'
import AddChangeEnablerForm from '@/components/forms/AddChangeEnablerForm.js'

// hooks
import { useState } from 'react'
import { useCollection } from '@/hooks/useCollection'
import { useFirestore } from '@/hooks/useFirestore'

const AdminDashboard = ({ user }) => {
	const { deleteDocument } = useFirestore('programs')
	const { documents: users} = useCollection('users')
	const { documents: pods } = useCollection('pods')
	const { documents: podcasts } = useCollection('podcasts')

	const [userFormOpen, setUserFormOpen] = useState(false)
	const [podFormOpen, setPodFormOpen] = useState(false)

	return (
		<section>
				<SectionContainer>
				</SectionContainer>

				{users && (
					<CardsSection
						title='Manage Users'
						content={users.filter(user => user.type != 'admin')}
						folder='dashboard/user'
						buttonText='Learn More'
						adminFlag={true}
					/>
				)}

				{pods && (
				<div className='sectionContainer'>
					<div className={styles.dashboardHeader}>
						<SectionTitle>Manage Change Enablers</SectionTitle>
						<button className='button-orange' onClick={e => setPodFormOpen(!podFormOpen)}>{podFormOpen ? 'Close form' : 'Add Change Enabler'}</button>
					</div>

				{podFormOpen && (
					<AddChangeEnablerForm setPodFormOpen={setPodFormOpen} />
				)}


				{!podFormOpen && (
					<CardsSection
							content={pods}
							folder='dashboard/pod'
							buttonText='Learn More'
							adminFlag={true}
					/>
				)}

				</div>
				)}

		{podcasts && (
			<CardsSection
				content={podcasts}
				folder='dashboard/pod'
				buttonText='Learn More'
				adminFlag={true}
				title='Podcasts'
			/>
		)}
		</section>
	)
}

export default AdminDashboard

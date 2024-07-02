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

// hooks
import { useState } from 'react'
import { useCollection } from '@/hooks/useCollection'
import { useFirestore } from '@/hooks/useFirestore'

const AdminDashboard = ({ user }) => {
	const { deleteDocument } = useFirestore('programs')
	const { documents: users} = useCollection('users')
	const { documents: pods } = useCollection('pods')

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
					<CardsSection
						title='Manage Pods'
						content={pods}
						folder='dashboard/pod'
						buttonText='Learn More'
						adminFlag={true}
					/>
				)}
		</section>
	)
}

export default AdminDashboard

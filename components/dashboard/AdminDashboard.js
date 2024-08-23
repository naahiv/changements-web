// styles
import styles from '@/styles/Dashboard.module.scss'

// components
import ButtonCardSection from '@/components/ButtonCardSection'
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
import AddPodcastForm from '@/components/forms/AddPodcastForm'

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
	const [podcastFormOpen, setPodcastFormOpen] = useState(false)

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
					<ButtonCardSection
						title='Manage Change Enablers'
						content={pods}
						folder='dashboard/pod'
						buttonText='Learn More'
						adminFlag={true}
						titleButton={!podFormOpen ? 'Add Change Enabler' : 'Close form'}
						formOpen={podFormOpen}
						titleButtonAction={e => setPodFormOpen(!podFormOpen)}
					>
						<AddChangeEnablerForm setPodFormOpen={setPodFormOpen} />
					</ButtonCardSection>
				)}


		{podcasts && (
			<ButtonCardSection
				title='Manage Podcasts'
				content={podcasts}
				folder='dashboard/pod'
				buttonText='Learn More'
				adminFlag={true}
				titleButton={!podcastFormOpen ? 'Create podcast' : 'Close form'}
				titleButtonAction={e => setPodcastFormOpen(!podcastFormOpen)}
				formOpen={podcastFormOpen}
			>
				<AddPodcastForm setPodFormOpen={setPodcastFormOpen} />
			</ButtonCardSection>
		)}
		</section>
	)
}

export default AdminDashboard

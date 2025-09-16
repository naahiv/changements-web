// Page Router
import { useRouter } from 'next/router'

// Head element
import Head from 'next/head'

// styles
import styles from '@/styles/Portfolio.module.scss'

// components
import SectionContainer from '@/components/SectionContainer'
import CardsSection from '@/components/CardsSection'
import Contact from '@/components/Contact'
import Image from 'next/image'
import Button from '@/components/Button'
import ErrorPage from '@/components/ErrorPage.js'
import EditPodcastForm from '@/components/forms/EditPodcastForm.js'

// hooks
import { useCollection } from '@/hooks/useCollection'
import { useAuthContext } from '@/hooks/useAuthContext'
import { useFirestore } from '@/hooks/useFirestore'

const PodcastEditor = () => {
	const router = useRouter()
	const { slug } = router.query
	const { documents: podcasts } = useCollection('podcasts')
	const { documents: users } = useCollection('users')

	const podcast = podcasts && podcasts.find(podcast => podcast.id === slug)

	// check admin privelage
	const { user: authUser } = useAuthContext()
	const authUserDoc = authUser && users && users.find(usr => usr.id === authUser.uid)
	const authed = authUserDoc && authUserDoc.type === 'admin'

	// firestore
	const { deleteDocument } = useFirestore('pods')

	const deleteButtonClicked = () => {
		deleteDocument(podcast.id)
		router.push('/dashboard')
	}

	return (
		<>
			<Head>
				<title>{podcast && `ImpactPlease | Edit ${podcast.name}`}</title>
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.svg' />
			</Head>
			<main>

				{authed && (
				<>

				{/* Pod Detail */}
				<SectionContainer
					back={true}
					marginTop={true}
					title="Edit Podcast"
				>
				
				{/* Edit a Podcast */}
				{podcast && (
				<>
					<EditPodcastForm
						activePodcast={podcast}
					/>
					<button style={{gridColumn: 'span 2'}}className='button-red' onClick={deleteButtonClicked}>Delete Podcast</button>
				</>
				)}

				</SectionContainer>

				</>)}

				{!authed && (
					<ErrorPage />
				)}
			</main>
		</>
	)
}

export default PodcastEditor
